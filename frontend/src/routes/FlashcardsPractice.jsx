import React, { useState, useMemo, useRef, useContext } from "react";
import TinderCard from "react-tinder-card";
import { FlashcardContext } from "../App";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import { FaCaretLeft, FaCaretRight, } from "react-icons/fa";
// FaCaretUp
import { useNavigate } from "react-router-dom";

function FlashcardsPractice() {
  const navigate = useNavigate();
  const { flashCards } = useContext(FlashcardContext);
  const [currentIndex, setCurrentIndex] = useState(flashCards.length - 1);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(flashCards.length)
        .fill(0)
        .map(() => React.createRef()),
    [flashCards]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // const canGoBack = currentIndex < flashCards.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < flashCards.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  // const goBack = async () => {
  //   if (!canGoBack) return;
  //   const newIndex = currentIndex + 1;
  //   updateCurrentIndex(newIndex);
  //   await childRefs[newIndex].current.restoreCard();
  // };

  const restart = () => {
    setCurrentIndex(flashCards.length - 1);
    childRefs.forEach((ref) => ref.current && ref.current.restoreCard());
  };
  
  //checking my commits

  if (flashCards.length === 0) {
    return (
      <>
        <Navbars page="flashcard-practice"></Navbars>
        <div className="hero min-h-screen bg-neutral">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hey nothing here?</h1>
              <p className="py-6">
                If you want to practice, go back and add some cards!
              </p>
              <button onClick={() => navigate(-1)} className="btn btn-primary">
                Go Back
              </button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }

  if (currentIndex === -1) {
    return (
      <>
        <Navbars page="flashcard-practice"></Navbars>
        <div className="hero min-h-screen bg-neutral">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Nice job!</h1>
              <p className="py-6">
                Now that you&rsquo;ve reached the end of the deck, you can
                return back if you&rsquo;re done or press the <b>Restart</b>{" "}
                button to continue!
              </p>
              <button onClick={() => restart()} className="btn btn-primary">
                Restart
              </button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <Navbars page="flashcard-practice"></Navbars>
      <div className="mt-48 bg-neutral"></div>
      <div className="flex flex-col items-center justify-center">
        {flashCards.map((card, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute mx-auto w-96 md:w-96 lg:w-96 xl:w-96 top-32"
            key={card.term}
            onSwipe={(dir) => swiped(dir, card.term, index)}
            onCardLeftScreen={() => outOfFrame(card.term, index)}
            preventSwipe={['up', 'down']}
          >
            <label className="swap swap-flip text-3xl w-96 md:w-96 lg:w-96 xl:w-96">
              <input type="checkbox" />
              <div className="card items-center text-center swap-off bg-base-100 h-64 md:h-80 lg:h-96 xl:h-96 flex justify-center border border-primary">
                <div className="bg-primary border border-primary rounded">
                  <p className="card-title text-base-100 font-bold text-2xl ml-3 mr-3 mb-1 ">
                    {card.term}
                  </p>
                </div>
              </div>
              <div className="card items-center text-center swap-on bg-base-100 h-64 md:h-80 lg:h-96 xl:h-96 flex justify-center border border-primary overflow-auto">
                <div className="max-w-full pt-6">
                  <p className="text-2xl m-4 whitespace-normal break-words">
                    {card.definition}
                  </p>
                </div>
              </div>
            </label>
          </TinderCard>
        ))}
      </div>
      <div className="flex justify-center mt-[350px]">
        <button className="btn btn-primary mx-2" onClick={() => swipe("left")}>
          <FaCaretLeft />
          Put back in deck
        </button>
        {/* <button className="btn btn-secondary mx-2" onClick={() => goBack()}>
          <FaCaretUp /> Undo
        </button> */}
        <button className="btn btn-primary mx-2" onClick={() => swipe("right")}>
          Got it right
          <FaCaretRight />
        </button>
      </div>
      <div className="mt-20"></div>
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsPractice;
