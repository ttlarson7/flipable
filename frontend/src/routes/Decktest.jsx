import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import { FlashcardContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import DeckcardTest from "./DeckcardTest";
import TestNumbers from "./TestNumbers";

const Decktest = () => {
  const { flashCards } = useContext(FlashcardContext);
  const initialAnswers = Array.from({ length: flashCards.length }, () => "");
  const [answers, setAnswers] = useState(initialAnswers);
  const [correct, setCorrect] = useState(
    Array.from({ length: flashCards.length }, () => -1)
  );



  return (
    <div className="bg-neutral">
      <Navbars page="test"></Navbars>
      <div className="mt-24 bg-neutral"></div>
      <div className=" min-h-screen flex flex-col items-center justify-center">
      <h1 className = "text-4xl font-bold mb-5">Time to <span className="animate-text bg-gradient-to-r from-teal-800 via-green-700 to-blue-800 bg-clip-text text-transparent font-black">
                Quizify
              </span>!</h1>
      <div className="flex flex-nowrap overflow-x-auto" style = {{maxWidth: "70%"}}>
          {flashCards.map((card, i) => (
            <TestNumbers
              key={i}
              scrollTo={`element${i}`}
              index={i + 1}
            />
          ))}
        </div>
          
        <ul className="grid lg:grid-cols-1 sm:grid-cols-1 gap-4 m-4">
          {flashCards.map((card, i) => (
            <DeckcardTest
              id={`element${i}`}
              key={i}
              index={i}
              term={card.term}
              correct={correct}
              answers={answers}
              setAnswers={setAnswers}
              domEleID = {`element${i}`}
            />
          ))}
          
        </ul>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-info mb-20 w-96">Submit</button>
      </div>
      
      <Footer></Footer>
    </div>
  );
};

export default Decktest;
