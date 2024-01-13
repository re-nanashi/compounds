import { Grass, ReplantCommand } from "./games/grass";
import { InputHandler } from "./input-handler";
import { Command } from "./games/command";

export class Application {
  // Declare canvas, context variables
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  // Global object/s
  private lastTimestampStateUpdated: number = 0;
  private inputHandler: InputHandler;

  // Games array: {private games: Array<Game>};
  // Only one game for now
  private grass: Grass;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById("world-canvas");
    this.context = this.canvas.getContext("2d");
    // Disable right click on the canvas.
    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    // Instantiate box, inputHandler.
    this.grass = new Grass();
    this.inputHandler = new InputHandler();

    // Initialize button events.
    let spaceButtonCommand = new ReplantCommand();

    // Bind button events.
    this.inputHandler.bindSpaceButton(spaceButtonCommand);
  }

  public boot(): any {
    this.loop();
  }

  private render(): void {
    // Clear previous canvas.
    this.context.clearRect(0, 0, 1280, 720);

    // Render white background.
    this.context.rect(0, 0, 1280, 720);
    this.context.fillStyle = "white";
    this.context.fill();

    // Draws the box object to the canvas.
    this.grass.dispatch(this.context);
  }

  private update(): void {
<<<<<<< HEAD
    this.grass.increaseHeight();
=======
    this.box.expand();
    this.box.rotate();
>>>>>>> main
  }

  private loop(): void {
    // User keyboard input handling.
    let command: Command = this.inputHandler.handleUserKeyboardInput();
    if (command) command.execute(this.grass);

    // Render the object's current state only after a second.
    this.render();

    // Update the object's state only after a second.
    const ONE_SECOND = 1000; // ms
    let now = Date.now();
    if (
      !this.lastTimestampStateUpdated ||
      now - this.lastTimestampStateUpdated >= ONE_SECOND
    ) {
      this.lastTimestampStateUpdated = now;
      this.update();
    }

    // Start the first frame request.
    // Keep requesting new frames.
    window.requestAnimationFrame(() => {
      this.loop();
    });
  }
}
