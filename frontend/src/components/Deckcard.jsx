import { Link } from "react-router-dom";

const Deckcard = ({ i, title, desc, category }) => {
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
          className="m-2 p-2 py-4 btn btn-neutral rounded"
          onClick={() => console.log("Edit clicked")}
        >
          Edit
        </button>

        <button
          className="btn btn-error rounded m-2 p-2"
          onClick={() => console.log("delete")}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Deckcard;
