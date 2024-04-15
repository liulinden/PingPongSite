//idea: have players who havent played each other repel each other
const canvas = document.getElementById('cvs')

const dpr = Math.ceil(window.devicePixelRatio || 1);
canvas.width=canvas.clientWidth*dpr;
canvas.height=canvas.clientHeight*dpr;

const ctx= canvas.getContext('2d')

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

document.addEventListener("mousemove", updateMouse)
document.addEventListener("mousedown", mouseDown)
document.addEventListener("mouseup", mouseUp)

//paste from converter output
const data = [['Keoki', 'Linden', 'Ben', 'Aiden', 'Nick', 'Kodiak', 'Alvaro', 'Josh', 'Spencer', 'Aiki', 'Merrick', 'Miles', 'Michael', 'Bradley', 'Ian', 'Cooper', 'Tom', 'Luka', 'Tomas'], [[2024, 1, 8, 372, 'Josh', 'Spencer', 'Spencer', 1, 14], [2024, 1, 8, 372, 'Aiden', 'Michael', 'Aiden', 14, 7], [2024, 1, 8, 372, 'Nick', 'Miles', 'Nick', 14, 3], [2024, 1, 8, 372, 'Linden', 'Ian', 'Linden', 15, 7], [2024, 1, 8, 372, 'Kodiak', 'Merrick', 'Kodiak', 14, 4], [2024, 1, 10, 374, 'Alvaro', 'Aiki', 'Aiki', 8, 14], [2024, 1, 10, 374, 'Ben', 'Bradley', 'Ben', 14, 7], [2024, 1, 10, 374, 'Ian', 'Alvaro', 'Alvaro', 4, 14], [2024, 1, 17, 381, 'Keoki', 'Cooper', 'Keoki', 19, 18], [2024, 1, 17, 381, 'Michael', 'Miles', 'Miles', 9, 14], [2024, 1, 17, 381, 'Keoki', 'Spencer', 'Spencer', 0, 14], [2024, 1, 17, 381, 'Aiden', 'Nick', 'Nick', 0, 14], [2024, 1, 22, 386, 'Cooper', 'Josh', 'Cooper', 20, 17], [2024, 1, 22, 386, 'Ben', 'Kodiak', 'Ben', 15, 11], [2024, 1, 22, 386, 'Keoki', 'Merrick', 'Keoki', 17, 14], [2024, 1, 24, 388, 'Linden', 'Aiki', 'Linden', 15, 10], [2024, 1, 24, 388, 'Linden', 'Ben', 'Ben', 23, 30], [2024, 1, 29, 393, 'Kodiak', 'Cooper', 'Kodiak', 18, 14], [2024, 1, 29, 393, 'Aiki', 'Miles', 'Aiki', 14, 7], [2024, 1, 29, 393, 'Aiden', 'Alvaro', 'Alvaro', 4, 14], [2024, 1, 29, 393, 'Spencer', 'Nick', 'Nick', 11, 22], [2024, 1, 31, 395, 'Alvaro', 'Keoki', 'Alvaro', 32, 19], [2024, 1, 31, 395, 'Nick', 'Ben', 'Nick', 22, 12], [2024, 2, 2, 397, 'Linden', 'Alvaro', 'Alvaro', 26, 30], [2024, 2, 5, 400, 'Kodiak', 'Aiki', 'Kodiak', 28, 26], [2024, 2, 5, 400, 'Spencer', 'Kodiak', 'Spencer', 22, 9], [2024, 2, 7, 402, 'Spencer', 'Alvaro', 'Spencer', 22, 14], [2024, 2, 7, 402, 'Spencer', 'Ben', 'Ben', 14, 22], [2024, 2, 12, 407, 'Nick', 'Ben', 'Nick', 32, 21], [2024, 3, 11, 435, 'Spencer', 'Linden', 'Spencer', 11, 8], [2024, 3, 11, 435, 'Nick', 'Kodiak', 'Nick', 11, 3], [2024, 3, 11, 435, 'Linden', 'Kodiak', 'Linden', 11, 7], [2024, 3, 11, 435, 'Aiden', 'Ian', 'Aiden', 11, 6], [2024, 3, 11, 435, 'Merrick', 'Aiden', 'Merrick', 15, 13], [2024, 3, 13, 437, 'Tom', 'Luka', 'Tom', 11, 7], [2024, 3, 13, 437, 'Tomas', 'Ben', 'Tomas', 11, 4], [2024, 3, 13, 437, 'Tom', 'Bradley', 'Tom', 11, 9], [2024, 3, 13, 437, 'Tomas', 'Spencer', 'Tomas', 11, 7], [2024, 3, 18, 442, 'Aiki', 'Kodiak', 'Aiki', 13, 11], [2024, 3, 18, 442, 'Linden', 'Tomas', 'Tomas', 5, 11], [2024, 3, 18, 442, 'Merrick', 'Ian', 'Merrick', 11, 6], [2024, 3, 18, 442, 'Spencer', 'Aiki', 'Spencer', 11, 7], [2024, 3, 19, 443, 'Tom', 'Merrick', 'Tom', 11, 4], [2024, 3, 20, 444, 'Luka', 'Aiden', 'Luka', 11, 7], [2024, 3, 20, 444, 'Luka', 'Bradley', 'Bradley', 13, 15], [2024, 3, 20, 444, 'Ian', 'Bradley', 'Bradley', 7, 11], [2024, 3, 25, 449, 'Linden', 'Merrick', 'Linden', 11, 9], [2024, 3, 25, 449, 'Linden', 'Spencer', 'Linden', 11, 7], [2024, 3, 27, 451, 'Aiki', 'Ben', 'Aiki', 14, 12], [2024, 3, 27, 451, 'Aiki', 'Tom', 'Aiki', 11, 9], [2024, 3, 27, 451, 'Spencer', 'Merrick', 'Spencer', 11, 1], [2024, 3, 27, 451, 'Luka', 'Ian', 'Luka', 11, 4], [2024, 3, 27, 451, 'Aiden', 'Bradley', 'Aiden', 11, 8], [2024, 3, 27, 451, 'Nick', 'Linden', 'Nick', 11, 6], [2024, 4, 1, 456, 'Kodiak', 'Keoki', 'Kodiak', 11, 9], [2024, 4, 1, 456, 'Nick', 'Tomas', 'Nick', 11, 9], [2024, 4, 1, 456, 'Kodiak', 'Bradley', 'Kodiak', 11, 4], [2024, 4, 1, 456, 'Kodiak', 'Aiden', 'Kodiak', 12, 10], [2024, 4, 2, 457, 'Ben', 'Tom', 'Ben', 11, 6], [2024, 4, 3, 458, 'Tomas', 'Tom', 'Tomas', 11, 4], [2024, 4, 3, 458, 'Keoki', 'Luka', 'Luka', 9, 11], [2024, 4, 3, 458, 'Bradley', 'Luka', 'Luka', 7, 11], [2024, 4, 3, 458, 'Tomas', 'Merrick', 'Tomas', 11, 4], [2024, 4, 5, 460, 'Spencer', 'Aiki', 'Aiki', 9, 11], [2024, 2, 22, 417, 'Linden', 'Ian', 'Linden', 23, 18], [2024, 3, 1, 425, 'Linden', 'Tom', 'Tom', 14, 22], [2024, 3, 15, 439, 'Tom', 'Spencer', 'Tom', 11, 6], [2024, 4, 9, 464, 'Tom', 'Spencer', 'Spencer', 9, 11]]]   
//year/month/day/dayssince2022/p1/p2/winner/score1/score2

const players = data[0]
const matches = data[1]

function updateMouse(event){
    mouseX=event.clientX*2
    mouseY=event.clientY*2
}

function mouseDown(){
    initMouseX=mouseX
    initMouseY=mouseY
    displayedConnection=[]
    for (let i=0;i<playerNodes.length;i++){
        node=playerNodes[i]
        if (Math.sqrt(Math.pow(xcon(node.x)-mouseX,2)+Math.pow(ycon(node.y)-mouseY,2))<nodeSize*zoom){
            draggedNode=[node]
            let ind=selectedNodes.indexOf(node)
            if (ind!=-1){
                if (ind==1){
                    selectedNodes=[selectedNodes[0]]
                } else if (selectedNodes.length==1) selectedNodes=[]
                else selectedNodes=[selectedNodes[1]]
            }
            else if (selectedNodes.length<2) {
                selectedNodes.push(node)
                if (selectedNodes.length==2) {
                    if (numPointsPlayed(selectedNodes[0].name,selectedNodes[1].name)>0) displayedConnection=[selectedNodes[0],selectedNodes[1]]
                    else selectedNodes=[]
                }
            }
            else selectedNodes=[node]
            return
        }
    }
    selectedNodes=[]
    selectConnection()
    if (selectedConnection.length==2){
        displayedConnection=[selectedConnection[0],selectedConnection[1]]
        selectedNodes=[selectedConnection[0],selectedConnection[1]]
    }
}

function mouseUp(){
    if (draggedNode.length==1 && !(mouseX==initMouseX && mouseY==initMouseY)){
        let ind=selectedNodes.indexOf(draggedNode[0])
        if (ind!=-1){
            if (ind==1){
                selectedNodes=[selectedNodes[0]]
            } else if (selectedNodes.length==1) selectedNodes=[]
            else selectedNodes=[selectedNodes[1]]
            displayedConnection=[]
        }
        else if (selectedNodes.length<2) {
            selectedNodes.push(draggedNode[0])
            console.log(selectedNodes)
            if (selectedNodes.length==2) {
                if (numPointsPlayed(selectedNodes[0].name,selectedNodes[1].name)>0) displayedConnection=[selectedNodes[0],selectedNodes[1]]
                else selectedNodes=[]
            }
        }
        else selectedNodes=[draggedNode[0]]
    }
    draggedNode=[]
    return
    if (draggedNode.length==1 && displayedConnection.length==0)
        if (!(mouseX==initMouseX && mouseY==initMouseY)){
            let ind=selectedNodes.indexOf(draggedNode[0])
            if (ind!=-1){
                if (ind==1){
                    selectedNodes=[selectedNodes[0]]
                } else if (selectedNodes.length==1) selectedNodes=[]
                else selectedNodes=[selectedNodes[1]]
            }
        }
    draggedNode=[]
}

function nearLine(x,y,x1,y1,x2,y2,r){
    //in overall larger rect
    if (x>Math.min(x1,x2)-nodeSize*zoom/2 && x<Math.max(x1,x2)+nodeSize*zoom/2 && y>Math.min(y1,y2)-nodeSize*zoom/2 && y<Math.max(y1,y2)+nodeSize*zoom/2){
        distance=Math.abs(((x1-x2)/Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2)))*(y1+((y1-y2)/(x1-x2))*(x-x1)-y))
        if (distance<r){
            return true
        } else{
            return false
        }
    }
}

function xcon(x){
    return zoom*x+canvas.width/2
}

function ycon(y){
    return zoom*y+canvas.height/2
}

function drawCircle(color,x,y,r){
    ctx.fillStyle=color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
}

function drawIcon(color1,color2,x,y,r){
    ctx.fillStyle=color1
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle=color2
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI)
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
    for (let i=0;i<playerNodes.length;i++){
        let p1=playerNodes[i]
        for (let j=i+1;j<playerNodes.length;j++){
            let p2=playerNodes[j]
            let played=numPointsPlayed(p1.name,p2.name)
            if (played>0){
                if (!(selectedConnection.length==2 && (p1==selectedConnection[0] || p1==selectedConnection[1]) && (p2==selectedConnection[0] || p2==selectedConnection[1]))) {
                    if (!(displayedConnection.length==2 && (p1==displayedConnection[0] || p1==displayedConnection[1]) && (p2==displayedConnection[0] || p2==displayedConnection[1]))) {
                        let color = 'rgba(190, 160, 120,'+String(played/50)+''
                        drawLine(color,10,xcon(p1.x),ycon(p1.y),xcon(p2.x),ycon(p2.y))
                    }
                }
            }
        }
    }
    for (let i=0;i<selectedConnection.length;i++){
        if (!(displayedConnection.length==2 && (p1==displayedConnection[0] || p1==displayedConnection[1]) && (p2==displayedConnection[0] || p2==displayedConnection[1]))) {
            p1=selectedConnection[0]
            p2=selectedConnection[1]
            let played=numPointsPlayed(p1.name,p2.name)
            color = 'rgba(60, 100, 180,'+String(played/50)+''
            drawLine(color,10,xcon(p1.x),ycon(p1.y),xcon(p2.x),ycon(p2.y))
        }
    }
    for (let i=0;i<displayedConnection.length;i++){
        p1=displayedConnection[0]
        p2=displayedConnection[1]
        let played=numPointsPlayed(p1.name,p2.name)
        color = 'rgba(255,60,60,'+String(played/50)+''
        drawLine(color,10,xcon(p1.x),ycon(p1.y),xcon(p2.x),ycon(p2.y))
    }
}

function numPointsPlayed(p1,p2){
    let num=0
    for (let i=0;i<matches.length;i++){
        if ((matches[i][4]==p1 && matches[i][5]==p2) || (matches[i][4]==p2 && matches[i][5]==p1)){
            num+=matches[i][7]+matches[i][8]
        }
    }
    return num
}

function getScores(p1,p2){
    out=[[0,0]]
    for (let i=0;i<matches.length;i++){
        if (matches[i][4]==p1 && matches[i][5]==p2){
            out.push([matches[i][7],matches[i][8]])
            if (matches[i][6]==p1){
                out[0][0]++
            } else{
                out[0][1]++
            }
        } else if (matches[i][4]==p2 && matches[i][5]==p1){
            out.push([matches[i][8],matches[i][7]])
            if (matches[i][6]==p1){
                out[0][0]++
            } else{
                out[0][1]++
            }
        }
    }
    return out
}

function sumNestedList(list,index){
    sum=0
    for (let i=0;i<list.length;i++){
        sum+=list[i][index]
    }
    return sum
}

function applyForces(){
    for (let i=0;i<playerNodes.length;i++){
        let p1=playerNodes[i]
        for (let j=i+1;j<playerNodes.length;j++){
            let p2=playerNodes[j]
            let desiredDistance = 500 + 700/Math.max(1,numPointsPlayed(p1.name,p2.name))
            let currentDistance = Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2))
            if (currentDistance==0){
                angle=Math.random()*2*Math.PI
                p1.x+=10*Math.sin(angle)
                p1.y+=10*Math.cos(angle)
                p2.x-=10*Math.sin(angle)
                p2.y-=10*Math.cos(angle)
                currentDistance = Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2))
            }
            p1.xSpeed+=limitToAbs((desiredDistance-currentDistance)*(p1.x-p2.x)/10/Math.pow(currentDistance,1.5),3)
            p1.ySpeed+=limitToAbs((desiredDistance-currentDistance)*(p1.y-p2.y)/10/Math.pow(currentDistance,1.5),3)
            p2.xSpeed+=limitToAbs((desiredDistance-currentDistance)*(p2.x-p1.x)/10/Math.pow(currentDistance,1.5),3)
            p2.ySpeed+=limitToAbs((desiredDistance-currentDistance)*(p2.y-p1.y)/10/Math.pow(currentDistance,1.5),3)
        }
    }
}

function limitToAbs(n,lim){
    if (n>0) return Math.min(lim,n)
    else return Math.max(-lim,n)
}

class PlayerNode{
    constructor(name){
        this.name=name
        this.x=0
        this.y=0
        this.size=nodeSize
        this.xSpeed=0
        this.ySpeed=0
    }

    update(){
        this.x+=this.xSpeed
        this.y+=this.ySpeed
        this.xSpeed*=0.7
        this.ySpeed*=0.7
    }

    draw(){
        let color='rgb(255, 60, 60)'
        let color2='rgb(50, 60, 70)'
        if (hoveredNodes.indexOf(this)!=-1) {
            color = 'rgb(230, 40, 40)'
            color2='rgb(35, 40, 45)'
        }
        if (selectedNodes.indexOf(this)!=-1) {
            color='rgb(186, 30, 30)'
            color2='rgb(0, 0, 0)'
        }
        drawIcon(color,color2,xcon(this.x),ycon(this.y),this.size*zoom)
        ctx.font=String(Math.round(zoom*this.size/2))+'px Berlin Sans FB'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.fillText(this.name,xcon(this.x),ycon(this.y+zoom*this.size*3/20))
    }
}

function displayScores(){
    let scores = getScores(displayedConnection[0].name,displayedConnection[1].name)
    ctx.fillStyle='rgb(60, 100, 180)'
    ctx.beginPath()
    ctx.roundRect(50,50,500,scores.length*80+150,50)
    ctx.fill()
    ctx.font='50px Berlin Sans FB'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.fillText(displayedConnection[0].name + " v. " + displayedConnection[1].name,300,150)
    ctx.textAlign = 'right'
    for (let i=1;i<scores.length;i++){
        ctx.fillText(scores[i][0],300-50,170+80*i)
    }
    ctx.textAlign = 'left'
    for (let i=1;i<scores.length;i++){
        ctx.fillText(scores[i][1],300+50,170+80*i)
    }
    ctx.textAlign = 'center'
    for (let i=1;i<scores.length;i++){
        ctx.fillText('_',300,140+80*i)
    }
}

function drawFrame(){
    canvas.width=canvas.clientWidth*dpr;
    canvas.height=canvas.clientHeight*dpr;
    drawAllConnections()
    for (let i=playerNodes.length-1;i>=0;i--){
        playerNodes[i].draw()
    }
    if (displayedConnection.length>0) displayScores()
}

function updateNodes(){
    for (let i=0;i<playerNodes.length;i++){
        if (draggedNode.indexOf(playerNodes[i])==-1) {
            playerNodes[i].update()
            if (playerNodes[i].x>maxx) maxx=playerNodes[i].x
            if (playerNodes[i].x<minx) minx=playerNodes[i].x
            if (playerNodes[i].y>maxy) maxy=playerNodes[i].y
            if (playerNodes[i].y<miny) miny=playerNodes[i].y
        }
        else {
            draggedNode[0].x+=(mouseX-prvMouseX)/zoom
            draggedNode[0].y+=(mouseY-prvMouseY)/zoom
        }
        if (playerNodes[i].x>maxx) maxx=playerNodes[i].x
        if (playerNodes[i].x<minx) minx=playerNodes[i].x
        if (playerNodes[i].y>maxy) maxy=playerNodes[i].y
        if (playerNodes[i].y<miny) miny=playerNodes[i].y
    }
}

function selectNodes(){
    hoveredNodes=[]
    for (let i=0;i<playerNodes.length;i++){
        node=playerNodes[i]
        if (Math.sqrt(Math.pow(xcon(node.x)-mouseX,2)+Math.pow(ycon(node.y)-mouseY,2))<nodeSize*zoom){
            hoveredNodes.push(node)
            return
        }
    }
}

function selectConnection(){
    if (selectedNodes.length==2){
        selectedConnection=[]
    }else{
        let strongestBond=0
        if (hoveredNodes.length==0){
            for (let i=0;i<playerNodes.length;i++){
                p1=playerNodes[i]
                for (let j=i+1;j<playerNodes.length;j++){
                    p2=playerNodes[j]
                    if (nearLine(mouseX,mouseY,xcon(p1.x),ycon(p1.y),xcon(p2.x),ycon(p2.y),20)){
                        strength=numPointsPlayed(p1.name,p2.name)
                        if (strength>strongestBond){
                            strongestBond=strength
                            selectedConnection=[p1,p2]
                        }
                    }
                }
            }
        }
        if (strongestBond==0) selectedConnection=[]
    }
    return selectedConnection
}

function gameLoop(){
    applyForces()
    if (draggedNode.length==1) {
        draggedNode[0].xSpeed=0
        draggedNode[0].ySpeed=0
    }
    minx=playerNodes[0].x
    miny=playerNodes[0].y
    maxx=playerNodes[0].x
    maxy=playerNodes[0].y
    updateNodes()
    zoom=Math.min(0.7,Math.min((canvas.height-4*nodeSize)/(maxx-minx),(canvas.width-4*nodeSize)/(maxy-miny)))
    selectNodes()
    selectConnection()
    drawFrame()
    prvMouseX=mouseX
    prvMouseY=mouseY
    requestAnimationFrame(gameLoop)
}

let xOffset=0
let yOffset=0
let zoom = 1
let playerNodes = []
let minx=0
let maxx=0
let maxy=0
let miny=0
let nodeSize = 100
let mouseX=0
let mouseY=0
let selectedNodes = []
let hoveredNodes=[]
let selectedConnection = []
let displayedConnection = []
let draggedNode = []
let prvMouseX=0
let prvMouseY=0
let initMouseX=0
let initMouseY=0

for (let i=0;i<players.length;i++){
    playerNodes.push(new PlayerNode(players[i]))
}

gameLoop()