import React from "react";
import HomeNavbar from "./home/HomeNavbar";
import Footer from "./home/Footer";
import Banner from "./home/Banner";
const Layout = ({ children }) => {
  return (
    <>
    <Banner/>
      <HomeNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
