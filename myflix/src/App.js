import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Myflix from "./pages/Myflix";
import Player from "./pages/Player";
import Movies from "./components/Movies"
import Userlikedmovies from "./pages/Userlikedmovies";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup></Signup>} />
          <Route exact path="/player" element={<Player/>}></Route>
          <Route exact path="/" element={<Myflix></Myflix>}></Route>
          <Route exact path="/movies" element={<Movies></Movies>}></Route>
          <Route exact path="/mylist" element={<Userlikedmovies></Userlikedmovies>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
