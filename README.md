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
