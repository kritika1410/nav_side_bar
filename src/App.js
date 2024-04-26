import React from "react";
import { CssBaseline, Box } from "@mui/material";
import Canvas from "./Canvas/Canvas";
import Sidebar from "./components/Sidabar";

const App = () => {
  const draw = (context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "grey";
    context.fillRect(10, 10, 100, 100);
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            border: "5px solid black",
          }}
        >
          <Canvas draw={draw} width={1200} height={800} />
        </Box>
      </Box>
    </div>
  );
};

export default App;
