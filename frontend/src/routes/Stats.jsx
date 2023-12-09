/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { PiExamThin, PiCardsFill } from "react-icons/pi";
import { useUser } from "@clerk/clerk-react";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import axios from "axios";

function Stats() {
  const { user } = useUser();
  const username = user.fullName;
  const userImg = user.imageUrl;
  const [deckCount, setDeckCount] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [cardCount, setCardCount] = useState(0);


  useEffect(() => {
    axios.get("/getUser", {
      params: {
        userId: user.id.toString(),
      },
    })
      .then((res) => {
        setDeckCount(res.data.decksCreated);
        setTestCount(res.data.testsTaken);
        setCardCount(res.data.cardsCreated);
      })
      .catch((err) => console.log(err));
  }, [])

  // add useEffects for getting and updating user stats from the DB

  // conditional rendering for when user's data is being called

  return (
    <div>
      <Navbars page={"profile"}></Navbars>
      <div className="mt-16"></div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="stats stats-vertical shadow">
            <div className="stat">
              <div className="stat-figure text-primary text-6xl">
                <PiExamThin />
              </div>
              <div className="stat-title">Total Test Taken</div>
              <div className="stat-value text-primary">{testCount}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary text-6xl">
                <PiCardsFill />
              </div>
              <div className="stat-title">Flashcards Created</div>
              <div className="stat-value text-secondary">{cardCount}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src={userImg} />
                  </div>
                </div>
              </div>
              <div className="stat-value">{deckCount}</div>
              <div className="stat-title">Decks Created</div>
            </div>
          </div>{" "}
          <div className="max-w-2xl">
            <h1 className="text-7xl">
              Welcome{" "}
              <span className="text-primary">
                <b>{username}</b>
              </span>
              !
            </h1>
            <p className="py-6 text-3xl">
              Here are some of your statistics! We're excited to see how you
              grow!
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Stats;
