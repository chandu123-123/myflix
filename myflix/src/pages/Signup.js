import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Background from "../components/Background";
import Header from "../components/Header";
import styled from "styled-components";
import { firebaseAuth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [formvalues, setvalues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const submit = async () => {
    console.log(formvalues);
    const { email, password } = formvalues;
    try {
      if (password === "") {
        return alert("something wrong");
      }
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
     localStorage.setItem("user","signed")
      navigate("/");
    } catch (e) {
      alert("email is wrong");
      console.log(e);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...formvalues, [name]: value });
  };
  const [showpassword, setpassword] = useState(false);
  return (
    <Conatiner showpassword={showpassword}>
      <Background />
      <div className="content">
        <Header login={true} />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies,Shows and Series</h1>
            <h4>Watch everything from anywhere</h4>
            <h6>Ready to see ? just Enter Email and password to create</h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formvalues.email}
              onChange={handleInputChange}
            />
            {showpassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formvalues.password}
                onChange={handleInputChange}
              />
            )}
            {!showpassword && (
              <button
                onClick={() => {
                  setpassword(true);
                }}
              >
                Get started
              </button>
            )}
          </div>
          <button onClick={submit}>Sign up</button>
        </div>
      </div>
    </Conatiner>
  );
}
const Conatiner = styled.div`
  justify-content-center;
   position:relative;
   .content{
    position:absolute;
    top:0;
    left:0
    height:100vh;
    width:100vw;
    display:grid;
    grid-template-rows:15vh 85vh;
    .body{
      gap:2rem
    }
    .text{
      gap:20px;
      font-size:2rem;
      text-align:center;
    }
    .form{
   
      display:grid;
      grid-template-columns: ${({ showpassword }) =>
        showpassword ? "1fr 1fr" : "2fr 1fr"};
      width:60%;
    
      input{
        @media (max-width:768px){
          position:relative;
          left:-20px;
        
        }
       padding:20px 
      }
      button{
        @media (max-width:768px){
          position:relative;
          left:-20px;
        
        }
        background-color:red;
        color:white;
     
        border-radius:5px;
        border:none;
        cursor:pointer;
        font-weight:bolder;
        font-size:20px;
      
      }
    }
    button{
     padding:10px;
      background-color:red;
      color:white;
   
      border-radius:5px;
      border:none;
      cursor:pointer;
      font-weight:bold
    }
  }
  
`;
