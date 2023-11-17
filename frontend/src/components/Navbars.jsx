// a component which will conditionally render our Navbar as to not require 3 different components
import { Link } from "react-router-dom";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const Navbars = ({ page }) => {
  const [deckName, setDeckName] = useState("");
  const [deckDesc, setDeckDesc] = useState("");

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

  const handleDeckTitle = (e) => {
    setDeckName(e.target.value);
  };

  const handleDeckDesc = (e) => {
    setDeckDesc(e.target.value);
  };

  const handleClose = () => {
    setDeckName("");
    setDeckDesc("");
  };
  const handleAccept = () => {
    //set up axios call to add deck to backend
    setDeckDesc("");
    setDeckName("");
  };

  if (page == "flashcards") {
    return (
      <div className="navbar glass top-0 fixed z-50 bg-transparen">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-white">
            Quizify
          </Link>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-ghost text-white hover:text-white"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <FaPlus />
            Add
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box flex flex-col bg-neutral">
              <h3 className="font-bold text-lg self-center">Add New Deck</h3>
              <input
                value={deckName}
                type="text"
                placeholder="Deck Name"
                className="input input-bordered input-primary w-full max-w-xs self-center  mx-8 my-4"
                onChange={handleDeckTitle}
              />
              <input
                value={deckDesc}
                type="text"
                placeholder="Deck Desc."
                className="input input-bordered input-primary w-full max-w-xs self-center my-2"
                onChange={handleDeckDesc}
              />
              <div className="modal-action flex">
                <form method="dialog" className="flex justify-center w-full">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn mr-8 hover:btn-error text-error font-semibold hover:text-white border border-error hover:border-transparent rounded-lg"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="btn ml-8 hover:btn-primary text-primary font-semibold hover:text-white border border-primary hover:border-transparent rounded-lg "
                    onClick={handleAccept}
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div className="flex-2 mr-2">
          <UserButton />
        </div>
      </div>
    );
  }
};

export default Navbars;
