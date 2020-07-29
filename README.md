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

```js
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

### [WIP]
