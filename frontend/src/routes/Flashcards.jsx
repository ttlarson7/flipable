import Footer from "../components/Footer";
import Navbars from "../components/Navbars";

const Flashcards = () => {



  return (
    <div className="bg-neutral">
      <Navbars page="flashcards"></Navbars>
      <div className=" min-h-screen">
        <ul className = "grid lg:grid-cols-3 sm:grid-cols-2 gap-4 m-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Deck</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </ul>
      
      </div>
      
      <Footer></Footer>
    </div>
  );
};

export default Flashcards;
