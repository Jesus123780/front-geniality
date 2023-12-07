import styles from './CardStatusQuiz.module.css'

interface Answer {
  question: string;
  userAnswer: string;
  isCorrect: boolean | null;
}

interface CardStatusQuizProps {
  answer: Answer;
}

export const CardStatusQuiz: React.FC<CardStatusQuizProps> = ({ answer }) => {
  return (
    <div
      className={`${styles.card} ${answer.isCorrect !== null ? (answer.isCorrect ? styles.correct : styles.incorrect) : ''}`}
    >
      <p>Pregunta: {answer.question}</p>
      <p>Respuesta del usuario: {answer.userAnswer}</p>
      {answer.isCorrect !== null && (
        <p>Respuesta {answer.isCorrect ? 'correcta' : 'incorrecta'}</p>
      )}
    </div>
  );
};
