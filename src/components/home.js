import React, { useEffect, useState } from "react";
import { Envelope, Facebook } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
// import Nothing from "./nothing";
import Spinner from "./spinner";
// import ReactGA from "react-ga";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";
// import { nasaphoto } from "./assets/images";

function Home() {
  const [photoData, setphotoData] = useState(null);
  const [showExpla, setshowExpla] = useState(false);

  logEvent(analytics, 'screen_view', {
    firebase_screen: "Fredastro_Home",
    firebase_screen_class: "Home"
  });

  function show() {
    setshowExpla(!showExpla);
    logEvent(analytics, "show_description");

  }

  useEffect(() => {
    fetchphoto();

    async function fetchphoto() {

      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}`
      );

      const data = await res.json();
      setphotoData(data);
    }

  }, []);


  return (
    <div className="app_container">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            996fredastro
          </Link>
          {/* <button
            className="btn"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Register an account"
            onClick={() => logEvent(analytics, "Login_button")}
          >
            <Person size={30} color="white" />
          </button> */}
        </div>
      </nav>
      {
        !photoData ? <Spinner /> :
          <div className="main">
            {/* <div className="sub_main"> */}
            <div className="h1 py-3">{photoData.title}</div>

            <div className="date">{photoData.date}</div>

            {photoData.media_type === "image" ? (
              <div>
                <img
                  className="t_photo"
                  src={photoData?.url}
                  alt={photoData.title}
                />
              </div>
            ) : (
              <iframe
                src={photoData.url}
                title="space video"
                allow="encrypted-media"
                allowFullScreen
                className="t_vid"
              />
            )}

            {showExpla ? (
              <div className="expla_c">
                <h4 style={{ textDecoration: "underline", paddingTop: "20px" }}>Explanation</h4>
                <div className="expla">
                  {photoData.explanation}
                </div>
              </div>
            ) : (
              <button className="btn_show"
                type="button"
                onClick={show}
              >
                Show Description
              </button>
            )}
          </div>
      }
      <div className="footer">
        <div className="h4">CONTACT ME:</div>
        <address>
          <div className="mb-2">
            <Facebook size={20} />
            <a
              href="https://web.facebook.com/profile.php?id=100075049373085"
              target="_blank"
              rel="noreferrer"
              style={{ padding: "0 10px" }}
            >
              Fred Erick
            </a>
          </div>
          <div>
            <Envelope size={20} />
            <a
              href="mailto:996frederick@gmail.com"
              style={{ padding: "0 10px" }}
            >
              996frederick@gmail.com
            </a>
          </div>
        </address>
      </div>
    </div>
  );
}

export default Home;
