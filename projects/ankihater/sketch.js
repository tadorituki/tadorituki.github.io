var s1 = function (sketch) {

    sketch.setup = function () {
        let canvas = sketch.createCanvas(440, 440)

    
        // Move the canvas so it’s inside our <div id="sketch-holder">.
        canvas.parent('sketch_canvas')

        sketch.background(0, 0, 0)
        sketch.noFill()

    }

    function zoom(x) {
        return (0.5*x+0.005*x**2)
    }

    sketch.draw = function () {
        

        var half = 220
        var full = 440
        
        var t = sketch.frameCount/3
        var pos = half - t % (half/3) 

        sketch.stroke(255-greenValue, 255, 255-greenValue-redValue, 30)

        
        sketch.stroke(255, 255, 255, 30)
        sketch.rect(half-zoom(pos), half-zoom(pos), 2*zoom(pos), 2*zoom(pos))
        sketch.rect(half-zoom(pos*2/3), half-zoom(pos*2/3), 2*zoom(2/3*pos), 2*zoom(2/3*pos))
        sketch.stroke(255, 255, 255, sketch.min(t % (half/3), 30))
        sketch.rect(half-zoom(pos*4/9), half-zoom(pos*4/9), 2*zoom(4/9*pos), 2*zoom(4/9*pos))

        sketch.background(0, 0, 0, 10);

        
    }
}

var boxSize = 120
var boxVelocity = 0
var greenValue = 0
var redValue = 0
var velocity = 0
var position = 0
var currentAge = 5
var displayAge = currentAge
var yellowWidth = 4
var dropVelocity = 0
var life = 2
var s2 = function (sketch) {


    sketch.setup = function () {
        let canvas2 = sketch.createCanvas(440, 440, sketch.WEBGL)
        canvas2.parent('sketch_cube')
        sketch.specularMaterial(250)
        sketch.noStroke();
        
        

    }

    sketch.draw = function () {

        greenValue = Math.max(0, greenValue-3)
        redValue = Math.max(0, redValue-3)
        sketch.pointLight(redValue, greenValue, 13, 0, 0, 255)

        position += velocity*0.1
        velocity -= 0.5*position*0.1
        velocity /= 1.03

        // Rotate the coordinates.
        sketch.rotateX(position)

        // Draw the box.
        boxVelocity = Math.max(-20, boxVelocity-0.23)
        boxSize = Math.max(120, boxSize+boxVelocity)
        sketch.box(boxSize);
    }
    
}

onCorrect = function() {
    p51.background(0, 100, 0)
    greenValue = 255
    redValue = 0
    velocity = -3
    life = 2

}

onWrong = function() {
    console.log(life)
    if(life < 2) {
        onCollapse()
        return
    }
    p51.background(100, 100, 0)
    p52.background(100, 100, 0)
    greenValue = 400
    redValue = 400
    yellowWidth = 40
    dropVelocity = 0.1
    boxVelocity = 3
    velocity += -0.5
    life --
}

onCollapse = function() {
    console.log(life)
    triggerNext()
    p51.background(160, 0, 0)
    p52.background(160, 0, 0)
    greenValue = 0
    redValue = 800

    dropVelocity = 0.3
    boxVelocity = 10
    life = 2
}


var p51 = new p5(s1, "canvas")
var p52 = new p5(s2, "canvas2")

var s3 = function (sketch) {


    sketch.setup = function () {
        let canvas3 = sketch.createCanvas(120, 450)
        canvas3.parent('canvas_2')
        sketch.background(255,255,255)
        sketch.ellipseMode(sketch.RADIUS)
    }

    sketch.draw = function () {
        displayAge = Math.max(displayAge-dropVelocity, nextAgeYellow[currentAge])
        drawCircle(currentAge, displayAge)
    }
    
}

var p53 = new p5(s3, "canvas3")
var nextAgeGreen = [2,2,3,5,6,6,7,7]
var nextAgeYellow = [1,1,2,3,3,3,4,4]
var nextAgeRed = [0,0,1,1,2,2,3,3]

drawCircle = function(age, dage) {
    p53.background(0)
    p53.noStroke()
    p53.fill(255, 255, 255, 188)
    p53.beginShape()
    p53.vertex(0, 450)
    for(var x = 0; x < 120; x++){ 
        var angle = (p53.frameCount*0.01)%(Math.PI*2) + x * 0.06
        var y = p53.map(Math.sin(angle), -1, 1, 450-10-(dage*55+20), 450+10-(dage*55+20))
        p53.vertex(x, y)
    }
    p53.vertex(120, 450)
    p53.endShape()
    
    p53.fill(255, 255, 255, 66)
    p53.beginShape()
    p53.vertex(0, 450)
    for(var x = 0; x < 120; x++){ 
        var angle = (-p53.frameCount*0.01)%(Math.PI*2) + x * 0.06
        var y = p53.map(Math.cos(angle), -1, 1, 450+10-(dage*55+20), 450-10-(dage*55+20))
        p53.vertex(x, y)
    }
    p53.vertex(120, 450)

    p53.endShape()

    p53.strokeWeight(4);
    p53.stroke(255, 0, 0, 60)
    p53.line(0, 450-20-55*nextAgeRed[age], 120, 450-20-55*nextAgeRed[age])
    
    p53.strokeWeight(yellowWidth);
    yellowWidth = Math.max(4, yellowWidth-0.5)
    p53.stroke(255, 255, 0, 60)
    p53.line(0, 450-20-55*nextAgeYellow[age], 120, 450-20-55*nextAgeYellow[age])
    
    p53.strokeWeight(4);
    p53.stroke(0, 255, 0, 60)
    p53.line(0, 450-20-55*nextAgeGreen[age], 120, 450-20-55*nextAgeGreen[age])
}