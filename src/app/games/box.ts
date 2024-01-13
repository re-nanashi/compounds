import * as Global from "../contants";
import { Entity } from "./entity";
import { Command } from "./command";

export class Box implements Entity {
  private backgroundContext: CanvasRenderingContext2D;

  // Box Properties
  private color: string;
  private boxSideLength: number;
  private boxRotationAngle: number;

  private rotationSpeed: number = 1;
  private expansionSpeed: number = 10;

  // Create a box.
  private xCoordinate: number;
  private yCoordinate: number;

  constructor(
    boxSideLength: number = 1,
    boxRotationAngle: number = 0,
    color: string = "red"
  ) {
    this.boxSideLength = boxSideLength;
    this.boxRotationAngle = boxRotationAngle;
    this.color = color;

    this.xCoordinate = Global.CANVAS_WIDTH / 2 - this.boxSideLength / 2;
    this.yCoordinate = Global.CANVAS_HEIGHT / 2 - this.boxSideLength / 2;
  }

  public dispatch(context: CanvasRenderingContext2D): void {
    this.backgroundContext = context;

    let boxHorizontalCenter = this.xCoordinate + this.boxSideLength / 2;
    let boxVerticalCenter = this.yCoordinate + this.boxSideLength / 2;
    // Matrix transformation
<<<<<<< HEAD
    this.backgroundContext.translate(boxHorizontalCenter, boxVerticalCenter);
    this.backgroundContext.rotate(this.boxRotationAngle % 360);
    this.backgroundContext.translate(-boxHorizontalCenter, -boxVerticalCenter);
=======
    context.translate(boxHorizontalCenter, boxVerticalCenter);
    context.rotate((this.boxRotationAngle * Math.PI) / 180);
    context.translate(-boxHorizontalCenter, -boxVerticalCenter);
>>>>>>> main

    // Rotated rectangle
    this.backgroundContext.fillStyle = this.color;
    this.backgroundContext.fillRect(
      this.xCoordinate,
      this.yCoordinate,
      this.boxSideLength,
      this.boxSideLength
    );
  }

  public setXPosition(xCoordinate: number): void {
    this.xCoordinate = xCoordinate;
  }

  public setYPosition(yCoordinate: number): void {
    this.yCoordinate = yCoordinate;
  }

  public rotate(): void {
    this.boxRotationAngle += this.rotationSpeed;
  }

  public expand(): void {
    this.boxSideLength += this.expansionSpeed;
  }

  public resetBox(): void {
    // Reset any transformation applied to the identity matrix.
    this.backgroundContext.resetTransform();

    this.boxSideLength = 1;
    this.boxRotationAngle = 0;
  }
}

// Input handling
export class ResetBoxCommand extends Command {
  execute(actor: Box): void {
    actor.resetBox();
  }
}
