import React from 'react';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import Sidebar from './components/Sidabar';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh' }}>
        <Toolbar />
      </Box>
    </div>
  );
}

export default App;
