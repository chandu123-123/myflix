import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import movie from "../assets/homeTitle.webp";
import background from "../assets/home.jpg";
import Login from "./Login";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { generateMovies, getGenres } from "../store/Index";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import Slider from '../components/Slider'
export default function Myflix() {
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
    <StyledButton isHovered={isHovered}>
      <Navbar isscrolled={isscrolled} />
      <div>
        <div className="bg">
          <img src={background} alt="" />
        </div>
        <div className="title">
          <img src={movie} alt="hghgh" />
        </div>
        <button
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            navigate("/player");
          }}
        >
          <FaPlay /> Play Now
        </button>
      </div>
      <Slider movies={movies}></Slider>
    </StyledButton>
  );
}

const StyledButton = styled.div`

  div{
  
    .bg{
      img{
        height:100vh;
        width:100vw;
      @media (max-width: 768px) {
        height:60vh;
        width:100vw;
       

      }
    }
    }
   
  
    .title img {
      position: absolute;
      top: 300px;
      left: 100px;
      
      @media (max-width: 768px) {
        position: absolute;
        top: 200px;
        left: 80px;
        width: 400px;
      }
    }
  

  button {
    position:absolute;
    top:600px;
    border-radius:4px;
    left:100px;
    height: 40px;
    width: 100px;
    transition: transform 0.2s;
    transform: ${(props) => (props.isHovered ? "scale(1.1)" : "scale(1)")};
    filter: ${(props) =>
      props.isHovered ? "brightness(100%)" : "brightness(70%)"};

    @media (max-width: 768px) {
      position:absolute;
      top:380px;
      left:220px;
      width: 90px;
      border-radius:4px;
      height: 40px;
      font-size: 14px;
      transition: transform 0.2s;
      transform: ${(props) => (props.isHovered ? "scale(1.1)" : "scale(1)")};
      filter: ${(props) =>
        props.isHovered ? "brightness(100%)" : "brightness(70%)"};
    }
  }
`;
