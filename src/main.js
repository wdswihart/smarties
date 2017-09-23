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

let TARGET_SHIFT_EPOCH = 15; // How many generations until the target shifts
var generationsElapsed = 0; // Elapsed generations, counting til EPOCH
var epochsElapsed = 0;

let NUM_ROCKETS = 50; // Total amount of rockets
let LIFESPAN = 100; // How many frames to run each generation for
var generation;// First gen of rockets
var currentGeneration = 1; // Count for generations
var maxSuccess = 0; // Current generation's max success

var target; // The target for the rockets to aim for
let TARGET_SCALAR = 0.05;

var titleP; // <p> for a title, and maybe some basic info
var numRocketsP; // <p> for number of rockets
var epochP; // <p> for counter of epochs
var ageP; // <p> containing age of current generation
var generationP; // <p> for current generation aiming at a given target
var successP; // <p> with last generation's success count
var maxSuccessP; // <p> with best success so far and at what age

var newMoves; // New set of moves for child rocket
var nextGeneration; // Next generation of rockets

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
}

// MAIN:

function setup() {
    // Create the canvas.
    createCanvas(640, 480);

    // Init first generation and the target.
    generation = new Generation(NUM_ROCKETS, LIFESPAN);
    target = new Target(width / 2, height / 15, TARGET_SCALAR * width);

    // Init the DOM elements, the labels.
    titleP = createP();
    titleP.style("text-decoration", "underline");
    titleP.html("<strong>SMARTIES</strong><br />");
    numRocketsP = createP();
    numRocketsP.html("Number of rockets: <strong>" + NUM_ROCKETS + "</strong>");
    epochP = createP();
    epochP.html("Epochs elapsed: <strong>0</strong>");
    ageP = createP();
    generationP = createP();
    successP = createP();
    successP.html("Successes last generation: <strong>0</strong>");
    maxSuccessP = createP();
    maxSuccessP.html("Max success this epoch -- At this generation: <strong>0 -- 0</strong>");
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
    ageP.html("Age: <strong>" + generation.age + "</strong>");
    generationP.html("Generation: <strong>" + (generationsElapsed + 1) + "</strong>")

    // Spawn next generation if lifespan over.
    if (generation.age >= LIFESPAN) {
        let SUCCESSES = generation.countSuccesses();

        successP.html("Successes last generation: <strong>" + SUCCESSES + "</strong>")
        
        if (SUCCESSES > maxSuccess) {
            maxSuccess = SUCCESSES;
            maxSuccessP.html(
                "Max success this epoch -- At this generation: <strong>" + 
                maxSuccess +
                " -- " +
                (generationsElapsed + 1) +
                "</strong>"
            );
        }

        generation.createMatingPool();
        selection();
        currentGeneration++;
        generationsElapsed++;

        // Shift target if the time is right.
        if (generationsElapsed >= TARGET_SHIFT_EPOCH) {
            generationsElapsed = 0;
            epochsElapsed++;
            epochP.html("Epochs elapsed: <strong>" + epochsElapsed + "</strong>");
            maxSuccessP.html(
                "Max success this epoch -- At this generation: <strong>0 -- 0</strong>"
            );
            maxSuccess = 0;
            
            let BUFFER = TARGET_SCALAR * width + 10; // Radius plus some buffer

            target.randomize(width, height, BUFFER); // Randomize target location.
        }
    }
}
