import  {useState, useEffect} from 'react';
import { Transition } from '@headlessui/react';
import './App.css';
import Card from './components/Card';


import Navbar from './components/Navbar';
import questionnaire from './data/questionnaire.json';

let {questionnaire:{name,description}} = questionnaire
let questionsList = questionnaire.questionnaire.questions;

// type Question = {
//     question_type: string;
//     identifier: string;
//     headline: string;
//     description?: string;
//     required: boolean;
//     multiple: string;
//     choices: {
//         label: string;
//         value: string;
//         selected: boolean;
//     }[];
//     jumps?: {
//         conditions: {
//  field?: string,
//                 value?: string

//         }[];
//         destination: {
// id?: string
//         };
//     }[];
//     multiline?: undefined;
// }[] | [];
// console.log(questionsList)
function App() {
  const [questions, setQuestions] = useState([...questionsList]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const[leaveTransition, setLeaveTransition] = useState("")
  const [isShowing, setIsShowing] = useState<boolean>(true);
  //const [prevQuestion, setPrevCurrentQuestion] = useState(0);
  useEffect(() => {
    setQuestions([...questions])
   
  }, [currentQuestion])
  const handleAnswerOptionClick = (choice:any, index:number)=>{
    let newquestions = questions;
    let res =  newquestions.splice(currentQuestion, 1);
    //@ts-ignore
    res[0].choices.forEach(function(item){
      item.label === choice.label ? item.selected = true : item.selected = false
    }) 
     newquestions.splice(currentQuestion, 0, res[0]);

    setQuestions(newquestions)
  }
  const handleNextClick = (choice:any) => {
    setSelectedAnswer(null);
    setLeaveTransition("translate-x-full");
    
  
		const nextQuestion = currentQuestion + 1;
    if(questions.length > 0){
	if (nextQuestion < questions.length) {
    setIsShowing(false);
    setTimeout(() => {
      	setCurrentQuestion(nextQuestion);
      setIsShowing(true);
    }, 600);
		
		}
    }
	
	};
    const handlePrevClick = (choice:any) => {
setSelectedAnswer(null);
 setLeaveTransition("-translate-x-full");
		const nextQuestion = currentQuestion - 1;
    if(questions.length > 0){
	if (nextQuestion < questions.length) {
    setCurrentQuestion(nextQuestion);
     setIsShowing(false);
    setTimeout(() => {
      	
      setIsShowing(true);
    },600);
		
		}
    }
	
	};
  return (
    <div className="md:container md:mx-auto ">
     
<div className="flex flex-col items-center justify-center ">
  <h1 className="text-center text-white text-2xl p-4 my-3">{name}</h1>
  <p className="font-md ">{description}</p>
   <Transition
      appear={true}
      show={isShowing}
      // enter="transition-opacity duration-300"
      // enterFrom="opacity-0"
      // enterTo="opacity-100"
      // leave="transition-opacity duration-300"
      // leaveFrom="opacity-100"
      // leaveTo="opacity-0"
       enter="transition opacity ease-in-out  duration-300 transform"
        enterFrom="-translate-x-full opacity-0 animate-bounce"
        enterTo=" opacity-100"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo={leaveTransition}
      className="flex items-center justify-center w-full flex-col"
    >
<div className="bg-white shadow overflow-hidden rounded p-4 h-1/2 w-1/2">
<h2 className="text-grey-900 text-2xl font-md mb-8 my-4 text-center">{questions[currentQuestion].headline}</h2>
{questions[currentQuestion].question_type === "text" ? (
  <textarea className="rounded shadow p-2 w-full my-2 border" rows={4} cols={4} ></textarea>
) :(
<div className='flex flex-col items-center justify-center'>
						{questions[currentQuestion].choices?.map((choice,index) =>(
              <button key={choice.label} onClick={(e) =>{
                setSelectedAnswer(index);
                handleAnswerOptionClick(choice, index);
              }} className={`shadow w-11/12 text-white ${choice.selected || selectedAnswer === index  ?  "bg-green-600 bg-opacity-80" : "bg-indigo-600 bg-opacity-80"}      px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-10 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 m-1`}>{choice.label}</button>


            ))}
</div>
)}


</div >

<div className="flex items-center justify-between my-3  w-1/2">
  <button disabled={currentQuestion <= 0 ? true: false} className="   px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10" onClick={()=>{
    handlePrevClick(questions[currentQuestion].choices)
  }}>Previous Question</button><button disabled={currentQuestion >= questions.length ? true: false}  className="   px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10" onClick={()=>{
    handleNextClick(questions[currentQuestion].choices)
  }}>Next Question</button>
</div>
</Transition>


</div>



    </div>
  );
}

export default App;
