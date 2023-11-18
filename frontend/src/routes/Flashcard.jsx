const Flashcard = ({ term, definition }) => {


  // "secondary": "#f6d860",
  //         "accent": "#37cdbe",
  //         "neutral": "#3d4451",
  //         "base-100": "#ffffff",
  return (
    <li>
      <label className="swap swap-flip text-9xl ">
        <input type="checkbox" />
        <div className="card items-center text-center swap-off bg-base-100 h-32 flex justify-center">
          <div className = "bg-transparent border border-accent rounded">
            <p className="card-title text-accent font-bold text-2xl ml-3 mr-3 mb-1 ">{term}</p>
          </div>
        </div>
        <div className="card items-center text-center swap-on bg-base-100 h-32 flex justify-center overflow-auto">
          <div className = "max-w-full pt-6">
            <p className="text-2xl m-4 whitespace-normal break-words text-accent">{definition}</p>
          </div>
        </div>
      </label>
    </li>
  );
};

export default Flashcard;
