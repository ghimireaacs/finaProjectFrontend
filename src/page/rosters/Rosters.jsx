import React, { useEffect, useState } from "react";
import MainLayout from "../../component/main/MainLayout";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import "./roster.css";
import { compareDate, generateWeek } from "../../component/roster/date";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getAllStaff, getDepartmentList } from "../../utils/axiosHelper";
import { getRoster, updateRoster } from "../../utils/rosterAxios";
import Overlapped from "../../component/roster/Overlapped";
import EachRow from "../../component/roster/EachRow";

const departments = [
  { name: "Receptionist" },
  { name: "Doctor" },
  { name: "Nurse" },
];

const Rosters = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [staffList, setStaffList] = useState([]);
  const [department, setdepartment] = useState([]);
  const [shiftData, setshiftData] = useState([]);
  const [isOverLapped, setIsOverLapped] = useState(false)

  ///get staff list
  const getStaffList = async () => {
    const response = await getAllStaff();
    if (response.status === "success") {
      // console.log(response.employeeList);
      setStaffList(response.employeeList);
    } else {
      console.log("error fetching staffs");
    }
  };

  //get department list
  const getDepartment = async () => {
    const response = await getDepartmentList();
    const { department } = response;
    // console.log(department);

    setdepartment(department);
  };

  //get roster data
  const getRosterData = async () => {
    const response = await getRoster();
    const { result } = response.data;

    setshiftData(result);
  };

  //use Efffect to execute functions
  useEffect(() => {
    getStaffList();
    getDepartment();
    getRosterData();
  }, []);

  //handle change to chnage form data

  const handleChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setSelectedDate(selectedDate);
  };

  //generate week
  const week = generateWeek(selectedDate);

  //get current day
  const currentDay = new Date();

  //ondragend function
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const droppableDate = destination.droppableId.slice(24);
    const depId = destination.droppableId.slice(0, 24);
    const dragId = result.draggableId;
    const objtoUpdate = shiftData.find((item) => item._id === dragId);

    const depName = department.find((item) => item._id === depId).name;
    if (depName === objtoUpdate.department) {
      const currentDate = new Date(droppableDate);
      let tomorrow = currentDate;
      if (!compareDate(objtoUpdate.startDate, objtoUpdate.endDate)) {
        tomorrow.setDate(currentDate.getDate() + 1);
      }
      const filteredRosterData = shiftData?.filter((roster) => {
        return (
          (compareDate(roster?.startDate, currentDate) ||
            compareDate(roster?.endDate, currentDate) ||
            compareDate(roster?.startDate, tomorrow) ||
            compareDate(roster?.startDate, tomorrow)) &&
          roster?.staffName !== "empty" &&
          roster?.staffName === objtoUpdate.staffName &&
          roster?._id !== objtoUpdate?._id
        );
      });

      const shiftDate = new Date(currentDate).toISOString().split("T")[0];
      const shiftEndDate = new Date(tomorrow).toISOString().split("T")[0];
      let canAddShift = true;
      const newShiftStart = new Date(`${shiftDate}T${objtoUpdate.startTime}`);

      const newShiftEnd = new Date(`${shiftEndDate}T${objtoUpdate.endTime}`);

      filteredRosterData?.forEach((roster) => {
        const existingShiftStart = new Date(
          `${new Date(roster.startDate).toISOString().split("T")[0]}T${
            roster.startTime
          }`
        );
        const existingShiftEnd = new Date(
          `${new Date(roster.endDate).toISOString().split("T")[0]}T${
            roster.endTime
          }`
        );

        if (compareDate(roster.startDate, currentDate)) {
          if (
            (newShiftStart >= existingShiftStart &&
              newShiftStart < existingShiftEnd) || // Case 1: New shift starts during existing shift
            (newShiftEnd > existingShiftStart &&
              newShiftEnd <= existingShiftEnd) || // Case 2: New shift ends during existing shift
            (newShiftStart <= existingShiftStart &&
              newShiftEnd >= existingShiftEnd) // Case 3: New shift fully overlaps existing shift
          ) {
            canAddShift = false;
          }
        } else {
          if (newShiftStart < existingShiftEnd) {
            canAddShift = false;
          }
        }
      });
      if (!canAddShift) {
        setIsOverLapped(true);
        console.log("overlapped detected");

        return;
      }
      objtoUpdate.startDate = currentDate;
      objtoUpdate.endDate = tomorrow;
      const response = await updateRoster({
        id: objtoUpdate._id,
        ...objtoUpdate,
      });

      getRosterData();
    }
  };

  //////////////////////////////////////////////////
  return (
    <MainLayout>
       {
        isOverLapped && <Overlapped/>
      }
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
          <Box>
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
      <Box className="main" display={"flex"}>
        <Box className="staff" p={0} m={0}>
          <TextField placeholder="Search" />
        </Box>
        <Box sx={{ width: "100%" }}>
          <TableContainer sx={{ width: "100%" }} className="table-box">
            <Table>
              <TableHead>
                <TableRow>
                  {week.map((day, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        textAlign: "center",
                        color: compareDate(currentDay, day.date)
                          ? "blue"
                          : "black",
                      }}
                      // className={`text-center ${
                      //   compareDate(currentDay, day.date)
                      //     ? "text-primary"
                      //     : "text-dark"
                      // }`}
                    >
                      {day.day}
                      <br />
                      <span className="text-muted" style={{ fontSize: "10px" }}>
                        {day.date.toISOString().split("T")[0]}{" "}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <DragDropContext onDragEnd={onDragEnd}>
                <TableBody>
                  {department.map((dept, deptIndex) => (
                    <TableRow key={deptIndex} className="tableData">
                       {week.map((day, dayIndex) => (
                      <EachRow
                        key={dayIndex}
                        dept={dept}
                        day={day}
                        dayIndex={dayIndex}
                        staffList={staffList}
                        getRosterData={getRosterData}
                        shiftData={shiftData}
                      />
                    ))}
                    </TableRow>
                  ))}
                </TableBody>
              </DragDropContext>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Rosters;
