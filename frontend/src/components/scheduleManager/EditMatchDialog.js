import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from "@mui/material";
import { Save as SaveIcon, Close as CloseIcon, Edit as EditIcon } from "@mui/icons-material";

const EditMatchDialog = ({ open, match, onClose, onUpdateMatch }) => {
  const [editFormData, setEditFormData] = useState({
    matchDate: '',
    stadium: '',
    status: '',
    score1: '',
    score2: ''
  });

  // 处理编辑比赛的保存操作
  const handleSaveEdit = async () => {
    const token = sessionStorage.getItem("authToken");

    const updatedMatch = {
      ...match,
      matchDate: editFormData.matchDate,
      stadium: editFormData.stadium,
      status: editFormData.status,
      score1: parseInt(editFormData.score1) || 0,
      score2: parseInt(editFormData.score2) || 0
    };

    try {
      const res = await fetch(`http://localhost:8080/api/matches/${match.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedMatch)
      });

      if (!res.ok) {
        throw new Error("Failed to update match");
      }

      alert("Match updated successfully!");
      onUpdateMatch(updatedMatch); // 调用父组件方法更新比赛数据
      onClose(); // 关闭对话框
    } catch (error) {
      console.error("Update error:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (match) {
      setEditFormData({
        matchDate: match.matchDate.slice(0, 16), // Format for datetime-local input
        stadium: match.stadium || '',
        status: match.status,
        score1: match.score1 || '',
        score2: match.score2 || ''
      });
    }
  }, [match]);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <EditIcon color="primary" sx={{ mr: 1 }} />
          Edit Match: {match?.team1?.name} vs {match?.team2?.name}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Match Date & Time"
              type="datetime-local"
              fullWidth
              name="matchDate"
              value={editFormData.matchDate}
              onChange={handleEditFormChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stadium"
              fullWidth
              name="stadium"
              value={editFormData.stadium}
              onChange={handleEditFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={editFormData.status}
                onChange={handleEditFormChange}
              >
                <MenuItem value="SCHEDULED">Scheduled</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="POSTPONED">Postponed</MenuItem>
                <MenuItem value="CANCELED">Canceled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label={`${match?.team1?.name} Score`}
              type="number"
              fullWidth
              name="score1"
              value={editFormData.score1}
              onChange={handleEditFormChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label={`${match?.team2?.name} Score`}
              type="number"
              fullWidth
              name="score2"
              value={editFormData.score2}
              onChange={handleEditFormChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<CloseIcon />} onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button startIcon={<SaveIcon />} onClick={handleSaveEdit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMatchDialog;
