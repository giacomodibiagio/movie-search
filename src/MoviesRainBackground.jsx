import React, { useEffect, useRef } from 'react';

function RainyCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set up canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Set up initial state for the letters
        const letters = "MMMOOOVVVIIIEEESSS".split("").map((letter, index) => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            color: `rgb(${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 256)})`,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 3 + 1,
            text: letter,
        }));

        // Render the letters in an animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the letters
            for (let i = 0; i < letters.length; i++) {
                const letter = letters[i];
                context.fillStyle = letter.color;
                context.font = `${letter.size}px sans-serif`;
                context.textBaseline = "top";
                context.fillText(letter.text, letter.x, letter.y);

                // Leave a trace behind the letters by drawing the same text with a slightly lower opacity
                context.fillStyle = `rgba(${letter.color.slice(4, -1)}, 0.9)`;
                context.fillText(letter.text, letter.x, letter.y);

                // Update the position of the letter for the next frame
                letter.y += letter.speed;
                if (letter.y > canvas.height) {
                    letter.y = 0;
                }
            }
        }

        animate();
    }, []);

    return (
        <canvas ref={canvasRef} />
    );
}

export default RainyCanvas;
