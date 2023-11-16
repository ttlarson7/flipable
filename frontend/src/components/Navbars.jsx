// a component which will conditionally render our Navbar as to not require 3 different components
import { Link } from "react-router-dom";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FaPlus } from "react-icons/fa";

const Navbars = ({ page }) => {
  if (page === "landing") {
    return (
      <>
        <SignedIn>
          <div className="navbar glass top-0 fixed z-50 bg-transparent">
            <div className="flex-1">
              <Link to="/" className="btn btn-ghost text-xl text-white">
                Quizify
              </Link>
            </div>
            <div className="flex-2 mr-2">
              <UserButton />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="navbar glass top-0 fixed z-50 bg-transparent">
            <div className="flex-1">
              <Link to="/" className="btn btn-ghost text-xl text-white">
                Quizify
              </Link>
            </div>
            <div className="flex-2">
              <Link to="/sign-in/*" className="btn btn-ghost text-white mr-2">
                Sign In
              </Link>
            </div>
          </div>
        </SignedOut>
      </>
    );
  }


  // const handleAddDeck = () => {

  // }

  if (page == "flashcards") {
    return (
      <div className="navbar glass top-0 fixed z-50 bg-transparent text-white">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Quizify
          </Link>
          <button className="btn btn-ghost ml-2">
            <FaPlus />Add
          </button>
        </div>
        <div className="flex-2 mr-2">
          <UserButton />
        </div>
      </div>
    );
  }
};

export default Navbars;
