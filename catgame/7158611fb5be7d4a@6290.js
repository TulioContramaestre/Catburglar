import define1 from "./71528f76392e620f@170.js";
import define2 from "./9d0fa713ea129540@422.js";
import define3 from "./10023e7d8ddc32bc@90.js";
import define4 from "./e93997d5089d7165@2303.js";
import define5 from "./dd5e3bdbece67f4e@210.js";
import define6 from "./29803693a94d8626@383.js";

function _1(md){return(
md`## Test 5859`
)}

function _2(md){return(
md`# Project
`
)}

function _colors(columns,colorInput){return(
columns({
  backgroundColor: colorInput({title: "Background Color", value: "#a1a1a1"}),
  MaterialColor: colorInput({title: "Material color", value: "#fe8b20"}),
  
})
)}

function _objectScale(Inputs){return(
Inputs.range([0, 1], {step: .001, value: 0.5, label: "Object scale"})
)}

function _camAngle(columns,slider){return(
columns({
cameraX: slider({min: -89,  max: 89, step: 1, value: -40.0, title: "Camera-X" }),
cameraY: slider({min: -360, max: 360, step: 1, value: -65.0, title: "Camera-Y" }),
camera: slider({min: 1,max: 179, step: 1, value: 32.0, title: "Camera FOV" })
  
})
)}

function _canvasWidth(gl){return(
gl.canvas.width
)}

function _testSlider(slider){return(
slider({min: -30,  max: 89, step: 1, value: 0.0, title: "sliderx" })
)}

function _resetCat(Inputs){return(
Inputs.toggle({label: 'Reset Game', value: false})
)}

function _9(resetCat,$0,$1,$2,$3,$4,$5,$6,$7)
{//resets all the mutables of the game
  if(resetCat){
    $0.value = 0;
    $1.value = 0;
    $2.value = 0;
    $3.value = 0;
    $4.value = 0;
    $5.value = 0;
    $6.value = -90;
    $7.value = 0.001;
  }
}


function _10(md){return(
md`## what to do
- add additional objects as well as define a size for them, height and length
- game difficulty/ design
- detect collisions
- update score
- create powerups
- choose whether to implement mutables or an array for translation of obstacles
- lane textures need help`
)}

function _myDifficulty(){return(
{
  easy: {name: "Day", speed: .00001},
  hard: {name: "Night", speed: .01},
}
)}

function _12(md){return(
md`## Highscore`
)}

function _stopmovement(Inputs){return(
Inputs.toggle({label: 'stop plane movement', value: false})
)}

function _mode_toggle(Inputs){return(
Inputs.toggle({label: 'mode toggle', value: false})
)}

function _score_toggle(Inputs){return(
Inputs.toggle({label: 'Score toggle', value: false})
)}

function _heart_testing(Inputs){return(
Inputs.button([
  ["+1", value => value + 1],
  ["-1", value => value - 1],
  ["reset", value => 3]
], {value: 3, label: "Heart Tester"})
)}

function _17(heart_testing){return(
heart_testing
)}

function _Bank(){return(
0
)}

function* _scorevalue(DOM,mode_toggle,myDifficulty,$0,score_toggle,$1)
{
  const gl = DOM.context2d(160, 90);

  let score = 0;

  var reducer = 0.9;

  if (!mode_toggle) {
      myDifficulty.easy.speed = 0.004507486685182431;
      $0.value = myDifficulty.easy.speed;
    }
    else {
      myDifficulty.hard.speed = 0.01;
      $0.value = myDifficulty.hard.speed;
    }

  // score += (clicks * 100);
  
  gl.font = '48px sans-serif'; 
  gl.textAlign = 'center';
  
  while (score_toggle) {
    gl.fillStyle = `yellow`; 
    gl.fillRect(0, 0, 350, 250);
    gl.fillStyle = 'black'; 
    gl.fillText(score+=1, 80, 60);

    if (!mode_toggle)
      $1.value += 1;
    else  
      $1.value += 3;
    
    if (score % 100 == 0 && mode_toggle == false) {
      $0.value =  myDifficulty.easy.speed /= reducer;
      
    }
    else if (score % 50 == 0 && mode_toggle == true) {
      $0.value = myDifficulty.hard.speed /= reducer;
    }

    if (score % 150 == 0 && reducer > 0) {
      reducer -= 0.9;
    }

    if (reducer == 0) {
      reducer = 1;
    }
    
    yield gl.canvas;
  }
  
  // reset back to initailized speed for both hard and easy
  myDifficulty.easy.speed = 0.004507486685182431;

  myDifficulty.hard.speed = 0.01;

  reducer = 0.9;

  $0.value = 0;
}


function _groundSpeed(){return(
0
)}

function* _score_value(DOM,score_toggle,Promises)
{
  const gl = DOM.context2d(160, 90);

  let score = 0;

  var reducer = 0.9;

  // score += (clicks * 100);
  
  gl.font = '48px sans-serif'; 
  gl.textAlign = 'center';

  var str = "Score: "

  if (score_toggle == false) {

    str += score.toString();
    
    yield str;
  }
  
  while (score_toggle == true) {
    gl.fillStyle = `yellow`; 
    gl.fillRect(0, 0, 350, 250);
    gl.fillStyle = 'black'; 
    gl.fillText(score+=1, 80, 60);

    if (score % 150 == 0 && reducer > 0) {
      reducer -= 0.9;
    }

    if (reducer == 0) {
      reducer = 1;
    }

    str = "Score: "
    
    str += score.toString();
    
    yield Promises.delay(1, str);
  } 
}


function* _Spin()
{
  while (true) {
    var sum = 0;
    
    for (let i = -180; i <= 180; i++) {
      sum = i * 20;
       // yield Promises.delay(10,i);
      yield i;
    }
    
    yield sum;
  }
}


function* _23(game,gl)
{
  
  // render the object
  requestAnimationFrame(game)
  
  yield gl.canvas;
}


function _modelObj(Inputs,canObj,fenceObj,holeObj,gateObj,starObj){return(
Inputs.select(
  new Map([
    ["tuna can", canObj],
    ["wooden fence", fenceObj],
    ["hole", holeObj],
    ["gate", gateObj],
    ["star", starObj]
  ]),
  {
    value: canObj,
    label: "Choose Model"
  }
)
)}

function _modelTex(Inputs,canTexture,fenceTex,holeTex,gateTex,starTex){return(
Inputs.select(
  new Map([
    ["tuna can", canTexture],
    ["wooden fence", fenceTex],
    ["hole", holeTex],
    ["gate", gateTex],
    ["star", starTex]
  ]),
  {
    value: canTexture,
    label: "Choose Texture"
  }
)
)}

function _game(setBufferInfoArray,keys,$0,maxLanes,$1,$2,$3,$4,lanewidth,numberOfFrames,$5,$6,jump3,catJumpHeight,$7,stopmovement,$8,groundSpeed,gl,canvasWidth,hex2rgb,colors,programInfo,twgl,catUniforms,renderPlane,planeProgramInfo,renderScene,heart_testing,renderHeartCenter,heartProgramInfo,heartViewMatrix,heartProjectionMatrix,renderHeartLeft,renderHeartRight,drawScore){return(
function game(time){
  // clear the scene
    // gl.clearColor(...hex2rgb(colors.backgroundColor), 1);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // gl.enable(gl.DEPTH_TEST);
  // clear the scene
  const laneChangeSpeed = 2;//set as mutable if we want to change lanes quicker with the running speed, must be even and not a multiple of 3
  const bufferArray = setBufferInfoArray();// only needs to be called once per frame
  
  // Basic movement
    if(keys.a && ($0.value < maxLanes) && $1.value )
    {
      $0.value +=1;
      $1.value = false;
    }
    else if(keys.d && ($0.value > -maxLanes) && $1.value)
    {
      $0.value -=1;
      $1.value = false
    }
    if((keys.w) && ($2.value == false) && ($3.value == false)){
      //single jump defines one jump is allowed
        //potential implementation of double jump is possible
      $2.value = true;
      $3.value = true;
    }
  // Basic movement
    
  //make player change lanes
    if( $0.value < $4.value/lanewidth ){
      $4.value -= ((lanewidth * laneChangeSpeed)/numberOfFrames);
    }
    else if( $0.value > $4.value/lanewidth ){
      $4.value += ((lanewidth * laneChangeSpeed)/numberOfFrames);
    }
  
    if($0.value == $4.value/lanewidth && !$1.value){
      $1.value = true;
    }
  //make player change lanes
  
  //make player jump
    //NOTE: cat jump currently stays in air for 20 frames or 20 times groundSpeed
    if($2.value){
      if($5.value <= numberOfFrames){
        const CF = $5.value;
        $6.value = jump3(CF)*catJumpHeight;
        $5.value += 1;
      }
      else{// turn off this if statement, reset frame
        $5.value = 0;
        $2.value = false;
        $3.value = false;
        $6.value = 0;// reset cat position just in case
        $7.value = -90;
      }
    }
  //make player jump

  //plane movement
    if(stopmovement == false ){
      $8.value += groundSpeed;
    }
  //plane movement
  
  // split viewport (main view with character)
   gl.viewport(0, 0, canvasWidth, gl.canvas.height);
   gl.scissor(0, 0, canvasWidth, gl.canvas.height);
   gl.clearColor(...hex2rgb(colors.backgroundColor), 1);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  //draw player
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferArray[0]);
    twgl.setUniforms(programInfo, catUniforms);
    twgl.drawBufferInfo(gl, bufferArray[0] );
  //draw player

  //draw plane
    renderPlane(planeProgramInfo);
  //draw plane

  //draw obstacle loop
    renderScene();
    // for(let i =1;i<bufferArray.length;i++){// draws every object in the bufferArray
    //   gl.useProgram(programInfo.program);
    //   twgl.setBuffersAndAttributes(gl, programInfo, bufferArray[i]);
    //   twgl.setUniforms(programInfo, basicUniforms(bufferArray[i]));
    //   twgl.drawBufferInfo(gl, bufferArray[i] );
    // }
  //draw obstacle loop
  
  //CREATE: create a way to send different uniforms to each object-> for texturing, coloring, positioning

  // second view (hud for the hearts)
  gl.viewport(0, gl.canvas.height - gl.canvas.height / 5, canvasWidth / 5, gl.canvas.height / 5);
  gl.scissor(0, gl.canvas.height - gl.canvas.height / 5, canvasWidth / 5, gl.canvas.height / 5);
  // gl.clearColor(...hex2rgb("63e859"), 1); // clear background of hearts
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  if (heart_testing >= 3) {
    renderHeartCenter(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
    renderHeartLeft(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
    renderHeartRight(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
  }
  
  if (heart_testing == 2) {
    renderHeartCenter(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
    renderHeartLeft(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
  }

  if (heart_testing == 1) {
    renderHeartLeft(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
  }
  
  // third viewpot for the players score visible on hud
  gl.viewport(gl.canvas.width - gl.canvas.width / 5, gl.canvas.height - gl.canvas.height / 5, canvasWidth / 5, gl.canvas.height / 5);
  gl.scissor(gl.canvas.width - gl.canvas.width / 5, gl.canvas.height - gl.canvas.height / 5, canvasWidth / 5, gl.canvas.height / 5);
  // gl.clearColor(...hex2rgb("63e859"), 1);
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  drawScore();
}
)}

function _27(md){return(
md`## external libraries and imports`
)}

function _hex2rgb(){return(
(hex) =>
  (hex = hex.replace("#", ""))
    .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
    .map((l) => parseInt(hex.length % 2 ? l + l : l, 16) / 255)
)}

function _v3(twgl){return(
twgl.v3
)}

function _twgl(require){return(
require("twgl.js")
)}

function _m4(twgl){return(
twgl.m4
)}

function _deg2rad(){return(
(degrees) => (
  (degrees*Math.PI)/180
)
)}

function _keys(keyboard){return(
keyboard()
)}

function _keyboard(html){return(
() => {
  let node = html`<div>Keyboard</div>`
  node.value = {}
  
  window.addEventListener('keydown', (e) => {
    node.value[e.key] = true
    node.dispatchEvent(new CustomEvent('input'))
  })
  
  window.addEventListener('keyup', (e) => {
    delete node.value[e.key]
    node.dispatchEvent(new CustomEvent('input'))
  })
  
  return node
}
)}

function _gl(DOM,width)
{
  const myCanvas = DOM.canvas(width, 480);
  
  const gl = myCanvas.getContext("webgl2");
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(..."#ff00ea", 1);
  gl.enable(gl.SCISSOR_TEST);
  // gl.clear(gl.COLOR_BUFFER_BIT);
  
  // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  return gl;
}


function _41(md){return(
md`## Models`
)}

function _42(md){return(
md`place to load and store the model objects`
)}

async function _catURL(FileAttachment){return(
await FileAttachment("12221_Cat_v1_l3.obj").url()
)}

function _cat(loadModelFromURL,catURL){return(
loadModelFromURL(catURL,"obj")
)}

async function _planeURL(FileAttachment){return(
await FileAttachment("plane.obj").url()
)}

async function _plane(loadModelFromURL,planeURL){return(
await loadModelFromURL(planeURL,"obj")
)}

async function _heartURL(FileAttachment){return(
await FileAttachment("Ghost Heart.obj").url()
)}

function _heartObj(loadModelFromURL,heartURL){return(
loadModelFromURL(heartURL, "obj")
)}

function _51(md){return(
md`## Attributes`
)}

function _52(md){return(
md`this function has a silly property where it returns an array, please when making a "catAttributes"  add the '[0]' to the end, or fix the function`
)}

function _vertexAttributes(){return(
(object)=> {
  const vertexAttributes = object.map((d) => ({
    position: { numComponents: 3, data: d.sc.positions },
    normal: { numComponents: 3, data: d.sc.normals },
    uv: {numComponents: 2, data: d.sc.uvs}
  }));
  return vertexAttributes;
}
)}

function _54(md){return(
md`### Object specific Properties`
)}

function _55(md){return(
md`could be different scale values for each object, or location values for each object, or colors`
)}

function _catAttributes(vertexAttributes,cat){return(
vertexAttributes(cat)[0]
)}

function _bufferInfo(twgl,gl,catAttributes){return(
twgl.createBufferInfoFromArrays(gl, catAttributes)
)}

function _catExtents(computeModelExtent,cat){return(
computeModelExtent(cat)
)}

function _catWidth(catExtents){return(
catExtents.max[0] - catExtents.min[0]
)}

function _planeExtents(computeModelExtent,plane){return(
computeModelExtent(plane)
)}

function _extents(catExtents){return(
catExtents
)}

function _62(md){return(
md`## - Model rendering & obstacle movement`
)}

function _63(md){return(
md`code space for rendering models and their movement`
)}

function _64(md){return(
md`- obstacles
- textures
- movement towards player
- design system to load random obstacles
- hearts`
)}

function _objectsToDraw(cat,canObj){return(
[cat,canObj]
)}

function _setBufferInfoArray(objectsToDraw,vertexAttributes,twgl,gl){return(
function setBufferInfoArray(){
  const bufferInfoArray = [];
  for(let i=0;i< objectsToDraw.length; i++){
    const attrib = vertexAttributes(objectsToDraw[i])[0];//get attribs for each object
    bufferInfoArray.push(twgl.createBufferInfoFromArrays(gl,attrib));// add atribs to array
  }
  return bufferInfoArray
}
)}

function _renderScene(m4,viewMatrix,tex,ProjectionMatrix,gl,sceneProgramInfo,twgl,sceneBufferInfoArray){return(
() => {
  const eyePosition = m4.inverse(viewMatrix).slice(12, 15);

  const uniforms = {
    modelMatrix: m4.identity(),
    eyePosition,
    tex,
    viewMatrix: viewMatrix,
    projectionMatrix: ProjectionMatrix
  };
  
  gl.useProgram(sceneProgramInfo.program);
  twgl.setUniforms(sceneProgramInfo, uniforms);
  sceneBufferInfoArray.forEach((bufferInfo) => {
    twgl.setBuffersAndAttributes(gl, sceneProgramInfo, bufferInfo);
    twgl.drawBufferInfo(gl, bufferInfo);
  });
}
)}

function _sceneBufferInfoArray(modelObj,twgl,gl)
{
  const vertexAttributes = modelObj.map((d) => ({
    position: { numComponents: 3, data: d.sc.positions },
    normal: { numComponents: 3, data: d.sc.normals },
    uv: { numComponents: 2, data: d.sc.uvs }
  }));
  return vertexAttributes.map((vertexAttributes) =>
    twgl.createBufferInfoFromArrays(gl, vertexAttributes)
  );
}


function _tex(twgl,gl,modelTex){return(
twgl.createTexture(gl, {
  src: modelTex,
  flipY: true
})
)}

function _70(md){return(
md`### Cat`
)}

function _catTransX(){return(
0
)}

function _catTransY(){return(
0
)}

function _catTransZ(){return(
0
)}

function _catRotateX(testSlider){return(
-90+testSlider
)}

function _catRotateY(){return(
-0
)}

function _catRotateZ(){return(
180
)}

function _moveComplete(){return(
true
)}

function _catTranslationMatrix(m4,catTransX,catTransZ,catTransY){return(
m4.translation([catTransX,catTransZ,catTransY])
)}

function _catRotationMatrix(m4,deg2rad,catRotateX,catRotateY,catRotateZ){return(
m4.multiply( 
    m4.rotationX(deg2rad(catRotateX)),
    m4.multiply( 
      m4.rotationY(deg2rad(catRotateY)), 
      m4.rotationZ(deg2rad(catRotateZ))
  ))
)}

function _catModelMatrix(m4,scaleMatrix,catRotationMatrix,catTranslationMatrix){return(
m4.multiply(scaleMatrix, m4.multiply(catRotationMatrix, catTranslationMatrix))
)}

function _81(md){return(
md`### Heart`
)}

function _heartExtents(computeModelExtent,heartObj){return(
computeModelExtent(heartObj)
)}

function _heartBuffer(heartObj,twgl,gl)
{
  
  var array = [];

  var vertexAttributes = [];

  for (var i = 0; i < heartObj.length; i++) {
    vertexAttributes[i] = {position: {numComponents: 3, data: heartObj[i].sc.positions} ,
                normal: { numComponents: 3, data: heartObj[i].sc.normals}};
  }

  for(i = 0; i < heartObj.length; i++) {
    array[i] = twgl.createBufferInfoFromArrays(gl, vertexAttributes[i]);
  }
  return array;
}


function _heartTranslationMatrix(m4,heartExtents){return(
m4.translation([-heartExtents.center[0], -heartExtents.center[1], -heartExtents.center[2]])
)}

function _heartScaleMatrix(m4,heartExtents){return(
m4.scaling([3 / heartExtents.dia, 3 / heartExtents.dia, 3 / heartExtents.dia])
)}

function _heartModelMatrix(m4,heartScaleMatrix,heartTranslationMatrix){return(
m4.multiply(heartScaleMatrix, heartTranslationMatrix)
)}

function _leftModelMatrix(m4,heartScaleMatrix,heartExtents){return(
m4.multiply(heartScaleMatrix, m4.translation([-heartExtents.center[0] - 4, -heartExtents.center[1] + 2, -heartExtents.center[2]]))
)}

function _renderHeartLeft(gl,m4,heartScaleMatrix,heartExtents,Spin,heartModelMatrix,hex2rgb,twgl,heartBuffer){return(
(programInfo,heartViewMatrix, heartProjectionMatrix) => {
  gl.useProgram(programInfo.program);
  const uniforms = {
    projection: heartProjectionMatrix,
    view: heartViewMatrix,
    world: m4.rotateY(m4.multiply(heartScaleMatrix, m4.translation([-heartExtents.center[0] - 4, -heartExtents.center[1] + 2, -heartExtents.center[2]])), Spin),    
    normalMatrix: m4.inverse(m4.transpose(heartModelMatrix)),
  
    materialColor: hex2rgb("#ff0000") 
  };
  twgl.setUniforms(programInfo, uniforms);
  heartBuffer.forEach((heartBuffer) => {
    twgl.setBuffersAndAttributes(gl, programInfo, heartBuffer);
    twgl.drawBufferInfo(gl, heartBuffer);
  });
}
)}

function _renderHeartCenter(gl,m4,heartScaleMatrix,heartExtents,deg2rad,Spin,heartModelMatrix,hex2rgb,twgl,heartBuffer){return(
(programInfo,heartViewMatrix, heartProjectionMatrix) => {
  gl.useProgram(programInfo.program);
  const uniforms = {
    projection: heartProjectionMatrix,
    view: heartViewMatrix,
    world: m4.rotateY(m4.multiply(heartScaleMatrix, m4.translation([-heartExtents.center[0], -heartExtents.center[1] + 2, -heartExtents.center[2]])), deg2rad(Spin)),
    normalMatrix: m4.inverse(m4.transpose(heartModelMatrix)),
  
    materialColor: hex2rgb("#ff0000") 
  };
  twgl.setUniforms(programInfo, uniforms);
  heartBuffer.forEach((heartBuffer) => {
    twgl.setBuffersAndAttributes(gl, programInfo, heartBuffer);
    twgl.drawBufferInfo(gl, heartBuffer);
  });
}
)}

function _renderHeartRight(gl,m4,heartScaleMatrix,heartExtents,Spin,heartModelMatrix,hex2rgb,twgl,heartBuffer){return(
(programInfo,heartViewMatrix, heartProjectionMatrix) => {
  gl.useProgram(programInfo.program);
  const uniforms = {
    projection: heartProjectionMatrix,
    view: heartViewMatrix,
    world: m4.rotateY(m4.multiply(heartScaleMatrix, m4.translation([-heartExtents.center[0] + 4, -heartExtents.center[1] + 2, -heartExtents.center[2]])), Spin),    
    normalMatrix: m4.inverse(m4.transpose(heartModelMatrix)),
  
    materialColor: hex2rgb("#ff0000") 
  };
  twgl.setUniforms(programInfo, uniforms);
  heartBuffer.forEach((heartBuffer) => {
    twgl.setBuffersAndAttributes(gl, programInfo, heartBuffer);
    twgl.drawBufferInfo(gl, heartBuffer);
  });
}
)}

function _drawScore(patternBuffers,gl,stencilProgramInfo,patternViewMatrix,patternProjectionMatrix,twgl){return(
() => {
  const stencilBufferInfo = patternBuffers[1];

  gl.useProgram(stencilProgramInfo.program);
  const uniforms = {
    view: patternViewMatrix[1],
    projection: patternProjectionMatrix[1]
  };

  twgl.setUniforms(stencilProgramInfo, uniforms);
  twgl.setBuffersAndAttributes(gl, stencilProgramInfo, stencilBufferInfo);
  twgl.drawBufferInfo(gl, stencilBufferInfo);
}
)}

function _patternViewMatrix(m4){return(
[
  m4.identity(),
  m4.inverse(m4.lookAt([0, 0, -500], [0, 0, 0], [0, -1, 0])),
  m4.inverse(m4.lookAt([0, 0, 1000], [0, 0, 0], [0, 1, 0]))
]
)}

function _patternProjectionMatrix(m4,canvasWidth,gl){return(
[
  m4.identity(),
  m4.perspective(Math.PI / 4, canvasWidth / gl.canvas.height, 0.01, 1000),
  m4.perspective(Math.PI / 4, canvasWidth / gl.canvas.height, 500, 5000)
]
)}

function _patternBuffers(twgl,gl,textMeshBufferInfo){return(
[
  twgl.createBufferInfoFromArrays(gl, {
    position: {
      numComponents: 2,
      data: [
        [0, 1],
        [-1, -1],
        [1, -1]
      ].flat()
    }
  }),
  textMeshBufferInfo
]
)}

function _textMesh(vectorizeText,score_value){return(
vectorizeText(score_value, {
  triangles: "triangles",
  font: "serif",
  width: 450,
  textAlign: "center",
  textBaseline: "middle"
})
)}

function _textMeshBufferInfo(twgl,gl,textMesh){return(
twgl.createBufferInfoFromArrays(gl, {
  position: { numComponents: 2, data: textMesh.positions.flat() },
  indices: { numComponents: 3, data: textMesh.cells.flat() }
})
)}

function _vectorizeText(require){return(
require("https://bundle.run/vectorize-text@3.2.2")
)}

function _stencilProgramInfo(errorBlock,twgl,gl)
{
  const frag = `#version 300 es
    precision mediump float;
    out vec4 outColor;
    void main () {
      outColor = vec4(0,0,0,1);
    }`,
    vert = `#version 300 es
    in vec2 position;
    uniform mat4 projection, view;
    void main () {
      gl_Position = projection * view * vec4(position, 0, 1);
    }`;

  errorBlock.style.height = "20px";
  errorBlock.innerHTML = "Program Shader compilation successful";
  return twgl.createProgramInfo(gl, [vert, frag], (message) => {
    errorBlock.style.height = "400px";
    errorBlock.innerHTML = "Scene Program Shader compilation error\n" + message;
  });
}


function _99(md){return(
md`### Plane
`
)}

function _planeTranslationMatrix(m4){return(
m4.translation([0,0,0])
)}

function _planeModelMatrix(m4,scaleMatrix,planeTranslationMatrix){return(
m4.multiply(
  m4.identity(),m4.multiply(
  scaleMatrix,planeTranslationMatrix)
)
)}

function _planePosition2(){return(
0
)}

function _renderPlane(gl,twgl,planeUniforms,planeBufferInfo){return(
function renderPlane(programInfo)
{
  gl.useProgram(programInfo.program);
  
  twgl.setUniforms(programInfo, planeUniforms);
  twgl.setBuffersAndAttributes(gl, programInfo, planeBufferInfo);
  twgl.drawBufferInfo(gl, planeBufferInfo, gl['TRIANGLES']);
}
)}

function _planeBufferInfo(twgl,gl,vertexAttributes,plane){return(
twgl.createBufferInfoFromArrays(gl, vertexAttributes(plane)[0] )
)}

function _105(md){return(
md`### Plane`
)}

function _106(md){return(
md`## - Model rendering & obstacle movement`
)}

function _107(md){return(
md`## - Collision detection`
)}

function _gravity(){return(
true
)}

function _109(md){return(
md`code space to detect collisions between player and obstacles`
)}

function _110(md){return(
md`- detect when player hits an object
 - notify player
 - reduce health`
)}

function _111(md){return(
md`## - Collision detection`
)}

function _112(md){return(
md`## - Character movement & jump`
)}

function _113(md){return(
md`code space for player movement and physics
- left right player movement
- player jump`
)}

function _numberOfFrames(){return(
20
)}

function _jumpFrame(){return(
0
)}

function _moveFrame(){return(
0
)}

function _catJumpHeight(){return(
20
)}

function _singleJump(){return(
false
)}

function _inAir(){return(
false
)}

function _lane(){return(
0
)}

function _lanewidth(){return(
40
)}

function _maxLanes(){return(
1
)}

function _numberOfLanes(maxLanes){return(
2*maxLanes + 1
)}

function _realism(catExtents,objectScale)
{// phyically based function but not currently used
  const gravitationalConstant = 6.6743*10**-11;
  const massOfCat = 4.5;//kg
  const planetMass = 5.9722 *10**24;//kg
  const distanceFromCenter = 6.4*10**6;// meters
  const gravitationalForce = gravitationalConstant*(planetMass*massOfCat)/(distanceFromCenter**2);//answer in netwons
  const gravitationalAcceleration = -gravitationalForce/massOfCat; // m/s^2
  const catHeightInWorld = (catExtents.max[2] - catExtents.min[2])*objectScale;
  const jumpForce = (4*catHeightInWorld)*massOfCat;
  return {jumpForce:(Math.round(jumpForce*10)/10),gravitationalAcceleration:(Math.round(gravitationalAcceleration*10)/10)}
}


function _jump1($0,catJumpHeight,$1,$2){return(
function jump1(){// linearly based jump function, updated with jump() a sin based function
  if(($0.value < catJumpHeight) && ($1.value)){
    $0.value += 2;
  }
  else {
    $1.value = false;
    $2.value = true;
  }
}
)}

function _jump2(numberOfFrames){return(
function jump2(currentF){// supposed to imitate real life, is used currently
  let vertical = 0;
  let val = 0;
    vertical = Math.sin((currentF*Math.PI)/(numberOfFrames));
    
   return vertical;
}
)}

function _jump3(jumpRotation1,realism,m,n){return(
function jump3(currentF){// finalized jump function, uses projectile motion to simulate jump
  // variable m and n are used to scale the jump to match the dimension of the sin function
  const t = currentF;
  jumpRotation1(t);
  const val = ((realism.jumpForce * (t*m)) + 0.5*(realism.gravitationalAcceleration * (t*m)**2))*n;
  return val;
}
)}

function _jumpRotation1(numberOfFrames,$0){return(
function jumpRotation1(currentF){
  const val = Math.cos((currentF*Math.PI)/numberOfFrames);
  const middleFrame = numberOfFrames/2;
  const difference = currentF - middleFrame;
  const degreeChange = 5;
  
  if(currentF < middleFrame -1 ){
    $0.value = -90 + (2 * degreeChange)
  }
  else if(currentF > middleFrame +1){
    $0.value = -90 - (2 * degreeChange);
  }
  else{
    $0.value = -90 - difference*degreeChange;// uses 3 frames to smooth out difference between up and down angle
  }
}
)}

function _m(){return(
3.4897
)}

function _n(){return(
1/(29.532 * 200)
)}

function _132(md){return(
md`## - Character movement & jump`
)}

function _133(md){return(
md`## - Score and level design`
)}

function _134(md){return(
md`code space to store score and designing of levels
- day and night implementation
- map textures`
)}

function _135(md){return(
md`## - Score and level design`
)}

function _136(md){return(
md`## - Model upgrades`
)}

function _137(md){return(
md`code space to store model upgrades
- textures
- models`
)}

function _138(md){return(
md`## - Model upgrades`
)}

function _139(md){return(
md`### Matrices`
)}

function _scaleMatrix(m4,objectScale,extents){return(
m4.scaling( [ objectScale/extents.dia, objectScale/extents.dia, objectScale/extents.dia ] )
)}

function _ProjectionMatrix(m4,camAngle,gl){return(
m4.perspective(camAngle.camera*Math.PI/180, gl.canvas.width/gl.canvas.height, 0.1, 20)
)}

function _viewMatrix(m4,transformedEyePosition,lookAtPOsition){return(
m4.inverse( m4.lookAt(transformedEyePosition, lookAtPOsition, [0,1,0]))
)}

function _heartViewMatrix(m4,v3,heartExtents){return(
(r, x_angle, y_angle) => {
  const gazeDirection = m4.transformDirection(
    m4.multiply(m4.rotationY(y_angle), m4.rotationX(x_angle)),
    [0, 0, 1]
  );
  const eyePosition = v3.add(
    heartExtents.center,
    v3.mulScalar(gazeDirection, r * heartExtents.dia)
  );

  const cameraMatrix = m4.lookAt(eyePosition, heartExtents.center, [0, 1, 0]);
  return m4.inverse(cameraMatrix);
}
)}

function _heartProjectionMatrix(m4,deg2rad,canvasWidth,gl,heartExtents){return(
(fov, near, far) => {
  
  return m4.perspective(
    deg2rad(fov),
    ((canvasWidth / 2) / gl.canvas.height),
    near * heartExtents.dia,
    far * heartExtents.dia
  );
}
)}

function _145(md){return(
md`### Camera `
)}

function _lookAtPOsition(){return(
[0,0,0]
)}

function _eyeDirection(){return(
[0,0,1]
)}

function _eyePosition(twgl,lookAtPOsition,eyeDirection){return(
twgl.v3.add( lookAtPOsition, twgl.v3.mulScalar( eyeDirection, 3 ) )
)}

function _transformedEyePosition(m4,camAngle,eyePosition){return(
m4.transformPoint(m4.multiply(m4.rotationY(camAngle.cameraY*Math.PI/180),m4.rotationX(camAngle.cameraX*Math.PI/180)), eyePosition)
)}

function _150(md){return(
md`## Uniforms`
)}

function _catUniforms(ProjectionMatrix,viewMatrix,catModelMatrix,m4,hex2rgb,colors){return(
{
    projection: ProjectionMatrix,
    view: viewMatrix,
    world: catModelMatrix,    
    normalMatrix: m4.inverse(m4.transpose(catModelMatrix)),
  
    materialColor: hex2rgb(colors.MaterialColor)    
  }
)}

function _planeUniforms(planeModelMatrix,viewMatrix,ProjectionMatrix,planeTexture,planePosition2,numberOfLanes){return(
{
    modelMatrix:  planeModelMatrix,
    viewMatrix: viewMatrix,
    projectionMatrix: ProjectionMatrix ,
    
    tex: planeTexture,

    planeMovement: planePosition2,
    numberOfLanes
  }
)}

function _154(md){return(
md`### Textures`
)}

function _cubemap(twgl,gl,px,nx,py,ny,pz,nz){return(
twgl.createTexture(gl, {
  target: gl.TEXTURE_CUBE_MAP,
  flipY: false,
  src: [px, nx, py, ny, pz, nz],
  min: gl.LINEAR_MIPMAP_LINEAR
})
)}

function _skyboxBufferInfo(twgl,gl){return(
twgl.createBufferInfoFromArrays(gl, {    // plane for background image
  position: {
    numComponents: 2,
    data: [-1, -1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1]
  }
})
)}

async function _planeImg(FileAttachment){return(
await FileAttachment("roadTexture.jpg").url()
)}

function _planeTexture(twgl,gl,planeImg){return(
twgl.createTexture(gl, {
  src: planeImg,
  flipY: true,
  wrap: gl.REPEAT, 
  mag: gl.LINEAR_MIPMAP_LINEAR,
  min: gl.LINEAR
})
)}

function _159(md){return(
md`## Shaders`
)}

function _errorBlock(html,width){return(
html`<textarea style="height : 20px; width : ${width}px; font-size: 0.8em; display: block"></textarea>`
)}

function _shaders(){return(
{//ivans shaders
    vs: `#version 300 es
    in vec3 position;
    in vec3 normal;

    uniform mat4 projection;
    uniform mat4 view;
    uniform mat4 world;
    uniform mat4 normalMatrix;

    out vec3 fragNormal,fragPosition;
    
    void main () {
      gl_Position =  projection * view * world *  vec4(position, 1.0);
      vec4 worldPosition = world * vec4(position, 1.0);
      fragPosition = worldPosition.xyz;

      
      vec3 newNormal = (normalMatrix*vec4(normal,0)).xyz;
      fragNormal= normalize(newNormal);
    }`,

    fs: `#version 300 es
    precision mediump float;
    
    in vec3 fragNormal;
    in vec3 fragPosition;
    
    uniform vec3 materialColor;
    
    out vec4 outColor;

    void main () {
        //NOTE: texturing code is needed

        outColor = vec4(materialColor*abs(fragNormal),1.0);
    }`
  
}
)}

function _heartShaders(){return(
{
    vs: `#version 300 es
    in vec3 position;
    in vec3 normal;

    uniform mat4 projection;
    uniform mat4 view;
    uniform mat4 world;
    uniform mat4 normalMatrix;

    out vec3 fragNormal,fragPosition;
    
    void main () {
      gl_Position =  projection * view * world *  vec4(position, 1.0);
      vec4 worldPosition = world * vec4(position, 1.0);
      fragPosition = worldPosition.xyz;

      
      vec3 newNormal = (normalMatrix*vec4(normal,0)).xyz;
      fragNormal= normalize(newNormal);
    }`,

    fs: `#version 300 es
    precision mediump float;
    
    in vec3 fragNormal;
    in vec3 fragPosition;
    
    uniform vec3 materialColor;
    
    out vec4 outColor;

    void main () {
        //NOTE: texturing code is needed

        outColor = vec4(materialColor*abs(fragNormal),1.0);
    }`
  
}
)}

function _planeShaders(){return(
{// drakes shaders
  vs: `#version 300 es

  precision mediump float;
  
  uniform mat4 modelMatrix;
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform float aspect;
  
  in vec3 position;
  in vec3 normal;
  in vec2 uv;
  
  out vec2 fragUV;
  out vec3 fragNormal;
  
  void main () {
  vec4 positionWorld = modelMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1);
  fragUV = uv;

  mat4 normalMatrix = transpose(inverse(modelMatrix));
  fragNormal = normalize((normalMatrix*vec4(normal,0)).xyz);
  }`,
  
  fs: `#version 300 es
  
  precision mediump float;
  
  in vec3 fragNormal;   
  in vec2 fragUV;
  out vec4 outColor;

  uniform sampler2D tex;
  uniform float planeMovement;
  uniform float numberOfLanes;
  
  void main () {
  
  vec2 uvPOS = vec2(fragUV.x*numberOfLanes,fragUV.y + planeMovement);
  outColor = texture(tex, uvPOS);

  }`
}
)}

function _sceneProgramInfo(errorBlock,twgl,gl)
{//jonah's shaders
  const vert = `#version 300 es
    precision mediump float;
    in vec3 position;
    in vec3 normal;
    in vec2 uv;
  
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;

    out vec3 fragNormal;
    out vec3 fragPosition;
    out vec2 fragUV;

    void main () {
      fragUV = uv;
      vec4 newPosition = modelMatrix*vec4(position,1);
      fragPosition = newPosition.xyz;
      gl_Position = projectionMatrix*viewMatrix*newPosition;
      mat4 normalMatrix = transpose(inverse(modelMatrix));
      fragNormal = normalize((normalMatrix*vec4(normal,0)).xyz);
    }`;
  const frag = `#version 300 es
    precision mediump float;

    out vec4 outColor;

    uniform samplerCube cubemap;
    uniform sampler2D tex;
    uniform vec3 eyePosition;

    uniform bool mirrorFlag;

    in vec3 fragNormal;
    in vec3 fragPosition;
    in vec2 fragUV;


    void main () {
      vec3 N = normalize(fragNormal);

      vec3 R = reflect(normalize(fragPosition - eyePosition), N);  

      vec3 materialColor = texture(tex,fragUV).rgb;
      outColor = vec4(materialColor, 1);
    }`;
  errorBlock.style.height = "20px";
  errorBlock.innerHTML = "Program Shader compilation successful";
  return twgl.createProgramInfo(gl, [vert, frag], (message) => {
    errorBlock.style.height = "400px";
    errorBlock.innerHTML = "Scene Program Shader compilation error\n" + message;
  });
}


function _planeProgramInfo(errorBlock,twgl,gl,planeShaders)
{
  errorBlock.style.height = "20px";
  errorBlock.innerHTML = "Program Shader compilation successful";
  return twgl.createProgramInfo(gl, [planeShaders.vs, planeShaders.fs], (message) => {
    errorBlock.style.height = "400px";
    errorBlock.innerHTML = "Program Shader compilation error\n" + message;
  });
}


function _programInfo(errorBlock,twgl,gl,shaders)
{
  errorBlock.style.height = "20px";
  errorBlock.innerHTML = "Program Shader compilation successful";
  return twgl.createProgramInfo(gl, [shaders.vs, shaders.fs], (message) => {
    errorBlock.style.height = "400px";
    errorBlock.innerHTML = "Program Shader compilation error\n" + message;
  });
}


function _heartProgramInfo(errorBlock,twgl,gl,heartShaders)
{
  errorBlock.style.height = "20px";
  errorBlock.innerHTML = "Program Shader compilation successful";
  return twgl.createProgramInfo(gl, [heartShaders.vs, heartShaders.fs], (message) => {
    errorBlock.style.height = "400px";
    errorBlock.innerHTML = "Program Shader compilation error\n" + message;
  });
}


function _168(md){return(
md`## Cubemap images
`
)}

function _169(md){return(
md`currently wooded area with houses`
)}

async function _nx(getImageData,FileAttachment){return(
getImageData(await FileAttachment("negx.jpg").blob())
)}

async function _px(getImageData,FileAttachment){return(
getImageData(await FileAttachment("posx.jpg").blob())
)}

async function _ny(getImageData,FileAttachment){return(
getImageData(await FileAttachment("negy.jpg").blob())
)}

async function _py(getImageData,FileAttachment){return(
getImageData(await FileAttachment("posy.jpg").blob())
)}

async function _nz(getImageData,FileAttachment){return(
getImageData(await FileAttachment("negz.jpg").blob())
)}

async function _pz(getImageData,FileAttachment){return(
getImageData(await FileAttachment("posz.jpg").blob())
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["plane.obj", {url: new URL("./files/ed4ed4ca160e6eafcdcf18f9d092fa930d64c579ff07fba1b94ab85a7d76f2259791dcbc2c0edca9ecc53886751a79e37d56c4129721b05a79f2d1c4dbe561cd.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["roadTexture.jpg", {url: new URL("./files/e377478b19ef6c8b8366b8e49762c968f37e906c4806695a896a3fe43b4e1e0350e1981e4f8cc6261c20fb65cedf014970d1500a1713a143ae928e31cc9faf8d.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["12221_Cat_v1_l3.obj", {url: new URL("./files/cb64345e31fe6ad900a077cc53c1a3e7fdb7a20338006812194870fe76e416f3ed73f01411f351594ba1e2f2a7ac0c85a2ab4d6ccc5bc6a54067c9538b1cc9df.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["negy.jpg", {url: new URL("./files/b7715e995915c8cd8ccabeb649e3399e825c50bc393e69e23b1e8e5da410d215760fb46b1c8e024bc7e7f17a78f967b463c2e705c3e54b2e0d69cb6e98b69e5a.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["posy.jpg", {url: new URL("./files/32e72f33620f9bbba503121c40c1e8558a88a47b471b35d9a4e9ccb789d5d67ead5f89657e098f13bb6d1caac117765d49981bee9726b37da1f346912f588c2e.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["posz.jpg", {url: new URL("./files/5cd47b322644c1358f5d3dd0a1037bd062062b32fbab2b5efdfe15b946a810c4b9978e378651266b26d3a1cce43ab3fe3b2b94bb7bd4080a3f0508c2a4f93c2a.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["negz.jpg", {url: new URL("./files/3ccc20d6ef17e1126c234e3c3d4ce6db143541cc40c78aa7cb82c1b34fb3b676f7887a90bc5c02144ee8b5ee1d0c052a56757010fcf51cba46b4da8899e5cf39.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["negx.jpg", {url: new URL("./files/c1242ac48bc55d5d378b56a12d9a7161003e92266a8ccbb0b49543a9f646095668f89fed97481ab204f695604cc8f31604df4cf17cd153dc80a46a370dd62ba7.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["posx.jpg", {url: new URL("./files/3803124a81f4d52e1331f63082bd4a22a2321b9893f366c5eb830647541bec0cf03c682a1e8b94b350dbd407d6d940b9451f31082d4a0106408b05ab80a70f95.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Ghost Heart.obj", {url: new URL("./files/a9871f558b18d590ac9420727b7c0cf5a223549b0a6e98383a61b14843df75d04306635b33bc056f7452530903eab0e3c46be932375adddcada9bb0013a11de3.bin", import.meta.url), mimeType: "application/octet-stream", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof colors")).define("viewof colors", ["columns","colorInput"], _colors);
  main.variable(observer("colors")).define("colors", ["Generators", "viewof colors"], (G, _) => G.input(_));
  main.variable(observer("viewof objectScale")).define("viewof objectScale", ["Inputs"], _objectScale);
  main.variable(observer("objectScale")).define("objectScale", ["Generators", "viewof objectScale"], (G, _) => G.input(_));
  main.variable(observer("viewof camAngle")).define("viewof camAngle", ["columns","slider"], _camAngle);
  main.variable(observer("camAngle")).define("camAngle", ["Generators", "viewof camAngle"], (G, _) => G.input(_));
  main.variable(observer("canvasWidth")).define("canvasWidth", ["gl"], _canvasWidth);
  main.variable(observer("viewof testSlider")).define("viewof testSlider", ["slider"], _testSlider);
  main.variable(observer("testSlider")).define("testSlider", ["Generators", "viewof testSlider"], (G, _) => G.input(_));
  main.variable(observer("viewof resetCat")).define("viewof resetCat", ["Inputs"], _resetCat);
  main.variable(observer("resetCat")).define("resetCat", ["Generators", "viewof resetCat"], (G, _) => G.input(_));
  main.variable(observer()).define(["resetCat","mutable catTransY","mutable catTransX","mutable jumpFrame","mutable moveFrame","mutable lane","mutable planePosition2","mutable catRotateX","mutable groundSpeed"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("myDifficulty")).define("myDifficulty", _myDifficulty);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof stopmovement")).define("viewof stopmovement", ["Inputs"], _stopmovement);
  main.variable(observer("stopmovement")).define("stopmovement", ["Generators", "viewof stopmovement"], (G, _) => G.input(_));
  main.variable(observer("viewof mode_toggle")).define("viewof mode_toggle", ["Inputs"], _mode_toggle);
  main.variable(observer("mode_toggle")).define("mode_toggle", ["Generators", "viewof mode_toggle"], (G, _) => G.input(_));
  main.variable(observer("viewof score_toggle")).define("viewof score_toggle", ["Inputs"], _score_toggle);
  main.variable(observer("score_toggle")).define("score_toggle", ["Generators", "viewof score_toggle"], (G, _) => G.input(_));
  main.variable(observer("viewof heart_testing")).define("viewof heart_testing", ["Inputs"], _heart_testing);
  main.variable(observer("heart_testing")).define("heart_testing", ["Generators", "viewof heart_testing"], (G, _) => G.input(_));
  main.variable(observer()).define(["heart_testing"], _17);
  main.define("initial Bank", _Bank);
  main.variable(observer("mutable Bank")).define("mutable Bank", ["Mutable", "initial Bank"], (M, _) => new M(_));
  main.variable(observer("Bank")).define("Bank", ["mutable Bank"], _ => _.generator);
  main.variable(observer("scorevalue")).define("scorevalue", ["DOM","mode_toggle","myDifficulty","mutable groundSpeed","score_toggle","mutable Bank"], _scorevalue);
  main.define("initial groundSpeed", _groundSpeed);
  main.variable(observer("mutable groundSpeed")).define("mutable groundSpeed", ["Mutable", "initial groundSpeed"], (M, _) => new M(_));
  main.variable(observer("groundSpeed")).define("groundSpeed", ["mutable groundSpeed"], _ => _.generator);
  main.variable(observer("score_value")).define("score_value", ["DOM","score_toggle","Promises"], _score_value);
  main.variable(observer("Spin")).define("Spin", _Spin);
  main.variable(observer()).define(["game","gl"], _23);
  main.variable(observer("viewof modelObj")).define("viewof modelObj", ["Inputs","canObj","fenceObj","holeObj","gateObj","starObj"], _modelObj);
  main.variable(observer("modelObj")).define("modelObj", ["Generators", "viewof modelObj"], (G, _) => G.input(_));
  main.variable(observer("viewof modelTex")).define("viewof modelTex", ["Inputs","canTexture","fenceTex","holeTex","gateTex","starTex"], _modelTex);
  main.variable(observer("modelTex")).define("modelTex", ["Generators", "viewof modelTex"], (G, _) => G.input(_));
  main.variable(observer("game")).define("game", ["setBufferInfoArray","keys","mutable lane","maxLanes","mutable moveComplete","mutable singleJump","mutable inAir","mutable catTransX","lanewidth","numberOfFrames","mutable jumpFrame","mutable catTransY","jump3","catJumpHeight","mutable catRotateX","stopmovement","mutable planePosition2","groundSpeed","gl","canvasWidth","hex2rgb","colors","programInfo","twgl","catUniforms","renderPlane","planeProgramInfo","renderScene","heart_testing","renderHeartCenter","heartProgramInfo","heartViewMatrix","heartProjectionMatrix","renderHeartLeft","renderHeartRight","drawScore"], _game);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("hex2rgb")).define("hex2rgb", _hex2rgb);
  main.variable(observer("v3")).define("v3", ["twgl"], _v3);
  const child1 = runtime.module(define1);
  main.import("vec3", child1);
  const child2 = runtime.module(define2);
  main.import("loadModelFromURL", child2);
  main.import("computeModelExtent", child2);
  main.import("loadObjObject", child2);
  const child3 = runtime.module(define3);
  main.import("columns", child3);
  const child4 = runtime.module(define4);
  main.import("color", "colorInput", child4);
  main.import("slider", child4);
  main.import("radio", child4);
  main.import("select", child4);
  main.variable(observer("twgl")).define("twgl", ["require"], _twgl);
  main.variable(observer("m4")).define("m4", ["twgl"], _m4);
  main.variable(observer("deg2rad")).define("deg2rad", _deg2rad);
  main.variable(observer("viewof keys")).define("viewof keys", ["keyboard"], _keys);
  main.variable(observer("keys")).define("keys", ["Generators", "viewof keys"], (G, _) => G.input(_));
  main.variable(observer("keyboard")).define("keyboard", ["html"], _keyboard);
  main.variable(observer("gl")).define("gl", ["DOM","width"], _gl);
  const child5 = runtime.module(define5);
  main.import("getImageData", child5);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("catURL")).define("catURL", ["FileAttachment"], _catURL);
  main.variable(observer("cat")).define("cat", ["loadModelFromURL","catURL"], _cat);
  main.variable(observer("planeURL")).define("planeURL", ["FileAttachment"], _planeURL);
  main.variable(observer("plane")).define("plane", ["loadModelFromURL","planeURL"], _plane);
  main.variable(observer("heartURL")).define("heartURL", ["FileAttachment"], _heartURL);
  main.variable(observer("heartObj")).define("heartObj", ["loadModelFromURL","heartURL"], _heartObj);
  const child6 = runtime.module(define6);
  main.import("canObj", child6);
  main.import("canned_food_01", child6);
  main.import("fenceObj", child6);
  main.import("holeObj", child6);
  main.import("gateObj", child6);
  main.import("starObj", child6);
  const child7 = runtime.module(define6);
  main.import("canTexture", child7);
  main.import("fenceTex", child7);
  main.import("holeTex", child7);
  main.import("gateTex", child7);
  main.import("starTex", child7);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("vertexAttributes")).define("vertexAttributes", _vertexAttributes);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("catAttributes")).define("catAttributes", ["vertexAttributes","cat"], _catAttributes);
  main.variable(observer("bufferInfo")).define("bufferInfo", ["twgl","gl","catAttributes"], _bufferInfo);
  main.variable(observer("catExtents")).define("catExtents", ["computeModelExtent","cat"], _catExtents);
  main.variable(observer("catWidth")).define("catWidth", ["catExtents"], _catWidth);
  main.variable(observer("planeExtents")).define("planeExtents", ["computeModelExtent","plane"], _planeExtents);
  main.variable(observer("extents")).define("extents", ["catExtents"], _extents);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer()).define(["md"], _63);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("objectsToDraw")).define("objectsToDraw", ["cat","canObj"], _objectsToDraw);
  main.variable(observer("setBufferInfoArray")).define("setBufferInfoArray", ["objectsToDraw","vertexAttributes","twgl","gl"], _setBufferInfoArray);
  main.variable(observer("renderScene")).define("renderScene", ["m4","viewMatrix","tex","ProjectionMatrix","gl","sceneProgramInfo","twgl","sceneBufferInfoArray"], _renderScene);
  main.variable(observer("sceneBufferInfoArray")).define("sceneBufferInfoArray", ["modelObj","twgl","gl"], _sceneBufferInfoArray);
  main.variable(observer("tex")).define("tex", ["twgl","gl","modelTex"], _tex);
  main.variable(observer()).define(["md"], _70);
  main.define("initial catTransX", _catTransX);
  main.variable(observer("mutable catTransX")).define("mutable catTransX", ["Mutable", "initial catTransX"], (M, _) => new M(_));
  main.variable(observer("catTransX")).define("catTransX", ["mutable catTransX"], _ => _.generator);
  main.define("initial catTransY", _catTransY);
  main.variable(observer("mutable catTransY")).define("mutable catTransY", ["Mutable", "initial catTransY"], (M, _) => new M(_));
  main.variable(observer("catTransY")).define("catTransY", ["mutable catTransY"], _ => _.generator);
  main.define("initial catTransZ", _catTransZ);
  main.variable(observer("mutable catTransZ")).define("mutable catTransZ", ["Mutable", "initial catTransZ"], (M, _) => new M(_));
  main.variable(observer("catTransZ")).define("catTransZ", ["mutable catTransZ"], _ => _.generator);
  main.define("initial catRotateX", ["testSlider"], _catRotateX);
  main.variable(observer("mutable catRotateX")).define("mutable catRotateX", ["Mutable", "initial catRotateX"], (M, _) => new M(_));
  main.variable(observer("catRotateX")).define("catRotateX", ["mutable catRotateX"], _ => _.generator);
  main.define("initial catRotateY", _catRotateY);
  main.variable(observer("mutable catRotateY")).define("mutable catRotateY", ["Mutable", "initial catRotateY"], (M, _) => new M(_));
  main.variable(observer("catRotateY")).define("catRotateY", ["mutable catRotateY"], _ => _.generator);
  main.define("initial catRotateZ", _catRotateZ);
  main.variable(observer("mutable catRotateZ")).define("mutable catRotateZ", ["Mutable", "initial catRotateZ"], (M, _) => new M(_));
  main.variable(observer("catRotateZ")).define("catRotateZ", ["mutable catRotateZ"], _ => _.generator);
  main.define("initial moveComplete", _moveComplete);
  main.variable(observer("mutable moveComplete")).define("mutable moveComplete", ["Mutable", "initial moveComplete"], (M, _) => new M(_));
  main.variable(observer("moveComplete")).define("moveComplete", ["mutable moveComplete"], _ => _.generator);
  main.variable(observer("catTranslationMatrix")).define("catTranslationMatrix", ["m4","catTransX","catTransZ","catTransY"], _catTranslationMatrix);
  main.variable(observer("catRotationMatrix")).define("catRotationMatrix", ["m4","deg2rad","catRotateX","catRotateY","catRotateZ"], _catRotationMatrix);
  main.variable(observer("catModelMatrix")).define("catModelMatrix", ["m4","scaleMatrix","catRotationMatrix","catTranslationMatrix"], _catModelMatrix);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer("heartExtents")).define("heartExtents", ["computeModelExtent","heartObj"], _heartExtents);
  main.variable(observer("heartBuffer")).define("heartBuffer", ["heartObj","twgl","gl"], _heartBuffer);
  main.variable(observer("heartTranslationMatrix")).define("heartTranslationMatrix", ["m4","heartExtents"], _heartTranslationMatrix);
  main.variable(observer("heartScaleMatrix")).define("heartScaleMatrix", ["m4","heartExtents"], _heartScaleMatrix);
  main.variable(observer("heartModelMatrix")).define("heartModelMatrix", ["m4","heartScaleMatrix","heartTranslationMatrix"], _heartModelMatrix);
  main.variable(observer("leftModelMatrix")).define("leftModelMatrix", ["m4","heartScaleMatrix","heartExtents"], _leftModelMatrix);
  main.variable(observer("renderHeartLeft")).define("renderHeartLeft", ["gl","m4","heartScaleMatrix","heartExtents","Spin","heartModelMatrix","hex2rgb","twgl","heartBuffer"], _renderHeartLeft);
  main.variable(observer("renderHeartCenter")).define("renderHeartCenter", ["gl","m4","heartScaleMatrix","heartExtents","deg2rad","Spin","heartModelMatrix","hex2rgb","twgl","heartBuffer"], _renderHeartCenter);
  main.variable(observer("renderHeartRight")).define("renderHeartRight", ["gl","m4","heartScaleMatrix","heartExtents","Spin","heartModelMatrix","hex2rgb","twgl","heartBuffer"], _renderHeartRight);
  main.variable(observer("drawScore")).define("drawScore", ["patternBuffers","gl","stencilProgramInfo","patternViewMatrix","patternProjectionMatrix","twgl"], _drawScore);
  main.variable(observer("patternViewMatrix")).define("patternViewMatrix", ["m4"], _patternViewMatrix);
  main.variable(observer("patternProjectionMatrix")).define("patternProjectionMatrix", ["m4","canvasWidth","gl"], _patternProjectionMatrix);
  main.variable(observer("patternBuffers")).define("patternBuffers", ["twgl","gl","textMeshBufferInfo"], _patternBuffers);
  main.variable(observer("textMesh")).define("textMesh", ["vectorizeText","score_value"], _textMesh);
  main.variable(observer("textMeshBufferInfo")).define("textMeshBufferInfo", ["twgl","gl","textMesh"], _textMeshBufferInfo);
  main.variable(observer("vectorizeText")).define("vectorizeText", ["require"], _vectorizeText);
  main.variable(observer("stencilProgramInfo")).define("stencilProgramInfo", ["errorBlock","twgl","gl"], _stencilProgramInfo);
  main.variable(observer()).define(["md"], _99);
  main.variable(observer("planeTranslationMatrix")).define("planeTranslationMatrix", ["m4"], _planeTranslationMatrix);
  main.variable(observer("planeModelMatrix")).define("planeModelMatrix", ["m4","scaleMatrix","planeTranslationMatrix"], _planeModelMatrix);
  main.define("initial planePosition2", _planePosition2);
  main.variable(observer("mutable planePosition2")).define("mutable planePosition2", ["Mutable", "initial planePosition2"], (M, _) => new M(_));
  main.variable(observer("planePosition2")).define("planePosition2", ["mutable planePosition2"], _ => _.generator);
  main.variable(observer("renderPlane")).define("renderPlane", ["gl","twgl","planeUniforms","planeBufferInfo"], _renderPlane);
  main.variable(observer("planeBufferInfo")).define("planeBufferInfo", ["twgl","gl","vertexAttributes","plane"], _planeBufferInfo);
  main.variable(observer()).define(["md"], _105);
  main.variable(observer()).define(["md"], _106);
  main.variable(observer()).define(["md"], _107);
  main.define("initial gravity", _gravity);
  main.variable(observer("mutable gravity")).define("mutable gravity", ["Mutable", "initial gravity"], (M, _) => new M(_));
  main.variable(observer("gravity")).define("gravity", ["mutable gravity"], _ => _.generator);
  main.variable(observer()).define(["md"], _109);
  main.variable(observer()).define(["md"], _110);
  main.variable(observer()).define(["md"], _111);
  main.variable(observer()).define(["md"], _112);
  main.variable(observer()).define(["md"], _113);
  main.variable(observer("numberOfFrames")).define("numberOfFrames", _numberOfFrames);
  main.define("initial jumpFrame", _jumpFrame);
  main.variable(observer("mutable jumpFrame")).define("mutable jumpFrame", ["Mutable", "initial jumpFrame"], (M, _) => new M(_));
  main.variable(observer("jumpFrame")).define("jumpFrame", ["mutable jumpFrame"], _ => _.generator);
  main.define("initial moveFrame", _moveFrame);
  main.variable(observer("mutable moveFrame")).define("mutable moveFrame", ["Mutable", "initial moveFrame"], (M, _) => new M(_));
  main.variable(observer("moveFrame")).define("moveFrame", ["mutable moveFrame"], _ => _.generator);
  main.variable(observer("catJumpHeight")).define("catJumpHeight", _catJumpHeight);
  main.define("initial singleJump", _singleJump);
  main.variable(observer("mutable singleJump")).define("mutable singleJump", ["Mutable", "initial singleJump"], (M, _) => new M(_));
  main.variable(observer("singleJump")).define("singleJump", ["mutable singleJump"], _ => _.generator);
  main.define("initial inAir", _inAir);
  main.variable(observer("mutable inAir")).define("mutable inAir", ["Mutable", "initial inAir"], (M, _) => new M(_));
  main.variable(observer("inAir")).define("inAir", ["mutable inAir"], _ => _.generator);
  main.define("initial lane", _lane);
  main.variable(observer("mutable lane")).define("mutable lane", ["Mutable", "initial lane"], (M, _) => new M(_));
  main.variable(observer("lane")).define("lane", ["mutable lane"], _ => _.generator);
  main.variable(observer("lanewidth")).define("lanewidth", _lanewidth);
  main.variable(observer("maxLanes")).define("maxLanes", _maxLanes);
  main.variable(observer("numberOfLanes")).define("numberOfLanes", ["maxLanes"], _numberOfLanes);
  main.variable(observer("realism")).define("realism", ["catExtents","objectScale"], _realism);
  main.variable(observer("jump1")).define("jump1", ["mutable catTransY","catJumpHeight","mutable singleJump","mutable gravity"], _jump1);
  main.variable(observer("jump2")).define("jump2", ["numberOfFrames"], _jump2);
  main.variable(observer("jump3")).define("jump3", ["jumpRotation1","realism","m","n"], _jump3);
  main.variable(observer("jumpRotation1")).define("jumpRotation1", ["numberOfFrames","mutable catRotateX"], _jumpRotation1);
  main.variable(observer("m")).define("m", _m);
  main.variable(observer("n")).define("n", _n);
  main.variable(observer()).define(["md"], _132);
  main.variable(observer()).define(["md"], _133);
  main.variable(observer()).define(["md"], _134);
  main.variable(observer()).define(["md"], _135);
  main.variable(observer()).define(["md"], _136);
  main.variable(observer()).define(["md"], _137);
  main.variable(observer()).define(["md"], _138);
  main.variable(observer()).define(["md"], _139);
  main.variable(observer("scaleMatrix")).define("scaleMatrix", ["m4","objectScale","extents"], _scaleMatrix);
  main.variable(observer("ProjectionMatrix")).define("ProjectionMatrix", ["m4","camAngle","gl"], _ProjectionMatrix);
  main.variable(observer("viewMatrix")).define("viewMatrix", ["m4","transformedEyePosition","lookAtPOsition"], _viewMatrix);
  main.variable(observer("heartViewMatrix")).define("heartViewMatrix", ["m4","v3","heartExtents"], _heartViewMatrix);
  main.variable(observer("heartProjectionMatrix")).define("heartProjectionMatrix", ["m4","deg2rad","canvasWidth","gl","heartExtents"], _heartProjectionMatrix);
  main.variable(observer()).define(["md"], _145);
  main.variable(observer("lookAtPOsition")).define("lookAtPOsition", _lookAtPOsition);
  main.variable(observer("eyeDirection")).define("eyeDirection", _eyeDirection);
  main.variable(observer("eyePosition")).define("eyePosition", ["twgl","lookAtPOsition","eyeDirection"], _eyePosition);
  main.variable(observer("transformedEyePosition")).define("transformedEyePosition", ["m4","camAngle","eyePosition"], _transformedEyePosition);
  main.variable(observer()).define(["md"], _150);
  main.variable(observer("catUniforms")).define("catUniforms", ["ProjectionMatrix","viewMatrix","catModelMatrix","m4","hex2rgb","colors"], _catUniforms);
  main.variable(observer("planeUniforms")).define("planeUniforms", ["planeModelMatrix","viewMatrix","ProjectionMatrix","planeTexture","planePosition2","numberOfLanes"], _planeUniforms);
  main.variable(observer()).define(["md"], _154);
  main.variable(observer("cubemap")).define("cubemap", ["twgl","gl","px","nx","py","ny","pz","nz"], _cubemap);
  main.variable(observer("skyboxBufferInfo")).define("skyboxBufferInfo", ["twgl","gl"], _skyboxBufferInfo);
  main.variable(observer("planeImg")).define("planeImg", ["FileAttachment"], _planeImg);
  main.variable(observer("planeTexture")).define("planeTexture", ["twgl","gl","planeImg"], _planeTexture);
  main.variable(observer()).define(["md"], _159);
  main.variable(observer("errorBlock")).define("errorBlock", ["html","width"], _errorBlock);
  main.variable(observer("shaders")).define("shaders", _shaders);
  main.variable(observer("heartShaders")).define("heartShaders", _heartShaders);
  main.variable(observer("planeShaders")).define("planeShaders", _planeShaders);
  main.variable(observer("sceneProgramInfo")).define("sceneProgramInfo", ["errorBlock","twgl","gl"], _sceneProgramInfo);
  main.variable(observer("planeProgramInfo")).define("planeProgramInfo", ["errorBlock","twgl","gl","planeShaders"], _planeProgramInfo);
  main.variable(observer("programInfo")).define("programInfo", ["errorBlock","twgl","gl","shaders"], _programInfo);
  main.variable(observer("heartProgramInfo")).define("heartProgramInfo", ["errorBlock","twgl","gl","heartShaders"], _heartProgramInfo);
  main.variable(observer()).define(["md"], _168);
  main.variable(observer()).define(["md"], _169);
  main.variable(observer("nx")).define("nx", ["getImageData","FileAttachment"], _nx);
  main.variable(observer("px")).define("px", ["getImageData","FileAttachment"], _px);
  main.variable(observer("ny")).define("ny", ["getImageData","FileAttachment"], _ny);
  main.variable(observer("py")).define("py", ["getImageData","FileAttachment"], _py);
  main.variable(observer("nz")).define("nz", ["getImageData","FileAttachment"], _nz);
  main.variable(observer("pz")).define("pz", ["getImageData","FileAttachment"], _pz);
  return main;
}
