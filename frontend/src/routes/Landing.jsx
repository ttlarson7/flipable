import { Link } from "react-router-dom";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import graduation from "../assets/undraw_graduation_re_gthn.svg";
import studying from "../assets/undraw_studying_re_deca.svg";
import reading from "../assets/undraw_exams_re_4ios.svg";
import rocket from "../assets/undraw_to_the_stars_re_wq2x.svg";
import location from "../assets/undraw_best_place_re_lne9.svg";
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
                  2000, // wait 1s before replacing "Mice" with "Hamsters"
                  "Truly understand the content",
                  2000,
                  "Better than memorization",
                  2000,
                  "Flexible Definitions",
                  2000,
                ]}
                wrapper="span"
                speed={40}
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

      <div
        className="hero min-h-screen bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url(${studying})`,
        }}
      />

      <div className="hero-content text-center bg-teal-900 bg-opacity-80 text-base-100 rounded-2xl mt-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold">What Do We Offer?</h1>
        </div>
      </div>

      <div className="card lg:card-side max-w-2xl bg-teal-900 py-12 flex text-gray-300 mt-16">
        <figure className="lg:w-1/2 h-min ml-4">
          <img className="object-fit" src={learningImg} alt="Learning"></img>
        </figure>
        <div className="card-body flex-grow lg:p-4 lg:w-1/2">
          <h2 className="card-title">Optimize your learning!</h2>
          <p className="text-xl">
            Our platform goes beyond memorization, offering flexible tests that
            prioritize conceptual understanding over perfect matches
          </p>
        </div>
      </div>
      <div className="card lg:card-side max-w-2xl bg-teal-900 p-8 flex mt-8 text-gray-300">
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
      <div className="card lg:card-side max-w-2xl bg-teal-900 p-8 flex mt-8 text-gray-300">
        <figure className="lg:w-1/2 h-min">
          <img className="object-fit" src={location} alt="Reading"></img>
        </figure>
        <div className="card-body flex-grow p-4 lg:w-1/2">
          <h2 className="card-title">Your One Location!</h2>
          <p className="text-xl">
            Quizify if your one location for everything studying! Take tests,
            practice with your flashcards, take it on the go and access from
            anywhere!
          </p>
        </div>
      </div>

      <div className="card lg:card-side max-w-2xl bg-teal-900 p-8 flex mt-8 mb-20 text-gray-300">
        <figure className="lg:w-1/2 h-min">
          <img className="object-fit" src={rocket} alt="Reading"></img>
        </figure>
        <div className="card-body flex-grow p-4 lg:w-1/2">
          <h2 className="card-title">An Expanse Waiting For You!</h2>
          <p className="text-xl">
            Explore all the possibilities Quizify gives you! There's an endless
            amount of pratice to be had, we can't wait to see you explore it
            all!
          </p>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Landing;
