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
