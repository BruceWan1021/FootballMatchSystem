import React, { useState } from 'react';
import {
    Box,
    Button,
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
    height: '40px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.87)',
    },
});

const CreateTeamForm = () => {
    const [form, setForm] = useState({
        name: "",
        shortName: "",
        school: "",
        founded: "",
        logo: null,
        homeJersey: "#3f51b5",
        homeShorts: "#ffffff",
        homeSocks: "#000000",
        awayJersey: "#f50057",
        awayShorts: "#eeeeee",
        awaySocks: "#888888",
        description: "",
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const fileInputRef = React.useRef();

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

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", form);
        alert("Team created successfully (simulated)");
    };

    return (
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
                        <Typography variant="h6" sx={{
                            mb: 2,
                            color: 'text.secondary',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            pb: 1
                        }}>
                            Home Kit Colors
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ mb: 1 }}>Jersey</Typography>
                            <ColorPicker
                                type="color"
                                name="homeJersey"
                                value={form.homeJersey}
                                onChange={handleChange}
                            />
                            <FormHelperText>{form.homeJersey}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ mb: 1 }}>Shorts</Typography>
                            <ColorPicker
                                type="color"
                                name="homeShorts"
                                value={form.homeShorts}
                                onChange={handleChange}
                            />
                            <FormHelperText>{form.homeShorts}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ mb: 1 }}>Socks</Typography>
                            <ColorPicker
                                type="color"
                                name="homeSocks"
                                value={form.homeSocks}
                                onChange={handleChange}
                            />
                            <FormHelperText>{form.homeSocks}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{
                            mt: 4,
                            mb: 2,
                            color: 'text.secondary',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            pb: 1
                        }}>
                            Away Kit Colors
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ mb: 1 }}>Jersey</Typography>
                            <ColorPicker
                                type="color"
                                name="awayJersey"
                                value={form.awayJersey}
                                onChange={handleChange}
                            />
                            <FormHelperText>{form.awayJersey}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ mb: 1 }}>Shorts</Typography>
                            <ColorPicker
                                type="color"
                                name="awayShorts"
                                value={form.awayShorts}
                                onChange={handleChange}
                            />
                            <FormHelperText>{form.awayShorts}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ mb: 1 }}>Socks</Typography>
                            <ColorPicker
                                type="color"
                                name="awaySocks"
                                value={form.awaySocks}
                                onChange={handleChange}
                            />
                            <FormHelperText>{form.awaySocks}</FormHelperText>
                        </FormControl>
                    </Grid>

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
    );
};

export default CreateTeamForm;
