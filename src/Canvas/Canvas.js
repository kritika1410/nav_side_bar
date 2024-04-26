import React, { useRef } from "react";

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const { offsetX, offsetY } = getCanvasOffset(event);
    drawImage(data, offsetX, offsetY);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getCanvasOffset = (event) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const offsetX = event.clientX - canvasRect.left;
    const offsetY = event.clientY - canvasRect.top;
    return { offsetX, offsetY };
  };

  const drawImage = (src, x, y) => {
    const context = canvasRef.current.getContext("2d");
    const image = new Image();
    image.src = src;
    image.onload = () => {
      context.drawImage(image, x, y, 150, 150);
    };
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    />
  );
};

export default Canvas;
