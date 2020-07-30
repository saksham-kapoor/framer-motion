# Framer Motion (Animation Library) Notes

All you need to know to get started with Framer Motion.

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

## Keyframes

Keyframes are very similar to css keyframes.

Simple Example -

```js
const buttonVariants = {
  hoverStateName: {
    scale: [1, 1.1, 1, 1.1, 1, 1.1, 1, 1.1, 1],
  },
};

<motion.button variants={buttonVariants} whileHover='hoverStateName'>
  Click Me!
</motion.button>;
```

The array here signifies the keyframes. on hovering the button, it scales from 1 to 1.1 then back to 1 and so on until it reaches the end of array.

This is not a recommended approach to 'repeating animations'.

## Repeating Animations

For Repeating animations we use a transition property called 'yoyo', it is used to repeat the animations over and over.

Let's take the previous example and add 'yoyo' to it.

```js
const buttonVariants = {
  hoverStateName: {
    scale: 1.1,
    transition: {
      duration: 0.25,
      yoyo: 10,
    },
  },
};

<motion.button variants={buttonVariants} whileHover='hoverStateName'>
  Click Me!
</motion.button>;
```

Here the value 10 assigned to the yoyo property signifies the number of keyframes.
In this example, animation is repeated for 10 keyframes alternating from actual state to hover state.

To repeat an animation indefinitely use -

```js
yoyo: Infinity,
```

## Animate Presence

Used to animate components out of the DOM.
Mainly used to animate routes.

Let's see how to unmount a button with a cool transition

Firstly import AnimatePresence -

```js
import { motion, AnimatePresence } from "framer-motion";
```

Now, write a logic such that the button unmounts after 4s of the page load.

```js
const [showBtn, setShowBtn] = useState(true);
setTimeout(() => {
  setShowTitle(false);
}, 4000);
```

and now the button should look like -

```js
{
  showTitle && <button>Click Me!</button>;
}
```

Now the button unmounts after 4 seconds.
Now Add AnimatePresence. The final markup should look like -

```js
<AnimatePresence>
  {showTitle && <motion.button exit={{ y: -1000 }}>Click Me!</motion.button>}
</AnimatePresence>
```

AnimatePresence captures the element that is supposed to unmount. Then it checks for the 'exit' attribute on that element and that is how we achieve the cool transition.

Note - button should now be of motion.button type.

## Animating Routes

To Animate page transitions when the route changes, we use Animate Presence as discussed before.
To animate routes in react we have to wrap the 'Switch' component in App.js by 'AnimatePresence'.
However, there is no way that AnimatePresence can itself judge when a page unmounts on route change.

For this, we have to use the useLocation hook provided by the react router.

```js
import { Route, Switch, useLocation } from "react-router-dom";

// in the component declare a location variable
const location = useLocation();
// then pass location to the Switch component.
<Switch location={location} key={location.key}>
  //routes
</Switch>;
```

This arrangment will let AnimatePresence know that a route change has taken place and it will look for the exit attribute to animate the element before it unmounts.
Now, add exit attributes to the different pages and you're good to go.

Note - Sometimes the new page comes in before the exit transition has finished for the previous page. To avoid this do the following -

```js
<AnimatePresence exitBeforeEnter>
//rest of the code is as it is
```

This 'exitBeforeEnter' property ensures that the new page mounts only after the previous page transition is over.

## [WIP]
