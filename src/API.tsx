import React from 'react'
import shuffleArray from './Utils';

export type Questions = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string
}

export type QuestionState= Questions & { answers: string[] }

export enum Difficulties {
    EASY = "easy",
    MEDIUM= "medium",
    HARD= "hard"
}

export const fetchQuizQuestions =async ( amount: number, difficulties: Difficulties )=>{
    const endpoint =`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulties}&type=multiple`;
    const data = await(await fetch(endpoint)).json()
    // console.log(data);
    return data.results.map((question: Questions)=>(
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        }
    ));
}