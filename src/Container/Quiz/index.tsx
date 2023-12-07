import { useState } from "react";
import { useFetch, useTimer } from "../../hooks";
import { QuizPage } from "../../stories/pages/QuizPage";
import Confetti from "react-confetti";
import { DraggableContainer } from "../../stories/organisms";
import { QuizResult } from "./Helpers/QuizResult";

export interface QuizQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface QuizData {
  response_code: number;
  results: QuizQuestion[];
}

export type UserAnswer = {
    question: string;
    userAnswer: string;
    isCorrect: boolean | null;
}

export const Quiz = () => {
  const URL = import.meta.env.VITE_APP_URL;
  const { data, isLoading, error } = useFetch<QuizData>(URL);
  const totalQuestions = data?.results?.length ?? 10;
  console.log(data?.results);
  const [active, setActive] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const isActive = !quizCompleted;
  const [answeredQuestions, setAnsweredQuestions] = useState<
    { answer: string; isCorrect: boolean | null }[]
  >(new Array(totalQuestions).fill({ answer: "", isCorrect: null }));

  const secondsElapsed = useTimer(isActive);

  const handleAnswer = (answer: string) => {
    if (!answer || !data) return;
    const currentQuizData = data?.results[active];
    const isCorrect = answer === currentQuizData.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const updatedAnswers = [...answeredQuestions];
    updatedAnswers[active] = { answer, isCorrect };
    setAnsweredQuestions(updatedAnswers);

    if (active === totalQuestions - 2) {
      setQuizCompleted(true);
    }
  };

  console.log(answeredQuestions);
  const handleMoveLeft = () => {
    setActive((prev) => {
      return Math.min(prev + 1, totalQuestions - 1);
    });
    handleAnswer("False");
  };
  const handleMoveRight = () => {
    setActive((prev) => {
      return Math.min(prev + 1, totalQuestions - 1);
    });
    handleAnswer("True");
  };

  const onClose = () => {
    setQuizCompleted(false);
    setActive(0);
    setScore(0);
    window.location.href = '/';

  };

  const formatData = () => {
    const userAnswers = data?.results?.map((question, index) => {
      const answerObj = answeredQuestions[index];
      const isCorrect =
        answerObj.isCorrect !== null ? answerObj.isCorrect : undefined;
      return {
        question: question.question,
        userAnswer: answerObj.answer,
        isCorrect,
      };
    });
    return userAnswers;
  };

  const userAnswers = formatData();

  if (error) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {quizCompleted && (
        <div style={{ zIndex: 9999, position: "fixed" }}>
          <Confetti />
        </div>
      )}
      <QuizPage
        handleMoveLeft={handleMoveLeft}
        handleMoveRight={handleMoveRight}
        data={data?.results as QuizQuestion[]}
        active={active}
      />
      <DraggableContainer isOpen={quizCompleted} onClose={onClose}>
        <QuizResult
          reloadQuiz={onClose}
          score={score}
          secondsElapsed={secondsElapsed}
          userAnswers={userAnswers as UserAnswer[]}
          totalQuestions={totalQuestions}
        />
      </DraggableContainer>
    </>
  );
};
