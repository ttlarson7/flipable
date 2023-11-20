/* eslint-disable react/no-unescaped-entities */
import Footer from "../components/Footer";
import Navbars from "../components/Navbars";
import studying from "../assets/undraw_studying_re_deca.svg";
import rocket from "../assets/undraw_to_the_stars_re_wq2x.svg";
import location from "../assets/undraw_best_place_re_lne9.svg";
import learningImg from "../assets/undraw_notebook_re_id0r.svg";
import readingImg from "../assets/undraw_reading_re_29f8.svg";

const AboutUs = () => {
  return (
    <>
      <Navbars page="landing"></Navbars>
      <div className="mt-16"></div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold">About Us</h1>
            <p className="py-6 text-2xl">
              Our decision to develop Quizify, an open-source flashcard
              application with adaptable testing features, stemmed from a
              collective passion for enhancing the learning experience for
              students. <br></br>
              <br></br>Recognizing the importance of comprehension in education,
              we sought to create a tool that goes beyond traditional flashcards
              by offering flexible testing methods. Our goal is to empower
              students at Oregon State University and beyond to gain a deeper
              understanding of their subjects through interactive and
              personalized assessments.
            </p>
          </div>
          <img
            src={studying}
            className="h-96 w-96"
            alt="Studying illustration"
          />
        </div>
      </div>
      <div className="container mx-auto text-center max-w-2xl">
        <div className="hero-content text-center bg-teal-900 bg-opacity-80 text-gray-300 rounded-2xl">
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
              Our platform goes beyond memorization, offering flexible tests
              that prioritize conceptual understanding over perfect matches
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
              Explore all the possibilities Quizify gives you! There's an
              endless amount of pratice to be had, we can't wait to see you
              explore it all!
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AboutUs;
