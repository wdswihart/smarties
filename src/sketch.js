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

var targetShiftEpoch = 15; // How many generations until the target shifts
var generationsElapsed = 0; // Elapsed generations, counting til EPOCH
var epochsElapsed = 0;

var numRockets = 50; // Total amount of rockets
var lifespan = 100; // How many frames to run each generation for
var mutationRate = 0.0025 // How likely rockets are to mutate
var generation;// First gen of rockets
var currentGeneration = 1; // Count for generations
var maxSuccess = "0%"; // Current generation's max success

var target; // The target for the rockets to aim for
var targetScale = 0.05; // Scale for target radius

var titleP; // <p> for a title, and maybe some basic info
var numRocketsP; // <p> for number of rockets
var lifespanP; // <p> for lifespan of generations
var mutationRateP; // <p> for mutation rate of rockets
var targetScaleP; // <p> for target radius scale
var targetShiftEpochP; // <p> for target shift epoch
var epochP; // <p> for counter of epochs
var ageP; // <p> containing age of current generation
var generationP; // <p> for current generation aiming at a given target
var successP; // <p> with last generation's success count
var maxSuccessP; // <p> with best success so far and at what age

var numRocketsInput; // <slider> for number of rockets
var lifespanInput; // <slider> for generation lifespan
var mutationRateInput; // <slider> for rocket mutation rate
var targetScaleInput; // <slider> for target radius scale
var targetShiftEpochInput; // <input> for target shift epoch
var restartButton; // <button> to restart the simulation

var newMoves; // New set of moves for child rocket
var nextGeneration; // Next generation of rockets

// FUNCTIONS:

// naturalSelection picks parents from the mating pool and produces children.
// IN: void
// OUT: void
function selection() {
    nextGeneration = [];

    generation.createMatingPool();

    for (var i = 0; i < numRockets; i++) {
        var parent1 = random(generation.matingPool);
        var parent2 = random(generation.matingPool);
        newMoves = parent1.crossover(parent2.moves);
        nextGeneration.push(new Rocket(lifespan, mutationRate, newMoves));
    }

    if (lifespan <= 0) {
        lifespan = 1;
    }

    if (numRockets <= 0) {
        numRockets = 1;
    }

    generation = new Generation(numRockets, lifespan, nextGeneration);
    currentGeneration++;
    generationsElapsed++;
}

// resetStats sets the tracked stats back to default values.
// IN: void
// OUT: void
function resetStats() {
    currentGeneration = 1;
    generation.age = 0;
    epochsElapsed = 0;
    epochP.html("Epochs elapsed: <strong>0</strong>");
    maxSuccess = 0;
    maxSuccessP.html("Max success this epoch -- At this generation: <strong>0% -- 0</strong>");
}

// MAIN:

function setup() {
    // Create the canvas.
    createCanvas(640, 480);

    // Init first generation and the target.
    generation = new Generation(numRockets, lifespan);
    target = new Target(width / 2, height / 15, targetScale * width);

    // Init the DOM elements.
    titleP = createP("<strong>SMARTIES</strong><br />");
    titleP.style("text-decoration", "underline");    
    numRocketsP = createP("Number of rockets:");
    lifespanP = createP("Rocket lifespan:");
    mutationRateP = createP("Rocket mutation rate:");
    targetScaleP = createP("Target radius scale:");
    targetShiftEpochP = createP("Target shift epoch:");
    epochP = createP("Epochs elapsed: <strong>" + epochsElapsed + "</strong>");
    ageP = createP("Age: <strong>" + generation.age + "</strong>");
    generationP = createP("Current generation: <strong>" + currentGeneration + "</strong>");
    successP = createP("Successes last generation: <strong>0%</strong>");
    maxSuccessP = createP("Max success this epoch -- At this generation: <strong>0% -- 0</strong>");

    numRocketsInput = createInput(numRockets);
    numRocketsInput.input(function () {
        numRockets = numRocketsInput.value();
        resetStats();
    });
    numRocketsP.child(numRocketsInput);

    lifespanInput = createInput(lifespan);
    lifespanInput.input(function () {
        lifespan = lifespanInput.value();
        resetStats();
    });
    lifespanP.child(lifespanInput);

    mutationRateInput = createInput(mutationRate);
    mutationRateInput.input(function () {
        mutationRate = mutationRateInput.value();
        resetStats();
    });
    mutationRateP.child(mutationRateInput);

    targetScaleInput = createInput(targetScale);
    targetScaleInput.input(function () {
        targetScale = targetScaleInput.value();
        resetStats();
    });
    targetScaleP.child(targetScaleInput);

    targetShiftEpochInput = createInput(targetShiftEpoch);
    targetShiftEpochInput.input(function () {
        targetShiftEpoch = targetShiftEpochInput.value();
        resetStats();
    });
    targetShiftEpochP.child(targetShiftEpochInput);
}

function draw() {
    // Draw the background.
    background(0);

    // Evaluate, then update and show the generation.
    generation.evaluate(target);
    generation.update();
    generation.show();    
    ageP.html("Age: <strong>" + generation.age + "</strong>");
    generationP.html("Current generation: <strong>" + currentGeneration + "</strong>");

    // Show the target.
    target.show();

    // Spawn next generation if lifespan over.
    if (generation.age >= lifespan) {
        let SUCCESSES = (generation.countSuccesses() / numRockets) * 100;

        successP.html("Successes last generation: <strong>" + SUCCESSES + "%</strong>")
        
        if (SUCCESSES > maxSuccess) {
            maxSuccess = SUCCESSES;
            maxSuccessP.html(
                "Max success this epoch -- At this generation: <strong>" + 
                maxSuccess +
                "% -- " +
                (generationsElapsed + 1) +
                "</strong>"
            );
        }

        // Perform selection on the generation of rockets.
        selection();

        // Shift target if the time is right.
        if (generationsElapsed >= targetShiftEpoch && targetShiftEpoch > 0) {
            generationsElapsed = 0;
            epochsElapsed++;
            maxSuccessP.html(
                "Max success this epoch -- At this generation: <strong>0% -- 0</strong>"
            );
            maxSuccess = 0;
            currentGeneration = 1;
            
            // Check if targetScale is in bounds:
            if (targetScale <= 0) {
                targetScale = 0.05;
            }

            let BUFFER = targetScale * width + 10; // Radius plus some buffer

            target.randomize(width, height, BUFFER); // Randomize target location.

            // Update epoch element.
            epochP.html("Epochs elapsed: <strong>" + epochsElapsed + "</strong>")
        }
    }
}
