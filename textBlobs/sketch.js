let ft;
let target;
let blobs = [];
let lastTime = 0
let currentTime = Date.now()
let tslf

let timeprogression = 1

let structure

let prog = ['text', 'more text', 'xddddd']
let current = 0

var settext = (st, text, size, x, y, sFactor) => {st.setTarget(ft.textToPoints(text, x, y, size, {sampleFactor : sFactor}))}

function preload(){
    try{
    ft = loadFont('fonts/l_10646.ttf')
    }catch(exc){
        alert("please specify a font in sketch.js")
    }
}

function setup(){
    createCanvas(800, 400)
    
    textFont(ft)
    textSize(128)
    fill(255)
    stroke(255, 255, 255)
    strokeWeight(4)
    structure = new Structure([])
    structure.addVField((xpos, ypos) => {
        let xdiff = mouseX-xpos
        let ydiff = mouseY-ypos
        let distsq = abs(xdiff*xdiff + ydiff*ydiff)
        return {x : -3000*xdiff/distsq, y : -3000*ydiff/distsq}
    })
    settext(structure, prog[current], 150, 50, 220, .15)
    colorMode(HSB)
}

function mousePressed(){
    settext(structure, prog[(current = (current+1)%prog.length)], 150, 50, 220, .15)
}

function draw(){
    currentTime = Date.now()
    if(lastTime != 0)tslf = (currentTime - lastTime)*.001 * timeprogression
    else tslf = 0
    lastTime = currentTime


        background(41)
        /*loadPixels();
        for(x=  0; x < width; x++) {
            for(y = 0; y < height; y++) {
                let sum = 0;
                for(i = 0; i < structure.blobs.length; i++) {
                    let xdif = x-structure.blobs[i].x;
                    let ydif = y-structure.blobs[i].y;
                    let d = sqrt((xdif*xdif) + (ydif*ydif));
                    sum += 4 * structure.blobs[i].r/d;
                }
                set(x, y, color(40, 100, sum));
            }
        }
        updatePixels();*/
        structure.update(tslf)
        structure.show()
        for(i=0; i<blobs.length; i++) {
            blobs[i].update(tslf);
            blobs[i].show();
        }
}