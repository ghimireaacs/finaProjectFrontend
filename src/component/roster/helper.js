// Function to generate appointment slots
export const generateAppointmentSlots = ( startDate, endDate, startTime, endTime) => {
    const slots = [];

    // Parse the start and end dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date(); // Current date and time

    // Parse the start and end times
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Set the time to the startHour for the start date
    start.setUTCHours(startHour, startMinute, 0, 0);
    end.setUTCHours(endHour, endMinute, 0, 0);

    // Helper function to format the date and time
    function formatDateTime(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toISOString().split('T')[0];
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedDate} ${hours}:${minutes} ${ampm}`;
    }

    // Generate slots
    while (start < end) {
        if (start >= now || (start.toDateString() === now.toDateString() && start.getUTCHours() >= now.getUTCHours())) {
            const slotStart = new Date(start);
            start.setUTCMinutes(start.getUTCMinutes() + 60);

            slots.push({
             
                
                slot: formatDateTime(slotStart)
            });
        } else {
            start.setUTCMinutes(start.getUTCMinutes() + 60); // Move to the next slot
        }
    }

    return slots;
}

