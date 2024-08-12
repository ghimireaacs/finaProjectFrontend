import { Box, Stack } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

import { data } from "./dataSet";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Sidebar = ({ title }) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <Box
      width={"5vw"}
      height={"94vh"}
      bgcolor={"var(--sidebar)"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={4}
      position={"sticky"}
      top={"0"}
    >
      <Box
        width={"100%"}
        bgcolor={title === "DashBoard" ? "var(--dark)" : "inherit"}
        display={"flex"}
        justifyContent={"center"}
        py={1}
        sx={{ cursor: "pointer" }}
        onClick={() => handleClick("/")}
        className="menu"
      >
        <HomeIcon sx={{ color: "var(--activeMenu)", fontSize: "30px" }} />
        <Box className="menu-name">Dashboard</Box>
      </Box>

      {data.map((icon) => {
        return (
          <Box
            key={icon.department}
            bgcolor={title === icon.department ? "var(--dark)" : "inherit"}
            className="menu"
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            py={1}
            sx={{ cursor: "pointer" }}
            onClick={() => handleClick(icon.link)}
          >
            <icon.icon
              style={{
                color:
                  title === icon.department
                    ? "var(--activeMenu)"
                    : "var(--inactiveMenu)",
                fontSize: "30px",
              }}
            />
            <Box className="menu-name">{icon.department}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Sidebar;
