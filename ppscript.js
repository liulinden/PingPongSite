//idea: have players who havent played each other repel each other
const canvas = document.getElementById('cvs')

const dpr = Math.ceil(window.devicePixelRatio || 1);
canvas.width=canvas.clientWidth*dpr;
canvas.height=canvas.clientHeight*dpr;

const ctx= canvas.getContext('2d')

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

//paste from converter output
const data = [['Keoki', 'Linden', 'Ben', 'Aiden', 'Nick', 'Kodiak', 'Alvaro', 'Josh', 'Spencer', 'Aiki', 'Merrick', 'Miles', 'Michael', 'Bradley', 'Ian', 'Cooper', 'Tom', 'Luka', 'Tomas'], [[2024, 1, 8, 372, 'Josh', 'Spencer', 'Spencer', 1, 14], [2024, 1, 8, 372, 'Aiden', 'Michael', 'Aiden', 14, 7], [2024, 1, 8, 372, 'Nick', 'Miles', 'Nick', 14, 3], [2024, 1, 8, 372, 'Linden', 'Ian', 'Linden', 15, 7], [2024, 1, 8, 372, 'Kodiak', 'Merrick', 'Kodiak', 14, 4], [2024, 1, 10, 374, 'Alvaro', 'Aiki', 'Aiki', 8, 14], [2024, 1, 10, 374, 'Ben', 'Bradley', 'Ben', 14, 7], [2024, 1, 10, 374, 'Ian', 'Alvaro', 'Alvaro', 4, 14], [2024, 1, 17, 381, 'Keoki', 'Cooper', 'Keoki', 19, 18], [2024, 1, 17, 381, 'Michael', 'Miles', 'Miles', 9, 14], [2024, 1, 17, 381, 'Keoki', 'Spencer', 'Spencer', 0, 14], [2024, 1, 17, 381, 'Aiden', 'Nick', 'Nick', 0, 14], [2024, 1, 22, 386, 'Cooper', 'Josh', 'Cooper', 20, 17], [2024, 1, 22, 386, 'Ben', 'Kodiak', 'Ben', 15, 11], [2024, 1, 22, 386, 'Keoki', 'Merrick', 'Keoki', 17, 14], [2024, 1, 24, 388, 'Linden', 'Aiki', 'Linden', 15, 10], [2024, 1, 24, 388, 'Linden', 'Ben', 'Ben', 23, 30], [2024, 1, 29, 393, 'Kodiak', 'Cooper', 'Kodiak', 18, 14], [2024, 1, 29, 393, 'Aiki', 'Miles', 'Aiki', 14, 7], [2024, 1, 29, 393, 'Aiden', 'Alvaro', 'Alvaro', 4, 14], [2024, 1, 29, 393, 'Spencer', 'Nick', 'Nick', 11, 22], [2024, 1, 31, 395, 'Alvaro', 'Keoki', 'Alvaro', 32, 19], [2024, 1, 31, 395, 'Nick', 'Ben', 'Nick', 22, 12], [2024, 2, 2, 397, 'Linden', 'Alvaro', 'Alvaro', 26, 30], [2024, 2, 5, 400, 'Kodiak', 'Aiki', 'Kodiak', 28, 26], [2024, 2, 5, 400, 'Spencer', 'Kodiak', 'Spencer', 22, 9], [2024, 2, 7, 402, 'Spencer', 'Alvaro', 'Spencer', 22, 14], [2024, 2, 7, 402, 'Spencer', 'Ben', 'Ben', 14, 22], [2024, 2, 12, 407, 'Nick', 'Ben', 'Nick', 32, 21], [2024, 3, 11, 435, 'Spencer', 'Linden', 'Spencer', 11, 8], [2024, 3, 11, 435, 'Nick', 'Kodiak', 'Nick', 11, 3], [2024, 3, 11, 435, 'Linden', 'Kodiak', 'Linden', 11, 7], [2024, 3, 11, 435, 'Aiden', 'Ian', 'Aiden', 11, 6], [2024, 3, 11, 435, 'Merrick', 'Aiden', 'Merrick', 15, 13], [2024, 3, 13, 437, 'Tom', 'Luka', 'Tom', 11, 7], [2024, 3, 13, 437, 'Tomas', 'Ben', 'Tomas', 11, 4], [2024, 3, 13, 437, 'Tom', 'Bradley', 'Tom', 11, 9], [2024, 3, 13, 437, 'Tomas', 'Spencer', 'Tomas', 11, 7], [2024, 3, 18, 442, 'Aiki', 'Kodiak', 'Aiki', 13, 11], [2024, 3, 18, 442, 'Linden', 'Tomas', 'Tomas', 5, 11], [2024, 3, 18, 442, 'Merrick', 'Ian', 'Merrick', 11, 6], [2024, 3, 18, 442, 'Spencer', 'Aiki', 'Spencer', 11, 7], [2024, 3, 19, 443, 'Tom', 'Merrick', 'Tom', 11, 4], [2024, 3, 20, 444, 'Luka', 'Aiden', 'Luka', 11, 7], [2024, 3, 20, 444, 'Luka', 'Bradley', 'Bradley', 13, 15], [2024, 3, 20, 444, 'Ian', 'Bradley', 'Bradley', 7, 11], [2024, 3, 25, 449, 'Linden', 'Merrick', 'Linden', 11, 9], [2024, 3, 25, 449, 'Linden', 'Spencer', 'Linden', 11, 7], [2024, 2, 22, 417, 'Linden', 'Ian', 'Linden', 23, 18], [2024, 3, 1, 425, 'Linden', 'Tom', 'Tom', 14, 22], [2024, 3, 15, 439, 'Tom', 'Spencer', 'Tom', 11, 6]]]
//year/month/day/dayssince2022/p1/p2/winner/score1/score2

const players = data[0]
const matches = data[1]

function xcon(x){
    return x+canvas.width/2
}

function ycon(y){
    return y+canvas.height/2
}

function drawCircle(color,x,y,r){
    ctx.fillStyle=color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
}

function drawLine(color,wdth,x1,y1,x2,y2){
    ctx.strokeStyle = color
    ctx.lineWidth=wdth
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

function drawAllConnections(){
    for (let i=0;i<matches.length;i++){
        p1=playerNodes[players.indexOf(matches[i][4])]
        p2=playerNodes[players.indexOf(matches[i][5])]
        drawLine('black',10,xcon(p1.x),ycon(p1.y),xcon(p2.x),ycon(p2.y))
    }
}

class PlayerNode{
    constructor(name){
        this.name=name
        this.x=2500*Math.random()-1250
        this.y=1000*Math.random()-500
        this.size=100
    }

    draw(){
        drawCircle('rgb(100,100,100)',xcon(this.x),ycon(this.y),this.size)
        ctx.font=String(Math.round(this.size/2))+'px Berlin Sans FB'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.fillText(this.name,xcon(this.x),ycon(this.y+this.size*3/20))
    }
    
    drawLines(){

    }

    drawLineTo(){
        
    }

}

function drawFrame(){
    canvas.width=canvas.clientWidth*dpr;
    canvas.height=canvas.clientHeight*dpr;
    drawAllConnections()
    for (let i=0;i<playerNodes.length;i++){
        playerNodes[i].draw()
    }
}

function gameLoop(){
    drawFrame()
    requestAnimationFrame(gameLoop)
}


let playerNodes = []

for (let i=0;i<players.length;i++){
    playerNodes.push(new PlayerNode(players[i]))
}

gameLoop()