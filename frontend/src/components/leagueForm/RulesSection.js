import React from "react";
import { Grid, Typography, Button, FormHelperText } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const RulesSection = ({ handleFileChange }) => {
  return (
    <Grid item xs={12} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{
        color: 'primary.main',
        fontWeight: 600
      }}>
        Rules & Documents
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Upload any documents that participants should review
      </Typography>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        fullWidth
        sx={{ py: 1.5 }}
      >
        Upload Rules Document
        <input type="file" name="ruleAttachment" hidden accept=".pdf,.docx" onChange={handleFileChange} />
      </Button>
      <FormHelperText>PDF or Word document with league rules (max 10MB)</FormHelperText>
    </Grid>
  );
};

export default RulesSection;