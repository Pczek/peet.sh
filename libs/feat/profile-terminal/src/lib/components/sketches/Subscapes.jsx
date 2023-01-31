import React from "react";
import Sketch from "react-p5";

let start = 0
let end = 0
let blue;
let green;
let color;
let step;
let foundationHeight = -10;
const SketchTemplate = (props) => {
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(630, 891, p5.WEBGL).parent(canvasParentRef);
        start = (-1 * (p5.width / 2)) + p5.width * 0.15
        end = p5.width * 0.35

        blue = p5.map(p5.random(), 0, 1, 0, 255);
        green = p5.map(p5.random(), 0, 1, 0, 255);
        p5.noStroke()
        p5.background(255);
        p5.noiseDetail(2, 0.2)

        p5.noLoop();
        step = 3
    };

    const draw = (p5) => {

        p5.fill(0);

        p5.push();
        p5.translate(0, 0, -200)

        p5.rotateX(-1 * p5.PI / 6.0);
        p5.rotateY(p5.PI / 4);



        for (let z = start; z < end; z += step) {
            p5.push()
            p5.translate(0, 0, z)
            for (let x = start; x < end; x += step) {
                const rValue = p5.map(z, start, end, 0, 255);
                const color = p5.color(green, rValue, blue)

                p5.fill(color);

                const value = p5.noise((x + start) / 100, (z + start) / 100)
                const mappedValue = p5.map(value, 0, 1, 0, p5.height / 3)



                // Height
                p5.push()
                p5.translate(x, -1 * mappedValue);


                if (x === start) {
                    p5.push()
                    p5.translate(0, foundationHeight / 2 + mappedValue / 2, 0);
                    p5.plane(1, foundationHeight + mappedValue, 1)
                    p5.pop()
                }

                if (z + step >= end) {
                    p5.push()
                    p5.translate(0, foundationHeight / 2 + mappedValue / 2, 0);
                    p5.plane(1, foundationHeight + mappedValue, 1)
                    p5.pop()
                }



                // Stelze
                if (x === start && z === start || (x + step) >= end && (z + step) >= end || x === start && (z + step) >= end) {
                    p5.push()
                    p5.translate(0, foundationHeight / 2 + mappedValue / 2, 0);
                    p5.plane(1, foundationHeight + mappedValue, 1)
                    p5.pop()
                }

                p5.box(1)

                p5.pop()
            }
            p5.pop()
        }
        p5.pop()


    };

    return <Sketch setup={setup} draw={draw} />;
};

export default SketchTemplate