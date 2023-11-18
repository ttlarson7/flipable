const Flashcard = ({ term, definition }) => {
  return (
    <li>
      <label className="swap swap-flip text-9xl">
        <input type="checkbox" />
        <div className="card items-center text-center swap-off bg-base-100 h-24">
          <div>
            <p className="card-title">{term}</p>
          </div>
        </div>
        <div className="card items-center text-center swap-on bg-base-100 h-24">
          <div>
            <p className="text-2xl">{definition}</p>
          </div>
        </div>
      </label>
    </li>
  );
};

export default Flashcard;
