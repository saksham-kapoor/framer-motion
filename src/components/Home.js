import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "./Loader";

const buttonVariants = {
  hoverState: {
    scale: 1.1,
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.25,
      yoyo: Infinity,
    },
  },
};

const containerVariants = {
  initialState: {
    opacity: 0,
  },
  finalState: {
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: 0.5,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};
const Home = () => {
  return (
    <motion.div
      className='home container'
      variants={containerVariants}
      initial='initialState'
      animate='finalState'
      exit='exit'
    >
      <h2>Welcome to Pizza Joint</h2>
      <Link to='/base'>
        <motion.button variants={buttonVariants} whileHover='hoverState'>
          Create Your Pizza
        </motion.button>
      </Link>
      <Loader />
    </motion.div>
  );
};

export default Home;
