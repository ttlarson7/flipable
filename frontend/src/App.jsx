import Footer from "./components/Footer"
import Navbars from "./components/Navbars"
import './index.css'

const App = () => {
  return (
    <>
      <Navbars page={"landing"}></Navbars>
      <div className="min-h-screen bg-primary-content"></div>
      <Footer></Footer>
    </>
  )
}

export default App;