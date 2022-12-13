// https://observablehq.com/@e7dal/repeatable-sounds@1738
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Repeatable Sounds
 
this is a modified version of the excellent https://observablehq.com/@freedmand/sounds


main difference is in the SoundBuffer class, i just added a new button ↻ which will repeat the sound

all the comments and explanations have been removed to make is shorter...

For more experimental and repeatable sounds, check out [part two](https://observablehq.com/@e7dal/repeatable-sounds-part-two)`
)}

function _sineFrequency(slider){return(
slider({
  min: 40, 
  max: 22000, 
  step: 1, 
  value: 440, 
  title: 'Sine wave frequency (Hz)', 
  description: 'Drag to change the frequency. Listen to the sound with the player below.'
})
)}

function _3(Play,sineFrequency){return(
Play((t) => Math.sin(sineFrequency * t * 2 * Math.PI))
)}

function _4(ShowDivs,Play){return(
ShowDivs([300, 400, 500].map((freq) => Play((t) => Math.sin(freq * t * 2 * Math.PI))))
)}

function _5(md){return(
md`And here's one waveform containing all these sine waves together:`
)}

function _6(Play){return(
Play((t) => Math.sin(300 * t * 2 * Math.PI) + Math.sin(400 * t * 2 * Math.PI) + Math.sin(500 * t * 2 * Math.PI))
)}

function _7(Draw){return(
Draw((t) => t * 15 % 2 - 1)
)}

function _sawtoothFrequency(slider){return(
slider({
  min: 40, 
  max: 2000, 
  step: 1, 
  value: 330, 
  title: 'Sawtooth wave frequency (Hz)', 
  description: 'Drag to change the frequency. Listen to the sound with the player below.'
})
)}

function _9(Play,sawtoothFrequency){return(
Play((t) => (2 * sawtoothFrequency * t) % 2 - 1)
)}

function _sawtoothHarmonics(slider){return(
slider({
  min: 1, 
  max: 30, 
  step: 1, 
  value: 0, 
  title: 'Number of harmonics', 
  description: 'Sine waves are added to create a sawtooth wave'
})
)}

function _11(Draw,sum,sawtoothHarmonics){return(
Draw((t) => (-2 / Math.PI) * sum(1, sawtoothHarmonics, (i) => Math.pow(-1, i) * (Math.sin(i * 70 * t) / i)))
)}

function _12(Title,sawtoothHarmonics,Play,sum){return(
Title(`Sawtooth formed from ${sawtoothHarmonics} sine wave${sawtoothHarmonics != 1 ? 's' : ''}`, Play((t) => (-2 / Math.PI) * sum(1, sawtoothHarmonics, (i) => Math.pow(-1, i) * (Math.sin(i * 330 * 2 * Math.PI * t) / i))))
)}

function _13(Title,Play,sum){return(
Title(`Sawtooth formed from 30 sine waves (harmonics 1-30)`, Play((t) => (-2 / Math.PI) * sum(1, 30, (i) => Math.pow(-1, i) * (Math.sin(i * 330 * 2 * Math.PI * t) / i))))
)}

function _14(Title,Play,sum){return(
Title(`Sawtooth formed from 29 sine waves without base frequency (harmonics 2-30)`, Play((t) => (-2 / Math.PI) * sum(2, 30, (i) => Math.pow(-1, i) * (Math.sin(i * 330 * 2 * Math.PI * t) / i))))
)}

function _15(Draw){return(
Draw((t) => (t * 20) % 2 - 1 > 0 ? 1 : -1)
)}

function _squareFrequency(slider){return(
slider({
  min: 40, 
  max: 2000, 
  step: 1, 
  value: 100, 
  title: 'Square wave frequency (Hz)', 
  description: 'Drag to change the frequency. Listen to the sound with the player below.'
})
)}

function _17(Play,squareFrequency){return(
Play((t) => (squareFrequency * t * 2) % 2 - 1 > 0 ? 1 : -1)
)}

function _squareHarmonics(slider){return(
slider({
  min: 1, 
  max: 30, 
  step: 1, 
  value: 1, 
  title: 'Number of odd harmonics', 
  description: 'Sine waves are added to create a square wave'
})
)}

function _19(Title,squareHarmonics,Play,sum){return(
Title(`Square formed from ${squareHarmonics} sine wave${squareHarmonics != 1 ? 's' : ''}`, Play((t) => sum(1, squareHarmonics, (i) => (Math.sin((2 * i - 1) * 330 * 2 * Math.PI * t) / (2 * i - 1)))))
)}

function _20(Play){return(
Play((t) => t < 1 ? ((220 * t * 2) % 2 - 1 > 0 ? 1 : -1) : ((440 * t * 2) % 2 - 1 > 0 ? 1 : -1), 2)
)}

function _21(html,ctx)
{
  const width = 420;
  const keyHeight = 100;
  const height = 120;
  const whiteKeys = 15;
  const blackKeys = [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1];
  const whiteOffsets = blackKeys.reduce((x, y) => x.concat([y + x[x.length - 1] + 1]), [0]);

  const svg = html`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
    xmlns="http://www.w3.org/2000/svg"></svg>`;
  
  function wrap(elem, note) {
    const freq = 440 * Math.pow(2, note / 12);
    // Play a note when clicked.
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    
    elem.style.cursor = 'pointer';
    elem.onclick = () => {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    };
    return elem;
  }
  
  // Draw the white keys.
  for (let i = 0; i <= whiteKeys - 1; i++) {
    svg.appendChild(wrap(html`<svg><rect x="${width * i / whiteKeys}" y="0" width="${width / whiteKeys}" height="${keyHeight}" fill="white" stroke="black" stroke-width="2"/></svg>`, whiteOffsets[i] - 19));
    svg.appendChild(html`<svg><text style="user-select: none;" x="${width * (i + 0.5) / whiteKeys}" y="${keyHeight + 16}" font-family="sans-serif" font-size="12" text-anchor="middle">${String.fromCharCode('A'.charCodeAt(0) + (i + 3) % 7)}</text></svg>`);
  }
  // Draw the black keys.
  for (let i = 0; i <= whiteKeys - 2; i++) {
    if (blackKeys[i] == 1) {
      svg.appendChild(wrap(html`<svg><rect x="${width * ((i + 0.65) / whiteKeys)}" y="0" width="${width / whiteKeys * 0.7}" height="${keyHeight * 0.55}" fill="black" stroke="black" stroke-width="2"/></svg>`, whiteOffsets[i] - 19 + blackKeys[i]));
    }
  }
  return svg;
}


function _22(Title,Play){return(
Title('Just intonation', Play((t) => (Math.sin(300 * t * 2 * Math.PI) > 0 ? 1 : -1) + (Math.sin(400 * t * 2 * Math.PI) > 0 ? 1 : -1) + (Math.sin(500 * t * 2 * Math.PI) > 0 ? 1 : -1)))
)}

function _23(Title,Play){return(
Title('Equal temperament', Play((t) => (Math.sin(300 * t * 2 * Math.PI) > 0 ? 1 : -1) + (Math.sin(300 * Math.pow(2, 5/12) * t * 2 * Math.PI) > 0 ? 1 : -1) + (Math.sin(300 * Math.pow(2, 9/12) * t * 2 * Math.PI) > 0 ? 1 : -1)))
)}

function _triangleFrequency(slider){return(
slider({
  min: 40, 
  max: 2000, 
  step: 1, 
  value: 600, 
  title: 'Triangle wave frequency (Hz)', 
  description: 'Drag to change the frequency. Listen to the sound with the player below.'
})
)}

function _25(Play,triangleFrequency){return(
Play((t) => Math.abs((2 * triangleFrequency * t) % 2 - 1) - 0.25 * 2)
)}

function _triangleHarmonics(slider){return(
slider({
  min: 1, 
  max: 30, 
  step: 1, 
  value: 1, 
  title: 'Number of odd harmonics', 
  description: 'Sine waves are added to create a triangle wave'
})
)}

function _27(Title,triangleHarmonics,Play,sum){return(
Title(`Triangle formed from ${triangleHarmonics} sine wave${triangleHarmonics != 1 ? 's' : ''}`, Play((t) => sum(1, triangleHarmonics, (i) => -1 * Math.pow(-1, i) * (Math.sin((2 * i - 1) * 330 * 2 * Math.PI * t) / Math.pow(2 * i - 1, 2)))))
)}

function _28(Play)
{
  const notes = [[0, 2, 4, 0], [4, 5, 7], [7, 9, 7, 5, 4, 0], [0, -5, 0]];
  const durations = [[0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 1], [0.25, 0.25, 0.25, 0.25, 0.5, 0.5], [0.5, 0.5, 1]];
  const [baseFreq, releaseTime] = [300, 0.01];
  const frereJacques = (t) => {
    let time = 0;
    for (let bar = 0; bar < notes.length; bar++) {
      for (let repeat = 0; repeat < 2; repeat++) {
        for (let i = 0; i < notes[bar].length; i++) {
          const endTime = time + durations[bar][i];
          if (t >= time && t < endTime - releaseTime) {
            const freq = baseFreq * Math.pow(2, notes[bar][i] / 12);
            return Math.abs(t * freq % 1 - 0.5) - 0.25;
          } else if (t >= endTime - releaseTime && t < endTime) return 0;
          time = endTime;
        }
      }
    }
  };
  const playRound = (t) => {
    let sum = 0;
    while (t >= 0) {
      sum += frereJacques(t);
      t -= 4;
    }
    return sum;
  };
  return Play(playRound, 16);
}


function _ctx(){return(
new (window.AudioContext || window.webkitAudioContext)()
)}

function _Draw(DOM,width){return(
function Draw(genFn, height = 80, color = 'blue') {
  const drawingCtx = DOM.context2d(width, height);
  // Draw a middle line.
  drawingCtx.strokeStyle = 'gainsboro';
  drawingCtx.beginPath();
  drawingCtx.moveTo(0, height / 2);
  drawingCtx.lineTo(width, height / 2);
  drawingCtx.stroke();
  // Draw the waveform.
  drawingCtx.strokeStyle = color;
  drawingCtx.beginPath();
  const values = [];
  let max = 0;
  for (let i = 0; i < width; i++) {
    const value = genFn(i / width);
    if (Math.abs(value) > max) max = Math.abs(value);
    values.push(value);
  }
  for (let i = 0; i < width; i++) {
    const value = values[i] / max;
    const y = height - Math.floor((value / 2 + 0.5) * height * 0.9 + height * 0.05);
    if (i == 0) {
      drawingCtx.moveTo(i, y);
    } else {
      drawingCtx.lineTo(i, y);
    }
  }
  drawingCtx.stroke();
  return drawingCtx.canvas;
}
)}

function _Play(SoundBuffer){return(
function Play(genFn, duration = 1) {
  return new SoundBuffer(genFn, duration).gui();
}
)}

function _Play8Bit(ctx,Play){return(
function Play8Bit(genFn, duration = 1) {
  const fn = (t) => {
    const step = Math.floor(t * ctx.sampleRate);
    let value = genFn(step) | 0;
    // Constrain to 8-bits.
    value = value % 256;
    if (value < 0) value += 256;
    // Convert result to real between -1 and 1.
    value = ((value / 256) - 0.5) * 2;
    return value;
  }
  return Play(fn, duration);
}
)}

function _GenerateTex(tex){return(
function GenerateTex(prefix, generatorFn, iterations, suffix) {
  let equation = prefix;
  for (let i = 0; i < iterations; i++) equation += generatorFn(i);
  equation += suffix;
  const div = document.createElement('div');
  div.style.overflowX = 'scroll';
  div.style.overflowY = 'hidden';
  div.appendChild(tex`${equation}`);
  return div;
}
)}

function _ShowDivs(){return(
function ShowDivs(elems) {
  const div = document.createElement('div');
  elems.forEach((elem) => div.appendChild(elem));
  return div;
}
)}

function _Title(){return(
function Title(title, elem) {
  const div = document.createElement('div');
  const titleElem = document.createElement('div');
  titleElem.style.marginTop = '5px';
  titleElem.style.fontSize = '0.9em';
  titleElem.style.fontStyle = 'italic';
  titleElem.appendChild(document.createTextNode(title));
  div.appendChild(titleElem);
  div.appendChild(elem);
  return div;
}
)}

function _sum(){return(
function sum(start, end, fn) {
  let total = 0;
  for (let i = start; i <= end; i++) {
    total += fn(i);
  }
  return total;
}
)}

function _SoundBuffer(ctx,DOM,genUI,width){return(
class SoundBuffer {
  constructor(genFn, duration = 1) {
    this.duration = duration;
    // Create an audio buffer.
    this.audioBuffer = ctx.createBuffer(
      1,
      ctx.sampleRate * this.duration,
      ctx.sampleRate
    );
    this.buffer = this.audioBuffer.getChannelData(0);
    let max = 0;
    for (let i = 0; i < this.audioBuffer.length; i++) {
      const value = genFn(i / ctx.sampleRate);
      this.buffer[i] = value;
      if (Math.abs(value) > max) max = Math.abs(value);
    }
    for (let i = 0; i < this.audioBuffer.length; i++) {
      this.buffer[i] = this.buffer[i] / max;
    }
  }
  play(maxVol = 0.3) {
    this.stop();
    this.source = ctx.createBufferSource();
    this.source.buffer = this.audioBuffer;
    const gain = ctx.createGain();
    gain.gain.value = maxVol;
    this.source.connect(gain);
    gain.connect(ctx.destination);
    this.source.start();
  }
  stop() {
    if (this.source) this.source.stop();
  }
  draw(height = 50, width = width, color = 'blue') {
    const drawingCtx = DOM.context2d(width, height);
    // Draw the middle line.
    drawingCtx.strokeStyle = 'gainsboro';
    drawingCtx.beginPath();
    drawingCtx.moveTo(0, height / 2);
    drawingCtx.lineTo(width, height / 2);
    drawingCtx.stroke();
    // Draw the waveform.
    drawingCtx.strokeStyle = color;
    drawingCtx.beginPath();
    for (let i = 0; i < width; i++) {
      const value = this.buffer[
        Math.floor((i / width) * this.audioBuffer.length)
      ];
      const y =
        height - Math.floor((value / 2 + 0.5) * height * 0.9 + height * 0.05);
      if (i == 0) {
        drawingCtx.moveTo(i, y);
      } else {
        drawingCtx.lineTo(i, y);
      }
    }
    drawingCtx.stroke();
    return drawingCtx.canvas;
  }
  gui() {
    const ui = genUI(this.duration);
    const cursor = ui.querySelector('.cursor');
    let interval = null;
    let repeat_interval = null;
    let counter = 0;

    const resetInterval = () => {
      if (interval != null) {
        clearInterval(interval);
        interval = null;
      }
    };
    const resetRepeatInterval = () => {
      if (repeat_interval != null) {
        clearInterval(repeat_interval);
        repeat_interval = null;
      }
    };
    const soundPlayer = ui.querySelector('.sound-player');
    const playOnce = () => {
      console.log('playOnce repeat counter:' + counter);
      counter += 1;
      cursor.style.left = '0';
      this.play();
      cursor.style.display = 'block';
      const playTime = Date.now();
      resetInterval();
      interval = setInterval(() => {
        if (!document.contains(soundPlayer)) {
          resetInterval();
          this.stop();
        }
        let progress = (Date.now() - playTime) / this.duration / 1000;
        if (progress < 0) progress = 0;
        if (progress > 1) {
          progress = 1;
          resetInterval();
          this.stop();
          cursor.style.display = 'none';
        }
        cursor.style.left = `${Math.floor(progress * (width - 20))}px`;
      }, 20);
    };

    ui.querySelector('.sound-pane').appendChild(this.draw(46, width - 20));
    ui.querySelector('.repeat-button').onclick = () => {
      //start repeating after duration
      repeat_interval = setInterval(playOnce, 1000 * this.duration);
      //play first, instead of waiting for the first repeat_interterval
      playOnce();
    };

    ui.querySelector('.play-button').onclick = () => {
      playOnce();
    };
    ui.querySelector('.stop-button').onclick = () => {
      resetRepeatInterval();
      resetInterval();
      this.stop();
      cursor.style.display = 'none';
    };
    return ui;
  }
}
)}

function _genUI(html){return(
duration => html`<style>
      .sound-player {
        border: solid 1px gainsboro;
        background: #f5f5f5;
        font-family: sans-serif;
        color: #6f6f6f;
        font-size: 0.8em;
      }

      .sound-pane {
        height: 50px;
        background: white;
        margin: 8px;
        border: solid 1px gainsboro;
        position: relative;
      }

      .icons {
        margin: 0 8px 8px 8px;
      }

	  .icons .button {
         cursor: pointer;
         border: solid 1px transparent;
      }

      .icons .button:hover {
         border: solid 1px gainsboro;
      }

      .cursor {
        background: red;
        width: 2px;
        height: 100%;
        position: absolute;
      }
    </style>
    <div class="sound-player">
      <div class="sound-pane">
        <span class="cursor" style="display: none;"></span>
	  </div>
      <div class="icons">
        <span class="button play-button">▶</span>
        <span class="button stop-button">◼</span>
        <span class="button repeat-button"><b>↻</b></span>
        &nbsp;&nbsp;                
        <span class="duration">${duration} s</span>
      </div>
    </div>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof sineFrequency")).define("viewof sineFrequency", ["slider"], _sineFrequency);
  main.variable(observer("sineFrequency")).define("sineFrequency", ["Generators", "viewof sineFrequency"], (G, _) => G.input(_));
  main.variable(observer()).define(["Play","sineFrequency"], _3);
  main.variable(observer()).define(["ShowDivs","Play"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["Play"], _6);
  main.variable(observer()).define(["Draw"], _7);
  main.variable(observer("viewof sawtoothFrequency")).define("viewof sawtoothFrequency", ["slider"], _sawtoothFrequency);
  main.variable(observer("sawtoothFrequency")).define("sawtoothFrequency", ["Generators", "viewof sawtoothFrequency"], (G, _) => G.input(_));
  main.variable(observer()).define(["Play","sawtoothFrequency"], _9);
  main.variable(observer("viewof sawtoothHarmonics")).define("viewof sawtoothHarmonics", ["slider"], _sawtoothHarmonics);
  main.variable(observer("sawtoothHarmonics")).define("sawtoothHarmonics", ["Generators", "viewof sawtoothHarmonics"], (G, _) => G.input(_));
  main.variable(observer()).define(["Draw","sum","sawtoothHarmonics"], _11);
  main.variable(observer()).define(["Title","sawtoothHarmonics","Play","sum"], _12);
  main.variable(observer()).define(["Title","Play","sum"], _13);
  main.variable(observer()).define(["Title","Play","sum"], _14);
  main.variable(observer()).define(["Draw"], _15);
  main.variable(observer("viewof squareFrequency")).define("viewof squareFrequency", ["slider"], _squareFrequency);
  main.variable(observer("squareFrequency")).define("squareFrequency", ["Generators", "viewof squareFrequency"], (G, _) => G.input(_));
  main.variable(observer()).define(["Play","squareFrequency"], _17);
  main.variable(observer("viewof squareHarmonics")).define("viewof squareHarmonics", ["slider"], _squareHarmonics);
  main.variable(observer("squareHarmonics")).define("squareHarmonics", ["Generators", "viewof squareHarmonics"], (G, _) => G.input(_));
  main.variable(observer()).define(["Title","squareHarmonics","Play","sum"], _19);
  main.variable(observer()).define(["Play"], _20);
  main.variable(observer()).define(["html","ctx"], _21);
  main.variable(observer()).define(["Title","Play"], _22);
  main.variable(observer()).define(["Title","Play"], _23);
  main.variable(observer("viewof triangleFrequency")).define("viewof triangleFrequency", ["slider"], _triangleFrequency);
  main.variable(observer("triangleFrequency")).define("triangleFrequency", ["Generators", "viewof triangleFrequency"], (G, _) => G.input(_));
  main.variable(observer()).define(["Play","triangleFrequency"], _25);
  main.variable(observer("viewof triangleHarmonics")).define("viewof triangleHarmonics", ["slider"], _triangleHarmonics);
  main.variable(observer("triangleHarmonics")).define("triangleHarmonics", ["Generators", "viewof triangleHarmonics"], (G, _) => G.input(_));
  main.variable(observer()).define(["Title","triangleHarmonics","Play","sum"], _27);
  main.variable(observer()).define(["Play"], _28);
  main.variable(observer("ctx")).define("ctx", _ctx);
  main.variable(observer("Draw")).define("Draw", ["DOM","width"], _Draw);
  main.variable(observer("Play")).define("Play", ["SoundBuffer"], _Play);
  main.variable(observer("Play8Bit")).define("Play8Bit", ["ctx","Play"], _Play8Bit);
  main.variable(observer("GenerateTex")).define("GenerateTex", ["tex"], _GenerateTex);
  main.variable(observer("ShowDivs")).define("ShowDivs", _ShowDivs);
  main.variable(observer("Title")).define("Title", _Title);
  main.variable(observer("sum")).define("sum", _sum);
  main.variable(observer("SoundBuffer")).define("SoundBuffer", ["ctx","DOM","genUI","width"], _SoundBuffer);
  main.variable(observer("genUI")).define("genUI", ["html"], _genUI);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  return main;
}
