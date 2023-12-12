/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
// import graduation from "../assets/undraw_graduation_re_gthn.svg";
// import reading from "../assets/undraw_exams_re_4ios.svg";
import about from "../assets/undraw_moonlight_-5-ksn.svg";
import { TypeAnimation } from "react-type-animation";
import landingimg from "../assets/undraw_team_work_k-80-m.svg";

const Landing = () => {
  return (
    <div className="flex flex-col items-center bg-neutral">
      <Navbars page={"landing"}></Navbars>
      <div className="mt-16"></div>
      <section>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
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
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Revolutionize learning with our innovative flashcards. Say goodbye
              to pure memorization and embrace true understanding for a more
              effective and enjoyable learning experience!
            </p>
            <Link to="/flashcards" className="btn btn-primary">
              Get Started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={landingimg} alt="studying friends" />
          </div>
        </div>
      </section>
      <div className="carousel carousel-center my-32">
        <div className="carousel-item">
          <img
            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
            alt="Pizza"
          />
        </div>
      </div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${about})`,
        }}
      >
        <div className="hero-overlay bg-opacity-0"></div>
        <div className="hero-content text-center text-gray-300">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Learn More About Quizify!
            </h1>
            <p className="mb-5"></p>
            <Link to="/about-us" className="btn btn-primary">
              Learn more
            </Link>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Landing;
