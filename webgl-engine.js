
main();

function main()
{
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');

    if (gl === null)
    {
        alert('Unable to initialize WebGL.');
        return;
    }

    // Set window clear colour to opaque black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the colour buffer with the specified clear colour
    gl.clear(gl.COLOR_BUFFER_BIT);

}
