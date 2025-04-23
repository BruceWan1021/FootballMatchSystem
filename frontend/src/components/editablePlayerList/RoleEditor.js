import { useState } from "react";
import { Chip, Select, MenuItem, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";


export const RoleEditor = ({ 
  currentRole, 
  onSave, 
  onCancel 
}) => {
  const [role, setRole] = useState(currentRole);

  return (
    <>
      <Select
        value={role || ''}
        onChange={(e) => setRole(e.target.value)}
        size="small"
        sx={{ minWidth: 120, mr: 1 }}
      >
        <MenuItem value="player">Player</MenuItem>
        <MenuItem value="captain">Captain</MenuItem>
        <MenuItem value="coach">Coach</MenuItem>
        <MenuItem value="manager">Manager</MenuItem>
      </Select>
      <IconButton
        onClick={() => onSave(role)}
        color="primary"
        size="small"
      >
        <SaveIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={onCancel}
        color="error"
        size="small"
      >
        <CancelIcon fontSize="small" />
      </IconButton>
    </>
  );
};