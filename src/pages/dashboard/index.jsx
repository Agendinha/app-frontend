import Modal from "@/components/modal/modal"
import { useState } from "react"

function Dashboard() {
  const [isOpen, setModalIsOpen] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-orange-200">
       <button
        onClick={() => setModalIsOpen(true)}
       >
        Modal
        </button>
       <Modal
       isOpen={isOpen}
       setModalIsOpen={() => setModalIsOpen(!isOpen)}
       textModal="Login bem sucedido!"
       buttonSuccess="Fechar"
       successFunction={() => setModalIsOpen(!isOpen)}
       />
      
    </div>
  )
}

export default Dashboard
