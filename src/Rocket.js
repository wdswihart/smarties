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

// DEPENDENCIES:
// p5.js

// CLASSES:

function Rocket(numMoves = 100) {
    // FIELDS:

    this.position = createVector(width / 2, height - 5); // Start at bottom center.
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.width = 10;
    this.height = 25;
    this.moves = [];
    
    // INITIALIZATION:

    // Init moves.
    for (var i = 0; i < numMoves; i++) {
        this.moves[i] = p5.Vector.random2D();
        this.moves[i].setMag(0.3); // Reduce the velocity.
    }

    // METHODS:

    // applyForce increases acceleration by some force.
    // IN: a force
    // OUT: updated acceleration
    this.applyForce = function(force) {
        this.acceleration.add(force);
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

    // update updates velocity, position, and acceleration.
    // IN: void
    // OUT: updated velolcity, position, and acceleration 
    this.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0); // Reset acceleration. TO-DO: Gravity?
    }
}
