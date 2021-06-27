import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  content: string,
  author: {
    name: string,
    avatar: string,
  },
  isHighlighted: boolean,
  isAnswered: boolean,
  likes: Record<string, {
    authorId: string
  }>
}>

type QuestionType = {
  id: string,
  content: string,
  author: {
    name: string,
    avatar: string,
  },
  isHighlighted: boolean,
  isAnswered: boolean,
  likeCount: number,
  likeId: string | undefined
}

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const history = useHistory();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [endedAt, setEndedAt] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();

      if (databaseRoom.authorId !== user?.id) {
        history.push(`/rooms/${roomId}`);
      } else {
        history.push(`/admin/rooms/${roomId}`);
      }

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      });

      parsedQuestions.sort(function (a, b) {
        return (b.likeCount) - (a.likeCount);
      })

      setTitle(databaseRoom.title);
      setEndedAt(databaseRoom.endedAt);
      setAuthorId(databaseRoom.authorId);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id, history]);

  return { questions, title, endedAt, authorId }
}