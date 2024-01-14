// import { Grass, ReplantCommand } from "./games/pokeball";
import { Pokeball, ReversePokeballRotationCommand } from "./games/pokeball";
import { InputHandler } from "./input-handler";
import { Command } from "./games/command";
import * as Global from "./contants";

export class Application {
  // Declare canvas, context variables
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  // Global object/s
  private lastTimestampStateUpdated: number = 0;
  private inputHandler: InputHandler;

  // Games array: {private games: Array<Game>};
  // Only one game for now
  private pokeball: Pokeball;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById("world-canvas");
    this.context = this.canvas.getContext("2d");
    // Disable right click on the canvas.
    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    // Instantiate box, inputHandler.
    this.pokeball = new Pokeball();
    this.inputHandler = new InputHandler();

    // Initialize button events.
    let spaceButtonCommand = new ReversePokeballRotationCommand();

    // Bind button events.
    this.inputHandler.bindSpaceButton(spaceButtonCommand);
  }

  public boot(): any {
    this.loop();
  }

  private render(): void {
    // Clear previous canvas.
    this.context.clearRect(0, 0, Global.CANVAS_WIDTH, Global.CANVAS_HEIGHT);

    // Render white background.
    this.context.rect(0, 0, 1280, 720);
    this.context.fillStyle = "white";
    this.context.fill();

    // Draws the box object to the canvas.
    this.pokeball.dispatch(this.context);
  }

  private update(): void {
    this.pokeball.advance();
  }

  private loop(): void {
    // User keyboard input handling.
    let command: Command = this.inputHandler.handleUserKeyboardInput();
    if (command) command.execute(this.pokeball);

    // Render the object's current state only after a second.
    this.render();
    this.update();

    // Update the object's state only after a second.
    // const ONE_SECOND = 1000; // ms
    // let now = Date.now();
    // if (
    //   !this.lastTimestampStateUpdated ||
    //   now - this.lastTimestampStateUpdated >= ONE_SECOND
    // ) {
    //   this.lastTimestampStateUpdated = now;
    // }

    // Start the first frame request.
    // Keep requesting new frames.
    window.requestAnimationFrame(() => {
      this.loop();
    });
  }
}
