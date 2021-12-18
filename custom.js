// canvas는 두 개의 사이즈가 필요하다.
// 1. CSS에서의 canvas사이즈
//  2. pixel manipulating을 하려면 pixel modifier에도 width와 height를 지정해야

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 경로를 만든다
    ctx.beginPath(); // 경로생성
    ctx.moveTo(x, y); // 선 시작 좌표
  } else {
    // 그린다.
    ctx.lineTo(x, y); // 선 끝 좌표
    ctx.stroke(); // 선 그리기
  }
}

function onMouseDown(event) {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
