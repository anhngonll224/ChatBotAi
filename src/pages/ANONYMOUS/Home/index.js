import React from "react";
import { HomeStyled } from "./styled";
import ImgHome from "src/assets/images/ImgHome/anhHome.png"; 

function Dashboard() {
  return (
    <HomeStyled>
      <img src={ImgHome} alt="Home Image" /> 
    </HomeStyled>
  );
}

export default Dashboard;