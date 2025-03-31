import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Avatar, Chip, Box, Typography, useTheme}from "@mui/material";
import {
  SportsSoccer as SoccerIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  Equalizer as StatsIcon
} from "@mui/icons-material";

const LeagueStandings = ({ standings }) => {
  const theme = useTheme();

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
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Form
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.map((row) => (
              <TableRow
                key={row.rank}
                hover
                sx={{
                  "&:nth-of-type(odd)": { bgcolor: theme.palette.action.hover },
                  "&:last-child td": { borderBottom: 0 }
                }}
              >
                <TableCell>
                  <Chip
                    label={row.rank}
                    size="small"
                    color={
                      row.rank <= 2
                        ? "success"
                        : row.rank <= 4
                        ? "primary"
                        : row.rank >= standings.length - 2
                        ? "error"
                        : "default"
                    }
                    sx={{ fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={row.logo}
                      sx={{
                        width: 24,
                        height: 24,
                        mr: 1,
                        bgcolor: theme.palette.grey[300]
                      }}
                    >
                      {row.team.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight="medium">
                      {row.team}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{row.played || row.w + row.d + row.l}</TableCell>
                <TableCell align="center" sx={{ color: theme.palette.success.main }}>
                  {row.w}
                </TableCell>
                <TableCell align="center" sx={{ color: theme.palette.warning.main }}>
                  {row.d}
                </TableCell>
                <TableCell align="center" sx={{ color: theme.palette.error.main }}>
                  {row.l}
                </TableCell>
                <TableCell align="center">{row.gf}</TableCell>
                <TableCell align="center">{row.ga}</TableCell>
                <TableCell align="center" sx={{ bgcolor: theme.palette.grey[200], fontWeight: "bold" }}>
                  {row.pts}
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" gap={0.5}>
                    {row.form?.split("").map((result, i) => (
                      <Chip
                        key={i}
                        label={result}
                        size="small"
                        sx={{
                          minWidth: 20,
                          height: 20,
                          fontWeight: "bold",
                          bgcolor:
                            result === "W"
                              ? theme.palette.success.light
                              : result === "D"
                              ? theme.palette.warning.light
                              : theme.palette.error.light,
                          color: theme.palette.getContrastText(
                            result === "W"
                              ? theme.palette.success.light
                              : result === "D"
                              ? theme.palette.warning.light
                              : theme.palette.error.light
                          )
                        }}
                      />
                    ))}
                  </Box>
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