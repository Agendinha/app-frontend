export default function Modal(props) {
  const { isOpen, setModalIsOpen, textModal, buttonSuccess, successFunction } = props;

  if (isOpen) {
    return (
      <>
        <div className="flex items-center w-full h-full bg-black bg-opacity-50 fixed z-50 justify-center font-sans">
          <div className="flex flex-col items-center h-10/12 bg-white justify-center border-0 rounded-lg text-black">
            <div className="p-6 w-full text-end">
              <button
                className="hover:bg-orange-100 text-ellipsis bg-white border-0 rounded-full mb-2"
                onClick={setModalIsOpen}
              >
                X
              </button>
              <h3 className="text-xl text-center font-bold">{textModal}</h3>
            </div>
            <div className="flex w-full items-end justify-center p-6 ">
              <button
                className="bg-orange-400 text-hoverTextPrimary text-lg text-white font-normal"
                type="submit"
                onClick={successFunction}
              >
                {buttonSuccess ? buttonSuccess : 'Ok'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
}
