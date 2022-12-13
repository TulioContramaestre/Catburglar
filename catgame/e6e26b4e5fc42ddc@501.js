// https://observablehq.com/@spattana/webgl-texturing-using-twgl@501
import define1 from "./10023e7d8ddc32bc@90.js";

function _1(md){return(
md`# WebGL Texturing using [twgl](https://twgljs.org/).
Texture Image used: [Mozilla Logo](https://www.mozilla.org/en-US/MPL/2.0/).`
)}

function _textureScale(Inputs){return(
Inputs.range([-8, 8], {
  step: 1,
  value: 0,
  label: "Texture scale."
})
)}

function _textureOptions(columns,Inputs,md){return(
columns({
  wrap: Inputs.radio(["clamp_to_edge", "repeat"], {
    label: md`**Wrap Options**`,
    value: "repeat"
  }),
  minfilter: Inputs.radio(["nearest", "linear", "mipmap"], {
    label: md`**Minimization Options**`,
    value: "mipmap"
  }),
  magfilter: Inputs.radio(["nearest", "linear"], {
    label: md`**Magnification Options**`,
    value: "linear"
  })
})
)}

function _4(gl,programInfo,twgl,uniforms,bufferInfo)
{
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(programInfo.program);
  twgl.setUniforms(programInfo, uniforms);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.drawBufferInfo(gl, bufferInfo);
  return gl.canvas;
}


function _gl(DOM,canvasWidth,canvasHeight)
{
  const canvas = DOM.canvas(canvasWidth, canvasHeight);
  // or html`<canvas width="578", height="256"></canvas>`
  const gl = canvas.getContext("webgl2");
  gl.clearColor(0.25, 0.25, 0.25, 1);
  gl.enable(gl.DEPTH_TEST);
  return gl;
}


function _errorBlock(html,width){return(
html`<textarea style="height : 20px; width : ${width}px; font-size: 0.8em; display: block"></textarea>`
)}

function _programInfo(errorBlock,twgl,gl,shaders)
{
  errorBlock.style.height = "20px";
  errorBlock.innerHTML = "Program Shader compilation successful";

  return twgl.createProgramInfo(gl, [shaders.vert, shaders.frag], (message) => {
    // Combile the shaders and create a shader program.
    errorBlock.style.height = "400px";
    errorBlock.innerHTML = "Program Shader compilation error\n" + message;
  });
}


function _shaders(){return(
{
  frag: `#version 300 es
  precision mediump float;
  uniform sampler2D tex;
  in vec2 fragUV;
  out vec4 outColor;
  void main () {
    outColor = texture(tex, fragUV);
  }`,

  vert: `#version 300 es
  precision mediump float;
  in vec2 position;
  in vec2 uv;
  out vec2 fragUV;
  uniform vec2 aspectRatio;
  void main () {
    fragUV = uv;
    gl_Position = vec4(position/aspectRatio,0, 1);
  }`
}
)}

function _attributes(quadData){return(
{
  position: {
    numComponents: 2,
    data: quadData.positions.flat()
  },
  uv: { numComponents: 2, data: quadData.uvs.flat() },
  indices: quadData.cells.flat()
}
)}

function _bufferInfo(twgl,gl,attributes){return(
twgl.createBufferInfoFromArrays(gl, attributes)
)}

function _uniforms(texture,aspectRatio){return(
{
  tex: texture,
  aspectRatio
}
)}

function _13(md){return(
md`### Data`
)}

function _quadData(textureScale)
{
  return {
    positions: [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ],
    uvs: [
      [0, 1],
      [0, 0],
      [1, 0],
      [1, 1]
    ].map((d) => {
      const scaleFactor = 2 ** textureScale;
      return [
        (d[0] - 0.5) * scaleFactor + 0.5,
        (d[1] - 0.5) * scaleFactor + 0.5
      ];
    }),
    cells: [
      [0, 1, 2],
      [2, 3, 0]
    ]
  };
}


function _aspectRatio(canvasWidth,canvasHeight)
{
  const ar = canvasWidth / canvasHeight;
  return ar > 1 ? [ar, 1] : [1, 1 / ar];
}


function _canvasWidth(width){return(
width
)}

function _canvasHeight(){return(
400
)}

function _imageURL(FileAttachment){return(
FileAttachment("cubetexture.png").url()
)}

function _image(image_from_URL,imageURL){return(
image_from_URL(imageURL)
)}

function _21(md){return(
md`#### You can create texture from an image element.`
)}

function _texture(twgl,gl,image,textureOptions){return(
twgl.createTexture(gl, {
  // see more info on options from: https://twgljs.org/docs/module-twgl.html#.TextureOptions
  // Also see https://twgljs.org/docs/
  src: image, //or imageURL,
  flipY: true,
  wrap: gl[textureOptions.wrap.toUpperCase()],
  mag: gl[textureOptions.magfilter.toUpperCase()],
  min: gl[textureOptions.minfilter.toUpperCase()]
})
)}

function _texture1(twgl,gl,image,textureOptions){return(
twgl.createTexture(gl, {
  // see more info on options from: https://twgljs.org/docs/module-twgl.html#.TextureOptions
  // Also see https://twgljs.org/docs/
  src: image,
  flipY: true,
  wrap: gl[textureOptions.wrap.toUpperCase()],
  mag: gl[textureOptions.magfilter.toUpperCase()],
  min: gl[textureOptions.minfilter.toUpperCase()]
})
)}

function _anotherTexture(twgl,gl){return(
twgl.createTexture(gl, {
  min: gl.NEAREST,
  mag: gl.NEAREST,
  src: [
    255,
    255,
    255,
    255,
    192,
    192,
    192,
    255,
    192,
    192,
    192,
    255,
    255,
    255,
    255,
    255
  ]
})
)}

function _25(md){return(
md`To create texture directly from a URL use: texture_from_URL(...) with URL and appropriate parameters.`
)}

function _26(md,url){return(
md`#### You can Create Image element from URL
try:  
image = image_from_URL(${url})`
)}

function _url(){return(
"https://raw.githubusercontent.com/mdn/webgl-examples/gh-pages/tutorial/sample6/cubetexture.png"
)}

function _28(md){return(
md`### Local Functions`
)}

function _image_from_URL(){return(
(url) =>{
  return new Promise(resolve => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.src = url;
    im.onload = () => resolve(im);
  })
}
)}

function _testurl(FileAttachment){return(
FileAttachment("cubemaps_skybox.png").url()
)}

function _cubemap(cubeimagesCroppedFromHCrossShape,testurl){return(
cubeimagesCroppedFromHCrossShape(testurl, 128)
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

function _33(md){return(
md`### Libraries and Imports`
)}

function _twgl(require){return(
require("twgl.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cubemaps_skybox.png", {url: new URL("./files/32c6a9ae9fea9b59ebd914bb6b3bce492af33731c821853c8a0dec3ae112767c5bdb3ebdc2b8d86252db31aff8fa148fc2e04f187108fc6e9a42e179ec3e147e.png", import.meta.url), mimeType: "image/png", toString}],
    ["cubetexture.png", {url: new URL("./files/e26f3951ea0eb8e78d10f2e99d6c6f9797a9b51b192b136d64fce8e0c63d41b160cf9e9ad2f48c2f1764f61cfa5c9a4ad1765ed2d32125d3d99eaeabbd05dd28.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof textureScale")).define("viewof textureScale", ["Inputs"], _textureScale);
  main.variable(observer("textureScale")).define("textureScale", ["Generators", "viewof textureScale"], (G, _) => G.input(_));
  main.variable(observer("viewof textureOptions")).define("viewof textureOptions", ["columns","Inputs","md"], _textureOptions);
  main.variable(observer("textureOptions")).define("textureOptions", ["Generators", "viewof textureOptions"], (G, _) => G.input(_));
  main.variable(observer()).define(["gl","programInfo","twgl","uniforms","bufferInfo"], _4);
  main.variable(observer("gl")).define("gl", ["DOM","canvasWidth","canvasHeight"], _gl);
  main.variable(observer("errorBlock")).define("errorBlock", ["html","width"], _errorBlock);
  main.variable(observer("programInfo")).define("programInfo", ["errorBlock","twgl","gl","shaders"], _programInfo);
  main.variable(observer("shaders")).define("shaders", _shaders);
  main.variable(observer("attributes")).define("attributes", ["quadData"], _attributes);
  main.variable(observer("bufferInfo")).define("bufferInfo", ["twgl","gl","attributes"], _bufferInfo);
  main.variable(observer("uniforms")).define("uniforms", ["texture","aspectRatio"], _uniforms);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("quadData")).define("quadData", ["textureScale"], _quadData);
  main.variable(observer("aspectRatio")).define("aspectRatio", ["canvasWidth","canvasHeight"], _aspectRatio);
  main.variable(observer("canvasWidth")).define("canvasWidth", ["width"], _canvasWidth);
  main.variable(observer("canvasHeight")).define("canvasHeight", _canvasHeight);
  main.variable(observer("imageURL")).define("imageURL", ["FileAttachment"], _imageURL);
  main.variable(observer("image")).define("image", ["image_from_URL","imageURL"], _image);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("texture")).define("texture", ["twgl","gl","image","textureOptions"], _texture);
  main.variable(observer("texture1")).define("texture1", ["twgl","gl","image","textureOptions"], _texture1);
  main.variable(observer("anotherTexture")).define("anotherTexture", ["twgl","gl"], _anotherTexture);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md","url"], _26);
  main.variable(observer("url")).define("url", _url);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("image_from_URL")).define("image_from_URL", _image_from_URL);
  main.variable(observer("testurl")).define("testurl", ["FileAttachment"], _testurl);
  main.variable(observer("cubemap")).define("cubemap", ["cubeimagesCroppedFromHCrossShape","testurl"], _cubemap);
  main.variable(observer("cubeimagesCroppedFromHCrossShape")).define("cubeimagesCroppedFromHCrossShape", ["DOM"], _cubeimagesCroppedFromHCrossShape);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("twgl")).define("twgl", ["require"], _twgl);
  const child1 = runtime.module(define1);
  main.import("columns", child1);
  return main;
}
