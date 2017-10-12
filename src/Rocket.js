// Rocket.js is an implementation of a single "smart" rocket.
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

// CLASSES:

function Rocket(numMoves = 100, mutationRate = 0.0025, moves = []) {
    // FIELDS:

    this.MUTATE = true;
    this.mutationRate = mutationRate;
    this.position = createVector(width / 2, height - 5); // Start at bottom center.
    this.velocity = createVector();
    this.acceleration = createVector();
    this.accelerationScalar = 0.7;
    this.width = 10;
    this.height = 25;
    this.moves = [];
    this.fitness = 0;
    this.isSuccessful = false;
    
    // INITIALIZATION:

    // Init moves.
    if (moves.length == 0) {
        for (var i = 0; i < numMoves; i++) {
            this.moves.push(p5.Vector.random2D());
        }
    } else {
        this.moves = moves;
    }

    // METHODS:

    // calcFitness sets fitness based on distance to a target.
    // IN: target with a position (x, y)
    // OUT: fitness set to (1 / distance to that target)
    this.calcFitness = function(target, age) {
        if (!this.isSuccessful) {
            var distance = dist(this.position.x, this.position.y, target.position.x, target.position.y);
            
            if (distance < target.radius - (this.height / 3)) {
                this.isSuccessful = true;
                this.fitness = 1 / age;
            } else {
                this.fitness = 1 / (distance * age);
            }
        }
    }

    // mutate randomly changes moves.
    // IN: void
    // OUT: changed moves
    this.mutate = function(moves) {
        var vals = [0, 1, -1];

        for (var i = 0; i < moves.length; i++) {
            if (random() < this.mutationRate) {
                moves[i] = p5.Vector.random2D();
            }
        }

        return moves;
    }

    // crossover scrambles two movesets together to produce a new set.
    // IN: a rocket moveset
    // OUT: a new moveset
    this.crossover = function(moves) {
        var newMoves = [];

        for (var i = 0; i < moves.length && i < this.moves.length; i++) {
            if (i % 2 == 0) {
                newMoves.push(this.moves[i]); // Pick from self.
            } else {
                newMoves.push(moves[i]); // Pick from partner.
            }
        }

        if (this.MUTATE) {
            return this.mutate(newMoves); // Mutate moves before returning.
        } else {
            return newMoves;
        }
    }
    
    // applyForce increases acceleration by some force.
    // IN: a force
    // OUT: updated acceleration
    this.applyForce = function(force) {
        this.acceleration.add(force);
        this.acceleration.setMag(this.accelerationScalar); // Reduce it just a bit.
    }

    // update updates velocity, position, and acceleration.
    // IN: void
    // OUT: updated velolcity, position, and acceleration 
    this.update = function() {
        if (!this.isSuccessful) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0); // Reset acceleration.
        }
    }

    // show draws this rocket.
    // IN: void
    // OUT: void
    this.show = function() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading() + radians(90));
        rectMode(CENTER);
        fill(180, 180, 180);
        rect(0, 0, this.width, this.height);
        rectMode(CENTER);
        fill(255, 90, 30);
        rect(0, this.height * 0.78, this.width * 0.7, this.height * 0.5)
        pop();
    }
}
