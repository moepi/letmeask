import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { UserAuth } from '../components/UserAuth';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleListRooms() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push(`/all/rooms/${user?.id}`);
  }

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Sala inexistente!");
      return;
    } else {
      const isAdmin = user?.id === roomRef.val().authorId;

      if (roomRef.val().endedAt && !isAdmin) {
        toast.error("Sala encerrada!");
        return;
      }

      if (isAdmin) {
        history.push(`/admin/rooms/${roomCode}`);
      }
      else {
        history.push(`/rooms/${roomCode}`);
      }
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                onChange={event => setRoomCode(event.target.value)}
                value={roomCode}
              />
              <Button type="submit">
                Entrar na sala
              </Button>
            </form>
            <div className="separator"> ou crie uma sala</div>
            <button onClick={handleCreateRoom} className="create-room">
              <img src={googleIconImg} alt="Google" />
              Crie sua sala com o Google
            </button>

            {user ?
              <Button
                type="button"
                isOutlined
                onClick={handleListRooms}
              >
                Minhas salas
              </Button>
              :
              <p>Faça login para ver suas salas. <button type="button" onClick={handleLogin}>Entrar</button></p>
            }
          </div>
        </main>
      </div>
    </>
  );
}