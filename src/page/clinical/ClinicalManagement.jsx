import React, { useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography } from '@mui/material';
import MainLayout from '../../component/main/MainLayout';

const ClinicalManagement = () => {
  const [patientInfo, setPatientInfo] = useState({
    bloodGroup: '',
    allergies: '',
    medicalHistory: '',
    medication: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(patientInfo);
  };

  return (
    <MainLayout title="Clinical Management">
      <Container>
        
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
          <TextField
            select
            label="Blood Group"
            name="bloodGroup"
            value={patientInfo.bloodGroup}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {bloodGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Known Allergies"
            name="allergies"
            value={patientInfo.allergies}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Past Medical History"
            name="medicalHistory"
            value={patientInfo.medicalHistory}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Current Medication"
            name="medication"
            value={patientInfo.medication}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
           <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, paddingX: 5 }}
              style={{ background: "var(--primary)" }}
              type="submit"
              fullWidth
            >
              Add Record
            </Button>
          
        </form>
      </Container>
    </MainLayout>
  );
};

export default ClinicalManagement;
