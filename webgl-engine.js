import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { vsSource, fsSource, initShaderProgram } from "./shaders.js";

function main()
{
    // Get gl context
    const canvas = document.querySelector('#glcanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const gl = canvas.getContext('webgl');

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
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor")
        },
        uniformLocations:
        {
            projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix")
        }
    };
  
    // Build all the objects we'll be drawing.
    const buffers = initBuffers(gl);

    // Draw the scene
    drawScene(gl, programInfo, buffers);
}

main();