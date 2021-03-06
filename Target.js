// Target.js is an implementation of a target (think "bullseye").
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

function Target(x = width / 20, y = width / 20, radius = 30) {
    // FIELDS:

    this.position = createVector(x, y);
    this.radius = radius;

    // INITIALIZATION:

    this.show = function() {
        ellipseMode(CENTER);
        fill(150);
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
        fill(240);
        ellipse(this.position.x, this.position.y, 0.66 * this.radius, 0.66 * this.radius);
        fill(255, 0, 0);
        ellipse(this.position.x, this.position.y, 0.33 * this.radius, 0.33 * this.radius);
    }

    // METHODS:

    // randomize randomizes the location of the target.
    this.randomize = function(canvasWidth, canvasHeight, buffer) {
        this.position.x = random(buffer, canvasWidth - buffer);
        this.position.y = random(buffer, canvasHeight - buffer);
    }
}
