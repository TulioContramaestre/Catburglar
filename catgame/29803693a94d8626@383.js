import define1 from "./10023e7d8ddc32bc@90.js";
import define2 from "./9d0fa713ea129540@422.js";
import define3 from "./e6e26b4e5fc42ddc@501.js";
import define4 from "./dd5e3bdbece67f4e@210.js";

function _1(md){return(
md`# Object Testing`
)}

function _modelObj(Inputs,canObj,fenceObj,holeObj,gateObj,starObj,trashObj){return(
Inputs.select(
  new Map([
    ["tuna can", canObj],
    ["wooden fence", fenceObj],
    ["hole", holeObj],
    ["gate", gateObj],
    ["star", starObj],
    ["trash", trashObj]
  ]),
  {
    value: canObj,
    label: "Choose Model"
  }
)
)}

function _modelTex(Inputs,canTexture,fenceTex,holeTex,gateTex,starTex,trashTex){return(
Inputs.select(
  new Map([
    ["tuna can", canTexture],
    ["wooden fence", fenceTex],
    ["hole", holeTex],
    ["gate", gateTex],
    ["star", starTex],
    ["trash", trashTex]
  ]),
  {
    value: canTexture,
    label: "Choose Texture"
  }
)
)}

function _cubemap(Inputs,cubemap1,cubemap2){return(
Inputs.select(
  new Map([
    ["day", cubemap1],
    ["night", cubemap2]
  ]),
  {
    label: "Choose Cubemap:",
    value: cubemap1
  }
)
)}

function _cameraAngles(columns,Inputs){return(
columns({
  y_angle: Inputs.range([-180, 180], {
    value: 0,
    label: "Camera Y Angle",
    step: 1
  }),
  x_angle: Inputs.range([-89, 89], {
    value: -12,
    label: "Camera X Angle",
    step: 1
  })
})
)}

function _6(gl,canvasWidth,canvasHeight,renderSkybox,renderScene)
{
  gl.viewport(0, 0, canvasWidth, canvasHeight);
  gl.clearColor(0, 0.25, 0.25, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  renderSkybox();
  renderScene();

  return gl.canvas;
}


function _gl(DOM,canvasWidth,canvasHeight)
{
  const myCanvas = DOM.canvas(canvasWidth, canvasHeight);

  const gl = myCanvas.getContext("webgl2");
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.3, 0.4, 0.5, 1);
  //gl.enable(gl.SCISSOR_TEST);
  gl.lineWidth(2);
  return gl;
}


function _cameraLookAt(modelDim){return(
modelDim.center
)}

function _viewMatrix(getViewMatrix,radius,deg2rad,cameraAngles){return(
getViewMatrix(
  radius,
  deg2rad(cameraAngles.x_angle),
  deg2rad(cameraAngles.y_angle)
)
)}

function _getViewMatrix(m4,v3,cameraLookAt,modelDim){return(
(r, x_angle, y_angle) => {
  const gazeDirection = m4.transformDirection(
    m4.multiply(m4.rotationY(y_angle), m4.rotationX(x_angle)),
    [0, 0, 1]
  );
  const eyePosition = v3.add(
    cameraLookAt,
    v3.mulScalar(gazeDirection, r * modelDim.dia)
  );

  const cameraMatrix = m4.lookAt(eyePosition, cameraLookAt, [0, 1, 0]);
  return m4.inverse(cameraMatrix);
}
)}

function _projectionMatrix(getProjectionMatrix,fov_Y,near,far){return(
getProjectionMatrix(fov_Y, near, far)
)}

function _invViewProjectionMatrix(viewMatrix,m4,projectionMatrix)
{
  const view = viewMatrix.slice();
  const viewD = m4.setTranslation(view, [0, 0, 0]);
  const viewDirectionProjection = m4.multiply(projectionMatrix, viewD);
  return m4.inverse(viewDirectionProjection);
}


function _getProjectionMatrix(m4,deg2rad,aspect,modelDim){return(
(fov, near, far) => {
  //const aspect = gl.canvas.width / gl.canvas.height;
  return m4.perspective(
    deg2rad(fov),
    aspect,
    near * modelDim.dia,
    far * modelDim.dia
  );
}
)}

function _renderScene(m4,viewMatrix,tex,projectionMatrix,$0,gl,sceneProgramInfo,twgl,sceneBufferInfoArray){return(
() => {
  const eyePosition = m4.inverse(viewMatrix).slice(12, 15);

  const uniforms = {
    modelMatrix: m4.identity(),
    eyePosition,
    tex,
    viewMatrix: viewMatrix,
    projectionMatrix: projectionMatrix
  };
  $0.value = uniforms;
  gl.useProgram(sceneProgramInfo.program);
  twgl.setUniforms(sceneProgramInfo, uniforms);
  sceneBufferInfoArray.forEach((bufferInfo) => {
    twgl.setBuffersAndAttributes(gl, sceneProgramInfo, bufferInfo);
    twgl.drawBufferInfo(gl, bufferInfo);
  });
}
)}

function _errorBlock(html,width){return(
html`<textarea style="height : 20px; width : ${width}px; font-size: 0.8em; display: block"></textarea>`
)}

function _sceneProgramInfo(errorBlock,twgl,gl)
{
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


function _modelDim(computeModelExtent,modelObj){return(
computeModelExtent(modelObj)
)}

function _19(md){return(
md`## Skybox`
)}

function _renderSkybox(gl,cubemap,invViewProjectionMatrix,skyboxProgramIfo,twgl,skyboxBufferInfo){return(
() => {
  gl.depthFunc(gl.LEQUAL);
  const uniforms = {
    cubemap,
    invViewProjectionMatrix
  };
  gl.useProgram(skyboxProgramIfo.program);
  twgl.setUniforms(skyboxProgramIfo, uniforms);

  twgl.setBuffersAndAttributes(gl, skyboxProgramIfo, skyboxBufferInfo);
  twgl.drawBufferInfo(gl, skyboxBufferInfo);
  gl.depthFunc(gl.LESS);
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

async function _pxday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnyzday.png").blob())
)}

async function _nxday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnyzday.png").blob())
)}

async function _pyday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pxday@1.png").blob())
)}

async function _nyday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("nxday.png").blob())
)}

async function _pzday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnyzday.png").blob())
)}

async function _nzday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnyzday.png").blob())
)}

async function _pxnight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnyznight.png").blob())
)}

async function _nxnight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnyznight.png").blob())
)}

async function _pynight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pxnight.png").blob())
)}

async function _nynight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("nxnight.png").blob())
)}

async function _pznight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnyznight.png").blob())
)}

async function _nznight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnyznight.png").blob())
)}

function _skyboxBufferInfo(twgl,gl){return(
twgl.createBufferInfoFromArrays(gl, {
  position: {
    numComponents: 2,
    data: [-1, -1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1]
  }
})
)}

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


function _37(md){return(
md`## Variables`
)}

function _canvasWidth(){return(
760
)}

function _fov_Y(){return(
45
)}

function _near(){return(
0.1
)}

function _far(){return(
2.5
)}

function _aspect(canvasWidth,canvasHeight){return(
canvasWidth / canvasHeight
)}

function _radius(){return(
1
)}

function _canvasHeight(){return(
400
)}

function _deg2rad(){return(
(deg) => (Math.PI * deg) / 180
)}

function _debug(){return(
0
)}

function _47(debug){return(
debug
)}

function _48(md){return(
md`## Models`
)}

async function _canObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(
  await FileAttachment("canned_food_01.obj").url(),
  "obj"
)
)}

async function _fenceObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(
  await FileAttachment("border_fence.obj").url(),
  "obj"
)
)}

async function _holeObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("holemodel@2.obj").url(), "obj")
)}

async function _gateObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(
  await FileAttachment("torii_gate_02.obj").url(),
  "obj"
)
)}

async function _starObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("star_01.obj").url(), "obj")
)}

async function _trashObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("trashcan.obj").url(), "obj")
)}

function _canTexture(FileAttachment){return(
FileAttachment("canned_food_01.png").url()
)}

function _fenceTex(FileAttachment){return(
FileAttachment("wood.jpg").url()
)}

function _holeTex(FileAttachment){return(
FileAttachment("hole.png").url()
)}

function _gateTex(FileAttachment){return(
FileAttachment("torii_gate_02.png").url()
)}

function _starTex(FileAttachment){return(
FileAttachment("star.png").url()
)}

function _trashTex(FileAttachment){return(
FileAttachment("trashcantex.png").url()
)}

function _tex(twgl,gl,modelTex){return(
twgl.createTexture(gl, {
  src: modelTex,
  flipY: true
})
)}

function _62(md){return(
md`## Imports`
)}

function _v3(twgl){return(
twgl.v3
)}

function _m4(twgl){return(
twgl.m4
)}

function _twgl(require){return(
require("twgl.js")
)}

function _border_fence(FileAttachment){return(
FileAttachment("border_fence.obj")
)}

function _canned_food_01(FileAttachment){return(
FileAttachment("canned_food_01.obj")
)}

function _holemodel2(FileAttachment){return(
FileAttachment("holemodel@2.obj")
)}

function _star_01(FileAttachment){return(
FileAttachment("star_01.obj")
)}

function _torii_gate_02(FileAttachment){return(
FileAttachment("torii_gate_02.obj")
)}

function _trashcan(FileAttachment){return(
FileAttachment("trashcan.obj")
)}

function _canned_food_011(FileAttachment){return(
FileAttachment("canned_food_01.png")
)}

function _wood(FileAttachment){return(
FileAttachment("wood.jpg")
)}

function _trashcantex(FileAttachment){return(
FileAttachment("trashcantex.png")
)}

function _torii_gate_021(FileAttachment){return(
FileAttachment("torii_gate_02.png")
)}

function _star(FileAttachment){return(
FileAttachment("star.png")
)}

function _hole(FileAttachment){return(
FileAttachment("hole.png")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["nxnight.png", {url: new URL("./files/74d68320a16b68b64f1fe8a6fa801fa433b816f4cade748032cf0c9880de344b312d2676496e3a98d9abae00945504267c2ca8661a7e7c2d3d853cc49681125d.png", import.meta.url), mimeType: "image/png", toString}],
    ["pxnight.png", {url: new URL("./files/ec64d1d8c97f18a5341a66ef5bca5440f0ef09c7705004fbb2d78b511f9a5d22df5bc6d7d8df8536eb9bd483afddaffeca8d4bf8c1cd9908b85520f8858b0298.png", import.meta.url), mimeType: "image/png", toString}],
    ["pnyznight.png", {url: new URL("./files/334c4544c30483371f4abbebd1825fc475afc4dda10d4a6850039ca12c8dc2df052086fc250084406e647024ca73f40d359286a157424218698804cd3b63100f.png", import.meta.url), mimeType: "image/png", toString}],
    ["nxday.png", {url: new URL("./files/35d049fee0498372e3e5160b429cee8c8bd49bca21540521a3fd430110105e934f3d66c1c34bf0509e8918e1a2d5130c22ef2225f54c3762cb89e1e7b9dcc777.png", import.meta.url), mimeType: "image/png", toString}],
    ["pnyzday.png", {url: new URL("./files/e0577f84d81703c40c22d0659ba7e278a146d5f47f5a48491312ca3ea6a8214709bdcafc55d01da5629b09dcb762ceadbf05fd30729e205bf7c6a4aca76a4cff.png", import.meta.url), mimeType: "image/png", toString}],
    ["pxday@1.png", {url: new URL("./files/8d4e7584a51e1c601e1c0bfde6e67da1ffcfaa3bfef264d5c6d0b56a782b0d0faf5d1af03dd801d848605b0a304513c5ef79a3a9c4facafd614e3807f7f7784c.png", import.meta.url), mimeType: "image/png", toString}],
    ["trashcan.obj", {url: new URL("./files/2d8d978edd3c6d040d6ed94c79bef59e79ffdef9ce08c43f628fb6a49aa23da46e016ee7da8096523642faa8b8f661455d23d6c01b4e6b837112e99b1d0c0d67.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["trashcantex.png", {url: new URL("./files/c13b1b12ad16127d59da1a8cc2d1d4fe40be164112556742310386ff2bddeba267542f0bf4f499cd6cdc526e94a92d0acf0a1696f04ca69565412ac7b8419d0c.png", import.meta.url), mimeType: "image/png", toString}],
    ["holemodel@2.obj", {url: new URL("./files/956018b10281074ceab9a81f809ca094b2b7a3a467d6cb92d0a58d4a2668a69a44a71a3fc63f154cb293bcb9e819783cd2c5fbd9a513487116fc165390592b83.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["wood.jpg", {url: new URL("./files/0e1dbdd4b3dca9c82a22f8221fffe3763e2c0a3f201cead429bbdb375e3fa3bf1793e3e11836d66b4b2c1cbffa54257c1c2194997bc1271472111a1d399f3b10.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["border_fence.obj", {url: new URL("./files/c8628f98d64a949c5cb5b7148ac04a2e5ddc9beefaced1600c13bcbc3b5f7de9aeb043b92eaf9a0b255fa2b694b8e4784cc22573dc12743e93d3b0717f715874.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["canned_food_01.png", {url: new URL("./files/62497d6faedd412ea1fcd73c0021602b0dae98714f39ab1e6c3ba68e74e47a91294c9c1ff0863de00b15492092e57a81503af40a8bb72e8558fb177bf35f8a50.png", import.meta.url), mimeType: "image/png", toString}],
    ["canned_food_01.obj", {url: new URL("./files/3bf73b9bf688a20ab432a06cca4f741f130362353c625921099b231d34965d6e254cfc0f2b75fecb5523594cbe2be9afce12e21c9cde57bb0b86827b12ab3e51.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["star.png", {url: new URL("./files/d6eb2d10c2109c6e7a561b57e3202f84493b65216da4603c85f4bd7e9f90837c0e831c27bc19ae2550abcf97022f556d57ecf6e368f9378bb50d582808dc194f.png", import.meta.url), mimeType: "image/png", toString}],
    ["star_01.obj", {url: new URL("./files/f1ca8b1155e778568d509658bd30c95d18102df2978b61ab614b1871595f8633414fe5af7e7b0bbf10acd6dc7710293ee2302b4f0bf2f4d9bfa55ad2768281c0.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["torii_gate_02.png", {url: new URL("./files/dc2fb44a4b22140dc7c7ee7c12159c96bf5aa35fd5b744b5a7dc25dccdfa8d44db9401d6019bf9f0c24aca799150c6e6cb1ef167dd066ef6ac4506022801849f.png", import.meta.url), mimeType: "image/png", toString}],
    ["torii_gate_02.obj", {url: new URL("./files/23aec0e598a7eace985a9798eed83be5a31a1aa695393181774d045e3b7e22d4d090f4c40f15411240be041ffd442d0a8d442d6c2265215f3e550748c573e08c.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["hole.png", {url: new URL("./files/fa93a41e28734877edf87e9dacd4d91680daabdd6f5d1347c5547bee5103c5a898c40e17ce5fb7277838f895a70e4e4e3edf95a8e981d0587d29e8a57ea3eb49.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof modelObj")).define("viewof modelObj", ["Inputs","canObj","fenceObj","holeObj","gateObj","starObj","trashObj"], _modelObj);
  main.variable(observer("modelObj")).define("modelObj", ["Generators", "viewof modelObj"], (G, _) => G.input(_));
  main.variable(observer("viewof modelTex")).define("viewof modelTex", ["Inputs","canTexture","fenceTex","holeTex","gateTex","starTex","trashTex"], _modelTex);
  main.variable(observer("modelTex")).define("modelTex", ["Generators", "viewof modelTex"], (G, _) => G.input(_));
  main.variable(observer("viewof cubemap")).define("viewof cubemap", ["Inputs","cubemap1","cubemap2"], _cubemap);
  main.variable(observer("cubemap")).define("cubemap", ["Generators", "viewof cubemap"], (G, _) => G.input(_));
  main.variable(observer("viewof cameraAngles")).define("viewof cameraAngles", ["columns","Inputs"], _cameraAngles);
  main.variable(observer("cameraAngles")).define("cameraAngles", ["Generators", "viewof cameraAngles"], (G, _) => G.input(_));
  main.variable(observer()).define(["gl","canvasWidth","canvasHeight","renderSkybox","renderScene"], _6);
  main.variable(observer("gl")).define("gl", ["DOM","canvasWidth","canvasHeight"], _gl);
  main.variable(observer("cameraLookAt")).define("cameraLookAt", ["modelDim"], _cameraLookAt);
  main.variable(observer("viewMatrix")).define("viewMatrix", ["getViewMatrix","radius","deg2rad","cameraAngles"], _viewMatrix);
  main.variable(observer("getViewMatrix")).define("getViewMatrix", ["m4","v3","cameraLookAt","modelDim"], _getViewMatrix);
  main.variable(observer("projectionMatrix")).define("projectionMatrix", ["getProjectionMatrix","fov_Y","near","far"], _projectionMatrix);
  main.variable(observer("invViewProjectionMatrix")).define("invViewProjectionMatrix", ["viewMatrix","m4","projectionMatrix"], _invViewProjectionMatrix);
  main.variable(observer("getProjectionMatrix")).define("getProjectionMatrix", ["m4","deg2rad","aspect","modelDim"], _getProjectionMatrix);
  main.variable(observer("renderScene")).define("renderScene", ["m4","viewMatrix","tex","projectionMatrix","mutable debug","gl","sceneProgramInfo","twgl","sceneBufferInfoArray"], _renderScene);
  main.variable(observer("errorBlock")).define("errorBlock", ["html","width"], _errorBlock);
  main.variable(observer("sceneProgramInfo")).define("sceneProgramInfo", ["errorBlock","twgl","gl"], _sceneProgramInfo);
  main.variable(observer("sceneBufferInfoArray")).define("sceneBufferInfoArray", ["modelObj","twgl","gl"], _sceneBufferInfoArray);
  main.variable(observer("modelDim")).define("modelDim", ["computeModelExtent","modelObj"], _modelDim);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("renderSkybox")).define("renderSkybox", ["gl","cubemap","invViewProjectionMatrix","skyboxProgramIfo","twgl","skyboxBufferInfo"], _renderSkybox);
  main.variable(observer("cubemap1")).define("cubemap1", ["twgl","gl","pxday","nxday","pyday","nyday","pzday","nzday"], _cubemap1);
  main.variable(observer("cubemap2")).define("cubemap2", ["twgl","gl","pxnight","nxnight","pynight","nynight","pznight","nznight"], _cubemap2);
  main.variable(observer("pxday")).define("pxday", ["getImageData","FileAttachment"], _pxday);
  main.variable(observer("nxday")).define("nxday", ["getImageData","FileAttachment"], _nxday);
  main.variable(observer("pyday")).define("pyday", ["getImageData","FileAttachment"], _pyday);
  main.variable(observer("nyday")).define("nyday", ["getImageData","FileAttachment"], _nyday);
  main.variable(observer("pzday")).define("pzday", ["getImageData","FileAttachment"], _pzday);
  main.variable(observer("nzday")).define("nzday", ["getImageData","FileAttachment"], _nzday);
  main.variable(observer("pxnight")).define("pxnight", ["getImageData","FileAttachment"], _pxnight);
  main.variable(observer("nxnight")).define("nxnight", ["getImageData","FileAttachment"], _nxnight);
  main.variable(observer("pynight")).define("pynight", ["getImageData","FileAttachment"], _pynight);
  main.variable(observer("nynight")).define("nynight", ["getImageData","FileAttachment"], _nynight);
  main.variable(observer("pznight")).define("pznight", ["getImageData","FileAttachment"], _pznight);
  main.variable(observer("nznight")).define("nznight", ["getImageData","FileAttachment"], _nznight);
  main.variable(observer("skyboxBufferInfo")).define("skyboxBufferInfo", ["twgl","gl"], _skyboxBufferInfo);
  main.variable(observer("skyboxProgramIfo")).define("skyboxProgramIfo", ["errorBlock","twgl","gl"], _skyboxProgramIfo);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("canvasWidth")).define("canvasWidth", _canvasWidth);
  main.variable(observer("fov_Y")).define("fov_Y", _fov_Y);
  main.variable(observer("near")).define("near", _near);
  main.variable(observer("far")).define("far", _far);
  main.variable(observer("aspect")).define("aspect", ["canvasWidth","canvasHeight"], _aspect);
  main.variable(observer("radius")).define("radius", _radius);
  main.variable(observer("canvasHeight")).define("canvasHeight", _canvasHeight);
  main.variable(observer("deg2rad")).define("deg2rad", _deg2rad);
  main.define("initial debug", _debug);
  main.variable(observer("mutable debug")).define("mutable debug", ["Mutable", "initial debug"], (M, _) => new M(_));
  main.variable(observer("debug")).define("debug", ["mutable debug"], _ => _.generator);
  main.variable(observer()).define(["debug"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("canObj")).define("canObj", ["loadModelFromURL","FileAttachment"], _canObj);
  main.variable(observer("fenceObj")).define("fenceObj", ["loadModelFromURL","FileAttachment"], _fenceObj);
  main.variable(observer("holeObj")).define("holeObj", ["loadModelFromURL","FileAttachment"], _holeObj);
  main.variable(observer("gateObj")).define("gateObj", ["loadModelFromURL","FileAttachment"], _gateObj);
  main.variable(observer("starObj")).define("starObj", ["loadModelFromURL","FileAttachment"], _starObj);
  main.variable(observer("trashObj")).define("trashObj", ["loadModelFromURL","FileAttachment"], _trashObj);
  main.variable(observer("canTexture")).define("canTexture", ["FileAttachment"], _canTexture);
  main.variable(observer("fenceTex")).define("fenceTex", ["FileAttachment"], _fenceTex);
  main.variable(observer("holeTex")).define("holeTex", ["FileAttachment"], _holeTex);
  main.variable(observer("gateTex")).define("gateTex", ["FileAttachment"], _gateTex);
  main.variable(observer("starTex")).define("starTex", ["FileAttachment"], _starTex);
  main.variable(observer("trashTex")).define("trashTex", ["FileAttachment"], _trashTex);
  main.variable(observer("tex")).define("tex", ["twgl","gl","modelTex"], _tex);
  main.variable(observer()).define(["md"], _62);
  const child1 = runtime.module(define1);
  main.import("columns", child1);
  const child2 = runtime.module(define2);
  main.import("computeModelExtent", child2);
  main.import("loadModelFromURL", child2);
  const child3 = runtime.module(define3);
  main.import("image_from_URL", child3);
  const child4 = runtime.module(define4);
  main.import("getImageData", child4);
  main.variable(observer("v3")).define("v3", ["twgl"], _v3);
  main.variable(observer("m4")).define("m4", ["twgl"], _m4);
  main.variable(observer("twgl")).define("twgl", ["require"], _twgl);
  main.variable(observer("border_fence")).define("border_fence", ["FileAttachment"], _border_fence);
  main.variable(observer("canned_food_01")).define("canned_food_01", ["FileAttachment"], _canned_food_01);
  main.variable(observer("holemodel2")).define("holemodel2", ["FileAttachment"], _holemodel2);
  main.variable(observer("star_01")).define("star_01", ["FileAttachment"], _star_01);
  main.variable(observer("torii_gate_02")).define("torii_gate_02", ["FileAttachment"], _torii_gate_02);
  main.variable(observer("trashcan")).define("trashcan", ["FileAttachment"], _trashcan);
  main.variable(observer("canned_food_011")).define("canned_food_011", ["FileAttachment"], _canned_food_011);
  main.variable(observer("wood")).define("wood", ["FileAttachment"], _wood);
  main.variable(observer("trashcantex")).define("trashcantex", ["FileAttachment"], _trashcantex);
  main.variable(observer("torii_gate_021")).define("torii_gate_021", ["FileAttachment"], _torii_gate_021);
  main.variable(observer("star")).define("star", ["FileAttachment"], _star);
  main.variable(observer("hole")).define("hole", ["FileAttachment"], _hole);
  return main;
}
