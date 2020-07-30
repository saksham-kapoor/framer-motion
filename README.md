# Framer Motion Notes

## Animating An Element

Let element be a button:

```html
<button>Click Me!</button>
```

To simply animate it, import framer motion, then apply it the button like so

```js
import { motion } from "framer-motion";

<motion.button animate={{ fontSize: 50 }}>Click Me!</motion.button>;
```

The button will automatically animate to a font-size of 50px on page load.

## Adding Initial State For Animations

Consider the previous animation, we set the font-size of the button to 50px from it's original size.
We can also assign it an initial state like so

```js
<motion.button initial={{ fontSize: 0 }} animate={{ fontSize: 50 }}>
  Click Me!
</motion.button>
```

It means that now the font-size of button will increase from 0 to 50px on page load.

## Transition Attribute

We can set various other properties like duration, type, etc. using the 'transition' attribute.

We have three types of animations -

- tween
- inertia
- spring

Different animations may have different default depending on the properties being animated.

Type 'spring' has another property associated with it called 'stiffness'.
Higher the value, more spring-y is the animation. Default value - somewhere around 100.

Example -

```jsx
<motion.button
  initial={{ x: 100 }}
  animate={{ x: 0 }}
  transition={{ type: "spring", stiffness: 120 }}
>
  Click Me!
</motion.button>
```

Tween is used for more uniform transitions, however it supports easing functions as well.

## Hover Animations

We can trigger animations on hover using the whileHover attribute.

Example -

```js
<motion.button
  whileHover={{
    scale: 1.1,
    boxShadow: "0px 0px 8px rgb(255,255,255)",
  }}
>
  Click Here!
</motion.button>
```

## Variants

We use variants as they allow us to do useful things like -

- Allows us to extract our initial, animate, transition attributes to an external object which we can then reference. This helps us keep our code clean.
- Allow us to propagate changes through the DOM.
- Allow us to create timing relationships between parent and children motions using transition orchestration properties.

#### Basic Usage

```js
const variantName = {
  initialStateName: {
    x: 100,
  },
  finalStateName: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

<motion.button
  variants={variantName}
  initial='initialStateName'
  animate='finalStateName'
>
  Click Me!
</motion.button>;
```

Notice that the transition attribute is not defined in the 'finalStateName'.
'variantName', 'InitialStateName', 'finalStateName' are all arbitrary names, feel free to name as you wish.

### Child can inherit property names from parent

```js
const variantDiv = {
  initialStateName: {
    opacity: 0,
  },
  finalStateName: {
    opacity: 1,
  },
};

const variantButton = {
  initialStateName: {
    x: 100,
  },
  finalStateName: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

<motion.div
  variants={variantDiv}
  initial='initialStateName'
  animate='finalStateName'
>
  <motion.button variants={variantButton}>Click Me!</motion.button>;
</motion.div>;
```

Notice that we have removed 'initial' and 'animate' attributes from the child component as they have the same name as the parent component.

If they had different names, then this approach would not work and we would have to define those attributes as well.

### Parent-Child relationship using orchestration properties

Example -

```js
const parentVariant = {
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

const childVariant = {
  initialState: {
    opacity: 0,
  },
  finalState: {
    opacity: 1,
  },
};

<motion.div
  variants={parentVariant}
  initial='initialState'
  animate='finalState'
>
  <motion.p variants={ChildVariant}>This is a paragraph.</motion.p>
  <motion.button variants={ChildVariant}>Click Me!</motion.button>
</motion.div>;
```

'When' tells us when the animation should occur.
'staggerChildren' tells us the time gap between each successive child animation.

Notice that these have to be added in the transition object.
