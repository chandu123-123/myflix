import React from "react";
import styled from "styled-components";
import Vid from "../assets/hungry.mp4";
import { BsArrowLeftSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export default function Player() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="vid">
        <BsArrowLeftSquare
          className="sym"


          onClick={() => {
            navigate(-1);
          }}
        />

        <video src={Vid} autoPlay controls></video>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .vid {
    svg {
      width: 20px;
      size: 100px;
      font-size: 3rem;
    }
    .sym {
      position: absolute;
      z-index: 10;
      left: 20px;
      top: 20px;
    }
    video {
      height: 100vh;
      width: 100vw;
    }
  }
`;
