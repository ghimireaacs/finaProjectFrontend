import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Avatar, Box } from '@mui/material';
import MainLayout from '../../component/main/MainLayout';

const patients = [
  { id: 1, name: 'Bibek Lama', condition: 'Flu', address: '101 Main St.', age: '25 years', biography: '...', contact: '123-456-7890', image: '/images/john_doe.jpg' },
  { id: 2, name: 'Suyog Thapa', condition: 'Pneumonia', address: '456 Elm St.', age: '34 years', biography: '...', contact: '987-654-3210', image: '/images/jane_smith.jpg' },
  { id: 3, name: 'Umesh Gurung', condition: 'Fracture', address: '789 Oak St.', age: '44 years', biography: '...', contact: '555-123-4567', image: '/images/michael_brown.jpg' },
  // Add more patients as needed
];

const PatientProfile = () => {
  const { id } = useParams();
  const patient = patients.find((p) => p.id === parseInt(id));

  if (!patient) {
    return <Typography variant="h6">Patient not found</Typography>;
  }

  return (
    <MainLayout title="Patient Profile">
      <Container>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
          <Box display="flex" alignItems="center" flexDirection="column">
            <Avatar alt={patient.name} src={patient.image} sx={{ width: 150, height: 150 }} />
            <Typography variant="h4">{patient.name}</Typography>
            <Typography variant="h6">{patient.condition}</Typography>
            <Typography variant="body1">{patient.address}</Typography>
            <Typography variant="body1">{patient.age}</Typography>
            <Typography variant="body1">{patient.biography}</Typography>
            <Typography variant="body1">Contact: {patient.contact}</Typography>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default PatientProfile;
