import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { app } from "./firebase";
import { initializeAnalytics } from "firebase/analytics";

function App() {
  useEffect(() => {
    initializeAnalytics(app)

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
