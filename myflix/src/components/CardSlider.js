import React from "react";
import Card from "./Card";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
export default function CardSlider(props) {

  const title = props.title;
  const data = props.data;


  return (

    <Container>
        <h1 className="title">{title}</h1>
     
      <div className="cards">
       
        {data.map((movie) => {
          return <Card key={movie.id} movie={movie} email={props.email}></Card>;
        })}
      
      </div>
    
    </Container>
  );
}
const Container = styled.div`

.cards{
  display: flex;
  
  margin:5px;
}
.title{
    padding:20px;
}
  `;
