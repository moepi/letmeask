import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }
  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard} title="Copiar código da sala.">
      <div>
        <img src={copyImg} alt="Copiar código da sala." />
      </div>
      <span>{props.code}</span>
    </button>
  );
}