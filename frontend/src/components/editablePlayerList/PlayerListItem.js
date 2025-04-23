import { useState } from "react";
import { ListItem, Grid, Box, IconButton, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import StarIcon from "@mui/icons-material/Star";
import Chip from "@mui/material/Chip";
import { PlayerAvatar } from "./PlayerAvatar";
import { PlayerInfoDisplay } from "./PlayerInfoDisplay";
import { PlayerEditorForm } from "./PlayerEditorForm";
import { RoleEditor } from "./RoleEditor";
import { formatRole, getRoleColor } from "./roleUtils"; 

export const PlayerListItem = ({
  player,
  role,
  isEditing,
  isEditingRole,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onStartRoleEdit,
  onSaveRoleEdit,
  onCancelRoleEdit
}) => {
  const userId = player.playerProfileDTO?.userId;
  const isCaptain = role === 'captain';

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          backgroundColor: isEditing ? 'action.hover' : 'background.paper',
          borderRadius: 1,
          mb: 1,
          transition: 'background-color 0.3s ease',
          position: 'relative'
        }}
      >
        {isCaptain && (
          <Box sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1
          }}>
            <Tooltip title="Team Captain">
              <StarIcon color="warning" fontSize="small" />
            </Tooltip>
          </Box>
        )}

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={isEditing ? 12 : 8}>
            {isEditing ? (
              <PlayerEditorForm
                data={player}
                onChange={(field, value) => {/* handle change */ }}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PlayerAvatar role={role} />
                <PlayerInfoDisplay player={player} />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            {isEditing ? (
              <>
                <IconButton onClick={onSaveEdit} color="success">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={onCancelEdit} color="error">
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                {isEditingRole ? (
                  <RoleEditor
                    currentRole={role}
                    onSave={onSaveRoleEdit}
                    onCancel={onCancelRoleEdit}
                  />
                ) : (
                  <>
                    <Chip
                      label={formatRole(role)}
                      color={getRoleColor(role)}
                      size="small"
                      onClick={() => onStartRoleEdit(userId)}
                      clickable
                      sx={{ mr: 1 }}
                    />
                    <IconButton onClick={() => onStartEdit(player)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
};