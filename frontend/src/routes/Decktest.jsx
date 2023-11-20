import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import { FlashcardContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import DeckcardTest from "./DeckcardTest";
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
      <div className=" min-h-screen flex justify-center">
        <ul className="grid lg:grid-cols-1 sm:grid-cols-1 gap-4 m-4">
          {flashCards.map((card, i) => (
            <DeckcardTest
              key={i}
              index={i}
              term={card.term}
              correct={correct}
              answers={answers}
              setAnswers={setAnswers}
            />
          ))}
        </ul>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Decktest;
