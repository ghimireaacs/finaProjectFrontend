import axios from "axios";
const rootAPI = import.meta.env.VITE_APP_ROOTAPI;

const rosterEP = rootAPI + "/rosters";

export const postRoster = async (rosterDetails) => {
  const data = await axios.post(rosterEP, rosterDetails);

  return data;
};

//get roster
export const getRoster = async () => {
  const data = await axios.get(rosterEP);
  return data;
};

export const getRosterBydeptAndDate = async (department, date) => {
  const response = await axios.get(`${rosterEP}/rosterByDate`, {
    params: {
      department: department,
      date: date,
    },
  });
  return response.data;
};

export const updateRoster = async (changedRoster) => {
  const response = await axios.patch(rosterEP, changedRoster);
  return response.data;
};

export const deleteRoster = async (id) => {
  console.log(id);
  const response = await axios.delete(rosterEP, { data: { id } });
  return response;
};
