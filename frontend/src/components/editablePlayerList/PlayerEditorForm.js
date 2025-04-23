import { Grid, TextField } from "@mui/material";

export const PlayerEditorForm = ({ data, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Number"
          value={data.number}
          onChange={(e) => onChange("number", e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          type="number"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Position"
          value={data.position}
          onChange={(e) => onChange("position", e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Height (cm)"
          value={data.height}
          onChange={(e) => onChange("height", e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          type="number"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Weight (kg)"
          value={data.weight}
          onChange={(e) => onChange("weight", e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          type="number"
        />
      </Grid>
    </Grid>
  );
};