import "../assets/styles/main.css";
import { Application } from "./application";

const app = new Application();
window.onload = app.boot();
