import { Link } from 'react-router-dom';
import { database } from '../../services/firebase';

import logoImg from '../../assets/images/logo.svg';
import { Button } from '../Button';
import { RoomCode } from '../RoomCode';
import { UserAuth } from '../UserAuth';
import './styles.scss';

type HeaderProps = {
  roomId: string;
  endedAt?: string;
  isAdmin?: boolean;
}

export function Header({
  roomId,
  endedAt,
  isAdmin = false
}: HeaderProps) {

  async function handleEndRoom() {
    if (endedAt) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: null
      });
    } else {
      if (window.confirm("Tem certeza que deseja encerrar essa sala?")) {
        await database.ref(`rooms/${roomId}`).update({
          endedAt: new Date()
        });

        // history.push("/");
      }
    }
  }

  return (
    <header>
      <div className="content">
        <Link to="/">
          <img id="logo" src={logoImg} alt="Letmeask" />
        </Link>
        <div>
          <RoomCode code={roomId} />
          {isAdmin &&
            <Button
              isOutlined={!endedAt ? true : false}
              onClick={handleEndRoom}>
              {endedAt ? "Reabrir sala" : "Encerrar sala"}
            </Button>
          }
        </div>
      </div>
      <UserAuth />
    </header>
  );
}