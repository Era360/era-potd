import React, { useEffect, useState } from "react";
import { Envelope, Facebook, Person } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
// import { nasaphoto } from "./assets/images";

function Home() {
  const [photoData, setphotoData] = useState("image");
  const [showExpla, setshowExpla] = useState(false);

  function show() {
    setshowExpla(!showExpla);
  }

  useEffect(() => {
    fetchphoto();

    async function fetchphoto() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}`
      );

      const data = await res.json();
      console.log(data);
      setphotoData(data);
    }
  }, []);

  if (!photoData) return <div />;

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            996fredastro
          </Link>
          {/* <img className="avatar" src={usericon} alt="" /> */}
          <button
            className="btn"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Register an account"
          >
            <Person size={30} color="white" />
          </button>
        </div>
      </nav>
      <div className="main">
        {/* <div className="sub_main"> */}
        <div className="h1 py-3">{photoData.title}</div>

        <div className="date">{photoData.date}</div>

        {photoData.media_type === "image" ? (
          <div>
            <img
              className="t_photo"
              src={photoData.url}
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
            <div className="expla">{`Explanation: ${photoData.explanation}`}</div>
          </div>
        ) : (
          <button className="btn_show" type="button" onClick={show}>
            Show Description
          </button>
        )}
        <div className="footer">
          CONTACT ME on:
          <address>
            <div>
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
    </div>
  );
}

export default Home;
