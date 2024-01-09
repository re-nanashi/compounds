import { Box, ResetBoxCommand } from "./games/box";
import { InputHandler } from "./input-handler";
import { Command } from "./games/command";

// Declare canvas, context variables
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

// Instantiate box, inputHandler.
let box = new Box();
let inputHandler = new InputHandler();

export function world() {
  canvas = <HTMLCanvasElement>document.getElementById("world-canvas");
  context = canvas.getContext("2d");
  // Disable right click on the canvas.
  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // Initialize button events.
  let spaceButtonCommand = new ResetBoxCommand();

  // Bind button events.
  inputHandler.bindSpaceButton(spaceButtonCommand);

  // Start the first frame request.
  window.requestAnimationFrame(worldLoop);
}

function worldLoop() {
  // User keyboard input handling.
  let command: Command = inputHandler.handleUserKeyboardInput();
  if (command) command.execute(box);

  // Render the object's current state.
  render(box);

  // Update the object's state.
  updater(box);

  // Keep requesting new frames.
  window.requestAnimationFrame(worldLoop);
}

function render(actor: Box) {
  // Clear previous canvas.
  context.clearRect(0, 0, 1280, 720);

  // Render white background.
  context.rect(0, 0, 1280, 720);
  context.fillStyle = "white";
  context.fill();

  // Draws the box object to the canvas.
  actor.dispatch(context);
}

function updater(actor: Box): void {
  actor.rotate();
  actor.expand();
}
