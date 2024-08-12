import React from "react";
import MainLayout from "../../component/main/MainLayout";
import { Box, Grid, Paper, Typography } from "@mui/material";
import staffs from "../../assets/image/staffs.png";
import rosters from "../../assets/image/rosters.png";

import { useNavigate } from "react-router-dom";
import { data } from "../../component/main/dataSet";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const menu = data.filter((item) =>
    item.access.find(
      (ite) => ite.toLowerCase() === user.department.toLowerCase()
    )
  );

  const hanldeClick = (path) => {
    navigate(path);
  };

  return (
    <MainLayout title="Dashboard">
      <Grid container p={3} spacing={2}>
        {menu.map((item, index) => (
          <Grid
            key={index}
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            xl={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
            onClick={() => hanldeClick(item.link)}
          >
            <Box className="circle">
              <img
                src={item.img}
                alt={item.department}
                width={"90px"}
                style={{ overflow: "hidden" }}
              />
            </Box>
            <Typography
              textAlign={"center"}
              py={1}
              sx={{ color: "var(--dark)" }}
            >
              {item.department}
            </Typography>
          </Grid>
        ))}

        {user.department.toLowerCase() === "admin" && (
          <>
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              xl={2}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              sx={{ cursor: "pointer" }}
              onClick={() => hanldeClick("/staffs")}
            >
              <Box className="circle">
                <img
                  src={staffs}
                  alt={"staffs"}
                  width={"90px"}
                  style={{ overflow: "hidden" }}
                />
              </Box>
              <Typography
                textAlign={"center"}
                py={1}
                sx={{ color: "var(--dark)" }}
              >
                Staffs
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              xl={2}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              sx={{ cursor: "pointer" }}
              onClick={() => hanldeClick("/rosters")}
            >
              <Box className="circle">
                <img
                  src={rosters}
                  alt={"rosters"}
                  width={"90px"}
                  style={{ overflow: "hidden" }}
                />
              </Box>
              <Typography
                textAlign={"center"}
                py={1}
                sx={{ color: "var(--dark)" }}
              >
                Roster
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </MainLayout>
  );
};

export default Dashboard;
