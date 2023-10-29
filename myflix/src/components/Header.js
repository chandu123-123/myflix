import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
export default function Header(props) {
    const navigate=useNavigate()
  return (
    <Container className='flex a-center j-between'>
       <div className="logo">
        <img src={logo} alt="logo" />
       </div>
       <button onClick={()=>{navigate(props.login?"/login":"/signup")}}>{props.login?"Log In":"Sign Up"}</button>
    </Container>
  )
}
const Container=styled.div`
.logo{
    img{height:85px;
    width:auto:
    }
}
button{
    background-color:red;
    color:white;
    padding:0.5rem 1rem;
    border-radius:5px;
    border:none;
    cursor:pointer;
    font-weight:bolder;
    font-size:1.05rem;
    margin-right:10px;
}
`;