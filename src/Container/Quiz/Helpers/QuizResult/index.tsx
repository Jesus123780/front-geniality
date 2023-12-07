import React from 'react'
import { Button, Text } from '../../../../stories/atoms'
import { CardStatusQuiz } from '../../../../stories/molecules'
import style from './QuizResult.module.css'

export type UserAnswer = {
    question: string;
    userAnswer: string;
    isCorrect: boolean | null;
}

type QuizResultProps = {
    score: number
    totalQuestions: number
    secondsElapsed: string
    userAnswers?: UserAnswer[]
    reloadQuiz: () => void
}

export const QuizResult: React.FC<QuizResultProps> = ({
    score = 0,
    secondsElapsed = '',
    totalQuestions,
    userAnswers = [],
    reloadQuiz = () => {},
}: QuizResultProps) => {
    return (
        <div>
            <Text align='center' size='6xl'>
                You scored
            </Text>
            <Text align='center' size='5xl'>
                {score} / {totalQuestions}
            </Text>
            <Text align='center' size='md2'>
                Time:
            </Text>
            <Text align='center' size='md'>
                {secondsElapsed}
            </Text>
            <div className={style['content-list-result']}>
                {userAnswers.map((answer, index) => {
                    return <CardStatusQuiz answer={answer} key={index} />
                })}
            </div>
            <div style={{ position: 'absolute', bottom: '25px' }}>
                <Button primary width='100%' padding='20px' onClick={reloadQuiz}>
                    PLAY AGAIN?
                </Button>
            </div>
        </div>
    )
}
