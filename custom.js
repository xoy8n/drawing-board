// canvas는 두 개의 사이즈가 필요하다.
// 1. CSS에서의 canvas사이즈
//  2. pixel manipulating을 하려면 pixel modifier에도 width와 height를 지정해야


const drawBtn = document.getElementById('drawBtn');
const fillBtn = document.getElementById('fillBtn');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');

//방법2.Array.from사용하기
const colorOptions = Array.from(document.getElementsByClassName("color-option"))
const color = document.getElementById("color");
const lineWidth = document.getElementById("lineWidth");
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "transparent";
ctx.lineWidth = lineWidth.value;

let painting = false;
let filling = false;


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

function onLineWidthChanged(event) { 
  // console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

function onColorChanged(event) { 
  // console.log(event.target.value);
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  // console.log(event.target.dataset.color);
  colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  // input type color도 맞추기
  color.value = colorValue;
}

// function onModeClick(event) { 
//   //if는 무조건 true일때 실행한다. 현재 filling은 false이므로 실행시 if문을 타지않고 else문을 탄다.
//   if (filling) {
//     filling = false;
//     modeBtn.innerText = "🪣"
//     console.log(filling)
//   } else {
//     filling = true;
//     modeBtn.innerText = "🖍️"
//     console.log(filling)
//   }
// }
// function onCanvasClick() {
//   if (filling) {
//     ctx.fillRect(0, 0, canvas.width, canvas.height) 
//   }
// }


function onFillClick() {
  if (!ctx.fillStyle == "transparent") {
    console.log("색선택후")
    color.value = ctx.fillStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height) 
  } else {
    console.log("색선택전", ctx.fillStyle)
    ctx.fillStyle = "transparent";
  }
}


function onResetClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
// canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener('change', onLineWidthChanged);
color.addEventListener('change', onColorChanged);


//forEach를 쓰려면 array이어야한다.
//현재 colorOptions는 HTMLCollection일 뿐이다.(배열X)
//방법1. const colorOptionsArr = [...colorOptions];

colorOptions.forEach(color => color.addEventListener('click', onColorClick));

drawBtn.addEventListener('click', onMouseMove);
fillBtn.addEventListener('click', onFillClick);
resetBtn.addEventListener('click', onResetClick);