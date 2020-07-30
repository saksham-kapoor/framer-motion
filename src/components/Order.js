import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  initialState: {
    x: "100vw",
    opacity: 0,
  },
  finalState: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
};

const ChildVariants = {
  initialState: {
    opacity: 0,
  },
  finalState: {
    opacity: 1,
  },
};

const Order = ({ pizza }) => {
  return (
    <motion.div
      className='container order'
      variants={containerVariants}
      initial='initialState'
      animate='finalState'
    >
      <h2>Thank you for your order!</h2>
      <motion.p variants={ChildVariants}>
        You ordered a {pizza.base} pizza with:
      </motion.p>
      {pizza.toppings.map((topping) => (
        <motion.div variants={ChildVariants}>
          <div key={topping}>{topping}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Order;
