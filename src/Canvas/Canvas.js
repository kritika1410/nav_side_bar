import React, { useRef, useState, useEffect } from "react";

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [textElements, setTextElements] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    if (data === "text") {
    } else if (data === "textbox") {
      const { offsetX, offsetY } = getCanvasOffset(event);
      addTextBox(offsetX, offsetY);
    } else {
      const { offsetX, offsetY } = getCanvasOffset(event);
      drawImage(data, offsetX, offsetY);
    }
  };

  const drawImage = (src, x, y) => {
    const context = canvasRef.current.getContext("2d");
    const image = new Image();
    image.src = src;
    image.onload = () => {
      context.drawImage(image, x, y, 150, 150);
    };
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

  const addTextBox = (x, y) => {
    const input = document.createElement("input");
    input.type = "text";
    input.style.position = "absolute";
    input.style.left = `${x + 600}px`;
    input.style.top = `${y + 50}px`;
    input.style.border = "2px solid #000000";
    input.style.padding = "5px";
    input.style.outline = "none";
    input.style.fontFamily = "Arial";
    input.style.fontSize = "30px";
    input.style.color = "#000000";
    input.style.background = "#FFFFFF";
    input.style.zIndex = "100";
    input.placeholder = "Type something...";
    input.addEventListener("input", handleInputChange);

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        submitText(input.value, x, y);
        document.body.removeChild(input);
      }
    });

    document.body.appendChild(input);
    input.focus();
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, width, height);

    textElements.forEach(({ text, x, y }) => {
      context.font = "30px Arial";
      context.fillStyle = "#000000";
      context.fillText(text, x, y);
    });
  }, [text, width, height, textElements]);

  const submitText = (text, x, y) => {
    setTextElements([...textElements, { text, x, y }]);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ border: "2px solid black" }}
    />
  );
};

export default Canvas;
