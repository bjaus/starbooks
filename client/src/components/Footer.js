import React from "react";
import "./component.css";

const Footer = () => {
  return (
    <footer className="text-white p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} StarBooks
    </footer>
  );
};

export default Footer;
