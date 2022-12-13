import define1 from "./71528f76392e620f@170.js";
import define2 from "./9d0fa713ea129540@422.js";
import define3 from "./10023e7d8ddc32bc@90.js";
import define4 from "./e93997d5089d7165@2303.js";
import define5 from "./36a43ebdbd39cf05@1738.js";
import define6 from "./dd5e3bdbece67f4e@210.js";
import define7 from "./7158611fb5be7d4a@6290.js";
import define8 from "./020ac9bd2be5d571@377.js";

function _1(md){return(
md`# Cat Burglar`
)}

function _2(md){return(
md`### How to Play
- W for jump
- A for left
- D for right
- M to mute

Obstacles will spawn randomly as the speed slowly increases.
- Tuna cans heal 1 heart.
- Stars act as currency for purchasing skins
  - The 1st skin will cost 5 stars
  - The 2nd skin will cost 100 stars

Select your difficulty and press 'Enter' when you're ready to play.

For best performance turn on hardware acceleration`
)}

function _mutebutton(Inputs){return(
Inputs.toggle({label: 'Mute', value: false})
)}

function _difficulty(Inputs){return(
Inputs.radio(
    ['easy',
    'hard'],
  {
    value: "easy",
    label: 'Choose Difficulty'
  }
)
)}

function _highscore(){return(
0
)}

function _collectedStars(){return(
0
)}

function _7(html,newskin)
{
  const form = html`<form onsubmit="return false;">
    <div><button name="myButton">purchase skins</button></div>
  </form>`;
  form.myButton.onclick = () => {
    newskin(); 
  };
  return form;
}


function _8(html,$0,$1,switchskin)
{
  const form = html`<form onsubmit="return false;">
    <div><button name="myButton">switch skins</button></div>
  </form>`;
  form.myButton.onclick = () => {
    $0.value++;
    $1.value = switchskin(); 
  };
  return form;
}


function* _9(game,gl)
{
  // runs the game, but only when something is changed
    
    requestAnimationFrame(game)
    yield gl.canvas;
}


function _totalHearts(){return(
3
)}

function _gameStart(){return(
false
)}

function _gameOver(){return(
false
)}

function _resets(resetGame,$0,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
{//resets all the mutables of the game
  // console.log(resetGame)
  if( resetGame){// only works id resetGame is not defined as mutable here //resetCat ||
    $0.value = 0;
    $1.value = 0;
    $2.value = 0;
    $3.value = 0;
    $4.value = 0;
    $5.value = 0;
    $6.value = 0;
    $7.value = 0;
    $8.value = true;
    $9.value = 0;
    $10.value = 0;
    $11.value = 0;
    $12.value = 0;
    $13.value = 0;
    $14.value = false;
    $15.value = false;
    // objectArray and objectTranslation are reset in catDeath()
    $16.value = [];
    $17.value = [];
    $18.value = "still"
    $19.value = false;
    $20.value = 3;
  }
}


function _debug(){return(
false
)}

function _array(score_value){return(
score_value.split(" ")
)}

function _currentScore(array){return(
parseInt(array[1])
)}

function _game($0,currSpeed,$1,gl,canvasWidth,hex2rgb,drawStart,stencilProgramInfo,renderCat,renderSkybox,keys,basicMovement,doMove,doJump,$2,spawnCheckpoint,$3,$4,spawnObjects,planeMovement,chooseCat,$5,collisionCheck,catDeath,$6,$7,flashing,$8,renderPlane,objectArray,updateObjects,totalHearts,renderHeartCenter,heartProgramInfo,heartViewMatrix,heartProjectionMatrix,renderHeartLeft,renderHeartRight,drawScore,currentScore,highscore,$9,$10,drawGameOver,stencilProgramInfoWhite,$11,resets){return(
function game(time){
  $0.value = currSpeed;
  if($1.value == false) 
  {
    gl.viewport(0, 0, canvasWidth, gl.canvas.height);
    gl.scissor(0, 0, canvasWidth, gl.canvas.height);
    gl.clearColor(...hex2rgb("#000000"), 1);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    drawStart(stencilProgramInfo);
    renderCat();
    // renderPlane();
    renderSkybox();
    if(keys.Enter == true)
    {
      $1.value = true;
    }
  }
  else
  {
  //make player change lanes
     basicMovement
     doMove();

  //make player jump
    //NOTE: cat jump currently stays in air for 20 frames or 20 times groundSpeedd
    //jump speed may be increased dynamically with movementspeed if we want
    doJump();


  // mutable debug = objectArray;

  // New game starting -> spawn gate
  if($2.value == 0) spawnCheckpoint();
  
  // Timer for object spawning
  if($2.value - $3.value <= $4.value)
  {
    spawnObjects();
  }

  //move plane
    planeMovement();

  //determine which cat to draw
    chooseCat();

  // split viewport (main view with character)
   gl.viewport(0, 0, canvasWidth, gl.canvas.height);
   gl.scissor(0, 0, canvasWidth, gl.canvas.height);
   gl.clearColor(...hex2rgb('000000'), 1);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  //draw player
  // *** if colision we can change color of cat here *** //
  //kill cat
    $5.value = collisionCheck($5.value);
    // console.log(collider);
    if ($5.value == true)
    {
      setTimeout(() => $5.value = false, 285);
    }
  
    catDeath();

    if($6.value){
      $6.value = false;
      $7.value = 0;//reset flashing for each collision
    }
    flashing()
    if($8.value){
      renderCat();
    }
    

  //draw plane
    renderPlane();

  // render skybox
    renderSkybox();
  
  // draw and update objects
  if(objectArray.length >= 1) updateObjects();
    // renderScene();
  
  // second view (hud for the hearts)
  gl.viewport(0, gl.canvas.height - gl.canvas.height / 5, canvasWidth / 5, gl.canvas.height / 5);
  gl.scissor(0, gl.canvas.height - gl.canvas.height / 5, canvasWidth / 5, gl.canvas.height / 5);
  // gl.clearColor(...hex2rgb("63e859"), 1); // clear background of hearts
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.DEPTH_BUFFER_BIT);
  
  if (totalHearts >= 3) {
    renderHeartCenter(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
    renderHeartLeft(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
    renderHeartRight(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
  }
  
  if (totalHearts == 2) {
    renderHeartCenter(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
    renderHeartLeft(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
  }

  if (totalHearts == 1) {
    renderHeartLeft(heartProgramInfo, heartViewMatrix(2.5, 0, 0), heartProjectionMatrix(45, 0.1, 2.5));
  }
  
  // third viewpot for the players score visible on hud
  gl.viewport(gl.canvas.width - gl.canvas.width / 5, gl.canvas.height - gl.canvas.height / 5, canvasWidth / 5, gl.canvas.height / 5);
  gl.scissor(gl.canvas.width - gl.canvas.width / 5, gl.canvas.height - gl.canvas.height / 5, canvasWidth / 5, gl.canvas.height / 5);
  // gl.clearColor(...hex2rgb("63e859"), 1);
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.DEPTH_BUFFER_BIT);

  drawScore();

  if (currentScore > highscore)
      $9.value = currentScore;

  if($10.value == true){
    gl.viewport(0, 0, canvasWidth, gl.canvas.height);
    gl.scissor(0, 0, canvasWidth, gl.canvas.height);
    gl.clearColor(...hex2rgb("111111"), 1);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    
    drawGameOver(stencilProgramInfoWhite);
    
    if(keys.Enter == true){
      //console.log("reset ma game")
      //reset game
      $11.value = true;
      resets;
    }
  }
  }
}
)}

function _canvasWidth(gl){return(
gl.canvas.width
)}

function _collider(){return(
false
)}

function _20(md){return(
md`## external libraries and imports`
)}

function _hex2rgb(){return(
(hex) =>
  (hex = hex.replace("#", ""))
    .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
    .map((l) => parseInt(hex.length % 2 ? l + l : l, 16) / 255)
)}

function _TWEEN(require){return(
require('tween.js')
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
  
  // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  return gl;
}


function _35(md){return(
md`## Attributes`
)}

function _36(md){return(
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

function _38(md){return(
md`### Object specific Properties`
)}

function _39(md){return(
md`could be different scale values for each object, or location values for each object, or colors`
)}

function _catAttributes(vertexAttributes,catstillObj){return(
vertexAttributes(catstillObj)
)}

function _catModel(){return(
"still"
)}

function _catBufferInfo(catAttributes,twgl,gl){return(
catAttributes.map((catAttributes) =>//still cat
    twgl.createBufferInfoFromArrays(gl, catAttributes)
  )
)}

function _stillCatAttribs(vertexAttributes,catstillObj){return(
vertexAttributes(catstillObj)
)}

function _walk1CatAttribs(vertexAttributes,catwalk1Obj){return(
vertexAttributes(catwalk1Obj)
)}

function _walk2CatAttribs(vertexAttributes,catwalk2Obj){return(
vertexAttributes(catwalk2Obj)
)}

function _getcatbufferinfo($0,stillCatAttribs,walk1CatAttribs,walk2CatAttribs,twgl,gl){return(
function getcatbufferinfo(){
  let va;
switch($0.value){
  case "still":
    va = stillCatAttribs;
    break;
  case "walk1":
    va = walk1CatAttribs;
    break;
  case "walk2":
    va = walk2CatAttribs;
    break;
  default:
    va = stillCatAttribs;
}

  return va.map((catAttributes) =>
    twgl.createBufferInfoFromArrays(gl, catAttributes)
  );
}
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

function _50(md){return(
md`## - Model rendering & obstacle movement`
)}

function _51(md){return(
md`code space for rendering models and their movement`
)}

function _52(md){return(
md`- obstacles
- textures
- movement towards player
- design system to load random obstacles`
)}

function _53(md){return(
md`### Obstacles`
)}

function _staticObjs(trashObj,holeObj,lampObj,canObj,starObj,gateObj){return(
[trashObj, holeObj, lampObj, canObj, starObj, gateObj]
)}

function _staticTypes(){return(
['obstacle', 'obstacle', 'obstacle', 'tunaCan', 'star', 'gate']
)}

function _staticTextures(twgl,gl,trashTex,holeTex,lampTex,canTex,starTex,gateTex){return(
[
  twgl.createTexture(gl, {
    src: trashTex,                
    flipY: true
  }),
  twgl.createTexture(gl, {
    src: holeTex,                
    flipY: true
  }),
  twgl.createTexture(gl, {
    src: lampTex,               
    flipY: true
  }),
  twgl.createTexture(gl, {
    src: canTex,                
    flipY: true
  }),
  twgl.createTexture(gl, {
    src: starTex,                 
    flipY: true
  }),
  twgl.createTexture(gl, {
    src: gateTex,                 
    flipY: true
  }),
]
)}

function _staticAttributes(getStaticAttribs,staticObjs){return(
getStaticAttribs(staticObjs)
)}

function _getStaticAttribs(){return(
function getStaticAttribs(objects)
{
  var attribs = [];
  for(let i = 0; i < objects.length; i++)
    {
      var temp = objects[i].map((d) => ({
        position: { numComponents: 3, data: d.sc.positions },
        normal: { numComponents: 3, data: d.sc.normals },
        uv: { numComponents: 2, data: d.sc.uvs }
      }));
      attribs.push(temp);
    }
    return attribs
}
)}

function _staticExtents(getStaticExtents,staticObjs){return(
getStaticExtents(staticObjs)
)}

function _getStaticExtents(computeModelExtent){return(
function getStaticExtents(objects)
{
  var extents = []
  for(let i = 0; i < objects.length; i++)
  {
    extents.push(computeModelExtent(objects[i]));
  }
  return extents;
}
)}

function _staticBufferInfos(getStaticBuffers,staticAttributes){return(
getStaticBuffers(staticAttributes)
)}

function _getStaticBuffers(twgl,gl){return(
function getStaticBuffers(attribs)
{
  var buffers = [];
  for(let i = 0; i < attribs.length; i++)
    {
      var temp = attribs[i].map((vertexAttributes) =>
        twgl.createBufferInfoFromArrays(gl, vertexAttributes)
      )
      buffers.push(temp);
    }
    return buffers;
}
)}

function _obstacleSpawnRate(){return(
-0.22
)}

function _pwrupSpawnRate(){return(
5
)}

function _groundSpeed(){return(
.006
)}

function _lastPos(){return(
0
)}

function _rowCount(){return(
0
)}

function _objectArray(){return(
[]
)}

function _objectTranslations(){return(
[]
)}

function _spawnPowerupFlag(){return(
true
)}

function _GameObject(){return(
class GameObject
{
  constructor(objectIdx, lane)
  {
    this.index = objectIdx;
    this.lane = lane;                 
  }
}
)}

function _spawnObjects($0,$1,$2,$3,$4,spawnPowerup,spawnObstacles){return(
function spawnObjects()
{
    $0.value = $1.value;
    $2.value = true;  
    $3.value += 1;
    
    // If threshshold has been crossed, spawn a powerup instead.
    if($3.value % $4.value == 0 && $2.value && $3.value != 0)
    {
      spawnPowerup();   
    }
    // Otherwise, spawn an obstacle.
    else{
      spawnObstacles();
    }
}
)}

function _updateObjects($0,$1,stopMovement,$2,renderObject,sceneProgramInfo){return(
function updateObjects()
{
  // DESPAWN CASE:
  // Check front object for Despawn. Using while loop because there might be weirdness with the translations and shifting.
  while($0.value[0].z > 5.5)  // > DESPAWN POINT. Making this smaller might improve performance.
  {
      $1.value.shift();
      $0.value.shift();
  }
  
  // Iterate through the powerups.
  for(let i = 0; i < $1.value.length; i++)
    {
      var object = $1.value[i];  // Need this because shifting was creating bugs   
      
      // Update the objects' translations.
      if(!stopMovement)
      {
        $0.value[i].z += ($2.value * 8.88);
      }
      
      // Rendering.
      renderObject(sceneProgramInfo, object, $0.value[i].z);
      
    }
}
)}

function _getRandomObstacle(){return(
function getRandomObstacle()
{  
  // Select random index in range of possibilities.
  // let possible = 3; FOR LAMP
  let possible = 3;  
  let idx = Math.floor( Math.random() * possible );
  
  // return [object[idx], texImg[idx], type];
  return idx;
}
)}

function _spawnObstacles(getRandomLanes,GameObject,$0,$1,movePlaneUnderCat,getRandomObstacle){return(
function spawnObstacles()
{
  let spawnLanes = getRandomLanes();
  for(let i = 0; i < spawnLanes.length; i++)
    {
      if(i==2)
      {
        // 3 Lanes, so force at least 1 jumpable obstacle to be passed.
        let obstacle = new GameObject( 1, spawnLanes[i] );
        $0.value.push(obstacle); 
        $1.value.push({x:spawnLanes[i], y:-movePlaneUnderCat, z:0});
        return;
      }
      let obstacleInfo = getRandomObstacle();
      let obstacle = new GameObject( obstacleInfo, spawnLanes[i] );
      $0.value.push(obstacle);  
      $1.value.push({x:spawnLanes[i], y:-movePlaneUnderCat, z:0});
    }
}
)}

function _getRandomPowerUp(){return(
function getRandomPowerUp()
{  
  var starProb = 0.8;
  var tunaProb = 0.2;
  // var starProb = 1.0;
  var idx;
  var prob = Math.random();
  // Select random index in range of possibilities.
  if(prob < starProb)
  {
    idx = 4;
  }
  else
  {
    idx = 3;
  }
  // let possible = 2;   
  // let idx = Math.floor( Math.random() * possible );
  
  // Account for the 3 possible obstacles in the array.
  return idx;
  // return (idx + 3);  FOR LAMP
}
)}

function _spawnPowerup($0,getRandomLanes,getRandomPowerUp,GameObject,$1,$2,movePlaneUnderCat){return(
function spawnPowerup()
{
  $0.value = false; 
  let spawnLanes = getRandomLanes();
  let powerupInfo = getRandomPowerUp();
  let powerup = new GameObject( powerupInfo, spawnLanes[0] );
  $1.value.push(powerup);
  $2.value.push({x:powerup.lane, y:-movePlaneUnderCat, z:0});
}
)}

function _spawnCheckpoint($0,movePlaneUnderCat,GameObject,staticObjs,$1){return(
function spawnCheckpoint()
{
    $0.value.push({x:0, y:-movePlaneUnderCat, z:1});
    let checkpoint = new GameObject( staticObjs.length - 1, 0.0 );
    $1.value.push(checkpoint); 
}
)}

function _79(md){return(
md`Rendering function for individual obstacles and powerups`
)}

function _renderObject(staticTypes,m4,movePlaneUnderCat,Spin,staticBufferInfos,eyePosition,staticTextures,viewMatrix,ProjectionMatrix,gl,twgl){return(
function renderObject(programInfo, object, trans)
{
  let MM = 0
      if(staticTypes[object.index] == 'star')
      {
        MM=  m4.multiply(m4.translation([object.lane, -movePlaneUnderCat, (trans - 4.5)]),m4.rotationY(staticTypes[object.index]=='star'?Spin/6:0))
      }
      else{
        MM = m4.translation([object.lane, -movePlaneUnderCat, (trans - 4.5)]);
      }

 
  
      
      const modelMatrix = MM;
      const bufferInfo = staticBufferInfos[object.index];
      const uniforms = {
        modelMatrix: modelMatrix,
        eyePosition: eyePosition,
        tex: staticTextures[object.index],
        viewMatrix: viewMatrix,
        projectionMatrix: ProjectionMatrix
      }
      gl.useProgram(programInfo.program);
      twgl.setUniforms(programInfo, uniforms);
      bufferInfo.forEach((bufferInfo) => {
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        twgl.drawBufferInfo(gl, bufferInfo);
      });
      // twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      // twgl.drawBufferInfo(gl, bufferInfo);
}
)}

function _currSpeed(){return(
0
)}

function _getRandomLanes($0){return(
function getRandomLanes()
{
  // for 1 lane, return the lane
  // for 2 lanes, find 1 random lane, return the other 2. ()
  const prob1 = 0.48;
  const prob2 = 0.42;
  const prob3 = 0.10;

  var prob = Math.random();
  var numLanes;
  
  // Based on random probability, select how many: objects will spawn / lanes will be used
  if(prob < prob1)
  {
    numLanes = 1;
  }
  else if(prob < (prob1 + prob2))
  {
    numLanes = 2;
  }
  else
  {
    numLanes = 3;
  }
  
  var possible = [-0.5, 0, 0.5];
  var idx;

  // Return all the lanes used.
  switch(numLanes)
    {
        
      // Picking 1 lane
      case 1:
        idx = Math.floor( Math.random() * 3 );
        return [ possible[idx] ];
        
      //picking 2 lanes
      case 2:
        idx = Math.floor( Math.random() * 3 );
        return [ possible[(idx + 1) % 3], possible[(idx + 2) % 3] ];

      // TODO: RICKING 3 LANES
      case 3:
        if($0.value <= 0.82)
        {
          idx = Math.floor( Math.random() * 3 );
          return [ possible[(idx + 1) % 3], possible[(idx + 2) % 3] ];
        }
        var bucket = possible;
        var lanes = [];
        for(let i = 0; i < 3; i++)
          {
            var randomIndex = Math.floor(Math.random()*bucket.length);
            lanes.push(bucket.splice(randomIndex, 1)[0]);
          }
        return lanes;
        
      // Default: picking 1 lane
      default:
        idx = Math.floor( Math.random() * 3 );
        return [ possible[idx] ];
        
    }
}
)}

function _drawCat(){return(
true
)}

function _renderCat(getcatbufferinfo,gl,sceneProgramInfo,twgl,catUniforms){return(
() => {//fix render cat
    const binfo = getcatbufferinfo();
    gl.useProgram(sceneProgramInfo.program);
    twgl.setUniforms(sceneProgramInfo, catUniforms);
    binfo.forEach((bufferInfo) => {
      twgl.setBuffersAndAttributes(gl, sceneProgramInfo, bufferInfo);
      twgl.drawBufferInfo(gl, bufferInfo);
    });
}
)}

function _chooseCat($0,$1,$2,$3){return(
function chooseCat(){
    if($0.value || $1.value){
      $2.value = "still";
    }
    else {//alternate between the two models
      const val = (-$3.value*10)%2
      if(val <= 1 ){
        $2.value = "walk1";
      }
      else{
        $2.value = "walk2";
      }
    }
}
)}

function _basicMovement(keys,$0,maxLanes,$1,$2,$3,$4,$5,catstillObj,playMusic,jumpsoundURL)
{// Basic movement
    if(keys.a && ($0.value > -maxLanes) && $1.value )
    {
      $0.value -= 1;
      $1.value = false;
    }
    else if(keys.d && ($0.value < maxLanes) && $1.value)
    {
      $0.value += 1;
      $1.value = false
    }
    if(keys.m){
      $2.value = ~$2.value;
    }
    if((keys.w) && ($3.value == false) && ($4.value == false)){
      //single jump defines one jump is allowed
        //potential implementation of double jump is possible
      $3.value = true;
      $4.value = true;
      $5.value = catstillObj
      if($2.value == false){
        playMusic(jumpsoundURL);
      }
    }
  // Basic movement
      }


function _planeMovement($0,$1,$2){return(
function planeMovement() {//plane movement
    if(!$0.value){
      $1.value -= $2.value;//was this always negative?
    }
  //plane movement
      }
)}

function _catTex(twgl,gl,cat1Tex){return(
twgl.createTexture(gl, {
  src: cat1Tex,
  flipY: true
})
)}

function _90(md){return(
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

function _catRotateX(){return(
0
)}

function _catRotateY(){return(
-0
)}

function _catRotateZ(){return(
0
)}

function _moveComplete(){return(
true
)}

function _movePlaneUnderCat(catExtents){return(
(catExtents.max[1] - catExtents.min[1])/2
)}

function _catTranslationMatrix(m4,catTransX,catTransY,catTransZ){return(
m4.translation([catTransX,catTransY,catTransZ])
)}

function _catRotationMatrix(m4,deg2rad,catRotateX,gameStart,catRotateY,Spin,catRotateZ){return(
m4.multiply( 
    m4.rotationX(deg2rad(catRotateX)),
    m4.multiply( 
      m4.rotationY(deg2rad(gameStart?catRotateY:Spin)), 
      m4.rotationZ(deg2rad(catRotateZ))
  ))
)}

function _catModelMatrix(m4,catTranslationMatrix,catRotationMatrix,catToCenter){return(
m4.multiply(catTranslationMatrix,m4.multiply(m4.identity(), m4.multiply(catRotationMatrix,catToCenter )))
)}

function _catToCenter(translateToCenter,catExtents){return(
translateToCenter(catExtents.center)
)}

function _translateToCenter(m4){return(
function translateToCenter(OBJextents){
  return m4.translation([-OBJextents[0],-OBJextents[1],-OBJextents[2]])
}
)}

function _104(md){return(
md`### Cat`
)}

function _105(md){return(
md`### Plane
`
)}

function _planeWidth(){return(
.005
)}

function _planeTranslationMatrix(m4,movePlaneUnderCat){return(
m4.translation([0,0-movePlaneUnderCat,0])
)}

function _planeScaleMatrix(m4,scaleMatrix,planeWidth){return(
m4.multiply(scaleMatrix,m4.scaling([-planeWidth,-.01,-.02]))
)}

function _planeModelMatrix(m4,planeTranslationMatrix,planeScaleMatrix,planeToCenter){return(
m4.multiply( planeTranslationMatrix,m4.multiply(m4.identity(),m4.multiply(planeScaleMatrix,planeToCenter)))
)}

function _planeToCenter(translateToCenter,planeExtents){return(
translateToCenter(planeExtents.center)
)}

function _planePosition2(){return(
0
)}

function _renderPlane(gl,planeProgramInfo,twgl,planeUniforms,planeBufferInfo){return(
function renderPlane()
{
  gl.useProgram(planeProgramInfo.program);
  
  twgl.setUniforms(planeProgramInfo, planeUniforms);
  twgl.setBuffersAndAttributes(gl, planeProgramInfo, planeBufferInfo);
  twgl.drawBufferInfo(gl, planeBufferInfo);
}
)}

function _planeBufferInfo(twgl,gl,vertexAttributes,plane){return(
twgl.createBufferInfoFromArrays(gl, vertexAttributes(plane)[0] )
)}

function _114(md){return(
md`### Plane`
)}

function _115(md){return(
md`## - Model rendering & obstacle movement`
)}

function _116(md){return(
md`## - Collision detection`
)}

function _gravity(){return(
true
)}

function _118(md){return(
md`code space to detect collisions between player and obstacles`
)}

function _119(md){return(
md`- detect when player hits an object
 - notify player
 - reduce health`
)}

function _120(md){return(
md`## - Collision detection`
)}

function _collisionCheck($0,$1,staticExtents,$2,$3,$4,movePlaneUnderCat,staticTypes,$5,playMusic,hurtSoundUrl,$6,$7,munchSoundUrl,starSoundUrl,$8,$9){return(
function collisionCheck(collider) 
{
        for (let i = 0; i < $0.value.length; i++)
        {
          // console.log(staticExtents[mutable objectArray[i].index].min[0]);
          const objectMinX = $1.value[i].x  + staticExtents[$0.value[i].index].min[0];
          const objectMaxX = $1.value[i].x  + staticExtents[$0.value[i].index].max[0];
          const objectMinY = $1.value[i].y - .05 + staticExtents[$0.value[i].index].min[1];
          const objectMaxY = $1.value[i].y + .05 + staticExtents[$0.value[i].index].max[1];
          const objectMinZ = $1.value[i].z - 4.5  + staticExtents[$0.value[i].index].min[2];
          const objectMaxZ = $1.value[i].z - 4.5 + staticExtents[$0.value[i].index].max[2];
          // mutable staticextents[objectArray[i].index].min[0]
          
          if (($2.value >= objectMinX && $2.value <= objectMaxX) && ($3.value >= objectMinZ && $3.value <= objectMaxZ) && ($4.value -movePlaneUnderCat >= objectMinY && $4.value -movePlaneUnderCat <= objectMaxY))
          {
            if (staticTypes[$0.value[i].index] === "obstacle" && collider == false)
            {
              console.log("Collision with object " + staticTypes[$0.value[i].index]);
              if ($5.value == false) {
                playMusic(hurtSoundUrl);
              }
              $6.value = true;
              $7.value--;
              return true;
              break;
            }
            else if (staticTypes[$0.value[i].index] === "tunaCan" && collider == false)
            {
              console.log("Collision with TunaCan")
              if ($5.value == false) {
                playMusic(munchSoundUrl);
              }
              if ($7.value < 3)
              {
                $7.value++;
              }
              return true;
              break;
            }
            else if (staticTypes[$0.value[i].index] === "star" && collider == false)
            {
              console.log("collision with star")
              if ($5.value == false) {
                playMusic(starSoundUrl);
              }
              $8.value++;
              $9.value++;
              return true;
              break;
            }
          }

          // console.log("no Collision")

        }
  
        if (collider == false)
        {
          return false;
        }
        
        return true;
  
}
)}

function _122(md){return(
md`## - Character movement & jump`
)}

function _123(md){return(
md`code space for player movement and physics
- left right player movement
- player jump`
)}

function _stopMovement(){return(
false
)}

function _doJump($0,$1,numberOfFrames,jumpRotation1,$2,jump3,$3,$4,$5){return(
function doJump(){
if($0.value){
      if($1.value <= numberOfFrames){
        const CF = $1.value;
        jumpRotation1(CF);
        $2.value = jump3(CF) *$3.value;
        $1.value += 1;
      }
      else{// turn off this if statement, reset frame
        $1.value = 0;
        $0.value = false;
        $4.value = false;
        $2.value = 0;// reset cat position just in case
        $5.value = 0;
      }
    }
}
)}

function _doMove($0,numberOfFrames,$1,$2,$3,lanewidth,$4,incrementLaneValue,laneChangeSpeed){return(
function doMove(){
  if($0.value > numberOfFrames ){
      $1.value = true;
      $2.value = $3.value * lanewidth;
      $0.value = 0;
      $4.value = $3.value;
    }
  
    if( $3.value < $4.value && !$1.value){
      $2.value -= incrementLaneValue;
      $0.value += laneChangeSpeed;
    }
    else if( $3.value > $4.value && !$1.value){
      $2.value += incrementLaneValue;
      $0.value += laneChangeSpeed;
    }
}
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

function _flashFrame(){return(
0
)}

function _catJumpMultiplier(catExtents){return(
(catExtents.max[1] - catExtents.min[1])*4.5
)}

function _catJumpHeight(catExtents){return(
(catExtents.max[1] - catExtents.min[1])*6
)}

function _killcat(Inputs){return(
Inputs.toggle({label: 'kill cat', value: false})
)}

function _deathSide(){return(
0
)}

function _deathFrame(){return(
0
)}

function _movecatafterdeath(movePlaneUnderCat,numberOfFrames){return(
(movePlaneUnderCat/numberOfFrames)/2 + 0.0005
)}

function _catDeath($0,killcat,$1,$2,numberOfFrames,$3,$4,$5,$6,$7,playMusic,gameOverSoundURL,$8,movecatafterdeath,$9,deathSide){return(
function catDeath(){
  if(($0.value <=0 || killcat == true) && !$1.value ){
      if($2.value < numberOfFrames ){// if we put a multiplier here must update movecatafterdeath
        // stop plane movement
        $3.value = true;
        // over next couple frames rotate cat
        if($2.value == 0){
          $4.value = [];
          $5.value = [];
          $6.value = Math.random()<= 0.5 ? 1: -1;
          if($7.value == false){
            playMusic(gameOverSoundURL)
          }
        }
        // rotate cat 90 degrees over 20 frames
        $8.value -= movecatafterdeath ;
        $9.value += 4.5* deathSide;
        $2.value += 1;
      }
      // set game over
      if($2.value == 20){
        
        console.log("Game Over!")
        $1.value = true;
      }
      
    }
}
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

function _catCurrentLane(){return(
0
)}

function _lanewidth(){return(
.5
)}

function _maxLanes(){return(
1
)}

function _numberOfLanes(){return(
1
)}

function _realism(catJumpHeight)
{// phyically based function
  const gravitationalConstant = 6.6743*10**-11;
  const massOfCat = 4.5;//kg
  const planetMass = 5.9722 *10**24;//kg
  const distanceFromCenter = 6.4*10**6;// meters
  const gravitationalForce = gravitationalConstant*(planetMass*massOfCat)/(distanceFromCenter**2);//answer in netwons
  const gravitationalAcceleration = -gravitationalForce/massOfCat; // m/s^2
  const jumpForce = (catJumpHeight)*massOfCat;
  return {jumpForce:(Math.round(jumpForce*10)/10),gravitationalAcceleration:(Math.round(gravitationalAcceleration*10)/10)}
}


function _jump1($0,catJumpHeight,$1,numberOfFrames,$2){return(
function jump1(){// linearly based jump function, updated with jump() a sin based function
  if(($0.value < catJumpHeight) && ($1.value)){
    $0.value += catJumpHeight/numberOfFrames;
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

function _jump3(realism,l,h){return(
function jump3(currentF){// finalized jump function, uses projectile motion to simulate jump
  // variable m and n are used to scale the jump to match the dimension of the sin function
  const t = currentF;
  const val = ((realism.jumpForce * (t*l)) + 0.5*(realism.gravitationalAcceleration * (t*l)**2))*h;
  return val;
}
)}

function _jumpRotation1(numberOfFrames,maxRotate,$0){return(
function jumpRotation1(currentF){//potentially replace with a between-ing function
  const val = Math.cos((currentF*Math.PI)/numberOfFrames);
  const middleFrame = numberOfFrames/2;
  const difference = currentF - middleFrame;// -1, 0, 1
  const degreeChange = maxRotate/2;// = 7.5
  const chng = (difference+2)*degreeChange;//shift difference
  
  if(currentF < middleFrame -1 ){
    $0.value = maxRotate //+ (2 * degreeChange)
  }
  else if(currentF > middleFrame +1){
    $0.value = -maxRotate //- (2 * degreeChange);
  }
  else{
    $0.value = maxRotate - chng;// uses 3 frames to smooth out difference between up and down angle
  }
}
)}

function _maxRotate(){return(
15
)}

function _laneChangeSpeed(){return(
3
)}

function _incrementLaneValue(lanewidth,laneChangeSpeed,numberOfFrames){return(
(lanewidth * laneChangeSpeed)/numberOfFrames
)}

function _l(numberOfFrames){return(
1.21649484536/numberOfFrames
)}

function _h(){return(
1/1.7942
)}

function _flashing($0,numberOfFrames,$1){return(
function flashing() {
  if($0.value < numberOfFrames/2){
    const val = ($0.value ) % 2;
    $1.value = val < 1;
    
    $0.value += 1; 
  }
  else{
    $1.value = true;
  }
}
)}

function _collidedWithObstacle(){return(
false
)}

function _157(md){return(
md`## - Character movement & jump`
)}

function _158(md){return(
md`## - Score and level design`
)}

function _159(md){return(
md`code space to store score and designing of levels
- day and night implementation
- map textures`
)}

function _160(md){return(
md`## - Score`
)}

function _starScore(){return(
0
)}

function _myDifficulty(){return(
{
  easy: {name: "Day", speed: 0.001407486685182431},
  hard: {name: "Night", speed: 0.007800884648905694},
}
)}

function _speed_Increase($0){return(
function speed_Increase (a, b) {
  
  var y = -b * a;
  var temp = 1 - Math.pow(2.71828, y);
  $0.value = temp;
  return temp;
}
)}

function* _score_value(DOM,difficulty,myDifficulty,$0,gameOver,speed_Increase,gameStart,Promises)
{
  const gl = DOM.context2d(160, 90);

  let score = 0;

  var reducer = 0.6;

  if (difficulty == "easy") {
    myDifficulty.easy.speed = 0.001407486685182431;
    $0.value = myDifficulty.easy.speed;
  }
  else if (difficulty == "hard"){
    myDifficulty.hard.speed = 0.007800884648905694;
    $0.value = myDifficulty.hard.speed;
  }
  
  gl.font = '48px sans-serif'; 
  gl.textAlign = 'center';

  var str = "Score: "

  if (gameOver == true) {

    str += score.toString();
    
    $0.value = 0;
    
    yield str;
  }

  var exponentialValue = 0;
  
  if (difficulty == "easy")
     exponentialValue = -(Math.log(0.4) / 3);
  else
     exponentialValue = -Math.log(0.4);
  
  while (gameOver == false) {  
    if (score % 150 == 0 && difficulty == "easy") {
      reducer = speed_Increase(exponentialValue, 3);
      
      console.log("reducer is: " + reducer);
      
      myDifficulty.easy.speed /= reducer;
      $0.value = myDifficulty.easy.speed;

      exponentialValue += 0.10;
      
    }
    else if (score % 75 == 0 && difficulty == "hard") {
      reducer = speed_Increase(exponentialValue, 2);
      
      console.log("reducer is: " + reducer);
      
      myDifficulty.hard.speed /= reducer;
      $0.value = myDifficulty.hard.speed;

      exponentialValue += 0.5;
    }


    str = "Score: "
    
    str += score.toString();

    if (gameStart == true) {
      score++;
    } 
    
    yield Promises.delay(10, str);
  } 
}


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

function _patternProjectionMatrix(m4,canvasWidth,gl){return(
[
  m4.identity(),
  m4.perspective(Math.PI / 4, canvasWidth / gl.canvas.height, 0.01, 1000),
  m4.perspective(Math.PI / 4, canvasWidth / gl.canvas.height, 500, 5000)
]
)}

function _patternViewMatrix(m4){return(
[
  m4.identity(),
  m4.inverse(m4.lookAt([0, 0, -500], [0, 0, 0], [0, -1, 0])),
  m4.inverse(m4.lookAt([0, 0, 1000], [0, 0, 0], [0, 1, 0]))
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

function _textMeshBufferInfo(twgl,gl,textMesh){return(
twgl.createBufferInfoFromArrays(gl, {
  position: { numComponents: 2, data: textMesh.positions.flat() },
  indices: { numComponents: 3, data: textMesh.cells.flat() }
})
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


function _stencilProgramInfoWhite(errorBlock,twgl,gl)
{
  const frag = `#version 300 es
    precision mediump float;
    out vec4 outColor;
    void main () {
      outColor = vec4(1,1,1,1);
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


function _174(md){return(
md`following is an attempt at game over interface`
)}

function _gameovertext(){return(
"Game over! Press enter to play again"
)}

function _startText(){return(
"Choose Difficulty! Press enter to play"
)}

function _gameOverMeshBufferInfo(twgl,gl,gameOverMesh){return(
twgl.createBufferInfoFromArrays(gl, {
  position: { numComponents: 2, data: gameOverMesh.positions.flat() },
  indices: { numComponents: 3, data: gameOverMesh.cells.flat() }
})
)}

function _startMeshBufferInfo(twgl,gl,startMesh){return(
twgl.createBufferInfoFromArrays(gl, {
  position: { numComponents: 2, data: startMesh.positions.flat() },
  indices: { numComponents: 3, data: startMesh.cells.flat() }
})
)}

function _gameoverBuffers(twgl,gl,gameOverMeshBufferInfo){return(
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
  gameOverMeshBufferInfo
]
)}

function _startBuffers(twgl,gl,startMeshBufferInfo){return(
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
  startMeshBufferInfo
]
)}

function _gameOverMesh(vectorizeText,gameovertext){return(
vectorizeText(gameovertext, {
  triangles: "triangles",
  font: "serif",
  width: 450,
  textAlign: "center",
  textBaseline: "middle"
})
)}

function _startMesh(vectorizeText,startText){return(
vectorizeText(startText, {
  triangles: "triangles",
  font: "serif",
  width: 450,
  textAlign: "center",
  textBaseline: "middle"
})
)}

function _drawGameOver(gameoverBuffers,gl,patternViewMatrix,patternProjectionMatrix,twgl){return(
(stencilProgramInfo) => {
  const stencilBufferInfo = gameoverBuffers[1];

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

function _drawStart(startBuffers,gl,patternViewMatrix,patternProjectionMatrix,twgl){return(
(stencilProgramInfo) => {
  const stencilBufferInfo = startBuffers[1];

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

function _resetGame(){return(
false
)}

function _186(md){return(
md`## - Health`
)}

function* _Spin($0,stopMovement)
{
  while (!$0.value) {
    var sum = 0;
    
    for (let i = -180, n = 180; i < n; ++i) {
      sum += i;
      yield i;
    }
    
    yield sum;
  }
  if(stopMovement){
    yield 0;
  }
}


function _renderHeartLeft(gl,m4,heartScaleMatrix,heartExtents,deg2rad,Spin,heartModelMatrix,hex2rgb,twgl,heartBuffer){return(
(programInfo,heartViewMatrix, heartProjectionMatrix) => {
  gl.useProgram(programInfo.program);
  const uniforms = {
    projection: heartProjectionMatrix,
    view: heartViewMatrix,
    world: m4.rotateY(m4.multiply(heartScaleMatrix, m4.translation([-heartExtents.center[0] - 4, -heartExtents.center[1] + 2, -heartExtents.center[2]])), deg2rad(Spin)),    
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
(heartProgramInfo,heartViewMatrix, heartProjectionMatrix) => {
  gl.useProgram(heartProgramInfo.program);
  const uniforms = {
    projection: heartProjectionMatrix,
    view: heartViewMatrix,
    world: m4.rotateY(m4.multiply(heartScaleMatrix, m4.translation([-heartExtents.center[0], -heartExtents.center[1] + 2, -heartExtents.center[2]])), deg2rad(Spin)),    
    normalMatrix: m4.inverse(m4.transpose(heartModelMatrix)),
  
    materialColor: hex2rgb("#ff0000") 
  };
  twgl.setUniforms(heartProgramInfo, uniforms);
  heartBuffer.forEach((heartBuffer) => {
    twgl.setBuffersAndAttributes(gl, heartProgramInfo, heartBuffer);
    twgl.drawBufferInfo(gl, heartBuffer);
  });
}
)}

function _renderHeartRight(gl,m4,heartScaleMatrix,heartExtents,deg2rad,Spin,heartModelMatrix,hex2rgb,twgl,heartBuffer){return(
(programInfo,heartViewMatrix, heartProjectionMatrix) => {
  gl.useProgram(programInfo.program);
  const uniforms = {
    projection: heartProjectionMatrix,
    view: heartViewMatrix,
    world: m4.rotateY(m4.multiply(heartScaleMatrix, m4.translation([-heartExtents.center[0] + 4, -heartExtents.center[1] + 2, -heartExtents.center[2]])), deg2rad(Spin)),    
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

function _heartProgramInfo(errorBlock,twgl,gl,heartShaders)
{
  errorBlock.style.height = "20px";
  errorBlock.innerHTML = "Program Shader compilation successful";
  return twgl.createProgramInfo(gl, [heartShaders.vs, heartShaders.fs], (message) => {
    errorBlock.style.height = "400px";
    errorBlock.innerHTML = "Program Shader compilation error\n" + message;
  });
}


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


function _heartExtents(computeModelExtent,heartObj){return(
computeModelExtent(heartObj)
)}

function _196(md){return(
md`## - Model upgrades`
)}

function _197(md){return(
md`code space to store model upgrades
- textures
- models`
)}

function _decider(){return(
0
)}

function _catTex2(twgl,gl,cat2Tex){return(
twgl.createTexture(gl, {
  src: cat2Tex,
  flipY: true
})
)}

function _catTex3(twgl,gl,cat3Tex){return(
twgl.createTexture(gl, {
  src: cat3Tex,
  flipY: true
})
)}

function _storedTextures(catTex){return(
[catTex]
)}

function _counts(){return(
0
)}

function _switchskin(counts,storedTextures){return(
function switchskin () {
  var x = 3;
  var integer;
  
  integer = counts  % storedTextures.length;
  
  return integer;
}
)}

function _subtraction(){return(
5
)}

function _newskin(collectedStars,subtraction,clicks,$0,playMusic,moneySoundUrl,$1,$2,$3,updateTexArray){return(
function newskin () {
  if (collectedStars < subtraction || clicks >= 2) {
    return false;
  }
  else
    if ($0.value == false) {
      playMusic(moneySoundUrl);
    }
    $1.value -= subtraction;
    $2.value++;
    $3.value += 95;
    updateTexArray();
  return true;
}
)}

function _clicks(){return(
0
)}

function _updateTexArray(clicks,catTex,catTex2,$0,catTex3){return(
function updateTexArray() {
  var array = [];
  switch (clicks) {  
    case 0:
      array = [catTex, catTex2];
      $0.value = array;
      break;
      
    case 1:
      array = [catTex, catTex2, catTex3];
      $0.value = array;
      break; 
      
    default:
      array = [catTex];
      $0.value = array;
  }// catTex
  
}
)}

async function _planeURL(FileAttachment){return(
await FileAttachment("plane.obj").url()
)}

async function _catURL(FileAttachment){return(
await FileAttachment("12221_Cat_v1_l3.obj").url()
)}

async function _plane(loadModelFromURL,planeURL){return(
await loadModelFromURL(planeURL,"obj")
)}

function _cat(catstillObj){return(
catstillObj
)}

function _scalars(){return(
[
  {name: "canned_food_01" , scale:0.3},
  {name: "border_fence", scale:2},
  {name: "torii_gate_02", scale:2},
  {name: "star_01", scale:0.8},
  {name: "cat", scale:1},
  {name: "trashcan", scale:1},
  {name: "estate_sign_02", scale:1},
  {name: "Cylinder", scale:1}
]
)}

function _218(md){return(
md`## Functions`
)}

function _219(md){return(
md`### Matrices`
)}

function _scaleMatrix(m4,catExtents){return(
m4.scaling( [ 0.5/catExtents.dia, 0.5/catExtents.dia, 0.5/catExtents.dia ] )
)}

function _ProjectionMatrix(m4,camAngle,gl){return(
m4.perspective(camAngle.camera*Math.PI/180, gl.canvas.width/gl.canvas.height, 0.1, 20)
)}

function _viewMatrix(m4,transformedEyePosition,lookAtPOsition){return(
m4.inverse( m4.lookAt(transformedEyePosition, lookAtPOsition, [0,1,0]))
)}

function _initialViewMatrix(m4,lookAtPOsition){return(
m4.inverse( m4.lookAt([0,-1,0], lookAtPOsition, [0,1,0]))
)}

function _findScaleMatrix(computeModelExtent,scalars,m4){return(
function findScaleMatrix(object){
  const ext = computeModelExtent(object).dia
  let name = object[0].name;
  let scalingFactor;
  if(name.includes("Mesh")){// gets the cats scale
      name = "cat";
    }
  
  for(let i=0;i<scalars.length;i++){
    if(scalars[i].name == name){
      scalingFactor = scalars[i].scale;
    }
    
  }
  return m4.scaling( [ scalingFactor/ext, scalingFactor/ext, scalingFactor/ext ] )
}
)}

function _225(md){return(
md`### Camera `
)}

function _camAngle(columns,slider){return(
columns({
cameraX: slider({min: -89,  max: 89, step: 1, value: -40.0, title: "Camera-X" }),
cameraY: slider({min: -360, max: 360, step: 1, value: 0.0, title: "Camera-Y" }),
camera: slider({min: 1,max: 179, step: 1, value: 60.0, title: "Camera FOV" })
})
)}

function _lookAtPOsition(){return(
[0,0,-1.5]
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

function _231(md){return(
md`## Uniforms`
)}

function _eyePosition1(m4,viewMatrix){return(
m4.inverse(viewMatrix).slice(12, 15)
)}

function _catUniforms(ProjectionMatrix,viewMatrix,catModelMatrix,storedTextures,decider,eyePosition1){return(
{
    projectionMatrix: ProjectionMatrix,
    viewMatrix: viewMatrix,
    modelMatrix: catModelMatrix,
    tex: storedTextures[decider],

    eyePosition:eyePosition1
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

function _235(md){return(
md`### Textures`
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

function _239(md){return(
md`## Shaders`
)}

function _errorBlock(html,width){return(
html`<textarea style="height : 20px; width : ${width}px; font-size: 0.8em; display: block"></textarea>`
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


function _skyboxProgramIfo(errorBlock,twgl,gl)
{
  const vert = `#version 300 es
  precision mediump float;
  in vec2 position;
  out vec2 fragPosition;
  void main() {
    fragPosition = position;
    gl_Position = vec4(position, 1, 1);
  }`,
    frag = `#version 300 es
    precision mediump float;
    uniform samplerCube cubemap;
    in vec2 fragPosition;
    out vec4 outColor;
    uniform mat4 invViewProjectionMatrix;

    void main () {
      vec4 direction = invViewProjectionMatrix * vec4(fragPosition, 1, 1);
      outColor = texture(cubemap, normalize(direction.xyz/direction.w));
    }`;
  errorBlock.style.height = "20px";
  errorBlock.innerHTML = "Program Shader compilation successful";
  return twgl.createProgramInfo(gl, [vert, frag], (message) => {
    errorBlock.style.height = "400px";
    errorBlock.innerHTML = "Scene Program Shader compilation error\n" + message;
  });
}


function _245(md){return(
md`## shadows`
)}

function _246(md){return(
md`## game music`
)}

function _state(){return(
`the audio is not playing at the moment`
)}

function _AudioInstance(Audio,$0,md){return(
() => {
  let _a = new Audio();
  _a.addEventListener(
    'loadeddata',
    () => ($0.value = md`the audio is loaded`)
  );
  _a.addEventListener(
    'playing',
    () => ($0.value = md`the audio is playing`)
  );
  _a.addEventListener(
    'ended',
    () => ($0.value = md`the audio has finished playing`)
  );
  _a.playAudio = _url => {
    _a.setAttribute('src', _url);
    _a.load();
    _a.play();
  };
  return _a;
}
)}

function _audio(AudioInstance){return(
AudioInstance()
)}

function _playMusic(audio){return(
_url => {
  audio.playAudio(_url);
}
)}

function _mute(mutebutton){return(
mutebutton
)}

async function _hurtSoundUrl(FileAttachment){return(
await (FileAttachment("cat-meow-14536-trimmed.mp3")).url()
)}

async function _starSoundUrl(FileAttachment){return(
await (FileAttachment("success.mp3")).url()
)}

async function _munchSoundUrl(FileAttachment){return(
await (FileAttachment("munch.mp3")).url()
)}

async function _jumpsoundURL(FileAttachment){return(
await (FileAttachment("jump-15984.wav")).url()
)}

function _gameOverSoundURL(FileAttachment){return(
FileAttachment("mixkit-arcade-retro-game-over-213.wav").url()
)}

async function _moneySoundUrl(FileAttachment){return(
await (FileAttachment("chaching.mp3")).url()
)}

function _258(md){return(
md`## game music`
)}

function _259(md){return(
md`## Cubemap images
`
)}

function _260(md){return(
md`currently wooded area with houses`
)}

async function _skyboxurl(FileAttachment){return(
await FileAttachment("pngwing.com.png").url()
)}

function _cubeimagesCroppedFromHCrossShape(DOM){return(
(url, size) => {
  return new Promise(resolve => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.src = url;
    im.onload = () => {
        resolve([[size*2,size],[0,size],[size,0],[size,size*2],[size,size],[size*3,size]].map(xy=>{
          const ctx = DOM.context2d(size,size);
          ctx.drawImage(im, xy[0], xy[1], size, size, 0, 0, size, size);
          return ctx.canvas;
        }))
    }
  })
}
)}

function _cubemap1(twgl,gl,pxday,nxday,pyday,nyday,pzday,nzday){return(
twgl.createTexture(gl, {
  target: gl.TEXTURE_CUBE_MAP,
  flipY: false,
  src: [pxday, nxday, pyday, nyday, pzday, nzday],
  min: gl.LINEAR_MIPMAP_LINEAR
})
)}

function _cubemap2(twgl,gl,pxnight,nxnight,pynight,nynight,pznight,nznight){return(
twgl.createTexture(gl, {
  target: gl.TEXTURE_CUBE_MAP,
  flipY: false,
  src: [pxnight, nxnight, pynight, nynight, pznight, nznight],
  min: gl.LINEAR_MIPMAP_LINEAR
})
)}

function _renderSkybox($0,m4,viewMatrix,initialViewMatrix,ProjectionMatrix,difficulty,cubemap1,cubemap2,gl,skyboxProgramIfo,twgl,skyboxBufferInfo){return(
() => {
  const invViewMatrix = $0.value?m4.inverse(viewMatrix):m4.inverse(initialViewMatrix);
  const invProjectionMatrix = m4.inverse(ProjectionMatrix);
  const invViewProjectionMatrix = m4.multiply(
    invViewMatrix,
    invProjectionMatrix
  );
  const eyePosition = invViewMatrix.slice(12, 15);

  const uniforms = {
    cubemap: difficulty == 'easy' ? cubemap1 : cubemap2,
    invViewProjectionMatrix,
    eyePosition
  };
  gl.depthFunc(gl.LEQUAL);
  gl.useProgram(skyboxProgramIfo.program);
  twgl.setUniforms(skyboxProgramIfo, uniforms);

  twgl.setBuffersAndAttributes(gl, skyboxProgramIfo, skyboxBufferInfo);
  twgl.drawBufferInfo(gl, skyboxBufferInfo);
  gl.depthFunc(gl.LESS);
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["12221_Cat_v1_l3.obj", {url: new URL("./files/cb64345e31fe6ad900a077cc53c1a3e7fdb7a20338006812194870fe76e416f3ed73f01411f351594ba1e2f2a7ac0c85a2ab4d6ccc5bc6a54067c9538b1cc9df.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["plane.obj", {url: new URL("./files/ed4ed4ca160e6eafcdcf18f9d092fa930d64c579ff07fba1b94ab85a7d76f2259791dcbc2c0edca9ecc53886751a79e37d56c4129721b05a79f2d1c4dbe561cd.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["roadTexture.jpg", {url: new URL("./files/e377478b19ef6c8b8366b8e49762c968f37e906c4806695a896a3fe43b4e1e0350e1981e4f8cc6261c20fb65cedf014970d1500a1713a143ae928e31cc9faf8d.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["mixkit-arcade-retro-game-over-213.wav", {url: new URL("./files/2a475e552cbbc5823b7d214b41f3453ac5490ab78c92911cea295174a0b80bd6969c9376af054bf4418e7bad7838de810c9066f3ac6d02feef35e081b806c1f5", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["pngwing.com.png", {url: new URL("./files/98b5357da1ab5c4cc32f0d9cfc23f0fa6c862ed8bdbc5c7a314157b0b5ee2b2f5d0b58db9af0273db1cdffd8a8b285ddbb59a7a126f3eb1bbf8d3d5ad3df5871.png", import.meta.url), mimeType: "image/png", toString}],
    ["cat-meow-14536-trimmed.mp3", {url: new URL("./files/8840bfe1501b83e2671ff9c4aec988c7cba9a4dfabe7376933ebde3cdee1aceb58ea6f907d7cb635891c81de930bc160fa8d1ab8dd4a07af6393fd416c7d8fbd.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["jump-15984.wav", {url: new URL("./files/8d7a712be5bf3e54aa1332caf2c253b4a915fe8309402e7cfa056b07f38e5fa01f514775c3df90bf71f44905931c06218022d6f283b667b74cc28497f3f51ffb", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["munch.mp3", {url: new URL("./files/1c1bc2b5452bf70c829cafcd5f478a75e4ee68c5545613b078c012818363ea830ff029cfcd35c60a61291706f339af12498ff9778f476e1c3e5a63b191b1b3b1.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["success.mp3", {url: new URL("./files/c64856ecb50c5f060bb19c596a8c42de1c22257d0f62021d61d1ae441b2d060e51d56129103eb600a486fbf5db1a11af00c2085339aaf7abe15e3ba6afcb0d1d.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["chaching.mp3", {url: new URL("./files/d32bbf08f12ebf55c7a2a59a1ae11abe745a83a68ea1d60e26d34a22e2b6f1e6cd47f4d915f2ca7cc075418289f205c63cdc5e1ca7b8c789b4bf0fb35373d1fd.mpga", import.meta.url), mimeType: "audio/mpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof mutebutton")).define("viewof mutebutton", ["Inputs"], _mutebutton);
  main.variable(observer("mutebutton")).define("mutebutton", ["Generators", "viewof mutebutton"], (G, _) => G.input(_));
  main.variable(observer("viewof difficulty")).define("viewof difficulty", ["Inputs"], _difficulty);
  main.variable(observer("difficulty")).define("difficulty", ["Generators", "viewof difficulty"], (G, _) => G.input(_));
  main.define("initial highscore", _highscore);
  main.variable(observer("mutable highscore")).define("mutable highscore", ["Mutable", "initial highscore"], (M, _) => new M(_));
  main.variable(observer("highscore")).define("highscore", ["mutable highscore"], _ => _.generator);
  main.define("initial collectedStars", _collectedStars);
  main.variable(observer("mutable collectedStars")).define("mutable collectedStars", ["Mutable", "initial collectedStars"], (M, _) => new M(_));
  main.variable(observer("collectedStars")).define("collectedStars", ["mutable collectedStars"], _ => _.generator);
  main.variable(observer()).define(["html","newskin"], _7);
  main.variable(observer()).define(["html","mutable counts","mutable decider","switchskin"], _8);
  main.variable(observer()).define(["game","gl"], _9);
  main.define("initial totalHearts", _totalHearts);
  main.variable(observer("mutable totalHearts")).define("mutable totalHearts", ["Mutable", "initial totalHearts"], (M, _) => new M(_));
  main.variable(observer("totalHearts")).define("totalHearts", ["mutable totalHearts"], _ => _.generator);
  main.define("initial gameStart", _gameStart);
  main.variable(observer("mutable gameStart")).define("mutable gameStart", ["Mutable", "initial gameStart"], (M, _) => new M(_));
  main.variable(observer("gameStart")).define("gameStart", ["mutable gameStart"], _ => _.generator);
  main.define("initial gameOver", _gameOver);
  main.variable(observer("mutable gameOver")).define("mutable gameOver", ["Mutable", "initial gameOver"], (M, _) => new M(_));
  main.variable(observer("gameOver")).define("gameOver", ["mutable gameOver"], _ => _.generator);
  main.variable(observer("resets")).define("resets", ["resetGame","mutable catTransY","mutable catTransX","mutable jumpFrame","mutable moveFrame","mutable lane","mutable planePosition2","mutable lastPos","mutable catRotateX","mutable moveComplete","mutable catCurrentLane","mutable catRotateY","mutable catRotateZ","mutable deathFrame","mutable deathSide","mutable gameOver","mutable stopMovement","mutable objectArray","mutable objectTranslations","mutable catModel","mutable resetGame","mutable totalHearts"], _resets);
  main.define("initial debug", _debug);
  main.variable(observer("mutable debug")).define("mutable debug", ["Mutable", "initial debug"], (M, _) => new M(_));
  main.variable(observer("debug")).define("debug", ["mutable debug"], _ => _.generator);
  main.variable(observer("array")).define("array", ["score_value"], _array);
  main.variable(observer("currentScore")).define("currentScore", ["array"], _currentScore);
  main.variable(observer("game")).define("game", ["mutable debug","currSpeed","mutable gameStart","gl","canvasWidth","hex2rgb","drawStart","stencilProgramInfo","renderCat","renderSkybox","keys","basicMovement","doMove","doJump","mutable planePosition2","spawnCheckpoint","mutable lastPos","mutable obstacleSpawnRate","spawnObjects","planeMovement","chooseCat","mutable collider","collisionCheck","catDeath","mutable collidedWithObstacle","mutable flashFrame","flashing","mutable drawCat","renderPlane","objectArray","updateObjects","totalHearts","renderHeartCenter","heartProgramInfo","heartViewMatrix","heartProjectionMatrix","renderHeartLeft","renderHeartRight","drawScore","currentScore","highscore","mutable highscore","mutable gameOver","drawGameOver","stencilProgramInfoWhite","mutable resetGame","resets"], _game);
  main.variable(observer("canvasWidth")).define("canvasWidth", ["gl"], _canvasWidth);
  main.define("initial collider", _collider);
  main.variable(observer("mutable collider")).define("mutable collider", ["Mutable", "initial collider"], (M, _) => new M(_));
  main.variable(observer("collider")).define("collider", ["mutable collider"], _ => _.generator);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("hex2rgb")).define("hex2rgb", _hex2rgb);
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
  main.variable(observer("TWEEN")).define("TWEEN", ["require"], _TWEEN);
  main.variable(observer("twgl")).define("twgl", ["require"], _twgl);
  main.variable(observer("m4")).define("m4", ["twgl"], _m4);
  const child5 = runtime.module(define5);
  main.import("Play", child5);
  main.import("Play8Bit", child5);
  main.import("Draw", child5);
  main.import("Title", child5);
  main.import("sum", child5);
  main.variable(observer("deg2rad")).define("deg2rad", _deg2rad);
  main.variable(observer("viewof keys")).define("viewof keys", ["keyboard"], _keys);
  main.variable(observer("keys")).define("keys", ["Generators", "viewof keys"], (G, _) => G.input(_));
  main.variable(observer("keyboard")).define("keyboard", ["html"], _keyboard);
  main.variable(observer("gl")).define("gl", ["DOM","width"], _gl);
  const child6 = runtime.module(define6);
  main.import("getImageData", child6);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("vertexAttributes")).define("vertexAttributes", _vertexAttributes);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("catAttributes")).define("catAttributes", ["vertexAttributes","catstillObj"], _catAttributes);
  main.define("initial catModel", _catModel);
  main.variable(observer("mutable catModel")).define("mutable catModel", ["Mutable", "initial catModel"], (M, _) => new M(_));
  main.variable(observer("catModel")).define("catModel", ["mutable catModel"], _ => _.generator);
  main.variable(observer("catBufferInfo")).define("catBufferInfo", ["catAttributes","twgl","gl"], _catBufferInfo);
  main.variable(observer("stillCatAttribs")).define("stillCatAttribs", ["vertexAttributes","catstillObj"], _stillCatAttribs);
  main.variable(observer("walk1CatAttribs")).define("walk1CatAttribs", ["vertexAttributes","catwalk1Obj"], _walk1CatAttribs);
  main.variable(observer("walk2CatAttribs")).define("walk2CatAttribs", ["vertexAttributes","catwalk2Obj"], _walk2CatAttribs);
  main.variable(observer("getcatbufferinfo")).define("getcatbufferinfo", ["mutable catModel","stillCatAttribs","walk1CatAttribs","walk2CatAttribs","twgl","gl"], _getcatbufferinfo);
  main.variable(observer("catExtents")).define("catExtents", ["computeModelExtent","cat"], _catExtents);
  main.variable(observer("catWidth")).define("catWidth", ["catExtents"], _catWidth);
  main.variable(observer("planeExtents")).define("planeExtents", ["computeModelExtent","plane"], _planeExtents);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("staticObjs")).define("staticObjs", ["trashObj","holeObj","lampObj","canObj","starObj","gateObj"], _staticObjs);
  main.variable(observer("staticTypes")).define("staticTypes", _staticTypes);
  main.variable(observer("staticTextures")).define("staticTextures", ["twgl","gl","trashTex","holeTex","lampTex","canTex","starTex","gateTex"], _staticTextures);
  main.variable(observer("staticAttributes")).define("staticAttributes", ["getStaticAttribs","staticObjs"], _staticAttributes);
  main.variable(observer("getStaticAttribs")).define("getStaticAttribs", _getStaticAttribs);
  main.variable(observer("staticExtents")).define("staticExtents", ["getStaticExtents","staticObjs"], _staticExtents);
  main.variable(observer("getStaticExtents")).define("getStaticExtents", ["computeModelExtent"], _getStaticExtents);
  main.variable(observer("staticBufferInfos")).define("staticBufferInfos", ["getStaticBuffers","staticAttributes"], _staticBufferInfos);
  main.variable(observer("getStaticBuffers")).define("getStaticBuffers", ["twgl","gl"], _getStaticBuffers);
  main.define("initial obstacleSpawnRate", _obstacleSpawnRate);
  main.variable(observer("mutable obstacleSpawnRate")).define("mutable obstacleSpawnRate", ["Mutable", "initial obstacleSpawnRate"], (M, _) => new M(_));
  main.variable(observer("obstacleSpawnRate")).define("obstacleSpawnRate", ["mutable obstacleSpawnRate"], _ => _.generator);
  main.define("initial pwrupSpawnRate", _pwrupSpawnRate);
  main.variable(observer("mutable pwrupSpawnRate")).define("mutable pwrupSpawnRate", ["Mutable", "initial pwrupSpawnRate"], (M, _) => new M(_));
  main.variable(observer("pwrupSpawnRate")).define("pwrupSpawnRate", ["mutable pwrupSpawnRate"], _ => _.generator);
  main.define("initial groundSpeed", _groundSpeed);
  main.variable(observer("mutable groundSpeed")).define("mutable groundSpeed", ["Mutable", "initial groundSpeed"], (M, _) => new M(_));
  main.variable(observer("groundSpeed")).define("groundSpeed", ["mutable groundSpeed"], _ => _.generator);
  main.define("initial lastPos", _lastPos);
  main.variable(observer("mutable lastPos")).define("mutable lastPos", ["Mutable", "initial lastPos"], (M, _) => new M(_));
  main.variable(observer("lastPos")).define("lastPos", ["mutable lastPos"], _ => _.generator);
  main.define("initial rowCount", _rowCount);
  main.variable(observer("mutable rowCount")).define("mutable rowCount", ["Mutable", "initial rowCount"], (M, _) => new M(_));
  main.variable(observer("rowCount")).define("rowCount", ["mutable rowCount"], _ => _.generator);
  main.define("initial objectArray", _objectArray);
  main.variable(observer("mutable objectArray")).define("mutable objectArray", ["Mutable", "initial objectArray"], (M, _) => new M(_));
  main.variable(observer("objectArray")).define("objectArray", ["mutable objectArray"], _ => _.generator);
  main.define("initial objectTranslations", _objectTranslations);
  main.variable(observer("mutable objectTranslations")).define("mutable objectTranslations", ["Mutable", "initial objectTranslations"], (M, _) => new M(_));
  main.variable(observer("objectTranslations")).define("objectTranslations", ["mutable objectTranslations"], _ => _.generator);
  main.define("initial spawnPowerupFlag", _spawnPowerupFlag);
  main.variable(observer("mutable spawnPowerupFlag")).define("mutable spawnPowerupFlag", ["Mutable", "initial spawnPowerupFlag"], (M, _) => new M(_));
  main.variable(observer("spawnPowerupFlag")).define("spawnPowerupFlag", ["mutable spawnPowerupFlag"], _ => _.generator);
  main.variable(observer("GameObject")).define("GameObject", _GameObject);
  main.variable(observer("spawnObjects")).define("spawnObjects", ["mutable lastPos","mutable planePosition2","mutable spawnPowerupFlag","mutable rowCount","mutable pwrupSpawnRate","spawnPowerup","spawnObstacles"], _spawnObjects);
  main.variable(observer("updateObjects")).define("updateObjects", ["mutable objectTranslations","mutable objectArray","stopMovement","mutable groundSpeed","renderObject","sceneProgramInfo"], _updateObjects);
  main.variable(observer("getRandomObstacle")).define("getRandomObstacle", _getRandomObstacle);
  main.variable(observer("spawnObstacles")).define("spawnObstacles", ["getRandomLanes","GameObject","mutable objectArray","mutable objectTranslations","movePlaneUnderCat","getRandomObstacle"], _spawnObstacles);
  main.variable(observer("getRandomPowerUp")).define("getRandomPowerUp", _getRandomPowerUp);
  main.variable(observer("spawnPowerup")).define("spawnPowerup", ["mutable spawnPowerupFlag","getRandomLanes","getRandomPowerUp","GameObject","mutable objectArray","mutable objectTranslations","movePlaneUnderCat"], _spawnPowerup);
  main.variable(observer("spawnCheckpoint")).define("spawnCheckpoint", ["mutable objectTranslations","movePlaneUnderCat","GameObject","staticObjs","mutable objectArray"], _spawnCheckpoint);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer("renderObject")).define("renderObject", ["staticTypes","m4","movePlaneUnderCat","Spin","staticBufferInfos","eyePosition","staticTextures","viewMatrix","ProjectionMatrix","gl","twgl"], _renderObject);
  main.define("initial currSpeed", _currSpeed);
  main.variable(observer("mutable currSpeed")).define("mutable currSpeed", ["Mutable", "initial currSpeed"], (M, _) => new M(_));
  main.variable(observer("currSpeed")).define("currSpeed", ["mutable currSpeed"], _ => _.generator);
  main.variable(observer("getRandomLanes")).define("getRandomLanes", ["mutable currSpeed"], _getRandomLanes);
  main.define("initial drawCat", _drawCat);
  main.variable(observer("mutable drawCat")).define("mutable drawCat", ["Mutable", "initial drawCat"], (M, _) => new M(_));
  main.variable(observer("drawCat")).define("drawCat", ["mutable drawCat"], _ => _.generator);
  main.variable(observer("renderCat")).define("renderCat", ["getcatbufferinfo","gl","sceneProgramInfo","twgl","catUniforms"], _renderCat);
  main.variable(observer("chooseCat")).define("chooseCat", ["mutable inAir","mutable stopMovement","mutable catModel","mutable planePosition2"], _chooseCat);
  main.variable(observer("basicMovement")).define("basicMovement", ["keys","mutable lane","maxLanes","mutable moveComplete","mutable mute","mutable singleJump","mutable inAir","mutable catModel","catstillObj","playMusic","jumpsoundURL"], _basicMovement);
  main.variable(observer("planeMovement")).define("planeMovement", ["mutable stopMovement","mutable planePosition2","mutable groundSpeed"], _planeMovement);
  main.variable(observer("catTex")).define("catTex", ["twgl","gl","cat1Tex"], _catTex);
  main.variable(observer()).define(["md"], _90);
  main.define("initial catTransX", _catTransX);
  main.variable(observer("mutable catTransX")).define("mutable catTransX", ["Mutable", "initial catTransX"], (M, _) => new M(_));
  main.variable(observer("catTransX")).define("catTransX", ["mutable catTransX"], _ => _.generator);
  main.define("initial catTransY", _catTransY);
  main.variable(observer("mutable catTransY")).define("mutable catTransY", ["Mutable", "initial catTransY"], (M, _) => new M(_));
  main.variable(observer("catTransY")).define("catTransY", ["mutable catTransY"], _ => _.generator);
  main.define("initial catTransZ", _catTransZ);
  main.variable(observer("mutable catTransZ")).define("mutable catTransZ", ["Mutable", "initial catTransZ"], (M, _) => new M(_));
  main.variable(observer("catTransZ")).define("catTransZ", ["mutable catTransZ"], _ => _.generator);
  main.define("initial catRotateX", _catRotateX);
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
  main.variable(observer("movePlaneUnderCat")).define("movePlaneUnderCat", ["catExtents"], _movePlaneUnderCat);
  main.variable(observer("catTranslationMatrix")).define("catTranslationMatrix", ["m4","catTransX","catTransY","catTransZ"], _catTranslationMatrix);
  main.variable(observer("catRotationMatrix")).define("catRotationMatrix", ["m4","deg2rad","catRotateX","gameStart","catRotateY","Spin","catRotateZ"], _catRotationMatrix);
  main.variable(observer("catModelMatrix")).define("catModelMatrix", ["m4","catTranslationMatrix","catRotationMatrix","catToCenter"], _catModelMatrix);
  main.variable(observer("catToCenter")).define("catToCenter", ["translateToCenter","catExtents"], _catToCenter);
  main.variable(observer("translateToCenter")).define("translateToCenter", ["m4"], _translateToCenter);
  main.variable(observer()).define(["md"], _104);
  main.variable(observer()).define(["md"], _105);
  main.variable(observer("planeWidth")).define("planeWidth", _planeWidth);
  main.variable(observer("planeTranslationMatrix")).define("planeTranslationMatrix", ["m4","movePlaneUnderCat"], _planeTranslationMatrix);
  main.variable(observer("planeScaleMatrix")).define("planeScaleMatrix", ["m4","scaleMatrix","planeWidth"], _planeScaleMatrix);
  main.variable(observer("planeModelMatrix")).define("planeModelMatrix", ["m4","planeTranslationMatrix","planeScaleMatrix","planeToCenter"], _planeModelMatrix);
  main.variable(observer("planeToCenter")).define("planeToCenter", ["translateToCenter","planeExtents"], _planeToCenter);
  main.define("initial planePosition2", _planePosition2);
  main.variable(observer("mutable planePosition2")).define("mutable planePosition2", ["Mutable", "initial planePosition2"], (M, _) => new M(_));
  main.variable(observer("planePosition2")).define("planePosition2", ["mutable planePosition2"], _ => _.generator);
  main.variable(observer("renderPlane")).define("renderPlane", ["gl","planeProgramInfo","twgl","planeUniforms","planeBufferInfo"], _renderPlane);
  main.variable(observer("planeBufferInfo")).define("planeBufferInfo", ["twgl","gl","vertexAttributes","plane"], _planeBufferInfo);
  main.variable(observer()).define(["md"], _114);
  main.variable(observer()).define(["md"], _115);
  main.variable(observer()).define(["md"], _116);
  main.define("initial gravity", _gravity);
  main.variable(observer("mutable gravity")).define("mutable gravity", ["Mutable", "initial gravity"], (M, _) => new M(_));
  main.variable(observer("gravity")).define("gravity", ["mutable gravity"], _ => _.generator);
  main.variable(observer()).define(["md"], _118);
  main.variable(observer()).define(["md"], _119);
  main.variable(observer()).define(["md"], _120);
  main.variable(observer("collisionCheck")).define("collisionCheck", ["mutable objectArray","mutable objectTranslations","staticExtents","mutable catTransX","mutable catTransZ","mutable catTransY","movePlaneUnderCat","staticTypes","mutable mute","playMusic","hurtSoundUrl","mutable collidedWithObstacle","mutable totalHearts","munchSoundUrl","starSoundUrl","mutable collectedStars","mutable starScore"], _collisionCheck);
  main.variable(observer()).define(["md"], _122);
  main.variable(observer()).define(["md"], _123);
  main.define("initial stopMovement", _stopMovement);
  main.variable(observer("mutable stopMovement")).define("mutable stopMovement", ["Mutable", "initial stopMovement"], (M, _) => new M(_));
  main.variable(observer("stopMovement")).define("stopMovement", ["mutable stopMovement"], _ => _.generator);
  main.variable(observer("doJump")).define("doJump", ["mutable singleJump","mutable jumpFrame","numberOfFrames","jumpRotation1","mutable catTransY","jump3","mutable catJumpMultiplier","mutable inAir","mutable catRotateX"], _doJump);
  main.variable(observer("doMove")).define("doMove", ["mutable moveFrame","numberOfFrames","mutable moveComplete","mutable catTransX","mutable lane","lanewidth","mutable catCurrentLane","incrementLaneValue","laneChangeSpeed"], _doMove);
  main.variable(observer("numberOfFrames")).define("numberOfFrames", _numberOfFrames);
  main.define("initial jumpFrame", _jumpFrame);
  main.variable(observer("mutable jumpFrame")).define("mutable jumpFrame", ["Mutable", "initial jumpFrame"], (M, _) => new M(_));
  main.variable(observer("jumpFrame")).define("jumpFrame", ["mutable jumpFrame"], _ => _.generator);
  main.define("initial moveFrame", _moveFrame);
  main.variable(observer("mutable moveFrame")).define("mutable moveFrame", ["Mutable", "initial moveFrame"], (M, _) => new M(_));
  main.variable(observer("moveFrame")).define("moveFrame", ["mutable moveFrame"], _ => _.generator);
  main.define("initial flashFrame", _flashFrame);
  main.variable(observer("mutable flashFrame")).define("mutable flashFrame", ["Mutable", "initial flashFrame"], (M, _) => new M(_));
  main.variable(observer("flashFrame")).define("flashFrame", ["mutable flashFrame"], _ => _.generator);
  main.define("initial catJumpMultiplier", ["catExtents"], _catJumpMultiplier);
  main.variable(observer("mutable catJumpMultiplier")).define("mutable catJumpMultiplier", ["Mutable", "initial catJumpMultiplier"], (M, _) => new M(_));
  main.variable(observer("catJumpMultiplier")).define("catJumpMultiplier", ["mutable catJumpMultiplier"], _ => _.generator);
  main.variable(observer("catJumpHeight")).define("catJumpHeight", ["catExtents"], _catJumpHeight);
  main.variable(observer("viewof killcat")).define("viewof killcat", ["Inputs"], _killcat);
  main.variable(observer("killcat")).define("killcat", ["Generators", "viewof killcat"], (G, _) => G.input(_));
  main.define("initial deathSide", _deathSide);
  main.variable(observer("mutable deathSide")).define("mutable deathSide", ["Mutable", "initial deathSide"], (M, _) => new M(_));
  main.variable(observer("deathSide")).define("deathSide", ["mutable deathSide"], _ => _.generator);
  main.define("initial deathFrame", _deathFrame);
  main.variable(observer("mutable deathFrame")).define("mutable deathFrame", ["Mutable", "initial deathFrame"], (M, _) => new M(_));
  main.variable(observer("deathFrame")).define("deathFrame", ["mutable deathFrame"], _ => _.generator);
  main.variable(observer("movecatafterdeath")).define("movecatafterdeath", ["movePlaneUnderCat","numberOfFrames"], _movecatafterdeath);
  main.variable(observer("catDeath")).define("catDeath", ["mutable totalHearts","killcat","mutable gameOver","mutable deathFrame","numberOfFrames","mutable stopMovement","mutable objectArray","mutable objectTranslations","mutable deathSide","mutable mute","playMusic","gameOverSoundURL","mutable catTransY","movecatafterdeath","mutable catRotateZ","deathSide"], _catDeath);
  main.define("initial singleJump", _singleJump);
  main.variable(observer("mutable singleJump")).define("mutable singleJump", ["Mutable", "initial singleJump"], (M, _) => new M(_));
  main.variable(observer("singleJump")).define("singleJump", ["mutable singleJump"], _ => _.generator);
  main.define("initial inAir", _inAir);
  main.variable(observer("mutable inAir")).define("mutable inAir", ["Mutable", "initial inAir"], (M, _) => new M(_));
  main.variable(observer("inAir")).define("inAir", ["mutable inAir"], _ => _.generator);
  main.define("initial lane", _lane);
  main.variable(observer("mutable lane")).define("mutable lane", ["Mutable", "initial lane"], (M, _) => new M(_));
  main.variable(observer("lane")).define("lane", ["mutable lane"], _ => _.generator);
  main.define("initial catCurrentLane", _catCurrentLane);
  main.variable(observer("mutable catCurrentLane")).define("mutable catCurrentLane", ["Mutable", "initial catCurrentLane"], (M, _) => new M(_));
  main.variable(observer("catCurrentLane")).define("catCurrentLane", ["mutable catCurrentLane"], _ => _.generator);
  main.variable(observer("lanewidth")).define("lanewidth", _lanewidth);
  main.variable(observer("maxLanes")).define("maxLanes", _maxLanes);
  main.variable(observer("numberOfLanes")).define("numberOfLanes", _numberOfLanes);
  main.variable(observer("realism")).define("realism", ["catJumpHeight"], _realism);
  main.variable(observer("jump1")).define("jump1", ["mutable catTransY","catJumpHeight","mutable singleJump","numberOfFrames","mutable gravity"], _jump1);
  main.variable(observer("jump2")).define("jump2", ["numberOfFrames"], _jump2);
  main.variable(observer("jump3")).define("jump3", ["realism","l","h"], _jump3);
  main.variable(observer("jumpRotation1")).define("jumpRotation1", ["numberOfFrames","maxRotate","mutable catRotateX"], _jumpRotation1);
  main.variable(observer("maxRotate")).define("maxRotate", _maxRotate);
  main.variable(observer("laneChangeSpeed")).define("laneChangeSpeed", _laneChangeSpeed);
  main.variable(observer("incrementLaneValue")).define("incrementLaneValue", ["lanewidth","laneChangeSpeed","numberOfFrames"], _incrementLaneValue);
  main.variable(observer("l")).define("l", ["numberOfFrames"], _l);
  main.variable(observer("h")).define("h", _h);
  main.variable(observer("flashing")).define("flashing", ["mutable flashFrame","numberOfFrames","mutable drawCat"], _flashing);
  main.define("initial collidedWithObstacle", _collidedWithObstacle);
  main.variable(observer("mutable collidedWithObstacle")).define("mutable collidedWithObstacle", ["Mutable", "initial collidedWithObstacle"], (M, _) => new M(_));
  main.variable(observer("collidedWithObstacle")).define("collidedWithObstacle", ["mutable collidedWithObstacle"], _ => _.generator);
  main.variable(observer()).define(["md"], _157);
  main.variable(observer()).define(["md"], _158);
  main.variable(observer()).define(["md"], _159);
  main.variable(observer()).define(["md"], _160);
  main.define("initial starScore", _starScore);
  main.variable(observer("mutable starScore")).define("mutable starScore", ["Mutable", "initial starScore"], (M, _) => new M(_));
  main.variable(observer("starScore")).define("starScore", ["mutable starScore"], _ => _.generator);
  main.variable(observer("myDifficulty")).define("myDifficulty", _myDifficulty);
  main.variable(observer("speed_Increase")).define("speed_Increase", ["mutable currSpeed"], _speed_Increase);
  main.variable(observer("score_value")).define("score_value", ["DOM","difficulty","myDifficulty","mutable groundSpeed","gameOver","speed_Increase","gameStart","Promises"], _score_value);
  main.variable(observer("drawScore")).define("drawScore", ["patternBuffers","gl","stencilProgramInfo","patternViewMatrix","patternProjectionMatrix","twgl"], _drawScore);
  main.variable(observer("patternProjectionMatrix")).define("patternProjectionMatrix", ["m4","canvasWidth","gl"], _patternProjectionMatrix);
  main.variable(observer("patternViewMatrix")).define("patternViewMatrix", ["m4"], _patternViewMatrix);
  main.variable(observer("patternBuffers")).define("patternBuffers", ["twgl","gl","textMeshBufferInfo"], _patternBuffers);
  main.variable(observer("textMeshBufferInfo")).define("textMeshBufferInfo", ["twgl","gl","textMesh"], _textMeshBufferInfo);
  main.variable(observer("textMesh")).define("textMesh", ["vectorizeText","score_value"], _textMesh);
  main.variable(observer("vectorizeText")).define("vectorizeText", ["require"], _vectorizeText);
  main.variable(observer("stencilProgramInfo")).define("stencilProgramInfo", ["errorBlock","twgl","gl"], _stencilProgramInfo);
  main.variable(observer("stencilProgramInfoWhite")).define("stencilProgramInfoWhite", ["errorBlock","twgl","gl"], _stencilProgramInfoWhite);
  main.variable(observer()).define(["md"], _174);
  main.variable(observer("gameovertext")).define("gameovertext", _gameovertext);
  main.variable(observer("startText")).define("startText", _startText);
  main.variable(observer("gameOverMeshBufferInfo")).define("gameOverMeshBufferInfo", ["twgl","gl","gameOverMesh"], _gameOverMeshBufferInfo);
  main.variable(observer("startMeshBufferInfo")).define("startMeshBufferInfo", ["twgl","gl","startMesh"], _startMeshBufferInfo);
  main.variable(observer("gameoverBuffers")).define("gameoverBuffers", ["twgl","gl","gameOverMeshBufferInfo"], _gameoverBuffers);
  main.variable(observer("startBuffers")).define("startBuffers", ["twgl","gl","startMeshBufferInfo"], _startBuffers);
  main.variable(observer("gameOverMesh")).define("gameOverMesh", ["vectorizeText","gameovertext"], _gameOverMesh);
  main.variable(observer("startMesh")).define("startMesh", ["vectorizeText","startText"], _startMesh);
  main.variable(observer("drawGameOver")).define("drawGameOver", ["gameoverBuffers","gl","patternViewMatrix","patternProjectionMatrix","twgl"], _drawGameOver);
  main.variable(observer("drawStart")).define("drawStart", ["startBuffers","gl","patternViewMatrix","patternProjectionMatrix","twgl"], _drawStart);
  main.define("initial resetGame", _resetGame);
  main.variable(observer("mutable resetGame")).define("mutable resetGame", ["Mutable", "initial resetGame"], (M, _) => new M(_));
  main.variable(observer("resetGame")).define("resetGame", ["mutable resetGame"], _ => _.generator);
  main.variable(observer()).define(["md"], _186);
  main.variable(observer("Spin")).define("Spin", ["mutable stopMovement","stopMovement"], _Spin);
  main.variable(observer("renderHeartLeft")).define("renderHeartLeft", ["gl","m4","heartScaleMatrix","heartExtents","deg2rad","Spin","heartModelMatrix","hex2rgb","twgl","heartBuffer"], _renderHeartLeft);
  main.variable(observer("renderHeartCenter")).define("renderHeartCenter", ["gl","m4","heartScaleMatrix","heartExtents","deg2rad","Spin","heartModelMatrix","hex2rgb","twgl","heartBuffer"], _renderHeartCenter);
  main.variable(observer("renderHeartRight")).define("renderHeartRight", ["gl","m4","heartScaleMatrix","heartExtents","deg2rad","Spin","heartModelMatrix","hex2rgb","twgl","heartBuffer"], _renderHeartRight);
  main.variable(observer("heartShaders")).define("heartShaders", _heartShaders);
  main.variable(observer("heartProgramInfo")).define("heartProgramInfo", ["errorBlock","twgl","gl","heartShaders"], _heartProgramInfo);
  main.variable(observer("heartBuffer")).define("heartBuffer", ["heartObj","twgl","gl"], _heartBuffer);
  main.variable(observer("heartExtents")).define("heartExtents", ["computeModelExtent","heartObj"], _heartExtents);
  const child7 = runtime.module(define7);
  main.import("heartViewMatrix", child7);
  main.import("heartProjectionMatrix", child7);
  main.import("heartScaleMatrix", child7);
  main.import("heartModelMatrix", child7);
  main.import("heartObj", child7);
  main.variable(observer()).define(["md"], _196);
  main.variable(observer()).define(["md"], _197);
  main.define("initial decider", _decider);
  main.variable(observer("mutable decider")).define("mutable decider", ["Mutable", "initial decider"], (M, _) => new M(_));
  main.variable(observer("decider")).define("decider", ["mutable decider"], _ => _.generator);
  main.variable(observer("catTex2")).define("catTex2", ["twgl","gl","cat2Tex"], _catTex2);
  main.variable(observer("catTex3")).define("catTex3", ["twgl","gl","cat3Tex"], _catTex3);
  main.define("initial storedTextures", ["catTex"], _storedTextures);
  main.variable(observer("mutable storedTextures")).define("mutable storedTextures", ["Mutable", "initial storedTextures"], (M, _) => new M(_));
  main.variable(observer("storedTextures")).define("storedTextures", ["mutable storedTextures"], _ => _.generator);
  main.define("initial counts", _counts);
  main.variable(observer("mutable counts")).define("mutable counts", ["Mutable", "initial counts"], (M, _) => new M(_));
  main.variable(observer("counts")).define("counts", ["mutable counts"], _ => _.generator);
  main.variable(observer("switchskin")).define("switchskin", ["counts","storedTextures"], _switchskin);
  main.define("initial subtraction", _subtraction);
  main.variable(observer("mutable subtraction")).define("mutable subtraction", ["Mutable", "initial subtraction"], (M, _) => new M(_));
  main.variable(observer("subtraction")).define("subtraction", ["mutable subtraction"], _ => _.generator);
  main.variable(observer("newskin")).define("newskin", ["collectedStars","subtraction","clicks","mutable mute","playMusic","moneySoundUrl","mutable collectedStars","mutable clicks","mutable subtraction","updateTexArray"], _newskin);
  main.define("initial clicks", _clicks);
  main.variable(observer("mutable clicks")).define("mutable clicks", ["Mutable", "initial clicks"], (M, _) => new M(_));
  main.variable(observer("clicks")).define("clicks", ["mutable clicks"], _ => _.generator);
  main.variable(observer("updateTexArray")).define("updateTexArray", ["clicks","catTex","catTex2","mutable storedTextures","catTex3"], _updateTexArray);
  main.variable(observer("planeURL")).define("planeURL", ["FileAttachment"], _planeURL);
  main.variable(observer("catURL")).define("catURL", ["FileAttachment"], _catURL);
  main.variable(observer("plane")).define("plane", ["loadModelFromURL","planeURL"], _plane);
  main.variable(observer("cat")).define("cat", ["catstillObj"], _cat);
  const child8 = runtime.module(define8);
  main.import("canObj", child8);
  main.import("fenceObj", child8);
  main.import("gateObj", child8);
  main.import("starObj", child8);
  main.import("trashObj", child8);
  main.import("fenceObstacleObj", child8);
  main.import("holeObj", child8);
  main.import("lampObj", child8);
  const child9 = runtime.module(define8);
  main.import("canTex", child9);
  main.import("fenceTex", child9);
  main.import("gateTex", child9);
  main.import("starTex", child9);
  main.import("trashTex", child9);
  main.import("holeTex", child9);
  main.import("lampTex", child9);
  const child10 = runtime.module(define8);
  main.import("pxday", child10);
  main.import("nxday", child10);
  main.import("pyday", child10);
  main.import("nyday", child10);
  main.import("pzday", child10);
  main.import("nzday", child10);
  main.import("pxnight", child10);
  main.import("nxnight", child10);
  main.import("pynight", child10);
  main.import("nynight", child10);
  main.import("pznight", child10);
  main.import("nznight", child10);
  const child11 = runtime.module(define8);
  main.import("catstillObj", child11);
  main.import("catwalk1Obj", child11);
  main.import("catwalk2Obj", child11);
  const child12 = runtime.module(define8);
  main.import("cat1Tex", child12);
  main.import("cat2Tex", child12);
  main.import("cat3Tex", child12);
  main.variable(observer("scalars")).define("scalars", _scalars);
  main.variable(observer()).define(["md"], _218);
  main.variable(observer()).define(["md"], _219);
  main.variable(observer("scaleMatrix")).define("scaleMatrix", ["m4","catExtents"], _scaleMatrix);
  main.variable(observer("ProjectionMatrix")).define("ProjectionMatrix", ["m4","camAngle","gl"], _ProjectionMatrix);
  main.variable(observer("viewMatrix")).define("viewMatrix", ["m4","transformedEyePosition","lookAtPOsition"], _viewMatrix);
  main.variable(observer("initialViewMatrix")).define("initialViewMatrix", ["m4","lookAtPOsition"], _initialViewMatrix);
  main.variable(observer("findScaleMatrix")).define("findScaleMatrix", ["computeModelExtent","scalars","m4"], _findScaleMatrix);
  main.variable(observer()).define(["md"], _225);
  main.variable(observer("viewof camAngle")).define("viewof camAngle", ["columns","slider"], _camAngle);
  main.variable(observer("camAngle")).define("camAngle", ["Generators", "viewof camAngle"], (G, _) => G.input(_));
  main.variable(observer("lookAtPOsition")).define("lookAtPOsition", _lookAtPOsition);
  main.variable(observer("eyeDirection")).define("eyeDirection", _eyeDirection);
  main.variable(observer("eyePosition")).define("eyePosition", ["twgl","lookAtPOsition","eyeDirection"], _eyePosition);
  main.variable(observer("transformedEyePosition")).define("transformedEyePosition", ["m4","camAngle","eyePosition"], _transformedEyePosition);
  main.variable(observer()).define(["md"], _231);
  main.variable(observer("eyePosition1")).define("eyePosition1", ["m4","viewMatrix"], _eyePosition1);
  main.variable(observer("catUniforms")).define("catUniforms", ["ProjectionMatrix","viewMatrix","catModelMatrix","storedTextures","decider","eyePosition1"], _catUniforms);
  main.variable(observer("planeUniforms")).define("planeUniforms", ["planeModelMatrix","viewMatrix","ProjectionMatrix","planeTexture","planePosition2","numberOfLanes"], _planeUniforms);
  main.variable(observer()).define(["md"], _235);
  main.variable(observer("skyboxBufferInfo")).define("skyboxBufferInfo", ["twgl","gl"], _skyboxBufferInfo);
  main.variable(observer("planeImg")).define("planeImg", ["FileAttachment"], _planeImg);
  main.variable(observer("planeTexture")).define("planeTexture", ["twgl","gl","planeImg"], _planeTexture);
  main.variable(observer()).define(["md"], _239);
  main.variable(observer("errorBlock")).define("errorBlock", ["html","width"], _errorBlock);
  main.variable(observer("planeShaders")).define("planeShaders", _planeShaders);
  main.variable(observer("sceneProgramInfo")).define("sceneProgramInfo", ["errorBlock","twgl","gl"], _sceneProgramInfo);
  main.variable(observer("planeProgramInfo")).define("planeProgramInfo", ["errorBlock","twgl","gl","planeShaders"], _planeProgramInfo);
  main.variable(observer("skyboxProgramIfo")).define("skyboxProgramIfo", ["errorBlock","twgl","gl"], _skyboxProgramIfo);
  main.variable(observer()).define(["md"], _245);
  main.variable(observer()).define(["md"], _246);
  main.define("initial state", _state);
  main.variable(observer("mutable state")).define("mutable state", ["Mutable", "initial state"], (M, _) => new M(_));
  main.variable(observer("state")).define("state", ["mutable state"], _ => _.generator);
  main.variable(observer("AudioInstance")).define("AudioInstance", ["Audio","mutable state","md"], _AudioInstance);
  main.variable(observer("audio")).define("audio", ["AudioInstance"], _audio);
  main.variable(observer("playMusic")).define("playMusic", ["audio"], _playMusic);
  main.define("initial mute", ["mutebutton"], _mute);
  main.variable(observer("mutable mute")).define("mutable mute", ["Mutable", "initial mute"], (M, _) => new M(_));
  main.variable(observer("mute")).define("mute", ["mutable mute"], _ => _.generator);
  main.variable(observer("hurtSoundUrl")).define("hurtSoundUrl", ["FileAttachment"], _hurtSoundUrl);
  main.variable(observer("starSoundUrl")).define("starSoundUrl", ["FileAttachment"], _starSoundUrl);
  main.variable(observer("munchSoundUrl")).define("munchSoundUrl", ["FileAttachment"], _munchSoundUrl);
  main.variable(observer("jumpsoundURL")).define("jumpsoundURL", ["FileAttachment"], _jumpsoundURL);
  main.variable(observer("gameOverSoundURL")).define("gameOverSoundURL", ["FileAttachment"], _gameOverSoundURL);
  main.variable(observer("moneySoundUrl")).define("moneySoundUrl", ["FileAttachment"], _moneySoundUrl);
  main.variable(observer()).define(["md"], _258);
  main.variable(observer()).define(["md"], _259);
  main.variable(observer()).define(["md"], _260);
  main.variable(observer("skyboxurl")).define("skyboxurl", ["FileAttachment"], _skyboxurl);
  main.variable(observer("cubeimagesCroppedFromHCrossShape")).define("cubeimagesCroppedFromHCrossShape", ["DOM"], _cubeimagesCroppedFromHCrossShape);
  main.variable(observer("cubemap1")).define("cubemap1", ["twgl","gl","pxday","nxday","pyday","nyday","pzday","nzday"], _cubemap1);
  main.variable(observer("cubemap2")).define("cubemap2", ["twgl","gl","pxnight","nxnight","pynight","nynight","pznight","nznight"], _cubemap2);
  main.variable(observer("renderSkybox")).define("renderSkybox", ["mutable gameStart","m4","viewMatrix","initialViewMatrix","ProjectionMatrix","difficulty","cubemap1","cubemap2","gl","skyboxProgramIfo","twgl","skyboxBufferInfo"], _renderSkybox);
  return main;
}
