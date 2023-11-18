import { Link } from "react-router-dom";

const Deckcard = ({ i, title, desc, category }) => {
  return (
    <li className="card w-96 bg-base-100 shadow-xl flex flex-col">
      <Link to={i}>
        <div className="card-body">
          <h2 className="card-title self-center">{title}</h2>
          <p className="badge badge-primary badge-outline self-center">{category}</p>
          <p className="self-center">{desc}</p>
        </div>
      </Link>
    </li>
  );
};

export default Deckcard;
