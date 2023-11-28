import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import { FlashcardContext } from "../App";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import DeckcardTest from "../components/DeckcardTest";
import TestNumbers from "../components/TestNumbers";
import Loading from "../components/Loading";

const Decktest = () => {
  const { flashCards } = useContext(FlashcardContext);
  var randomFlash = [...flashCards];//copy the flash card deck
  for (var i = 0; i < randomFlash.length; i++){ // randomize flashcards
    const j = Math.floor(Math.random() * (i + 1));
    [randomFlash[i], randomFlash[j]] = [randomFlash[j], randomFlash[i]];
  }
  const [testCards, setTestCards] = useState(randomFlash)

  const initialAnswers = Array.from({ length: flashCards.length }, () => "");
  const [answers, setAnswers] = useState(initialAnswers);
  const [correct, setCorrect] = useState(
    Array.from({ length: flashCards.length }, () => -1)
  );

  const [numQ, setNumQ] = useState(-1);//going to test adding different length of tests
  const [qUpdate, setQUpdate] = useState(false);

  const [modalClosed, setModalClose] = useState(false);
  const [renderedQs, setRenderedQs] = useState(false);


  const handleAccept = (e) => {
    const n = document.getElementById('numQuestions');
    if (n.value > 0) {
      setNumQ(n.value);
    } else {
      e.preventDefault(); 
    }
  };



  useEffect(() => {
    const modal = document.getElementById("my_modal_test");
  
    if (modal) {
      modal.showModal();
    }
  }, []);

  useEffect(() => {
    if (numQ >= 0) {
      setTestCards(randomFlash.slice(0, numQ));
      setQUpdate(true);
      setModalClose(true);
      setRenderedQs(true);
    }
  }, [numQ])


  

  
  







  return (
    <div className="bg-neutral">
      <Navbars page="test"></Navbars>
      <div className="mt-24 bg-neutral"></div>
      {!modalClosed && <Loading />}
      <dialog id="my_modal_test" className="modal">
          <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <div className = "flex flex-row">
          <p className="py-4 mr-5">How many questions would you like?</p>
          <input id = "numQuestions" type="text" placeholder="Type here" className="input input-bordered input-secondary w-1/4 max-w-xs"/>
          </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-secondary" onClick = {handleAccept}>accept</button>
              </form>
            </div>
          </div>
        </dialog>
      {modalClosed && qUpdate && (<div className=" min-h-screen flex flex-col items-center justify-center">
      <h1 className = "text-4xl font-bold mb-5">Time to <span className="animate-text bg-gradient-to-r from-teal-800 via-green-700 to-blue-800 bg-clip-text text-transparent font-black">
                Quizify
              </span>!</h1>
      <div className="flex flex-nowrap overflow-x-auto" style = {{maxWidth: "50%"}}>
          {testCards.map((card, i) => (
            <TestNumbers
              key={i}
              scrollTo={`element${i}`}
              index={i + 1}
            />
          ))}
        </div>
        {renderedQs && (
          <ul className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 m-4">
          {testCards.map((card, i) => (
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
          
        )}
          
        
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-info mb-20 w-96">Submit</button>
      </div>)}
      
      <Footer></Footer>
    </div>
  );
};

export default Decktest;
