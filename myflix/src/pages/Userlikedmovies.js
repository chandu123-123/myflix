import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getlikedmovies } from "../store/Index";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
export default function Userlikedmovies() {
  const navigate = useNavigate();
  const [email, setemail] = useState(undefined);
  const [isscrolled, setisscrolled] = useState(false);
  window.onscroll = () => {
    setisscrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const movies = useSelector((state) => state.myflix.movies);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  onAuthStateChanged(firebaseAuth, (currentuser) => {
    if (currentuser) {
      setemail(currentuser.email);
      console.log(email);
    } else {
      navigate("/login");
    }
  });
  useEffect(() => {
    dispatch(getlikedmovies(email));
  }, [email]);

  return (
    <div>
       
      <h1>liked movies</h1>

      <div className="cards">
        {movies.map((movie) => {
          return <Card key={movie.id} movie={movie} email={email}></Card>;
        })}
      </div>
    </div>
  );
}
