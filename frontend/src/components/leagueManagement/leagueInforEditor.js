import React, { useState, useEffect } from "react";
import {
  TextField, Button, Box, Paper, Typography,
  Tabs, Tab, Container, Divider, Grid
} from "@mui/material";
import BasicInfoSection from '../leagueForm/BasicInfoSection';
import ScheduleSection from '../leagueForm/ScheduleSection';
import StructureSection from '../leagueForm/StructureSection';
import SettingsSection from '../leagueForm/SettingsSection';
import ContactsSection from '../leagueForm/ContactsSection';
import RulesSection from '../leagueForm/RulesSection';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const LeagueInfoEditor = ({ tournament, setTournament }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    name: tournament?.name || "",
    shortName: tournament?.shortName || "",
    hostSchool: tournament?.hostSchool || "",
    season: tournament?.season || "",
    logoUrl: tournament?.logoUrl || "",
    signupStart: tournament?.signupStart ? dayjs(tournament.signupStart) : null,
    signupEnd: tournament?.signupEnd ? dayjs(tournament.signupEnd) : null,
    leagueStart: tournament?.leagueStart ? dayjs(tournament.leagueStart) : null,
    leagueEnd: tournament?.leagueEnd ? dayjs(tournament.leagueEnd) : null,
    maxTeams: tournament?.maxTeams || 8,
    minTeams: tournament?.minTeams || 4,
    maxPlayersPerTeam: tournament?.maxPlayersPerTeam || 18,
    minPlayersPerTeam: tournament?.minPlayersPerTeam || 5,
    matchFormat: tournament?.matchFormat || "",
    gameDuration: tournament?.gameDuration || 60,
    location: tournament?.location || "",
    isPublic: tournament?.isPublic || true,
    requiresApproval: tournament?.requiresApproval || false,
    ruleAttachmentUrl: tournament?.ruleAttachmentUrl || "",
    contactName: tournament?.contacts?.find(c => c.isPrimary)?.name || "",
    contactEmail: tournament?.contacts?.find(c => c.isPrimary)?.email || "",
    contactPhone: tournament?.contacts?.find(c => c.isPrimary)?.phone || "",
    description: tournament?.description || "",
    ageGroup: tournament?.ageGroup || "",
    gender: tournament?.gender || "",
    equipmentRequired: tournament?.equipmentRequired || [],
    awards: tournament?.awards || [],
    cancellationPolicy: tournament?.cancellationPolicy || ""
  });

  const [logoPreview, setLogoPreview] = useState(tournament?.logoUrl || null);
  const [errors, setErrors] = useState({});
  const [additionalContacts, setAdditionalContacts] = useState(
    tournament?.contacts?.filter(c => !c.isPrimary) || []
  );
  const [newContact, setNewContact] = useState({ name: "", email: "", role: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    if (name === 'logo') {
      setLogoPreview(URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, logo: file }));

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:8080/api/upload-logo", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Upload failed: ${res.status} ${res.statusText} - ${errorText}`);
        }

        const data = await res.json();
        const uploadedUrl = data?.url || "";

        setForm((prev) => ({
          ...prev,
          logoUrl: uploadedUrl,
        }));

        console.log("Uploaded Logo URL:", uploadedUrl);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Fail to Upload Logo");
      }
    } else if (name === 'ruleAttachment') {
      setForm((prev) => ({ ...prev, ruleAttachment: file }));

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:8080/api/upload-rules", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Upload failed: ${res.status} ${res.statusText} - ${errorText}`);
        }

        const data = await res.json();
        const uploadedUrl = data?.url || "";

        setForm((prev) => ({
          ...prev,
          ruleAttachmentUrl: uploadedUrl,
        }));

        console.log("Uploaded Rules URL:", uploadedUrl);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Fail to Upload Rule Document");
      }
    }
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      setAdditionalContacts([...additionalContacts, newContact]);
      setNewContact({ name: "", email: "", role: "" });
    }
  };

  const handleRemoveContact = (index) => {
    setAdditionalContacts(additionalContacts.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "League name is required";
    if (!form.hostSchool) newErrors.hostSchool = "Host school is required";
    if (!form.contactEmail) newErrors.contactEmail = "Contact email is required";
    if (form.signupStart && form.signupEnd && form.signupStart > form.signupEnd) {
      newErrors.signUpEnd = "Signup end must be after start";
    }
    if (form.leagueStart && form.leagueEnd && form.leagueStart > form.leagueEnd) {
      newErrors.leagueEnd = "League end must be after start";
    }
    if (form.maxTeams < form.minTeams) {
      newErrors.maxTeams = "Max teams must be greater than min teams";
    }
    if (form.maxPlayersPerTeam < form.minPlayersPerTeam) {
      newErrors.maxPlayersPerTeam = "Max players must be greater than min players";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const contacts = [
        {
          name: form.contactName || "Primary Contact",
          email: form.contactEmail,
          phone: form.contactPhone,
          role: "Organizer",
          isPrimary: true
        },
        ...additionalContacts.map((c) => ({
          ...c,
          isPrimary: false
        }))
      ];

      const payload = {
        ...form,
        contacts
      };

      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/tournaments/${tournament.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to update tournament");

      const updated = await res.json();
      setTournament(updated);
      alert("Tournament updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Edit Tournament
          </Typography>

          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Quick Edit" />
            <Tab label="Full Editor" />
          </Tabs>

          <Divider sx={{ my: 2 }} />

          {activeTab === 0 ? (
            <Box>
              <Typography variant="h6" mb={2}>Basic Information</Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  name="name"
                  label="Tournament Name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  name="hostSchool"
                  label="Host School"
                  value={form.hostSchool}
                  onChange={handleChange}
                  error={!!errors.hostSchool}
                  helperText={errors.hostSchool}
                />
                <TextField
                  name="season"
                  label="Season"
                  value={form.season}
                  onChange={handleChange}
                />
                <Button variant="contained" onClick={handleSave}>
                  Save Changes
                </Button>
              </Box>
            </Box>
          ) : (
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
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

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    Save All Changes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default LeagueInfoEditor;