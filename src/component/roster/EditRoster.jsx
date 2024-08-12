import { useEffect, useState } from "react";
import { IoIosTime } from "react-icons/io";
import { GiHotMeal } from "react-icons/gi";
import { FaCalendar } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { FaDotCircle } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { compareDate, generateTimeOptions } from "./date";

import { toast } from "react-toastify";
import { Draggable } from "react-beautiful-dnd";
import { deleteRoster, updateRoster } from "../../utils/rosterAxios";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditRoster({ item, itemIndex, staffs, rosterData, getRosterData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showEndDate, setshowEndDate] = useState("");
  const staffToSHow = staffs.filter(
    (staff) => staff.department === item.department
  );
  const date = new Date(item.startDate).toDateString().slice(0, 10);
  const [shiftData, setShiftData] = useState({ ...item });
  const timeOptions = generateTimeOptions();

  const [timeEntered, settimeEntered] = useState(true);
  const [overLapped, setOverLapped] = useState(false);

  useEffect(() => {
    if (!compareDate(item.startDate, item.endDate)) {
      setshowEndDate(new Date(item.endDate).toDateString().slice(0, 10));
    }
  }, []);
 

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setOverLapped(false);

    if (name === "startTime" || name === "endTime") {
      updateShiftTime(name, value);
    } else {
      setShiftData({ ...shiftData, [name]: value });
    }
  };

  const updateShiftTime = (name, value) => {
    let { startTime, endTime } = shiftData;
    setshowEndDate("");
    const currentDate = new Date(item.startDate);
    let startDate = new Date(item.startDate);
    let endDate = new Date(item.startDate);

    if (name === "startTime") {
      startTime = value;
    } else {
      endTime = value;
    }
    const [hours1, minutes1] = startTime.split(":").map(Number);
    const [hours2, minutes2] = endTime.split(":").map(Number);

    if (name === "startTime") {
      startDate.setHours(hours1);
      startDate.setMinutes(minutes1);
    } else {
      endDate.setHours(hours2);
      endDate.setMinutes(minutes2);
    }

    if (hours2 < hours1 || (hours1 === hours2 && minutes2 < minutes1)) {
      endDate.setDate(currentDate.getDate() + 1);
      const tommorrow = currentDate;
      tommorrow.setDate(currentDate.getDate() + 1);
      setshowEndDate(tommorrow.toString().slice(0, 10));
    }

    setShiftData({
      ...shiftData,
      [name]: value,
      startDate,
      endDate,
    });
  };

  const handleSubmit = async () => {
    const shiftDate = new Date(shiftData.startDate).toISOString().split("T")[0];
    console.log(shiftDate);
    const shiftEndDate = new Date(shiftData.endDate)
      .toISOString()
      .split("T")[0];

    const filteredRosterData = rosterData?.filter((roster) => {
      return (
        (compareDate(roster?.startDate, shiftData.startDate) ||
          compareDate(roster?.endDate, shiftData.startDate) ||
          compareDate(roster?.startDate, shiftData.endDate) ||
          compareDate(roster?.startDate, shiftData.endDate)) &&
        roster?.staffName !== "empty" &&
        roster?.staffName === shiftData.staffName &&
        roster?._id !== item?._id
      );
    });
    // console.log(filteredRosterData);
    let canAddShift = true;
    const newShiftStart = new Date(`${shiftDate}T${shiftData.startTime}`);

    const newShiftEnd = new Date(`${shiftEndDate}T${shiftData.endTime}`);

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

      if (compareDate(roster.startDate, item.startDate)) {
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
      setOverLapped(true);
      return;
    }

    const response = await updateRoster({ id: item._id, ...shiftData });
    console.log(response);

    toast.success(`Shift updated for ${shiftData.staffName}`);
    getRosterData();
    setShow(false);
  };

  const handleDelete = async () => {
    const response = await deleteRoster(item._id);

    toast.success("shift is deleted");
    getRosterData();
    setShow(false);
  };
  return (
    <>
      <Draggable draggableId={item._id} index={itemIndex}>
        {(provided) => (
          <Box
          sx={{marginBottom:"8px"}}
          
            className="roster mb-1"
            role="button"
            onClick={handleOpen}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={{
              ...provided.draggableProps.style,
              background:
                item.staffName !== "empty" ? "rgb(84, 223, 84)" : "white",
            }}
          >
            {" "}
            <Typography sx={{fontWeight:"bold"}} >
              {item.startTime} - {item.endTime}
            </Typography>
            <Typography sx={{textTransform:"capitalize"}}>{item.staffName}</Typography>
          </Box>
        )}
      </Draggable>

      <Modal open={open} onClose={handleClose} >
        <Box sx={style}>
        <Box >
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            name="staffName"
            value={shiftData.staffName}
            onChange={handleSelectChange}
            required
          >
            <MenuItem value={"empty"}>
              Empty Shift ( assigned it to somene later)
            </MenuItem>
            {staffToSHow?.map((staff, i) => (
              <MenuItem value={staff.fName} key={i}>
                {staff.fName}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          {staffToSHow?.length > 0 ? null : (
            <Typography sx={{ color: "orange" }}>
              No staff has been assigned to this department yet
            </Typography>
          )}
          {overLapped && (
            <Typography sx={{ color: "red" }}>
              This team member has an overlapping shift <CgDanger />
            </Typography>
          )}
          <Typography sx={{ display: "flex", gap: 3 }}>
            <FaCalendar /> {date}
            {showEndDate && <>-{showEndDate}</>}
          </Typography>
          <Typography sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <IoIosTime />
            <Select
              labelId="demo-simple-select-label"
              style={{ width: "fit-content" }}
              name="startTime"
              value={shiftData.startTime}
              onChange={handleSelectChange}
            >
              {timeOptions.map((time, i) => (
                <MenuItem key={i} value={time.timeValue}>
                  {time.displayText}
                </MenuItem>
              ))}
            </Select>
            -
            <Select
              style={{ width: "fit-content" }}
              name="endTime"
              value={shiftData.endTime}
              onChange={handleSelectChange}
            >
              {timeOptions.map((time, i) => (
                <MenuItem key={i} value={time.timeValue}>
                  {time.displayText}
                </MenuItem>
              ))}
            </Select>
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <FaDotCircle /> {item.department}
          </Typography>
          <Typography sx={{ display: "flex", gap: 3 }}>
            {" "}
            <GiHotMeal /> Half hr meal break(unpaid)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ p: 0, m: 0 }}>Total</Typography>
            <Typography sx={{ fontWeight: "bold" }}>7h 30min</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button variant="contained" onClick={handleDelete}>
              <RiDeleteBin6Fill />
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>

        </Box>
       
      </Modal>
    </>
  );
}

export default EditRoster;
