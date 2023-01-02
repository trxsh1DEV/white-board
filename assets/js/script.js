// Initial data
let currentColor = 'black';
let canDraw = false;

let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');

let ctxCanvas = screen.getContext('2d')

// Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClick)
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', () => {
    ctxCanvas.setTransform(1,0,0,1,0,0);
    ctxCanvas.clearRect(0,0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
});

// Functions
function colorClick(e) {
    const el = e.target;
    let color = el.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    el.classList.add('active');
}

function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
};

function mouseMoveEvent(e) {
    if(canDraw) {
        drawing(e.pageX, e.pageY)       
    }
};

function mouseUpEvent() {
    canDraw = false
};

function drawing(x,y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctxCanvas.beginPath();
    ctxCanvas.lineWidth = 5;
    ctxCanvas.lineJoin = 'round';
    ctxCanvas.moveTo(mouseX,mouseY);
    ctxCanvas.lineTo(pointX, pointY);
    ctxCanvas.closePath();
    ctxCanvas.strokeStyle = currentColor;
    ctxCanvas.stroke();

    mouseX = pointX;
    mouseY = pointY;
}