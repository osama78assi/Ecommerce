import React, { useState } from "react";
import Goals from "../components/home/Goals";
import HeaderSlider from "../components/home/HeaderSlider";
import Store from "../components/home/Store";

function Home () {

  return (
    <div>
      {/* <CategoryList/> */}
      {/* <BannerProduct/>
       */}
      {/* <HeaderSlider /> */}
      <Goals />
      <Store />
    </div>
  );
};

export default Home;
