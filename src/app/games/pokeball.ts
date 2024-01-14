import * as Global from "../contants";
import { Entity } from "./entity";
import { Command } from "./command";
import pokeballImgSrc from "../../assets/images/pokeball.png";

export class Pokeball implements Entity {
  // Canvas context
  private backgroundContext: CanvasRenderingContext2D;

  // Object Properties
  private pokeball: HTMLImageElement;

  private xCoordinate: number; // [0, Global.CANVAS_WIDTH]
  private yCoordinate: number; // [0, Global.CANVAS_HEIGHT]

  private rotationalAngle: number;
  private currentRotationAngle: number;
  private circumferenceOfThePokeball: number;

  private eastbound: boolean;

  constructor() {
    this.pokeball = new Image();
    this.pokeball.src = pokeballImgSrc;

    this.xCoordinate = 0;
    this.yCoordinate = Global.CANVAS_HEIGHT / 2 - this.pokeball.height / 2;

    this.rotationalAngle = 10; // degrees; clockwise if positive, otherwise counter-clockwise
    this.currentRotationAngle = 0;
    this.circumferenceOfThePokeball = Math.PI * this.pokeball.height;

    this.eastbound = true;
  }

  // Render the pokeball to bg using its current state
  public dispatch(context: CanvasRenderingContext2D): void {
    this.backgroundContext = context;

    let pokeballCenterXCoordinate = this.xCoordinate + this.pokeball.width / 2;
    let pokeballCenterYCoordinate = this.yCoordinate + this.pokeball.height / 2;

    this.backgroundContext.translate(
      pokeballCenterXCoordinate,
      pokeballCenterYCoordinate
    );

    // Rotate the pokeball
    this.backgroundContext.rotate((this.currentRotationAngle * Math.PI) / 180);

    // Draw the pokeball to canvas
    this.backgroundContext.drawImage(
      this.pokeball,
      -this.pokeball.width / 2,
      -this.pokeball.height / 2
    );

    // Reset any transformation done to matrix
    this.backgroundContext.resetTransform();
  }

  public advance(): void {
    let arclength =
      (this.rotationalAngle / 360) * this.circumferenceOfThePokeball; //

    if (
      this.xCoordinate === 0 ||
      this.xCoordinate === Global.CANVAS_WIDTH - this.pokeball.width
    )
      this.reverseDirection();

    if (this.eastbound) {
      // For eastbound direction, move right but not beyond the right edge
      this.xCoordinate = Math.min(
        this.xCoordinate + arclength,
        Global.CANVAS_WIDTH - this.pokeball.width
      );
    } else {
      // For westbound direction, move left but not beyond the left edge
      this.xCoordinate = Math.max(this.xCoordinate - arclength, 0);
    }

    this.rotate();
  }

  public rotate(): void {
    // Determine the rotation direction based on whether the object is eastbound
    const rotationDirection = this.eastbound ? 1 : -1;

    // Update the rotation angle
    this.currentRotationAngle =
      (this.currentRotationAngle +
        rotationDirection * this.rotationalAngle +
        360) %
      360;
  }

  public reverseDirection(): void {
    this.eastbound = !this.eastbound;
  }
}

// Input handling
export class ReversePokeballRotationCommand extends Command {
  execute(actor: Pokeball): void {
    actor.reverseDirection();
  }
}
