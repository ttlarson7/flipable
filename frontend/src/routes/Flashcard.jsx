const Flashcard = ({ term, definition }) => {

  return (
    <li>
      <label className="swap swap-flip text-9xl ">
        <input type="checkbox" />
        <div className="card items-center text-center swap-off bg-base-100 h-32 flex justify-center border border-primary">
          <div className = "bg-primary border border-primary rounded">
            <p className="card-title text-base-100 font-bold text-2xl ml-3 mr-3 mb-1 ">{term}</p>
          </div>
        </div>
        <div className="card items-center text-center swap-on bg-base-100 h-32 flex justify-center border border-primary overflow-auto">
          <div className = "max-w-full pt-6">
            <p className="text-2xl m-4 whitespace-normal break-words">{definition}</p>
          </div>
        </div>
      </label>
    </li>
  );
};

export default Flashcard;
