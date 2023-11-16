import { Link } from "react-router-dom";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";

import learningImg from "../assets/undraw_notebook_re_id0r.svg";
import readingImg from "../assets/undraw_reading_re_29f8.svg";
import { TypeAnimation } from "react-type-animation";

const Landing = () => {
  return (
    <div className="flex flex-col items-center bg-neutral">
      <Navbars page={"landing"}></Navbars>
      <div className="hero min-h-screen bg-neutral">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="py-3 text-5xl">
              Welcome to{" "}
              <span className="animate-text bg-gradient-to-r from-teal-800 via-green-700 to-blue-800 bg-clip-text text-transparent font-black">
                Quizify
              </span>
              !
            </h1>
            <h2>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Optimize your learning",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "Truly understand the content",
                  1000,
                  "Better than memorization",
                  1000,
                  "Flexible Definitions",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "2em", display: "inline-block" }}
                repeat={Infinity}
              />
            </h2>
            <p className="text-2xl py-3">
              Revolutionize learning with our innovative flashcards. Say goodbye
              to pure memorization and embrace true understanding for a more
              effective and enjoyable learning experience!
            </p>
            <Link to="/flashcards" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="card lg:card-side max-w-2xl bg-teal-900 py-12 flex">
        <figure className="lg:w-1/2 h-min ml-4">
          <img
            className="object-fit"
            src={learningImg}
            alt="Learning"
          ></img>
        </figure>
        <div className="card-body flex-grow lg:p-4 lg:w-1/2">
          <h2 className="card-title">Optimize your learning!</h2>
          <p className="text-xl">
            Our platform goes beyond memorization, offering flexible tests that
            prioritize conceptual understanding over perfect matches
          </p>
        </div>
      </div>
      <div className="card lg:card-side max-w-2xl bg-teal-900 p-8 flex my-8">
        <figure className="lg:w-1/2 h-min">
          <img className="object-fit" src={readingImg} alt="Reading"></img>
        </figure>
        <div className="card-body flex-grow p-4 lg:w-1/2">
          <h2 className="card-title">Flexible definitions!</h2>
          <p className="text-xl">
            Using our AI, you can take tests on your definitions and receive
            points if your definition was similar and holds all the same key
            concepts
          </p>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Landing;
