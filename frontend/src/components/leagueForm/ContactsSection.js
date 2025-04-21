import React from "react";
import { 
  Grid, Typography, TextField, Button, 
  Box, Chip, IconButton 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ContactsSection = ({ 
  form, 
  errors, 
  handleChange, 
  additionalContacts,
  newContact,
  handleAddContact,
  handleRemoveContact,
  setNewContact
}) => {
  return (
    <>
      <Grid item xs={12} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{
          color: 'primary.main',
          fontWeight: 600
        }}>
          Contact Information
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Primary Contact Name "
          name="contactName"
          type="name"
          fullWidth
          required
          value={form.contactName}
          onChange={handleChange}
          variant="outlined"
          size="small"
          error={!!errors.contactName}
          helperText={errors.contactName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Primary Contact Email "
          name="contactEmail"
          type="email"
          fullWidth
          required
          value={form.contactEmail}
          onChange={handleChange}
          variant="outlined"
          size="small"
          error={!!errors.contactEmail}
          helperText={errors.contactEmail}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Primary Contact Phone"
          name="contactPhone"
          type="tel"
          fullWidth
          value={form.contactPhone}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
          Additional Contacts
        </Typography>
        {additionalContacts.map((contact, index) => (
          <Box key={index} sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 1,
            p: 1,
            backgroundColor: 'rgba(0,0,0,0.03)',
            borderRadius: 1
          }}>
            <Chip label={contact.role || "No role"} size="small" />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {contact.name} ({contact.email})
            </Typography>
            <IconButton size="small" onClick={() => handleRemoveContact(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            size="small"
          />
          <TextField
            label="Email"
            type="email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            size="small"
          />
          <TextField
            label="Role"
            value={newContact.role}
            onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
            size="small"
            placeholder="e.g., Referee Coordinator"
          />
          <Button
            variant="outlined"
            onClick={handleAddContact}
            disabled={!newContact.name || !newContact.email}
          >
            Add
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default ContactsSection;