// import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactGa from "react-ga";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    ReactGa.initialize(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID);

    ReactGa.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
