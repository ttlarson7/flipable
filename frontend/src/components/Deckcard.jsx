import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useUser } from "@clerk/clerk-react"

const Deckcard = ({ i, title, desc, category, onDelete, deckPrivate }) => {
  const { user } = useUser();
  const userId = user?.id.toString();

  const togglePrivate = () => {
    setIsPrivate(!isPrivate)
    axios.post("/updatePrivate", {
      deckNum: i,
      userId: userId
    })
  }

  const [isPrivate, setIsPrivate] = useState(deckPrivate);

  return (
    <li className="card card-bordered border-primary bg-base-100 shadow-xl flex flex-col">
      <Link to={i}>
        <div className="card-body">
          <h2 className="card-title self-center text-center">{title}</h2>
          <p className="badge badge-primary badge-outline self-center text-center">
            {category}
          </p>
          <p className="self-center text-center">{desc}</p>
        </div>
      </Link>
      <div className="flex justify-center">
        <button
          className="btn btn-error rounded m-2 p-2"
          onClick={() => onDelete(i)}
        >
          Delete
        </button>
        <div className="form-control self-center ml-6">
          <span className="label-text self-center">Private:</span>
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-warning"
              checked={isPrivate}
              onChange={togglePrivate}
            />
          </label>
        </div>
      </div>
    </li>
  );
};

export default Deckcard;
