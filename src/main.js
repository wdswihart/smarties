// main.js contains the primary logic
// of Smarties, a smart rocket implementation.
//
// Copyright (c) 2017 William Swihart
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// DEPENDENCIES:
// - p5.js

// MAIN:

var population; // A population of rockets
const MAX_FRAMES = 500; // Max frames to animate
var currentFrame = 0;
var titleP; // <p></p> for a title, and maybe some basic info.
var frameP; // <p></p> containing frame of current generation.

// SETUP & DRAW (p5.js):

function setup() {
    // Create the canvas.
    createCanvas(640, 480);
    
    // Create the population of rockets.
    population = new Population(10, MAX_FRAMES);

    // Create the frame <p></p>.
    frameP = createP();
}

function draw() {
    // Fill the background.
    background(0);

    // Update and show the population.
    population.update();
    population.show();

    // Update frame display, then incriment the frame.
    frameP.html("Frame: <strong>" + currentFrame + "</strong>");
    currentFrame++;
}
