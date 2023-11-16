import Navbars from "../components/Navbars";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="bg-neutral">
      <Navbars page={"landing"}></Navbars>
      <div className="pt-16"></div>
      <div className="min-h-screen"></div>
      <Footer></Footer>
    </div>
  );
};

export default Landing;
