import React from "react";

import { Box, Typography } from "@mui/material";

import { Login } from "@mui/icons-material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MainLayout = ({ title, children }) => {
  return (
    <Box bgcolor={"var(--bgColor)"}>
      <Header />
      <Box minHeight={"94vh"} display={"flex"}>
        <Sidebar title={title} />
        <Box width={"95vw"}>
          {title && (
            <Box
              height={"46px"}
              bgcolor={"var(--secondary)"}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
            >
              <Typography
                paddingLeft={1}
                sx={{ fontWeight: "bold", color: "var(--dark)", textTransform:"capitalize", display:"flex" }}
              >
                {title}
              </Typography>
            </Box>
          )}
          <Box minHeight={"calc(94vh - 92px)"} sx={{ margin: "0 8px" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
