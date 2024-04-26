import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import RttIcon from "@mui/icons-material/Rtt";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DrawIcon from "@mui/icons-material/Draw";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const DRAWER_WIDTH = 70;

const MyDrawer = styled(Drawer)({
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    backgroundColor: "#18191B",
    overflowX: "hidden",
    transition: "width 0.2s ease",
  },
});

const ExpandedWindow = styled("div")({
  position: "fixed",
  top: 0,
  left: `${DRAWER_WIDTH}px`,
  width: "200px",
  height: "100%",
  backgroundColor: "#252627",
  zIndex: 1,
  paddingTop: "60px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SearchContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  marginBottom: "16px",
});

const SearchBar = styled("input")({
  flex: 1,
  padding: "12px 8px 12px 32px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#18191B",
  color: "#fff",
});

const SearchIconWrapper = styled(SearchIcon)({
  position: "absolute",
  left: "25px",
  color: "#fff",
});

const ExpandedContent = styled("div")({
  width: "100%",
  overflowY: "auto",
});

const menuItems = [
  { name: "Templates", icon: <AutoAwesomeMosaicIcon />, expanded: false },
  { name: "Elements", icon: <AddReactionIcon />, expanded: false },
  { name: "Text", icon: <RttIcon />, expanded: false },
  { name: "Brands", icon: <RecentActorsIcon />, expanded: false },
  { name: "Uploads", icon: <CloudUploadIcon />, expanded: false },
  { name: "Draw", icon: <DrawIcon />, expanded: false },
  { name: "Projects", icon: <FolderOpenIcon />, expanded: false },
  { name: "Apps", icon: <AppsIcon />, expanded: false },
];

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (index) => {
    setExpandedItem((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleExpandClose = () => {
    setExpandedItem(null);
  };

  const drawerWidth = expandedItem !== null ? DRAWER_WIDTH + 400 : DRAWER_WIDTH;

  return (
    <MyDrawer variant="permanent" open={true} sx={{ width: drawerWidth }}>
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px",
                backgroundColor:
                  expandedItem === index ? "#252627" : "transparent",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => handleItemClick(index)}
            >
              <ListItemIcon
                sx={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  justifyContent: "center",
                  color: expandedItem === index ? "#fff" : "#A3A3A4",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "12px",
                  marginTop: "4px",
                  color: expandedItem === index ? "#fff" : "#A3A3A4",
                }}
              >
                {item.name}
              </Typography>
            </ListItem>
            {expandedItem === index && (
              <ExpandedWindow style={{ padding: "20px", width: "400px" }}>
                <SearchContainer>
                  <SearchIconWrapper />
                  <SearchBar type="text" placeholder="Search..." />
                </SearchContainer>
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "-14px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#fff",
                        backgroundColor: '#18191B',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '30px 0px',
                        borderRadius: '0px 30px 30px 0px',
                    }}
                    onClick={handleExpandClose}
                >
                  <ArrowBackIosIcon style={{ fontSize: '14px', paddingLeft: '3px' }} />
                </Box>
                <ExpandedContent
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography style={{ color: "white" }}>
                    Expanded window content for {item.name}
                  </Typography>
                </ExpandedContent>
              </ExpandedWindow>
            )}
          </React.Fragment>
        ))}
      </List>
    </MyDrawer>
  );
};

export default Sidebar;
