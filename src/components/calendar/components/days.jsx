import { config } from '@/config';
import { useState, useEffect } from 'react';
import HourList from './hoursList.jsx';
import { format, addDays, startOfWeek, isWeekend, isBefore, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Swal from 'sweetalert2';

export default function Days() {
  const morningHours = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];
  const afternoonHours = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

  const getNextWeekdays = (startDate) => {
    let days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      if (!isWeekend(date)) {
        days.push(date);
      }
    }
    return days;
  };

  const getAvailableDates = () => {
    const today = new Date();
    let startDate = startOfWeek(today, { weekStartsOn: 6 });
    
    if (isBefore(today, startDate)) {
      startDate = addDays(startDate, -7);
    }

    return getNextWeekdays(startDate);
  };

  const [selectedDate, setSelectedDate] = useState(format(getAvailableDates()[0], 'yyyy-MM-dd'));
  const [commitments, setCommitments] = useState({});
  const [events, setEvents] = useState([]);

  const availableDates = getAvailableDates();

  availableDates.forEach((date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    commitments[formattedDate] = commitments[formattedDate] || {
      morning: Array(morningHours.length).fill(''),
      afternoon: Array(afternoonHours.length).fill('')
    };
  });

  useEffect(() => {
    fetch(`${config.apiUrl}/v1/schedules/`)
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching schedule:', error));
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const updateCommitments = (period, newValues) => {
    setCommitments((prevCommitments) => ({
      ...prevCommitments,
      [selectedDate]: {
        ...prevCommitments[selectedDate],
        [period]: newValues
      }
    }));
  };

  const formatDateString = (date) => {
    return format(date, 'dd/MM - EEEE', { locale: ptBR });
  };

  const checkAvailability = (date, time) => {
    const dateTime = new Date(`${date}T${time}:00`);
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('usertype');
    const event = events.find(event => {
      const eventTime = parseISO(event.start_time);
      return eventTime.getTime() === dateTime.getTime();
    });

    if (event) {
      if (event.customer_id == userId) {
        return { isAvailable: false, message: `Você reservou esse horário para ${event.service}`, isOwner: true, eventId: event.id };
      }
      else if (userType === 'admin'){
        return { isAvailable: false, message: `${event.username} - ${event.service} `, isOwner: true, eventId: event.id };
      }
      return { isAvailable: false, message: 'Horário indisponível', isOwner: false };
    }
    return { isAvailable: true };
  };

  const handleNewEvent = (time) => {
    const userType = localStorage.getItem('usertype');
    const inputOptions = userType === 'cliente' ? { barba: 'Barba', cabelo: 'Cabelo' } : { folga: 'Folga'};
    Swal.fire({
      title: 'Selecione o serviço que deseja reservar',
      input: 'select',
      inputOptions: inputOptions,
      inputPlaceholder: 'Selecione o serviço',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve('Você precisa selecionar um serviço');
          }
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const service = result.value;
        const customer_id = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        const start_time = `${selectedDate}T${time}:00`;

        const newEvent = {
          customer_id,
          username,
          service,
          start_time
        };

        fetch(`${config.apiUrl}/v1/schedules/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEvent)
        })
          .then(response => response.json())
          .then(data => {
            setEvents([...events, data]);
            Swal.fire('Reservado!', 'Seu compromisso foi reservado com sucesso.', 'success');
          })
          .catch(error => console.error('Error creating event:', error));
      }
    });
  };

  const handleDeleteEvent = (eventId) => {
    fetch(`${config.apiUrl}/v1/schedules/${eventId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setEvents(events.filter(event => event.id !== eventId));
        Swal.fire('Deletado!', 'Seu compromisso foi cancelado.', 'success');
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  return (
    <div className="flex flex-col md:text-xl w-full h-3/4 justify-center items-center">
      <div className="flex h-full md:w-3/12 justify-center content-center bg-white rounded-full p-2 border-2">
        <select
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-white w-full p-2 rounded-full text-center md:text-xl"
        >
          {availableDates.map((date) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            return (
              <option key={formattedDate} value={formattedDate} className="text-sm">
                {formatDateString(date)}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col md:flex-row text-xl w-full h-full justify-center">
        <HourList
          hours={morningHours}
          values={commitments[selectedDate]?.morning || []}
          updateValues={(newValues) => updateCommitments('morning', newValues)}
          checkAvailability={(time) => checkAvailability(selectedDate, time)}
          handleNewEvent={handleNewEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
        <HourList
          hours={afternoonHours}
          values={commitments[selectedDate]?.afternoon || []}
          updateValues={(newValues) => updateCommitments('afternoon', newValues)}
          checkAvailability={(time) => checkAvailability(selectedDate, time)}
          handleNewEvent={handleNewEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
}
