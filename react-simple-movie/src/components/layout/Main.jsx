import React, { Fragment } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default Main;
