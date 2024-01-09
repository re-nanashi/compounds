import { Entity } from "./entity";

export abstract class Command {
  abstract execute(actor: Entity): void;
}
