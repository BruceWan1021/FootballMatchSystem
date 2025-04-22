import React, { useState, useEffect, useRef } from "react";
import {
  Box, Button, Grid, TextField, Typography, FormControl,
  Paper, Avatar, FormHelperText
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Switch, FormControlLabel } from "@mui/material";
import ContactsSection from "../leagueForm/ContactsSection";

const ColorPicker = styled('input')({
  width: '100%',
  height: '40px',
  borderRadius: '4px',
  cursor: 'pointer',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  '&:hover': {
    borderColor: 'rgba(0, 0, 0, 0.87)',
  },
});

const defaultForm = {
  name: "",
  shortName: "",
  school: "",
  homeStadium: "",
  founded: "",
  logo: null,
  logoUrl: "",
  homeJerseyColor: "#3f51b5",
  homeShortsColor: "#ffffff",
  homeSocksColor: "#000000",
  awayJerseyColor: "#f50057",
  awayShortsColor: "#eeeeee",
  awaySocksColor: "#888888",
  description: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  isOpenForFriendly: "true",
};

const TeamForm = ({ team = null, onSuccess }) => {
  const [form, setForm] = useState(defaultForm);
  const [additionalContacts, setAdditionalContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", role: "" });
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (team) {
      setForm({
        ...defaultForm,
        ...team,
        isOpenForFriendly: String(team.isOpenForFriendly ?? "true"),
      });
      setAdditionalContacts(team.contacts || []);
      if (team.logoUrl) {
        setLogoPreview(team.logoUrl);
      }
    }
  }, [team]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("http://localhost:8080/api/upload-logo", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        setForm((prev) => ({ ...prev, logoUrl: data.url }));
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Logo upload failed");
      }
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) return;
    setAdditionalContacts(prev => [...prev, newContact]);
    setNewContact({ name: "", email: "", role: "" });
  };

  const handleRemoveContact = (index) => {
    setAdditionalContacts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");

    const contacts = [
      {
        name: form.contactName,
        email: form.contactEmail,
        phone: form.contactPhone,
        role: "Manager",
        isPrimary: true,
      },
      ...additionalContacts.map((c) => ({
        ...c,
        isPrimary: false,
      }))
    ];

    const payload = {
      ...form,
      isOpenForFriendly: form.isOpenForFriendly === "true",
      contacts,
    };
    delete payload.logo;

    const method = team ? "PUT" : "POST";
    const url = team
      ? `http://localhost:8080/api/teams/${team.id}`
      : `http://localhost:8080/api/teams`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save team");

      const data = await res.json();
      alert(`Team ${team ? "updated" : "created"} successfully!`);
      onSuccess?.(data);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Submission failed");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{
        fontWeight: 'bold',
        color: 'primary.main',
        mb: 4,
        textAlign: 'center'
      }}>
        {team ? "Edit Team" : "Create New Team"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Logo */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Avatar
              src={logoPreview}
              sx={{
                width: 120,
                height: 120,
                border: '2px solid',
                borderColor: 'primary.main',
                cursor: 'pointer'
              }}
              onClick={handleAvatarClick}
            >
              {!logoPreview && 'Logo'}
            </Avatar>
          </Grid>

          {/* Basic Info */}
          <Grid item xs={12} md={6}>
            <TextField name="name" label="Team Name" fullWidth required size="small"
              value={form.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="shortName" label="Short Name" fullWidth size="small"
              value={form.shortName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="school" label="School" fullWidth size="small"
              value={form.school} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="homeStadium" label="Home Stadium" fullWidth size="small"
              value={form.homeStadium} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type="date" name="founded" label="Founded"
              fullWidth InputLabelProps={{ shrink: true }}
              value={form.founded} onChange={handleChange} size="small" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.isOpenForFriendly === "true"}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isOpenForFriendly: e.target.checked ? "true" : "false"
                    }))
                  }
                  color="primary"
                />
              }
              label="Available for Friendly Matches"
              sx={{ display: 'block' }}
            />
          </Grid>

          {/* Kit Colors */}
          {['home', 'away'].map(type => (
            <React.Fragment key={type}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{
                  mt: 4, mb: 2, color: 'text.secondary',
                  borderBottom: '1px solid', borderColor: 'divider', pb: 1
                }}>
                  {type.charAt(0).toUpperCase() + type.slice(1)} Kit Colors
                </Typography>
              </Grid>
              {['JerseyColor', 'ShortsColor', 'SocksColor'].map(part => (
                <Grid item xs={12} md={4} key={part}>
                  <FormControl fullWidth>
                    <Typography variant="body2" sx={{ mb: 1 }}>{part.replace("Color", "")}</Typography>
                    <ColorPicker type="color" name={`${type}${part}`}
                      value={form[`${type}${part}`]} onChange={handleChange} />
                    <FormHelperText>{form[`${type}${part}`]}</FormHelperText>
                  </FormControl>
                </Grid>
              ))}
            </React.Fragment>
          ))}

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Team Description"
              fullWidth
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>

          {/* Contacts */}
          <ContactsSection
            form={form}
            errors={{}}
            handleChange={handleChange}
            additionalContacts={additionalContacts}
            newContact={newContact}
            handleAddContact={handleAddContact}
            handleRemoveContact={handleRemoveContact}
            setNewContact={setNewContact}
          />

          {/* Submit */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" size="large" sx={{ px: 4, py: 1.5 }}>
              {team ? "Update Team" : "Create Team"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TeamForm;
