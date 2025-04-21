import React from "react";
import { Container, Paper, Box, Divider, Typography, Grid } from "@mui/material";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BasicInfoSection from './BasicInfoSection';
import ScheduleSection from './ScheduleSection';
import StructureSection from './StructureSection';
import SettingsSection from './SettingsSection';
import ContactsSection from './ContactsSection';
import RulesSection from './RulesSection';
import FormActions from './FormActions';

const LeagueForm = ({ 
  form, 
  errors, 
  handleChange, 
  handleDateChange, 
  handleFileChange, 
  handleSubmit, 
  logoPreview,
  additionalContacts,
  newContact,
  handleAddContact,
  handleRemoveContact,
  setNewContact,
  isEditMode = false 
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Paper elevation={3} sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4,
            background: 'linear-gradient(to right, #3f51b5, #2196f3)',
            color: 'white',
            p: 2,
            borderRadius: 2
          }}>
            <SportsSoccerIcon sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              {isEditMode ? 'Edit League' : 'Create New League'}
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <BasicInfoSection 
                form={form} 
                errors={errors} 
                handleChange={handleChange} 
                logoPreview={logoPreview}
                handleFileChange={handleFileChange}
              />
              
              <ScheduleSection 
                form={form} 
                errors={errors} 
                handleDateChange={handleDateChange} 
              />
              
              <StructureSection 
                form={form} 
                errors={errors} 
                handleChange={handleChange} 
              />
              
              <SettingsSection 
                form={form} 
                handleChange={handleChange} 
              />
              
              <ContactsSection 
                form={form} 
                errors={errors} 
                handleChange={handleChange} 
                additionalContacts={additionalContacts}
                newContact={newContact}
                handleAddContact={handleAddContact}
                handleRemoveContact={handleRemoveContact}
                setNewContact={setNewContact}
              />
              
              <RulesSection 
                handleFileChange={handleFileChange} 
              />
              
              <FormActions isEditMode={isEditMode} />
            </Grid>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default LeagueForm;