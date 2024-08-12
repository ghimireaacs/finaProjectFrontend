const rootAPI = import.meta.env.VITE_APP_ROOTAPI;

const rosterEP = rootAPI + "/rosters";
const appointmentEP = rootAPI + "/appointments";

export const getAppointment = async () => {
    try {
        const response = await axios.get(appointmentEP);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const postAppointment = async (appointmentDetails) => {
    try {
        const response = await axios.post(appointmentEP, appointmentDetails);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
