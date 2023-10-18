import { useEffect, useState } from "react";
import "./ActivityList.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ActivityCard from "../pages/ActivityCard.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import jwt_decode from "jwt-decode";

function ActivityList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getDataFromAPI();
    // currentUser(userID);
  }, []);

  const VURI = "https://infinityfitbackenddev.onrender.com";
  const FURI = "https://infinity-fit-backend.onrender.com";

  const getDataFromAPI = async () => {
    await axios
      .get(VURI + "/activities")
      .catch((err) => {
        console.log("Error", err);
      })
      .then((res) => {
        console.log("Success", res.data);
        setCards(res.data);
        // console.log(cards);
      });
  };

  let idtoken = localStorage.getItem("token")
  console.log(idtoken);
  if (idtoken) {
    const decoded = jwt_decode(idtoken);
    const userID = decoded.user.userID;
    var userEmail = decoded.user.userEmail
    console.log(userEmail);
  }

  const currentUser = async (userID) =>
    await axios
      .get("https://infinityfitbackenddev.onrender.com/users/" + userID)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.userActivities);
        setCards(res.data.userActivities);
      })
      .catch((err) => {
        console.log(err);
      });

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    const idtoken = localStorage.clear();
  };

  return (
    <>
      <section className="box-border bg-[#F0F8FF]">
        <div className="container w-full max-w-screen-xl m-auto ">
          <h1 className="text-5xl ">Exercise List of {userEmail}</h1>
          <div className="grid flex-wrap justify-between grid-cols-4 gap-3 mt-3 cards">
            {cards.map((card) => (
              <Link to={`/activities/${card._id}`} key={card._id}>
                <div className="flex flex-row flex-shrink-0 w-full p-3 card bg-blue-950 flex-0 flex-basis-calc max-w-calc">
                  <div className="text-4xl font-black text-white date_Exercise">
                    {/* <h2>{card.date}</h2> */}
                  </div>

                  <div
                    div
                    className="m-3 font-semibold text-white information text"
                  >
                    <h3>{card.type}</h3>
                    <h3>{card.name}</h3>
                    <h5>{card.duration}</h5>

                    <div className="m-2 trigger"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link to={`/activity-card`} className="btn btn-outline btn-primary">
          Edit
        </Link>
        <Link to={`/register`} className="btn btn-outline btn-primary">
          Register
        </Link>
        <Link to={`/login`} className="btn btn-outline btn-primary">
          Login
        </Link>
        <Link onClick={logout} className="btn btn-outline btn-primary">
          Logout
        </Link>
      </section>
    </>
  );
}

export default ActivityList;
