import { Box, Typography } from "@mui/material";
import React from "react";
const formType = [
  {
    name: "Personal",
  },
  {
    name: "Home",
  },
  {
    name: "Emergency",
  },
  {
    name: "Confirm",
  },
];

const ProgressBar = ({ activeForm, setActiveForm }) => {
  const handleBreadCrumb = (i) => {
    setActiveForm(i);
  };
  return (
  
    <Box
      py={2}
      sx={{
        display: "flex",
       
        width: "100%",
       
        
      }}
    >
      {formType.map((item, i) => {
        return (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
        
              width: i!==(formType.length-1) ? "100%" : "40px"
            }}
          >
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                bgcolor: i <= activeForm ? "blue" : "grey",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleBreadCrumb(i)}
            >
              <Typography
                fontWeight={"bold"}
                sx={{ color: 'white' }}
              >
                {i + 1}
              </Typography>
              <Typography position={"absolute"} top={"50px"}>
                {item.name}
              </Typography>
            </Box>
            {i !== formType.length - 1 && (
              <Box
                sx={{
                  height: "5px",
                  bgcolor: i < activeForm ? "blue" : "grey",
                  width: "calc(100% - 40px)",
                }}
              ></Box>
            )}
          </Box>
        );
      })}
    </Box>
  
  );
};

export default ProgressBar;
