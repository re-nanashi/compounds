// Declare canvas, context variables
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

export function world() {
  canvas = <HTMLCanvasElement>document.getElementById("world-canvas");
  context = canvas.getContext("2d");

  // Start the first frame request
  window.requestAnimationFrame(worldLoop);
}

function worldLoop() {
  // Parameters
  worldGraphicRenderer();
  worldKeyHandler();

  // Keep requesting new frames
  window.requestAnimationFrame(worldLoop);
}

function worldGraphicRenderer(state: any) {
  const CANVAS_WIDTH = 1280;
  const CANVAS_HEIGHT = 720;

  const CANVAS_CENTER_X = CANVAS_WIDTH / 2;
  const CANVAS_CENTER_Y = CANVAS_HEIGHT / 2;

  // Clear previous canvas frame
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Renders background
  context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "white";
  context.fill();
}

function worldKeyHandler(state: any) {
  document.addEventListener(
    "keydown",
    (event) => {
      var name = event.key;
      if (name === " ") {
        // Code here
        return;
      }
    },
    false
  );
}
