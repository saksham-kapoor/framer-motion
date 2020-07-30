import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showTitle, setShowTitle] = useState(true);
  setTimeout(() => {
    setShowTitle(false);
  }, 4000);
  return (
    <motion.div
      className='container order'
      variants={containerVariants}
      initial='initialState'
      animate='finalState'
    >
      <AnimatePresence>
        {showTitle && (
          <motion.h2 exit={{ y: -1000 }}>Thank you for your order!</motion.h2>
        )}
      </AnimatePresence>

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
