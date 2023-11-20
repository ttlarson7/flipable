/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
// import graduation from "../assets/undraw_graduation_re_gthn.svg";
// import reading from "../assets/undraw_exams_re_4ios.svg";
import about from "../assets/undraw_moonlight_-5-ksn.svg";
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
        className="hero min-h-screen"
        style={{
          backgroundImage:
            `url(${about})`,
        }}
      >
        <div className="hero-overlay bg-opacity-0"></div>
        <div className="hero-content text-center text-gray-300">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Learn More About Quizify!</h1>
            <p className="mb-5">
              
            </p>
            <Link to='/about-us' className="btn btn-primary">Learn more</Link>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Landing;
