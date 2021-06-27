import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { UserAuth } from '../components/UserAuth';

import '../styles/auth.scss';

type FirebaseRooms = Record<string, {
  title: string,
  authorId: string,
  endedAt: string | undefined
}>

type RoomType = {
  id: string,
  title: string,
  endedAt: string | undefined
}

type RoomParams = {
  authorId: string,
}

export function ListRooms() {
  const params = useParams<RoomParams>();
  const { user, signInWithGoogle } = useAuth();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const history = useHistory();
  const authorId = params.authorId;

  useEffect(() => {
    console.log(authorId);
    console.log(user?.id);
    if (authorId === user?.id) {
      const roomsRef = database.ref('rooms/');

      roomsRef.once('value', room => {
        const databaseRooms = room.val();

        const firebaseRooms: FirebaseRooms = databaseRooms ?? {};
        const parsedRooms = Object.entries(firebaseRooms)
          .filter(([key, value]) => value.authorId === authorId)
          .map(([key, value]) => {
            return {
              id: key,
              title: value.title,
              authorId: value.authorId,
              endedAt: value.endedAt ?? undefined
            }
          });

        setRooms(parsedRooms);
      });

      return () => {
        roomsRef.off('value');
      }
    } else {
      history.push('/');
    }

  }, [authorId, history, user?.id]);

  function handleJoinRoom(roomId: string) {
    history.push(`/admin/rooms/${roomId}`);
  }

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <UserAuth />
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas." />
        <strong>Crie salas de Q&amp;A ao vivo.</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h3>Minhas salas</h3>
          {rooms.length > 0 &&
            <div className="list-rooms">
              {rooms?.map(room => {
                return (
                  <Button
                    type="button"
                    isOutlined
                    onClick={() => handleJoinRoom(room.id)}
                  >
                    {room?.title}
                  </Button>
                );
              })}
            </div>
          }
          <Button
            type="button"
            onClick={handleCreateRoom}
          >
            Criar nova sala
          </Button>
          <p>Quer entrar em outra sala? <Link to="/">Voltar</Link></p>
        </div>
      </main>
    </div>
  );
}