import "./style.css";
import { TypeWriter } from "./TypeWriter";
const typeWriter = new TypeWriter(document.body, { loop: true });

typeWriter
  .typeString("Where do I start?")
  .pauseFor(1000)
  .typeString("\n\nfunctio")
  .deleteChars(10)
  .typeString("Const temp")
  .pauseFor(10)
  .deleteAll(10)
  .typeString("Why is this so hard")
  .pauseFor(1000)
  .typeString("\n\nDoes everyone struggle this much?")
  .pauseFor(1000)
  .typeString("\n\nThere has to be an easier way")
  .pauseFor(1000)
  .deleteAll(10)
  .start();
