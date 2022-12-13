import define1 from "./10023e7d8ddc32bc@90.js";
import define2 from "./9d0fa713ea129540@422.js";
import define3 from "./dd5e3bdbece67f4e@210.js";

function _1(md){return(
md`# Object Generation
`
)}

function _modelObj(Inputs,canObj,fenceObj,holeObj,gateObj,starObj,trashObj,fenceObstacleObj,lampObj,catstillObj,catwalk1Obj,catwalk2Obj){return(
Inputs.select(
  new Map([
    ["tuna can", canObj],
    ["wooden fence", fenceObj],
    ["hole", holeObj],
    ["gate", gateObj],
    ["star", starObj],
    ["trash", trashObj],
    ["fence obstacle", fenceObstacleObj],
    ["lamp", lampObj],
    ["cat still", catstillObj],
    ["cat walk 1", catwalk1Obj],
    ["cat walk 2", catwalk2Obj]
  ]),
  {
    value: canObj,
    label: "Choose Model"
  }
)
)}

function _modelTex(Inputs,canTex,fenceTex,holeTex,gateTex,starTex,trashTex,lampTex,cat1Tex,cat2Tex,cat3Tex){return(
Inputs.select(
  new Map([
    ["tuna can", canTex],
    ["wooden fence and fence obstacle", fenceTex],
    ["hole", holeTex],
    ["gate", gateTex],
    ["star", starTex],
    ["trash", trashTex],
    ["lamp", lampTex],
    ["cat1", cat1Tex],
    ["cat2", cat2Tex],
    ["cat3", cat3Tex]
  ]),
  {
    value: canTex,
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

function _20(md){return(
md`## Variables`
)}

function _canvasWidth(){return(
760
)}

function _canvasHeight(){return(
400
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

function _radius(){return(
1
)}

function _aspect(canvasWidth,canvasHeight){return(
canvasWidth / canvasHeight
)}

function _deg2rad(){return(
(deg) => (Math.PI * deg) / 180
)}

function _debug(){return(
0
)}

function _30(debug){return(
debug
)}

function _31(md){return(
md`## Models`
)}

async function _canObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("tunacan.obj").url(), "obj")
)}

async function _fenceObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(
  await FileAttachment("fenceborders.obj").url(),
  "obj"
)
)}

async function _holeObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("hole.obj").url(), "obj")
)}

async function _gateObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("toriigate.obj").url(), "obj")
)}

async function _starObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("star@2.obj").url(), "obj")
)}

async function _trashObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("trash.obj").url(), "obj")
)}

async function _fenceObstacleObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(
  await FileAttachment("gateobstacle.obj").url(),
  "obj"
)
)}

async function _lampObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(await FileAttachment("lamp.obj").url(), "obj")
)}

async function _catstillObj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(
  await FileAttachment("catstill.obj").url(),
  "obj"
)
)}

async function _catwalk1Obj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(
  await FileAttachment("catwalk1.obj").url(),
  "obj"
)
)}

async function _catwalk2Obj(loadModelFromURL,FileAttachment){return(
loadModelFromURL(
  await FileAttachment("catwalk2.obj").url(),
  "obj"
)
)}

function _43(md){return(
md`## Textures`
)}

function _tex(twgl,gl,modelTex){return(
twgl.createTexture(gl, {
  src: modelTex,
  flipY: true
})
)}

function _canTex(FileAttachment){return(
FileAttachment("tunacantex.png").url()
)}

function _fenceTex(FileAttachment){return(
FileAttachment("wood.jpg").url()
)}

function _holeTex(FileAttachment){return(
FileAttachment("hole.png").url()
)}

function _gateTex(FileAttachment){return(
FileAttachment("toriigate.png").url()
)}

function _starTex(FileAttachment){return(
FileAttachment("star.png").url()
)}

function _trashTex(FileAttachment){return(
FileAttachment("trashcantex.png").url()
)}

function _lampTex(FileAttachment){return(
FileAttachment("lamp@1.png").url()
)}

function _cat1Tex(FileAttachment){return(
FileAttachment("cat1tex.png").url()
)}

function _cat2Tex(FileAttachment){return(
FileAttachment("cat2tex.png").url()
)}

function _cat3Tex(FileAttachment){return(
FileAttachment("cat3tex.png").url()
)}

function _55(md){return(
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
getImageData(await FileAttachment("pnxzday.png").blob())
)}

async function _nxday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnxzday.png").blob())
)}

async function _pyday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pyday.png").blob())
)}

async function _nyday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("nyday.png").blob())
)}

async function _pzday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnxzday.png").blob())
)}

async function _nzday(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnxzday.png").blob())
)}

async function _pxnight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnxznight.png").blob())
)}

async function _nxnight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnxznight.png").blob())
)}

async function _pynight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pynight.png").blob())
)}

async function _nynight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("nynight.png").blob())
)}

async function _pznight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnxznight.png").blob())
)}

async function _nznight(getImageData,FileAttachment){return(
getImageData(await FileAttachment("pnxznight.png").blob())
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


function _73(md){return(
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

function _80(md){return(
md`## (Ignore)`
)}

function _wood(FileAttachment){return(
FileAttachment("wood.jpg")
)}

function _tunacantex(FileAttachment){return(
FileAttachment("tunacantex.png")
)}

function _trashcantex(FileAttachment){return(
FileAttachment("trashcantex.png")
)}

function _toriigate(FileAttachment){return(
FileAttachment("toriigate.png")
)}

function _star(FileAttachment){return(
FileAttachment("star.png")
)}

function _pynight1(FileAttachment){return(
FileAttachment("pynight.png")
)}

function _pyday1(FileAttachment){return(
FileAttachment("pyday.png")
)}

function _pnxznight(FileAttachment){return(
FileAttachment("pnxznight.png")
)}

function _pnxzday(FileAttachment){return(
FileAttachment("pnxzday.png")
)}

function _nynight1(FileAttachment){return(
FileAttachment("nynight.png")
)}

function _nyday1(FileAttachment){return(
FileAttachment("nyday.png")
)}

function _hole(FileAttachment){return(
FileAttachment("hole.png")
)}

function _cat1tex(FileAttachment){return(
FileAttachment("cat1tex.png")
)}

function _cat2tex(FileAttachment){return(
FileAttachment("cat2tex.png")
)}

function _cat3tex(FileAttachment){return(
FileAttachment("cat3tex.png")
)}

function _tunacan(FileAttachment){return(
FileAttachment("tunacan.obj")
)}

function _trash(FileAttachment){return(
FileAttachment("trash.obj")
)}

function _toriigate1(FileAttachment){return(
FileAttachment("toriigate.obj")
)}

function _star1(FileAttachment){return(
FileAttachment("star@2.obj")
)}

function _hole1(FileAttachment){return(
FileAttachment("hole.obj")
)}

function _gateobstacle(FileAttachment){return(
FileAttachment("gateobstacle.obj")
)}

function _fenceborders(FileAttachment){return(
FileAttachment("fenceborders.obj")
)}

function _catwalk2(FileAttachment){return(
FileAttachment("catwalk2.obj")
)}

function _catwalk1(FileAttachment){return(
FileAttachment("catwalk1.obj")
)}

function _catstill(FileAttachment){return(
FileAttachment("catstill.obj")
)}

function _lamp(FileAttachment){return(
FileAttachment("lamp.obj")
)}

function _lamp1(FileAttachment){return(
FileAttachment("lamp@1.png")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["fenceborders.obj", {url: new URL("./files/c8628f98d64a949c5cb5b7148ac04a2e5ddc9beefaced1600c13bcbc3b5f7de9aeb043b92eaf9a0b255fa2b694b8e4784cc22573dc12743e93d3b0717f715874.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["hole.obj", {url: new URL("./files/02f956b856014b2c68d2e5285cdc84adaeb0f53e15c47f2c2bc9c511ae65a7e9f60638478e49dfce168105e1ebd3624dc7d22dadeea42de8cb1181d4443044c8.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["gateobstacle.obj", {url: new URL("./files/47ed739994c579a1167e188a7ff657b367b41d9949e8a13d8de1dc2b07db22dffd58723f9884b2265256708dea3e99d01b6330b7bb51004df6c8528de1087946.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["toriigate.obj", {url: new URL("./files/1cc22cd4b81c14881917850fb4e9cb697ce632b87fde01e3aba8e668a21bd0979a38e2f7eed26885f3345cc33b835020482aa1237e860b2cfc32dd1d97743270.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["trash.obj", {url: new URL("./files/ff682ea0325dafcd8f6a9caacfb913831e3a0e678ae2edbe4d036887effd7047b9b695bbaa31bfb0953ed24c89716b563b3f89538ed6cddfda68d74de1c92a5a.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["tunacan.obj", {url: new URL("./files/75527402c72bdeb98972946a6f4b196b567a5d420b15480e8af49e2feceecd848a9593deed05c451d2c5a707ca878a0e2449dc90994dfc74101c136da19d4223.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["catwalk2.obj", {url: new URL("./files/41d22fad2592c5b418b60f855924dc4f8614faa60ea2ffea02c4fddcde3f803dd07f1aa9dcc58e224b53bd5aa9e26566400bc0e3b2d815bd8d6c43f68e1042d9.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["catwalk1.obj", {url: new URL("./files/4a183d42cf9348cb3923531f8987fdca2eb56dc969c661378eb87d7cb67df949bab80516e27c82aee0a87a292b305b34601d5fbff7aaa3b355fe72f1b56ac542.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["catstill.obj", {url: new URL("./files/9774c33946cadae4fed69b760c2c976a821487bcd1a940dc2d2e6dda552ff057e06ff99f9a39b9149fce04c31d8522d32da2db5582b8deeb80c2fd6977e06f83.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["hole.png", {url: new URL("./files/fa93a41e28734877edf87e9dacd4d91680daabdd6f5d1347c5547bee5103c5a898c40e17ce5fb7277838f895a70e4e4e3edf95a8e981d0587d29e8a57ea3eb49.png", import.meta.url), mimeType: "image/png", toString}],
    ["wood.jpg", {url: new URL("./files/0e1dbdd4b3dca9c82a22f8221fffe3763e2c0a3f201cead429bbdb375e3fa3bf1793e3e11836d66b4b2c1cbffa54257c1c2194997bc1271472111a1d399f3b10.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["toriigate.png", {url: new URL("./files/dc2fb44a4b22140dc7c7ee7c12159c96bf5aa35fd5b744b5a7dc25dccdfa8d44db9401d6019bf9f0c24aca799150c6e6cb1ef167dd066ef6ac4506022801849f.png", import.meta.url), mimeType: "image/png", toString}],
    ["tunacantex.png", {url: new URL("./files/62497d6faedd412ea1fcd73c0021602b0dae98714f39ab1e6c3ba68e74e47a91294c9c1ff0863de00b15492092e57a81503af40a8bb72e8558fb177bf35f8a50.png", import.meta.url), mimeType: "image/png", toString}],
    ["star.png", {url: new URL("./files/d6eb2d10c2109c6e7a561b57e3202f84493b65216da4603c85f4bd7e9f90837c0e831c27bc19ae2550abcf97022f556d57ecf6e368f9378bb50d582808dc194f.png", import.meta.url), mimeType: "image/png", toString}],
    ["trashcantex.png", {url: new URL("./files/c13b1b12ad16127d59da1a8cc2d1d4fe40be164112556742310386ff2bddeba267542f0bf4f499cd6cdc526e94a92d0acf0a1696f04ca69565412ac7b8419d0c.png", import.meta.url), mimeType: "image/png", toString}],
    ["cat2tex.png", {url: new URL("./files/a207ef240ba8c671f61069f0d62f5fbb1705f8706a80f2f083d64bb63ce36e887922dcc4adb75f02f194bb9a478ef21dd56853a0a29bc6c7a5744395b5d1676f.png", import.meta.url), mimeType: "image/png", toString}],
    ["cat3tex.png", {url: new URL("./files/b2afe47c22986d781dd6023c82e840ccff1184e64079b34e5bb873b9e9df62a3e945151040c1d349e3c806b822324d3abc098d71e2a63fb296b55bea21d94b13.png", import.meta.url), mimeType: "image/png", toString}],
    ["cat1tex.png", {url: new URL("./files/f2fbe8372ed12ed56f9c3d806b64f6af6570a582c46c2e55cf7d90610d71ad6585c6a4f3ab2466845e7027956c4ba446e3bfc870d6cd7af475d207fd1b97d57c.png", import.meta.url), mimeType: "image/png", toString}],
    ["pyday.png", {url: new URL("./files/8d4e7584a51e1c601e1c0bfde6e67da1ffcfaa3bfef264d5c6d0b56a782b0d0faf5d1af03dd801d848605b0a304513c5ef79a3a9c4facafd614e3807f7f7784c.png", import.meta.url), mimeType: "image/png", toString}],
    ["nynight.png", {url: new URL("./files/74d68320a16b68b64f1fe8a6fa801fa433b816f4cade748032cf0c9880de344b312d2676496e3a98d9abae00945504267c2ca8661a7e7c2d3d853cc49681125d.png", import.meta.url), mimeType: "image/png", toString}],
    ["nyday.png", {url: new URL("./files/35d049fee0498372e3e5160b429cee8c8bd49bca21540521a3fd430110105e934f3d66c1c34bf0509e8918e1a2d5130c22ef2225f54c3762cb89e1e7b9dcc777.png", import.meta.url), mimeType: "image/png", toString}],
    ["pnxzday.png", {url: new URL("./files/e0577f84d81703c40c22d0659ba7e278a146d5f47f5a48491312ca3ea6a8214709bdcafc55d01da5629b09dcb762ceadbf05fd30729e205bf7c6a4aca76a4cff.png", import.meta.url), mimeType: "image/png", toString}],
    ["pnxznight.png", {url: new URL("./files/334c4544c30483371f4abbebd1825fc475afc4dda10d4a6850039ca12c8dc2df052086fc250084406e647024ca73f40d359286a157424218698804cd3b63100f.png", import.meta.url), mimeType: "image/png", toString}],
    ["pynight.png", {url: new URL("./files/ec64d1d8c97f18a5341a66ef5bca5440f0ef09c7705004fbb2d78b511f9a5d22df5bc6d7d8df8536eb9bd483afddaffeca8d4bf8c1cd9908b85520f8858b0298.png", import.meta.url), mimeType: "image/png", toString}],
    ["lamp.obj", {url: new URL("./files/9643fcfb2f9649ef82542178810daac045d30264f48ec65811f83739572f71e847455a6054aa9d8beb7fadb6544c962d2115a5815797ae549c5dc8ec73c3a99e.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["lamp@1.png", {url: new URL("./files/a4e0809fda564d6bfbabd878d0bcb238733a6faab25514db3c2c6e0fb64e531c108b7c64692e8e9b8b2d9ed1240f687a0e3ec400dc08dcf9ad8802845e51c0fa.png", import.meta.url), mimeType: "image/png", toString}],
    ["star@2.obj", {url: new URL("./files/c7fb81bc1dbb506db449d8ce59b818a2588bcea604a0734566676db77fd87d85b6992fee2afaadb151b1d2322e23aa73196001b03a408b515105e5633228cdd0.bin", import.meta.url), mimeType: "application/octet-stream", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof modelObj")).define("viewof modelObj", ["Inputs","canObj","fenceObj","holeObj","gateObj","starObj","trashObj","fenceObstacleObj","lampObj","catstillObj","catwalk1Obj","catwalk2Obj"], _modelObj);
  main.variable(observer("modelObj")).define("modelObj", ["Generators", "viewof modelObj"], (G, _) => G.input(_));
  main.variable(observer("viewof modelTex")).define("viewof modelTex", ["Inputs","canTex","fenceTex","holeTex","gateTex","starTex","trashTex","lampTex","cat1Tex","cat2Tex","cat3Tex"], _modelTex);
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
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("canvasWidth")).define("canvasWidth", _canvasWidth);
  main.variable(observer("canvasHeight")).define("canvasHeight", _canvasHeight);
  main.variable(observer("fov_Y")).define("fov_Y", _fov_Y);
  main.variable(observer("near")).define("near", _near);
  main.variable(observer("far")).define("far", _far);
  main.variable(observer("radius")).define("radius", _radius);
  main.variable(observer("aspect")).define("aspect", ["canvasWidth","canvasHeight"], _aspect);
  main.variable(observer("deg2rad")).define("deg2rad", _deg2rad);
  main.define("initial debug", _debug);
  main.variable(observer("mutable debug")).define("mutable debug", ["Mutable", "initial debug"], (M, _) => new M(_));
  main.variable(observer("debug")).define("debug", ["mutable debug"], _ => _.generator);
  main.variable(observer()).define(["debug"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("canObj")).define("canObj", ["loadModelFromURL","FileAttachment"], _canObj);
  main.variable(observer("fenceObj")).define("fenceObj", ["loadModelFromURL","FileAttachment"], _fenceObj);
  main.variable(observer("holeObj")).define("holeObj", ["loadModelFromURL","FileAttachment"], _holeObj);
  main.variable(observer("gateObj")).define("gateObj", ["loadModelFromURL","FileAttachment"], _gateObj);
  main.variable(observer("starObj")).define("starObj", ["loadModelFromURL","FileAttachment"], _starObj);
  main.variable(observer("trashObj")).define("trashObj", ["loadModelFromURL","FileAttachment"], _trashObj);
  main.variable(observer("fenceObstacleObj")).define("fenceObstacleObj", ["loadModelFromURL","FileAttachment"], _fenceObstacleObj);
  main.variable(observer("lampObj")).define("lampObj", ["loadModelFromURL","FileAttachment"], _lampObj);
  main.variable(observer("catstillObj")).define("catstillObj", ["loadModelFromURL","FileAttachment"], _catstillObj);
  main.variable(observer("catwalk1Obj")).define("catwalk1Obj", ["loadModelFromURL","FileAttachment"], _catwalk1Obj);
  main.variable(observer("catwalk2Obj")).define("catwalk2Obj", ["loadModelFromURL","FileAttachment"], _catwalk2Obj);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("tex")).define("tex", ["twgl","gl","modelTex"], _tex);
  main.variable(observer("canTex")).define("canTex", ["FileAttachment"], _canTex);
  main.variable(observer("fenceTex")).define("fenceTex", ["FileAttachment"], _fenceTex);
  main.variable(observer("holeTex")).define("holeTex", ["FileAttachment"], _holeTex);
  main.variable(observer("gateTex")).define("gateTex", ["FileAttachment"], _gateTex);
  main.variable(observer("starTex")).define("starTex", ["FileAttachment"], _starTex);
  main.variable(observer("trashTex")).define("trashTex", ["FileAttachment"], _trashTex);
  main.variable(observer("lampTex")).define("lampTex", ["FileAttachment"], _lampTex);
  main.variable(observer("cat1Tex")).define("cat1Tex", ["FileAttachment"], _cat1Tex);
  main.variable(observer("cat2Tex")).define("cat2Tex", ["FileAttachment"], _cat2Tex);
  main.variable(observer("cat3Tex")).define("cat3Tex", ["FileAttachment"], _cat3Tex);
  main.variable(observer()).define(["md"], _55);
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
  main.variable(observer()).define(["md"], _73);
  const child1 = runtime.module(define1);
  main.import("columns", child1);
  const child2 = runtime.module(define2);
  main.import("computeModelExtent", child2);
  main.import("loadModelFromURL", child2);
  const child3 = runtime.module(define3);
  main.import("getImageData", child3);
  main.variable(observer("v3")).define("v3", ["twgl"], _v3);
  main.variable(observer("m4")).define("m4", ["twgl"], _m4);
  main.variable(observer("twgl")).define("twgl", ["require"], _twgl);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer("wood")).define("wood", ["FileAttachment"], _wood);
  main.variable(observer("tunacantex")).define("tunacantex", ["FileAttachment"], _tunacantex);
  main.variable(observer("trashcantex")).define("trashcantex", ["FileAttachment"], _trashcantex);
  main.variable(observer("toriigate")).define("toriigate", ["FileAttachment"], _toriigate);
  main.variable(observer("star")).define("star", ["FileAttachment"], _star);
  main.variable(observer("pynight1")).define("pynight1", ["FileAttachment"], _pynight1);
  main.variable(observer("pyday1")).define("pyday1", ["FileAttachment"], _pyday1);
  main.variable(observer("pnxznight")).define("pnxznight", ["FileAttachment"], _pnxznight);
  main.variable(observer("pnxzday")).define("pnxzday", ["FileAttachment"], _pnxzday);
  main.variable(observer("nynight1")).define("nynight1", ["FileAttachment"], _nynight1);
  main.variable(observer("nyday1")).define("nyday1", ["FileAttachment"], _nyday1);
  main.variable(observer("hole")).define("hole", ["FileAttachment"], _hole);
  main.variable(observer("cat1tex")).define("cat1tex", ["FileAttachment"], _cat1tex);
  main.variable(observer("cat2tex")).define("cat2tex", ["FileAttachment"], _cat2tex);
  main.variable(observer("cat3tex")).define("cat3tex", ["FileAttachment"], _cat3tex);
  main.variable(observer("tunacan")).define("tunacan", ["FileAttachment"], _tunacan);
  main.variable(observer("trash")).define("trash", ["FileAttachment"], _trash);
  main.variable(observer("toriigate1")).define("toriigate1", ["FileAttachment"], _toriigate1);
  main.variable(observer("star1")).define("star1", ["FileAttachment"], _star1);
  main.variable(observer("hole1")).define("hole1", ["FileAttachment"], _hole1);
  main.variable(observer("gateobstacle")).define("gateobstacle", ["FileAttachment"], _gateobstacle);
  main.variable(observer("fenceborders")).define("fenceborders", ["FileAttachment"], _fenceborders);
  main.variable(observer("catwalk2")).define("catwalk2", ["FileAttachment"], _catwalk2);
  main.variable(observer("catwalk1")).define("catwalk1", ["FileAttachment"], _catwalk1);
  main.variable(observer("catstill")).define("catstill", ["FileAttachment"], _catstill);
  main.variable(observer("lamp")).define("lamp", ["FileAttachment"], _lamp);
  main.variable(observer("lamp1")).define("lamp1", ["FileAttachment"], _lamp1);
  return main;
}
