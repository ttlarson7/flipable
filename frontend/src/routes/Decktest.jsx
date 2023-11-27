import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import { FlashcardContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import DeckcardTest from "../components/DeckcardTest";
import TestNumbers from "../components/TestNumbers";

const Decktest = () => {
  const { flashCards } = useContext(FlashcardContext);
  var randomFlash = [...flashCards];//copy the flash card deck
  for (var i = 0; i < randomFlash.length; i++){ // randomize flashcards
    const j = Math.floor(Math.random() * (i + 1));
    [randomFlash[i], randomFlash[j]] = [randomFlash[j], randomFlash[i]];
  }

  const initialAnswers = Array.from({ length: flashCards.length }, () => "");
  const [answers, setAnswers] = useState(initialAnswers);
  const [correct, setCorrect] = useState(
    Array.from({ length: flashCards.length }, () => -1)
  );

  const [numQ, setNumQ] = useState(randomFlash.length);//going to test adding different length of tests

  const handleNumQ = (e) => {
    setNumQ(e.target.value);
  }





  return (
    <div className="bg-neutral">
      <Navbars page="test"></Navbars>
      <div className="mt-24 bg-neutral"></div>
      <div className=" min-h-screen flex flex-col items-center justify-center">
      <h1 className = "text-4xl font-bold mb-5">Time to <span className="animate-text bg-gradient-to-r from-teal-800 via-green-700 to-blue-800 bg-clip-text text-transparent font-black">
                Quizify
              </span>!</h1>
      <div className="flex flex-nowrap overflow-x-auto" style = {{maxWidth: "50%"}}>
          {randomFlash.map((card, i) => (
            <TestNumbers
              key={i}
              scrollTo={`element${i}`}
              index={i + 1}
            />
          ))}
        </div>
          
        <ul className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 m-4">
          {randomFlash.map((card, i) => (
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
