// Card.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Player from "../pages/Player"; // Import the Player component or use a video URL
import vid from "../assets/hungry.mp4";
import { RiThumbUpFill,RiThumbDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";
import { current } from "@reduxjs/toolkit";
import axios from "axios"
export default function Card(props) {
  const [hover, setHover] = useState(false);
  const [startPlaying, setStartPlaying] = useState(false);
  const [isclicked, setClick] = useState(false);
  const [clicked, setClic] = useState(false);
  const navigate = useNavigate();
  // Function to start playing the video after a delay
  const playVideo = () => {
    setStartPlaying(true);
  };

  // Function to stop playing the video
  const stopVideo = () => {
    setStartPlaying(false);
  };

  const handle = () => {
   console.log("handles")
    setClick(!isclicked);
  };
  const handl = () => {
   
    setClic(!clicked);
  };



const email=props.email
  const addtolist=async ()=>{
    console.log("axios")
    try{
      console.log(email)
        const response=await axios.post("http://localhost:5000/api/user/add",{email,data:props.movie})
        
    }
    catch(err){
      console.log(err)
    }
  }
  return (

    <Container hover={hover} isclicked={isclicked} clicked={clicked}>
      {hover ? (
        <div
          onMouseEnter={() => {
            setHover(true);
            setTimeout(playVideo, 1000); // Start playing after 1 second
          }}
          onMouseLeave={() => {
            setHover(false);
            stopVideo();
          }}
        >
          {startPlaying ? (
            <div>
              <div >
                <video width="300" height="300" autoPlay loop muted onClick={()=>{navigate("/player")}} >
                  <source src={vid} type="video/mp4" />
                </video>
                <div>
                  <h1 style={{fontSize:"20px"}}>{props.movie.title}</h1>
                </div>
                <div className="sv" >
                <RiThumbUpFill onClick={()=>{handle();addtolist()}}/>
          
              </div>
              </div>
             
            </div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w780${props.movie.posterPath}`}
              alt=""
            />
          )}
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w780${props.movie.posterPath}`}
          alt=""
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 20px;
  position: relative;
  img {
    z-index: 10;
    display: flex;
    height: 200px;
    width: 200px;
    transition: 0.1s ease-in-out;
    transition: transform 0.1s;

    transform: ${(props) => (props.hover ? "scale(1.3)" : "scale(1)")};
  }
  div{
  div {
   
    div {
      .sv{
        z-index:12;
      
      svg {
        z-index: 10000;
        color:${(props) => (props.isclicked ? "red" : "white")};
        width: 30px;
        height: 30px;
        
      }
    }}}
      iframe,
      video {
        z-index: 10;
        display: flex;
        height: 200px;
        width: 200px;
        transition: transform 0.1s;
        transition: 0.1s ease-in-out;
        transform: ${(props) =>
          props.hover ? "scale(1.3);z-index:100" : "scale(1):z-index:20"};
      }
    }
  }
}`;
