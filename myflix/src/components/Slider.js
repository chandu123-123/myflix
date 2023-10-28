import React, { useEffect, useState } from 'react';
import CardSlider from './CardSlider';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase';
import { Navigate } from 'react-router-dom';
export default function Slider(props) {
    const movies = props.movies;
   const moviess=(from, to)=>{
     return movies.slice(from,to)
   }
  
   const [email,setemail]=useState("ramu@gmail.com")
   useEffect(()=>{
     onAuthStateChanged(firebaseAuth,(currentuser)=>{
       console.log("auth")
       if(currentuser)
         setemail(currentuser.email)
       else{
         Navigate("/login")
       }
      })
   },[])
    return (
        <div>
          <CardSlider title="Trending" data={moviess(0,10)} email={email}></CardSlider>
          <CardSlider title="Blockbuster" data={moviess(20,30)} email={email}></CardSlider>
          <CardSlider title="Entertaining" data={moviess(10,20)} email={email}></CardSlider>
          <CardSlider title="Horror" data={moviess(30,40)} email={email}></CardSlider>
          <CardSlider title="Actions" data={moviess(40,50)} email={email}></CardSlider>
        </div>
    );
}
