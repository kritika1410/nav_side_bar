import React from "react";
import { CssBaseline, Box } from "@mui/material";
import Canvas from "./Canvas/Canvas";
import Sidebar from "./components/Sidabar";

const App = () => {
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
          }}
        >
          <Canvas width={1200} height={800} />
        </Box>
      </Box>
    </div>
  );
};

export default App;
