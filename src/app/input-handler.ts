import { Command } from "./games/command";

type button = string;

export class InputHandler {
  readonly BUTTON_SPACE: button = " ";

  private _buttonSpace: Command;

  private _userInput: button = null;

  constructor() {
    document.addEventListener(
      "keydown",
      (event) => {
        switch (event.key) {
          case this.BUTTON_SPACE:
            this._userInput = this.BUTTON_SPACE;
            break;
          default:
            this._userInput = null;
        }
      },
      false
    );
  }

  public handleUserKeyboardInput(): Command {
    let ret: Command = null;

    if (this._userInput === this.BUTTON_SPACE) ret = this._buttonSpace;

    // Remove previous user input.
    this._userInput = null;

    // Nothing pressed, so do nothing.
    return ret;
  }

  public bindSpaceButton(commandToBind: Command): void {
    this._buttonSpace = commandToBind;
  }
}
