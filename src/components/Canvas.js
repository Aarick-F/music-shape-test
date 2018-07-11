import React, { Component } from "react";
import Tone from "tone";

const synth = new Tone.Synth();
synth.toMaster();

const notes = [
  "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"
];

let circles = [];
const colors = [
  "#3B9994", "#8BCCC9", "#C8FFDD",
  "#FF88AE", "#CC6CBB", "#F20574",
  "#2A1673", "#81006E", "#F2F0C9",
  "#F25C5C"
];

let step = 0;
const getNote = () => {
  let note = notes[step];
  step++;
  if(step >= notes.length) {
    step = 0;
  }
  return note;
}

class Circle {
  constructor(coords, radius, dx, dy) {
    this.x = coords.x;
    this.y = coords.y;
    this.radius = radius;
    this.dx = this.getVelocity();
    this.dy = this.getVelocity();;
    this.color = this.getColor();
  }

  draw(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(this.x, this.y - 120, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update(canvas) {
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      // LOGIC TO PLAY SOUND GOES HERE
      synth.triggerAttackRelease(getNote(), "32n");
    }
    this.x += this.dx;
    if(this.y - (this.radius + (this.radius * 1.25)) > canvas.height || this.y - (this.radius + (this.radius * 1.75)) < 0) {
      this.dy = -this.dy;
      // LOGIC TO PLAY SOUND GOES HERE
      synth.triggerAttackRelease(getNote(), "32n");
    }
    this.y += this.dy;
  }

  getVelocity() {
    let velocity = ((Math.random() * 0.5) * 2) + 1;
    let coinflip = Math.floor(Math.random() * 2);
    return coinflip === 0 ? velocity : -velocity;
  }

  getColor() {
    let picker = Math.floor(Math.random() * colors.length);
    return colors[picker];
  }
}

class Canvas extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.myCanvas.height = this.boxSize.clientHeight;
    this.myCanvas.width = this.boxSize.clientWidth;
    this.animate();
  }

  handleClick(e) {
    let location = {
      x: e.clientX,
      y: e.clientY
    }
    let newCircle = new Circle(location, 40);
    circles.push(newCircle);
  }

  animate() {
    requestAnimationFrame(this.animate);
    let c = this.myCanvas.getContext("2d");
    c.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    circles.forEach(circle => {
      circle.draw(this.myCanvas);
      circle.update(this.myCanvas);
    });
  }

  render() {
    return (
      <div className="canvasWrapper" ref={boxSize => this.boxSize = boxSize}>
        <canvas ref={myCanvas => this.myCanvas = myCanvas} onClick={this.handleClick}></canvas>
      </div>
    );
  }
}

export default Canvas;