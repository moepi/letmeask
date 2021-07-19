import copyImg from '../../assets/images/copy.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './styles.scss';

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.info("Código copiado!");
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button className="room-code" onClick={copyRoomCodeToClipboard} title="Copiar código da sala.">
        <div>
          <img src={copyImg} alt="Copiar código da sala." />
        </div>
        <span>{props.code}</span>
      </button>
    </>
  );
}