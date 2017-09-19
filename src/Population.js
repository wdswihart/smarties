// Population.js is the implementation of a group of rockets.
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

function Population(size = 25, rocketMoves = 100) {
    // FIELDS:

    this.rockets = [];
    this.size = size;

    // INIT:

    for (var i = 0; i < this.size; i++) {
        this.rockets[i] = new Rocket(rocketMoves);
    }

    // METHODS:

    // Update the rockets.
    // IN: void
    // OUT: void
    this.update = function() {
        for (var i = 0; i < this.size; i++) {
            this.rockets[i].applyForce(this.rockets[i].moves[])
            this.rockets[i].update();
        }
    }

    // Show the rockets.
    // IN: void
    // OUT: void
    this.show = function() {
        for (var i = 0; i < this.size; i++) {
            this.rockets[i].show();
        }
    }
}
