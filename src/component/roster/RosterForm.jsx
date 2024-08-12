import { useEffect, useState } from "react";
import { FaPlus, FaCalendar, FaDotCircle } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { GiHotMeal } from "react-icons/gi";
import { CgDanger } from "react-icons/cg";
import { toast } from "react-toastify";
import { compareDate, generateTimeOptions } from "./date";
import { postRoster } from "../../utils/rosterAxios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";

const initialState = {
  staffName: "empty",
  startDate: "",
  endDate: "",
  startTime: "09:00",
  endTime: "17:00",
  department: "",
};

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

function RosterForm({ day, deptName, staffs, getRosterData, rosterData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [timeEntered, setTimeEntered] = useState(true);
  const [showEndDate, setShowEndDate] = useState("");
  const [overLapped, setOverLapped] = useState(false);
  const [shiftData, setShiftData] = useState(initialState);

  const staffToShow = staffs.filter((staff) => staff.department === deptName);
  const date = day.date.toString().slice(0, 10);

  useEffect(() => {
    const startDate = new Date(day.date);
    startDate.setHours(9);
    startDate.setMinutes(0);

    const endDate = new Date(day.date);
    endDate.setHours(17);
    endDate.setMinutes(0);

    setShiftData({
      ...shiftData,
      department: deptName,
      startDate,
      endDate,
    });
  }, [day.date, deptName]); // Add dependencies to re-run effect if needed

  const timeOptions = generateTimeOptions();

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
    const currentDate = new Date(day.date);
    let startDate = new Date(day.date);
    let endDate = new Date(day.date);

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
      const tomorrow = currentDate;
      tomorrow.setDate(currentDate.getDate() + 1);
      setShowEndDate(tomorrow.toString().slice(0, 10));
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
    const shiftEndDate = new Date(shiftData.endDate)
      .toISOString()
      .split("T")[0];

    const filteredRosterData = rosterData?.filter((item) => {
      return (
        (compareDate(item?.startDate, shiftData.startDate) ||
          compareDate(item?.endDate, shiftData.startDate) ||
          compareDate(item?.startDate, shiftData.endDate) ||
          compareDate(item?.endDate, shiftData.endDate)) &&
        item?.staffName !== "empty" &&
        item?.staffName === shiftData.staffName
      );
    });

    let canAddShift = true;
    const newShiftStart = new Date(`${shiftDate}T${shiftData.startTime}`);
    const newShiftEnd = new Date(`${shiftEndDate}T${shiftData.endTime}`);

    filteredRosterData?.forEach((item) => {
      const existingShiftStart = new Date(
        `${new Date(item.startDate).toISOString().split("T")[0]}T${item.startTime}`
      );
      const existingShiftEnd = new Date(
        `${new Date(item.endDate).toISOString().split("T")[0]}T${item.endTime}`
      );

      if (
        (newShiftStart >= existingShiftStart && newShiftStart < existingShiftEnd) || // Case 1: New shift starts during existing shift
        (newShiftEnd > existingShiftStart && newShiftEnd <= existingShiftEnd) || // Case 2: New shift ends during existing shift
        (newShiftStart <= existingShiftStart && newShiftEnd >= existingShiftEnd) // Case 3: New shift fully overlaps existing shift
      ) {
        canAddShift = false;
      }
    });

    if (!canAddShift) {
      setOverLapped(true);
      return;
    }

    const response = await postRoster(shiftData);
    toast.success(`Shift added to ${shiftData.staffName}`);
    getRosterData();
    handleClose();
  };

  return (
    <>
    
      <FaPlus role="button" onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Select
            name="staffName"
            onChange={handleSelectChange}
            required
            fullWidth
          >
            <MenuItem value={"empty"}>Empty Shift</MenuItem>
            {staffToShow?.map((staff, i) => (
              <MenuItem value={staff.fName} key={i}>
                {staff.fName}
              </MenuItem>
            ))}
          </Select>
          {staffToShow.length === 0 && (
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
              aria-label="Default select example"
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
          {!timeEntered && (
            <Typography sx={{ color: "red" }}>
              Start time and end time cannot be the same!
            </Typography>
          )}
          <Typography sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <FaDotCircle /> {deptName}
          </Typography>
          <Typography sx={{ display: "flex", gap: 3 }}>
            <GiHotMeal /> Half hr meal break (unpaid)
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ p: 0, m: 0 }}>Total</Typography>
              <Typography sx={{ fontWeight: "bold" }}>7h 30min</Typography>
            </Box>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default RosterForm;
