import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Chip, Box, Typography, useTheme } from "@mui/material";
import { SportsSoccer as SoccerIcon, Equalizer as StatsIcon } from "@mui/icons-material";

const LeagueStandings = ({ standings }) => {
  const theme = useTheme();

  // 对 standings 按 points 从大到小排序
  const sortedStandings = standings.sort((a, b) => b.points - a.points);

  if (!standings || standings.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="text.secondary">No standings available</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: 50 }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Team</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <StatsIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <span>Played</span>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: theme.palette.success.main }}>
                W
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: theme.palette.warning.main }}>
                D
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: theme.palette.error.main }}>
                L
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <SoccerIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <span>GF</span>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <SoccerIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <span>GA</span>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", bgcolor: theme.palette.grey[200] }}>
                Pts
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStandings.map((row, index) => (
              <TableRow
                key={row.teamId}
                hover
                sx={{
                  "&:nth-of-type(odd)": { bgcolor: theme.palette.action.hover },
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                <TableCell>
                  <Chip
                    label={index + 1} // Display the rank based on sorted position
                    size="small"
                    color={
                      index <= 2
                        ? "success"
                        : index <= 4
                        ? "primary"
                        : index >= standings.length - 2
                        ? "error"
                        : "default"
                    }
                    sx={{ fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={row.teamLogo}
                      sx={{
                        width: 24,
                        height: 24,
                        mr: 1,
                        bgcolor: theme.palette.grey[300],
                      }}
                    >
                      {row.teamName.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight="medium">
                      {row.teamName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{row.matchesPlayed}</TableCell>
                <TableCell align="center" sx={{ color: theme.palette.success.main }}>
                  {row.wins}
                </TableCell>
                <TableCell align="center" sx={{ color: theme.palette.warning.main }}>
                  {row.draws}
                </TableCell>
                <TableCell align="center" sx={{ color: theme.palette.error.main }}>
                  {row.losses}
                </TableCell>
                <TableCell align="center">{row.goalsFor}</TableCell>
                <TableCell align="center">{row.goalsAgainst}</TableCell>
                <TableCell align="center" sx={{ bgcolor: theme.palette.grey[200], fontWeight: "bold" }}>
                  {row.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LeagueStandings;
