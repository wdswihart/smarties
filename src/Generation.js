// Generation.js is an implementation of a generation of rockets.
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

function Generation(numRockets = 25, lifespan = 100, rockets = [], mutationRate = 0.0025, ) {
    // FIELDS:

    this.rockets = [];
    this.numRockets = numRockets;
    this.lifespan = lifespan; // Number of iterations
    this.age = 0; // Current iteration
    this.matingPool = []; // Pool to generate new generation from
    this.matingPoolScalar = 100; // Scalar for number of mates
    this.maxFitness = 0; // Maximum fitness value

    // INITIALIZATION:

    // Init rockets.
    if (rockets.length == 0) {
        for (var i = 0; i < this.numRockets; i++) {
            this.rockets.push(new Rocket(lifespan, mutationRate));
        }
    } else {
        this.rockets = rockets;
    }

    // METHODS:

    // evaluate calculates the rockets' fitness and generates the mating pool.
    // IN: void
    // OUT: fitness of each rocket set based on target
    this.evaluate = function(target) {
        // Calculate fitness of rockets.
        this.maxFitness = 0;

        for (var i = 0; i < this.numRockets; i++) {
            this.rockets[i].calcFitness(target, this.age);
            
            if (this.rockets[i].fitness > this.maxFitness) {
                this.maxFitness = this.rockets[i].fitness;
            }
        }

        // Normalize fitness.
        for (var i = 0; i < this.numRockets; i++) {
            if (this.rockets[i].fitness != 0) {
                this.rockets[i].fitness /= this.maxFitness;                
            }
        }
    }

    // createMatingPool creates the mating pool based on fitness.
    // IN: void
    // OUT: void
    this.createMatingPool = function() {
        this.matingPool = [];
        
        for (var i = 0; i < this.numRockets; i++) {
            var n = this.rockets[i].fitness * this.matingPoolScalar;
            
            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }

    // countSuccesses returns number of successful rockets.
    // IN: void
    // OUT: number of successful rockets.
    this.countSuccesses = function() {
        var successes = 0;

        for (var i = 0; i < this.rockets.length; i++) {
            if (this.rockets[i].isSuccessful) {
                successes++;
            }
        }

        return successes;
    }

    // update updates the rockets.
    // IN: void
    // OUT: void
    this.update = function() {
        for (var i = 0; i < this.numRockets; i++) {
            //console.log(this.rockets[i].moves[this.age]);
            this.rockets[i].applyForce(this.rockets[i].moves[this.age]);
            this.rockets[i].update();
        }
        this.age++;
    }

    // show draws the rockets.
    // IN: void
    // OUT: void
    this.show = function() {
        for (var i = 0; i < this.numRockets; i++) {
            this.rockets[i].show();
        }
    }
}
