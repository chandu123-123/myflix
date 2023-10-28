import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generateMovies, getGenres } from "../store/Index";

import styled from "styled-components";

export default function Movies() {
  const navigate = useNavigate();

  const [isscrolled, setisscrolled] = useState(false);
  window.onscroll = () => {
    setisscrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const movies = useSelector((state) => state.myflix.movies);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
    dispatch(generateMovies());
  }, []);

  return (
    <Container>
      <div>
        <Navbar></Navbar>
      </div>

      <div className="head">
        <Slider movies={movies} className="Slider"></Slider>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .head {
    position: relative;
    top: 100px;
  }
  @media (max-width: 768px) {
    .head {
      position: relative;
      top: 200px;
    }
  }
`;
