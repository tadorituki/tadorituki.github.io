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

var greenValue = 0
var redValue = 0
var velocity = 0
var position = 0
var s2 = function (sketch) {


    sketch.setup = function () {
        let canvas2 = sketch.createCanvas(250, 250, sketch.WEBGL)
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
        sketch.box(120);
    }
    
}

onCorrect = function() {
    p51.background(0, 100, 0)
    greenValue = 255
    redValue = 0
    velocity = -3

}

onWrong = function() {
    p51.background(100, 100, 0)
    p52.background(100, 100, 0)
    greenValue = 400;
    redValue = 400;
}



var p51 = new p5(s1, "canvas")
var p52 = new p5(s2, "canvas2")
