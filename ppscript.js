const canvas = document.getElementById('cvs')

const dpr = Math.ceil(window.devicePixelRatio || 1);
canvas.width=canvas.clientWidth*dpr;
canvas.height=canvas.clientHeight*dpr;

const ctx= canvas.getContext('2d')

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
