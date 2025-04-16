import React from "react";
import { Grid, Avatar, Box, Typography, Tooltip } from "@mui/material";

const InfoItem = ({ icon, label, value, tooltip }) => (
  <Tooltip title={tooltip || ''} arrow>
    <Grid item xs={12} sm={6} md={4} sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      mb: 2,
      p: 1,
      '&:hover': {
        backgroundColor: 'action.hover',
        borderRadius: 1
      }
    }}>
      <Avatar sx={{ 
        bgcolor: 'primary.main', 
        width: 36, 
        height: 36, 
        mr: 2,
        color: 'primary.contrastText'
      }}>
        {React.cloneElement(icon, { fontSize: 'small' })}
      </Avatar>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value || "-"}
        </Typography>
      </Box>
    </Grid>
  </Tooltip>
);

export default InfoItem;
