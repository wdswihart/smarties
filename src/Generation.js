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

// DEPENDENCIES:
// p5.js

function Generation(size = 25, lifespan = 100) {
    // FIELDS:

    this.rockets = [];
    this.size = size;
    this.lifespan = lifespan;
    this.age = 0; // Current iteration

    // INITIALIZATION:

    // Init rockets.
    for (var i = 0; i < this.size; i++) {
        this.rockets[i] = new Rocket(lifespan);
    }

    // METHODS:

    // show draws the rockets.
    // IN: void
    // OUT: void
    this.show = function() {
        for (var i = 0; i < this.size; i++) {
            this.rockets[i].show();
        }
    }

    // update updates the rockets.
    // IN: void
    // OUT: void
    this.update = function() {
        if (this.age < this.lifespan) {
            for (var i = 0; i < this.size; i++) {
                this.rockets[i].applyForce(this.rockets[i].moves[this.age]);
                this.rockets[i].update();
            }
            this.age++;
        }
    }
}
