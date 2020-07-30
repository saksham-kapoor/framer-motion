import React from "react";
import { Link } from "react-router-dom";
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
      delay: 0.5,
    },
  },
};

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

const Toppings = ({ addTopping, pizza }) => {
  let toppings = [
    "mushrooms",
    "peppers",
    "onions",
    "olives",
    "extra cheese",
    "tomatoes",
  ];

  return (
    <motion.div
      className='toppings container'
      variants={containerVariants}
      initial='initialState'
      animate='finalState'
    >
      <h3>Step 2: Choose Toppings</h3>
      <ul>
        {toppings.map((topping) => {
          let spanClass = pizza.toppings.includes(topping) ? "active" : "";
          return (
            <motion.li
              key={topping}
              onClick={() => addTopping(topping)}
              whileHover={{
                scale: 1.3,
                color: "#f8e112",
                originX: 0,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={spanClass}>{topping}</span>
            </motion.li>
          );
        })}
      </ul>

      <Link to='/order'>
        <motion.button variants={buttonVariants} whileHover='hoverState'>
          Order
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Toppings;
