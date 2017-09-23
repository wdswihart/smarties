// main.js contains the primary logic of Smarties, a smart rocket demo.
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
//
// DEPENDENCIES:
// - p5.js

// VARIABLE DECLARATION:

let TARGET_SHIFT_TIME = 50;
let count = 0;

let NUM_ROCKETS = 100; // Total amount of rockets
let LIFESPAN = 100; // How many frames to run each generation for
var generation;// First gen of rockets
var currentGeneration = 1; // Count for generations
var target; // The target for the rockets to aim for
let TARGET_SCALAR = 0.05;
var titleP; // <p> for a title, and maybe some basic info
var numRocketsP; // <p> for number of rockets
var generationP; // <p> for currentGeneration
var ageP; // <p> containing age of current generation
var successP; // <p> with last generation's success count

var newMoves;
var nextGeneration;

// FUNCTIONS:

// naturalSelection picks parents from the mating pool and produces children.
    // IN: void
    // OUT: void
    function selection() {
        nextGeneration = [];
    
        for (var i = 0; i < NUM_ROCKETS; i++) {
            var parent1 = random(generation.matingPool);
            var parent2 = random(generation.matingPool);
            newMoves = parent1.crossover(parent2.moves);
            nextGeneration.push(new Rocket(LIFESPAN, newMoves));
        }
    
        generation = new Generation(NUM_ROCKETS, LIFESPAN, nextGeneration);
        currentGeneration++;
    }

// MAIN:

function setup() {
    // Create the canvas.
    createCanvas(640, 480);

    // Init first generation and the target.
    generation = new Generation(NUM_ROCKETS, LIFESPAN);
    target = new Target(width / 5, height / 3, TARGET_SCALAR * width);

    // Init the DOM elements, the labels.
    titleP = createP();
    titleP.style("text-decoration", "underline");
    titleP.html("<strong>SMARTIES</strong><br />");
    numRocketsP = createP();
    numRocketsP.html("Number of rockets: <strong>" + NUM_ROCKETS + "</strong>");
    generationP = createP();
    ageP = createP();
    successP = createP();
    successP.html("Successes last generation: <strong>0</strong>");
}

function draw() {
    // Draw the background.
    background(0);

    // Evaluate, then update and show the generation.
    generation.evaluate(target);
    generation.update();
    generation.show();

    // Show the target.
    target.show();

    // Update the DOM elements.
    generationP.html("Generation: <strong>" + currentGeneration + "</strong>")
    ageP.html("Age: <strong>" + generation.age + "</strong>");

    // Spawn next generation if lifespan over.
    if (generation.age >= LIFESPAN) {
        successP.html("Successes last generation: <strong>" + generation.countSuccesses() + "</strong>")
        generation.createMatingPool();
        selection();
        count++;
    }

    // If time to shift the target, do the thing.
    if (count >= TARGET_SHIFT_TIME) {
        count = 0;
        target = new Target(random())
    }
}
