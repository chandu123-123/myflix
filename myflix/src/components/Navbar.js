import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaPowerOff } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import logoo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const Links = [
    { name: "Home", link: "/" },
    { name: "Tv", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) navigate("/login");
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, [navigate]);

  return (
    <NavbarContainer>
      <div className="main">
        <nav className="nav">
          <div className="left">
            <img src={logoo} alt="" />
          </div>
          <div className="right">
            <div>
              <FaSearch style={{color:"red"}}  onClick={()=>{console.log("fsdfsd")}}/>
            </div>
            <FaPowerOff style={{color:"red"}} onClick={() => { signOut(firebaseAuth) }} />
          </div>
        </nav>
        <div className="links">
          <ul>
            {Links.map(({ name, link }) => {
              return (
                <li key={link} className="tex">
                  <Link to={link} style={{ color: "white", textDecoration: "none", lineDecoration: "none" }}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4); /* Transparent background */
  z-index: 10; /* Ensure it's on top of the content */
  /* Your other CSS styling here */
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .left img {
    height: 100px;
    max-width: 100%;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      margin: 10px;
      svg {
        color: red;
        background-color: transparent;
      }
    }
  }
  .links ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    li {
      margin: 0 10px;
      color: white;
      text-decoration: none;
      line-decoration: none;
    }
  }
  @media (min-width: 768px) {
    .main {
      flex-direction: row;
    }
    .nav {
      flex-direction: row;
    }
  }
}`
