import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios"
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";

const Community = () => {
  const [CommunityDecks, setCommunityDecks] = useState([]);
  // const []
  const [loading, setLoading] = useState(true);
  const user = useUser().user;
  const user_id = user?.id.toString();
  const user_name = user.username;
  let ran = false;

  useEffect(() => {
    if (!ran) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ran = true;
      setLoading(true);
      axios
        .get("/getDecks", {
          params: {
            userId: user_id,
          },
        })
        .then((res) => {
          setCommunityDecks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [setCommunityDecks]);

  if (loading) {
    return (
      <div className="bg-neutral">
        <Navbars
          page="decks"
        ></Navbars>
        <div className="min-h-screen flex justify-center">
          <span className="loading loading-infinity loading-lg self-center"></span>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <>
      <Navbars></Navbars>
      
      <Footer></Footer>
    </>
  );
};

export default Community;
