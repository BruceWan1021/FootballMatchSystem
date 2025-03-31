import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    MenuItem,
    TextField,
    Typography,
    InputLabel,
    Select,
    FormControl,
    Paper,
    Avatar,
    FormHelperText
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ColorPicker = styled('input')({
    width: '100%',
    height: '50px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.87)',
    },
});

const CreateTeamPage = () => {
    const [form, setForm] = useState({
        name: "",
        shortName: "",
        school: "",
        founded: "",
        logo: null,
        homeColor: "#3f51b5",
        awayColor: "#f50057",
        description: "",
        captainName: "",
        captainId: "",
        contact: "",
    });

    const [logoPreview, setLogoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, logo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", form);
        alert("Team created successfully (simulated)");
        // TODO: Connect to backend API
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 4,
                    textAlign: 'center'
                }}>
                    Create New Team
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        {/* Logo Preview */}
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                src={logoPreview}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    border: '2px solid',
                                    borderColor: 'primary.main'
                                }}
                            >
                                {!logoPreview && 'Logo'}
                            </Avatar>
                        </Grid>

                        {/* Team Information Section */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{
                                mb: 2,
                                color: 'text.secondary',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                pb: 1
                            }}>
                                Team Information
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Team Name"
                                fullWidth
                                required
                                value={form.name}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="shortName"
                                label="Short Name (Abbreviation)"
                                fullWidth
                                value={form.shortName}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="school-label">School</InputLabel>
                                <Select
                                    labelId="school-label"
                                    name="school"
                                    value={form.school}
                                    onChange={handleChange}
                                    label="School"
                                    required
                                >
                                    <MenuItem value="School of Software">School of Software</MenuItem>
                                    <MenuItem value="School of Computer Science">School of Computer Science</MenuItem>
                                    <MenuItem value="School of Electronic Information">School of Electronic Information</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                type="date"
                                name="founded"
                                label="Founded Date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={form.founded}
                                onChange={handleChange}
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="file"
                                fullWidth
                                inputProps={{ accept: "image/*" }}
                                onChange={handleFileChange}
                                size="small"
                                helperText="Upload team logo (recommended 1:1 aspect ratio)"
                            />
                        </Grid>

                        {/* Team Colors Section */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{
                                mb: 2,
                                color: 'text.secondary',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                pb: 1
                            }}>
                                Team Colors
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1 }}>Home Kit Color</Typography>
                                <ColorPicker
                                    type="color"
                                    name="homeColor"
                                    value={form.homeColor}
                                    onChange={handleChange}
                                />
                                <FormHelperText>{form.homeColor}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1 }}>Away Kit Color</Typography>
                                <ColorPicker
                                    type="color"
                                    name="awayColor"
                                    value={form.awayColor}
                                    onChange={handleChange}
                                />
                                <FormHelperText>{form.awayColor}</FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* Team Description */}
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
                                helperText="Tell us about your team's history, achievements, or philosophy"
                            />
                        </Grid>

                        {/* Captain Information Section */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{
                                mb: 2,
                                color: 'text.secondary',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                pb: 1
                            }}>
                                Captain Information
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="captainName"
                                label="Captain Name"
                                fullWidth
                                required
                                value={form.captainName}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="captainId"
                                label="Captain Student ID"
                                fullWidth
                                required
                                value={form.captainId}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="contact"
                                label="Contact Information"
                                fullWidth
                                required
                                value={form.contact}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                helperText="Email or phone number where we can reach you"
                            />
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    borderRadius: 2
                                }}
                            >
                                Create Team
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default CreateTeamPage;