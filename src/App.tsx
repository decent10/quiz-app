import  {useState, useEffect} from 'react';
import { Transition } from '@headlessui/react';
import './App.css';
import Card from './components/Card';


import Navbar from './components/Navbar';
import questionnaire from './data/questionnaire.json';
console.log(questionnaire.questionnaire.questions)
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
  const [isShowing, setIsShowing] = useState<boolean>(true);
  //const [prevQuestion, setPrevCurrentQuestion] = useState(0);
  useEffect(() => {
    setQuestions([...questions])
   
  }, [currentQuestion])
  const handleAnswerOptionClick = (choice:any, index:number)=>{
    let newquestions = questions;
    let res =  newquestions.splice(currentQuestion, 1);
    //@ts-ignore
    //res[0]?.choices?[index].selected = true;
    //@ts-ignore
    res[0].choices.forEach(function(item){
      item.label === choice.label ? item.selected = true : item.selected = false
    }) 
     newquestions.splice(currentQuestion, 0, res[0]);
    //console.log(question,res[0],newQues);
    //return;s
   // setSelectedAnswer(null);
    setQuestions(newquestions)
  }
  const handleNextClick = (choice:any) => {
    setSelectedAnswer(null);
  
		const nextQuestion = currentQuestion + 1;
    if(questions.length > 0){
	if (nextQuestion < questions.length) {
       setIsShowing(false);
    setTimeout(() => {
      	setCurrentQuestion(nextQuestion);
      setIsShowing(true);
    }, 500);
		
		}
    }
	
	};
    const handlePrevClick = (choice:any) => {
setSelectedAnswer(null);
 
		const nextQuestion = currentQuestion - 1;
    if(questions.length > 0){
	if (nextQuestion < questions.length) {
     setIsShowing(false);
    setTimeout(() => {
      	setCurrentQuestion(nextQuestion);
      setIsShowing(true);
    },500);
		
		}
    }
	
	};
  return (
    <div className="md:container md:mx-auto ">
     
<div className="flex flex-col items-center justify-center ">
  <h1 className="text-center text-white text-2xl p-4">Quiz App</h1>
   <Transition
      appear={true}
      show={isShowing}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="flex items-center justify-center w-full"
    >
<div className="bg-white shadow overflow-hidden rounded p-4 h-1/2 w-1/2">
<h2 className="text-grey-900 text-lg text-center">{questions[currentQuestion].headline}</h2>
{questions[currentQuestion].question_type === "text" ? (
  <textarea className="rounded shadow p-2 w-full my-2 border" rows={4} cols={4} ></textarea>

) :(
<div className='flex flex-col items-center justify-center'>
						{questions[currentQuestion].choices?.map((choice,index) =>(
              <button key={choice.label} onClick={(e) =>{
                setSelectedAnswer(index);
                // let element = e.target as HTMLElement;
                // element.classList.remove("bg-indigo-600")
                // element.classList.toggle('bg-green-600');
                handleAnswerOptionClick(choice, index);
              }} className={`shadow w-11/12 text-white ${choice.selected || selectedAnswer === index  ?  "bg-green-600 bg-opacity-80" : "bg-indigo-600 bg-opacity-80"}   rounded p-2 m-1`}>{choice.label}</button>


            ))}
</div>
)}


</div >

<div className="flex items-center justify-between my-3  w-1/2">
  <button className="p-4 rounded font-xl  bg-white" onClick={()=>{
    handlePrevClick(questions[currentQuestion].choices)
  }}>Previous Question</button><button className="p-4 rounded  bg-white font-xl" onClick={()=>{
    handleNextClick(questions[currentQuestion].choices)
  }}>Next Question</button>
</div>
</Transition>


</div>



    </div>
  );
}

export default App;
