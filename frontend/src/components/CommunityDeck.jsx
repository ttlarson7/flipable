import { Link } from "react-router-dom";

const CommunityDeck = ({ i, title, desc, category }) => {
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
    </li>
  );
};

export default CommunityDeck;
