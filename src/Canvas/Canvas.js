import React, { useRef, useState, useEffect } from "react";

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [textElements, setTextElements] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [canvasOffsetX, setCanvasOffsetX] = useState(0);
  const [canvasOffsetY, setCanvasOffsetY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);

    textElements.forEach(({ text, x, y }, index) => {
      context.font = "30px Arial";
      context.fillStyle = selectedTextIndex === index ? "#FF0000" : "#000000";
      context.fillText(text, x + canvasOffsetX, y + canvasOffsetY);
    });

    images.forEach(({ src, x, y }) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        context.drawImage(
          image,
          x + canvasOffsetX,
          y + canvasOffsetY,
          150,
          150
        );
      };
    });
  }, [
    textElements,
    images,
    canvasOffsetX,
    canvasOffsetY,
    selectedTextIndex,
    width,
    height,
  ]);

  const clearSelection = () => {
    setSelectedTextIndex(null);
    removeExistingInput();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    if (data === "textbox") {
      const { offsetX, offsetY } = getCanvasOffset(event);
      addTextBox(offsetX, offsetY);
    } else {
      const { offsetX, offsetY } = getCanvasOffset(event);
      addImage(data, offsetX, offsetY);
    }
  };

  const addImage = (src, x, y) => {
    setImages([...images, { src, x, y }]);
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

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        submitText(input.value, x, y);
        document.body.removeChild(input);
      }
    });

    document.body.appendChild(input);
    input.focus();
  };

  const handleMouseDown = (event) => {
    const offsetX =
      event.clientX - canvasRef.current.getBoundingClientRect().left;
    const offsetY =
      event.clientY - canvasRef.current.getBoundingClientRect().top;

    let found = false;
    textElements.some((textElement, index) => {
      const { x, y, text } = textElement;
      const textWidth = canvasRef.current
        .getContext("2d")
        .measureText(text).width;
      const textHeight = 30;

      if (
        offsetX >= x + canvasOffsetX &&
        offsetX <= x + canvasOffsetX + textWidth &&
        offsetY >= y + canvasOffsetY - textHeight &&
        offsetY <= y + canvasOffsetY
      ) {
        selectText(index);
        found = true;
        return true;
      }
      return false;
    });

    if (!found) {
      setIsDragging(true);
      setDragStartX(event.clientX);
      setDragStartY(event.clientY);
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const offsetX = event.clientX - dragStartX;
      const offsetY = event.clientY - dragStartY;
      setCanvasOffsetX(canvasOffsetX + offsetX);
      setCanvasOffsetY(canvasOffsetY + offsetY);
      setDragStartX(event.clientX);
      setDragStartY(event.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (event) => {
    const offsetX =
      event.clientX - canvasRef.current.getBoundingClientRect().left;
    const offsetY =
      event.clientY - canvasRef.current.getBoundingClientRect().top;

    let found = false;
    textElements.some((textElement, index) => {
      const { text, x, y } = textElement;
      const textWidth = canvasRef.current
        .getContext("2d")
        .measureText(text).width;
      const textHeight = 30;

      if (
        offsetX >= x + canvasOffsetX &&
        offsetX <= x + canvasOffsetX + textWidth &&
        offsetY >= y + canvasOffsetY - textHeight &&
        offsetY <= y + canvasOffsetY
      ) {
        selectText(index);
        found = true;
        return true;
      }
      return false;
    });

    if (!found) {
      clearSelection();
    }
  };

  const selectText = (index) => {
    setSelectedTextIndex(index);
    handleTextClick(index);
  };

  const handleTextClick = (index) => {
    setSelectedTextIndex(index);
    const selectedText = textElements[index];

    removeExistingInput();

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const input = document.createElement("input");
    input.type = "text";
    input.id = "text-input";
    input.style.position = "absolute";
    input.style.left = `${canvasRect.left + selectedText.x + canvasOffsetX}px`;
    input.style.top = `${canvasRect.top + selectedText.y + canvasOffsetY}px`;
    input.style.border = "2px solid #000000";
    input.style.padding = "5px";
    input.style.outline = "none";
    input.style.fontFamily = "Arial";
    input.style.fontSize = "30px";
    input.style.color = "#000000";
    input.style.background = "#FFFFFF";
    input.style.zIndex = "100";
    input.value = selectedText.text;
    input.addEventListener("keydown", (event) =>
      handleInputKeyDown(event, index)
    );
    document.body.appendChild(input);
    input.focus();
  };

  const handleInputKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitEditedText(index, event.target.value);
    }
  };

  const submitEditedText = (index, newText) => {
    if (selectedTextIndex !== null) {
      setTextElements((prevTextElements) =>
        prevTextElements.map((item, idx) =>
          idx === index ? { ...item, text: newText } : item
        )
      );
      clearSelection();
    }
  };

  const removeExistingInput = () => {
    const existingInput = document.getElementById("text-input");
    if (existingInput) {
      existingInput.removeEventListener("keydown", handleInputKeyDown);
      document.body.removeChild(existingInput);
    }
  };

  const submitText = (text, x, y) => {
    setTextElements([...textElements, { text, x, y }]);
    removeExistingInput();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleCanvasClick}
      style={{ border: "2px solid black" }}
    />
  );
};

export default Canvas;