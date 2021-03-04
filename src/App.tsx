import { useState, ReactNode } from "react";
import { Transition } from "@headlessui/react";

import questionnaire from "./data/questionnaire.json";
import Button from "./components/shared/Button";

let {
  questionnaire: { name, description, questions: questionsList },
} = questionnaire;
type Choice = {
  label?: string;
  value?: string;
  selected?: boolean;
};
type Question = {
  question_type: string;
  identifier: string;
  answer?: string;
  headline: string;
  description?: string | null;
  required?: boolean;
  multiple?: string | undefined;
  choices?: {
    label?: string;
    value?: string;
    selected?: boolean;
  }[];
  jumps?: {
    conditions?: {
      field: string;
      value?: string;
    }[];
    destination?: { id?: string };
  }[];
  multiline?: string | undefined;
};

function App() {
  const [questions, setQuestions] = useState<Question[]>([...questionsList]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [leaveTransition, setLeaveTransition] = useState<string>("");
  const [isShowing, setIsShowing] = useState<boolean>(true);

  const handleAnswerOptionClick = (choice: Choice) => {
    let newQuestions = questions;
    let selectedQuestion: Question = newQuestions.splice(currentQuestion, 1)[0];
    selectedQuestion.choices?.forEach(function (item) {
      item.label === choice.label
        ? (item.selected = true)
        : (item.selected = false);
    });
    newQuestions.splice(currentQuestion, 0, selectedQuestion);

    setQuestions(newQuestions);
  };
  const handleChange = (e: any) => {
    console.log(e);
    let newQuestions = questions;
    let selectedQuestion = newQuestions.splice(currentQuestion, 1)[0];
    newQuestions.splice(currentQuestion, 0, {
      ...selectedQuestion,
      answer: e.target.value,
    });
    setQuestions(newQuestions);
  };
  const renderQuestionOptions = (questionType: string): ReactNode => {
    return questionType === "text" ? (
      <textarea
        value={questions[currentQuestion]?.answer}
        onChange={handleChange}
        className="rounded shadow p-2 w-full my-2 border"
        rows={4}
        cols={4}
      ></textarea>
    ) : (
      <div className="flex flex-col items-center justify-center">
        {questions[currentQuestion].choices?.map((choice, index) => (
          <Button
            key={choice.label}
            onClick={() => {
              setSelectedAnswer(index);
              handleAnswerOptionClick(choice);
            }}
            className={` flex justify-center items-center relative transition duration-150 shadow w-11/12 text-white ${
              choice.selected || selectedAnswer === index
                ? "bg-transparent border-3 border-indigo-800 text-indigo-900"
                : "bg-indigo-600 bg-opacity-80 text-white"
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
            ) : null}{" "}
          </Button>
        ))}
      </div>
    );
  };
  const handleNextClick = () => {
    setSelectedAnswer(null);
    setLeaveTransition("translate-x-full");
    const nextQuestion = currentQuestion + 1;
    if (questions.length > 0) {
      if (nextQuestion < questions.length) {
        setIsShowing(false);
        setTimeout(() => {
          setCurrentQuestion(nextQuestion);
          setIsShowing(true);
        }, 600);
      }
    }
  };
  const handlePrevClick = () => {
    setSelectedAnswer(null);
    setLeaveTransition("-translate-x-full");
    const nextQuestion = currentQuestion - 1;
    if (questions.length > 0) {
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setIsShowing(false);
        setTimeout(() => {
          setIsShowing(true);
        }, 600);
      }
    }
  };
  return (
    <div className="md:container md:mx-auto ">
      <div className="flex flex-col items-center justify-center m-3 ">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          {name}
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-100 lg:mx-auto mb-5 text-center">
          {description}
        </p>
        <Transition
          appear={true}
          show={isShowing}
          enter="transition opacity ease-in-out  duration-300 transform"
          enterFrom="-translate-x-full opacity-0 animate-bounce"
          enterTo=" opacity-100"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo={leaveTransition}
          className="flex items-center justify-center w-full flex-col"
        >
          <div className="bg-white shadow overflow-hidden rounded p-4 h-1/2 w-full md:w-8/12 lg:w-8/12">
            <h2 className="text-grey-900 text-2xl font-md mb-8 my-4 text-center">
              {questions[currentQuestion].headline}
            </h2>
            {renderQuestionOptions(questions[currentQuestion].question_type)}
          </div>
          <div className="flex  md:flex-row lg:flex-row sm:my-2 items-center justify-between my-3  w-full md:w-8/12 lg:w-8/12">
            <Button
              className="flex justify-center uppercase items-center  disabled:opacity-50 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              disabled={currentQuestion <= 0 ? true : false}
              onClick={() => {
                handlePrevClick();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>{" "}
              <span className="">Previous</span>
            </Button>
            <Button
              disabled={currentQuestion >= questions.length - 1 ? true : false}
              className=" flex justify-center uppercase items-center disabled:opacity-50 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              onClick={() => {
                handleNextClick();
              }}
            >
              <span className="">next </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default App;
