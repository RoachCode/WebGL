import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { vsSource, fsSource, initShaderProgram } from "./shaders.js";
import { loadTexture } from "./load-texture.js";

function main()
{
    // Get gl context
    const canvas = document.querySelector('#glcanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const gl = canvas.getContext('webgl');

    window.addEventListener("resize", () => {
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    });

    if (gl === null)
    {
        alert('Unable to initialize WebGL.');
        return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    const programInfo =
    {
        program: shaderProgram,
        attribLocations:
        {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            //vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor")
            textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord")
        },
        uniformLocations:
        {
            projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
            uSampler: gl.getUniformLocation(shaderProgram, "uSampler")
        }
    };
  
    // Build all the objects we'll be drawing.
    const buffers = initBuffers(gl);

    // Load textures
    const texture = loadTexture(gl, "cubetexture.png");
    // Flip image pixels into the bottom-to-top order that WebGL expects.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    // Draw the scene repeatedly
    let cubeRotation = 0.0;
    let deltaTime = 0;
    let then = 0;
    function render(now)
    {
        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buffers, texture, cubeRotation);
        cubeRotation += deltaTime;

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}

main();