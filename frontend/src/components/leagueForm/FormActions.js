import React from "react";
import { Grid, Button } from "@mui/material";

const FormActions = ({ isEditMode }) => {
  return (
    <Grid item xs={12} sx={{ mt: 4 }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{
          py: 1.5,
          fontWeight: 600,
          fontSize: '1.1rem',
          background: 'linear-gradient(to right, #3f51b5, #2196f3)',
          boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
          '&:hover': {
            boxShadow: '0 5px 8px rgba(0,0,0,0.3)'
          }
        }}
      >
        {isEditMode ? 'Update League' : 'Create League'}
      </Button>
    </Grid>
  );
};

export default FormActions;