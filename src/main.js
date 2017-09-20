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

const NUM_ROCKETS = 15; // Total amount of rockets
const LIFESPAN = 200; // How many frames to run each generation for
var generation; // Current generation of rockets
var currentGeneration = 0; // Count for generations
var target; // The target for the rockets to aim for
var titleP; // <p> for a title, and maybe some basic info.
var generationP; // <p> for currentGeneration
var ageP; // <p> containing age of current generation.

// SETUP & DRAW (p5.js):

function setup() {
    // Create the canvas.
    createCanvas(640, 480);
    
    // Create the first generation of rockets.
    nextGeneration();

    // Init the target's location.
    target = new Target(width / 2, height / 20);

    // Create the DOM elements, the labels.
    titleP = createP();
    titleP.style("text-align", "center");
    titleP.style("text-decoration", "underline");
    titleP.html("<strong>SMARTIES</strong>");
    generationP = createP();
    generationP.style("text-align", "center");
    ageP = createP();    
    ageP.style("text-align", "center");
}

function draw() {
    // Fill the background.
    background(0);

    // Update and show the generation.
    generation.update();
    generation.show();

    // Show the target.
    target.show();

    // Update the DOM elements.
    generationP.html("Generation: <strong>" + currentGeneration + "</strong>")
    ageP.html("Age: <strong>" + generation.age + "</strong>");

    // Spawn next generation if lifespan over.
    if (generation.age >= LIFESPAN) {
        nextGeneration();
    }
}

// METHODS:

function nextGeneration() {
    generation = new Generation(NUM_ROCKETS, LIFESPAN);
    currentGeneration++;
}
