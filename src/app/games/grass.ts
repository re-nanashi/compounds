import * as Global from "../contants";
import { Entity } from "./entity";
import { Command } from "./command";

export class Grass implements Entity {
  // Canvas context
  private backgroundContext: CanvasRenderingContext2D;

  // Properties of the grass
  private width: number = 128;
  private height: number;
  private color: string;
  readonly speedOfGrowth: number = 1; // 1/10th of the height of the canvas(720px)

  // Grass placement on the canvas
  private xCoordinate: number;
  private yCoordinate: number;

  private replantDirectionIsEastbound: boolean;

  constructor() {
    this.width = 128; // px; will occupy 1/10th of the canvas width
    this.height = 0;
    this.color = "green";

    // Create the grass initially on these coordinates:
    this.xCoordinate = 0;
    this.yCoordinate = Global.CANVAS_HEIGHT;

    this.replantDirectionIsEastbound = true;
  }

  // Render the plant on the canvas
  public dispatch(context: CanvasRenderingContext2D): void {
    this.backgroundContext = context;

    this.backgroundContext.fillStyle = this.color;
    this.backgroundContext.fillRect(
      this.xCoordinate,
      this.yCoordinate,
      this.width,
      this.height
    );
  }

  public increaseHeight(): void {
    if (this.yCoordinate == 0) {
      this.replant();
    } else {
      this.height += this.speedOfGrowth; // 1/10th of the height
      this.yCoordinate -= this.speedOfGrowth;
    }
  }

  public replant(): void {
    // Reset height
    this.height = 0;
    this.yCoordinate = Global.CANVAS_HEIGHT; // reset position

    const edgeThreshold = 128;
    if (this.replantDirectionIsEastbound) {
      // For eastbound direction, move right but not beyond the right edge
      this.xCoordinate = Math.min(
        this.xCoordinate + edgeThreshold,
        Global.CANVAS_WIDTH - edgeThreshold
      );
    } else {
      // For westbound direction, move left but not beyond the left edge
      this.xCoordinate = Math.max(this.xCoordinate - edgeThreshold, 0);
    }

    // Call flipReplantDirection() when on edge
    if (
      this.xCoordinate === 0 ||
      this.xCoordinate === Global.CANVAS_WIDTH - edgeThreshold
    )
      this.flipReplantDirection();
  }

  private flipReplantDirection(): void {
    this.replantDirectionIsEastbound = !this.replantDirectionIsEastbound;
  }
}

// Input handling
export class ReplantCommand extends Command {
  execute(actor: Grass): void {
    actor.replant();
  }
}
