import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./views/main";
import Login from "./views/login";
import Signup from "./views/signup";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element ={<LandingPage/>}></Route>
            <Route path="/login" element ={<Login/>}></Route>
            <Route path="/signup" element ={<Signup/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
