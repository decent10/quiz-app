import React, { useState, ReactNode } from 'react';
import Button from './shared/Button';
import { Choice, Question } from '../type';

type Props = {
    item: Question;
    onChange: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
    onAnswer: (choice: Choice) => void;
};

const QuestionItem = ({ item, onChange, onAnswer }: Props) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const renderQuestionOptions = (question: Question): ReactNode => {
        return question.question_type === 'text' ? (
            <textarea
                value={question?.answer}
                onChange={onChange}
                className="rounded shadow p-2 w-full my-2 border"
                rows={4}
                cols={4}
            ></textarea>
        ) : (
            <div className="flex flex-col items-center justify-center">
                {question.choices?.map((choice, index) => (
                    <Button
                        key={choice.label}
                        onClick={() => {
                            setSelectedAnswer(index);
                            onAnswer(choice);
                        }}
                        className={` flex justify-center items-center relative transition duration-150 shadow w-11/12 text-white ${
                            choice.selected || selectedAnswer === index
                                ? 'bg-transparent border-3 border-indigo-800 text-indigo-900'
                                : 'bg-indigo-600 bg-opacity-80 text-white'
                        }      px-8 py-3 border border-transparent text-base font-medium rounded-md  bg-indigo-10 hover:text-indigo-900 hover:bg-transparent hover:border-indigo-800 hover:border-3 hover:text-indigo-900 md:py-4 md:text-lg md:px-10 m-1`}
                    >
                        {choice.label}
                        {choice.selected || selectedAnswer === index ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 absolute inline right-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : null}{' '}
                    </Button>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white shadow overflow-hidden rounded p-4 h-1/2 w-full md:w-8/12 lg:w-8/12">
            <h2 className="text-grey-900 text-2xl font-md mb-8 my-4 text-center">
                {item.headline}
            </h2>
            {renderQuestionOptions(item)}
        </div>
    );
};

export default QuestionItem;
