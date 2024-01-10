import * as Global from "../contants";
import { Entity } from "./entity";
import { Command } from "./command";

export class Box implements Entity {
  private color: string;
  private boxSideLength: number;
  private boxRotationAngle: number;

  private rotationSpeed: number = 1;
  private expansionSpeed: number = 10;

  private backgroundContext: CanvasRenderingContext2D;

  // Create a box.
  private xPosition: number;
  private yPosition: number;

  constructor(
    boxSideLength: number = 1,
    boxRotationAngle: number = 0,
    color: string = "red"
  ) {
    this.boxSideLength = boxSideLength;
    this.boxRotationAngle = boxRotationAngle;
    this.color = color;

    this.xPosition = Global.CANVAS_WIDTH / 2 - this.boxSideLength / 2;
    this.yPosition = Global.CANVAS_HEIGHT / 2 - this.boxSideLength / 2;
  }

  public dispatch(context: CanvasRenderingContext2D): void {
    this.backgroundContext = context;

    let boxHorizontalCenter = this.xPosition + this.boxSideLength / 2;
    let boxVerticalCenter = this.yPosition + this.boxSideLength / 2;
    // Matrix transformation
    context.translate(boxHorizontalCenter, boxVerticalCenter);
    context.rotate((this.boxRotationAngle * Math.PI) / 180);
    context.translate(-boxHorizontalCenter, -boxVerticalCenter);

    // Rotated rectangle
    context.fillStyle = this.color;
    context.fillRect(
      this.xPosition,
      this.yPosition,
      this.boxSideLength,
      this.boxSideLength
    );
  }

  public setXPosition(xCoordinate: number): void {
    this.xPosition = xCoordinate;
  }

  public setYPosition(yCoordinate: number): void {
    this.yPosition = yCoordinate;
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
