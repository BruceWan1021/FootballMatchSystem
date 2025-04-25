import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Avatar, Typography, Paper, Chip } from "@mui/material";

const PlayerCard = ({ player, onDrop }) => {
  // 将数据验证移到Hooks调用之后
  const [, dragRef] = useDrag({
    type: "PLAYER",
    item: { id: player?.userId }, // 使用可选链操作符
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "PLAYER",
    drop: (item) => {
      if (!item?.id || !player?.userId) {
        console.error("Invalid drop data:", { item, player });
        return;
      }
      if (item.id !== player.userId) {
        onDrop(item.id, player.userId);
      }
    },
  });

  // 数据验证放在渲染部分
  if (!player || player.userId === undefined) {
    console.error("Invalid player data:", player);
    return (
      <Paper sx={{ 
        p: 1,
        width: 100,
        textAlign: "center",
        backgroundColor: "error.main",
        color: "white"
      }}>
        <Typography>无效球员数据</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      ref={(node) => dragRef(dropRef(node))}
      elevation={3}
      sx={{
        p: 1,
        width: 100,
        textAlign: "center",
        backgroundColor: "primary.main",
        color: "white",
        cursor: "move",
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'transform 0.2s',
        }
      }}
    >
      <Avatar sx={{ 
        mx: "auto", 
        mb: 1, 
        bgcolor: "white", 
        color: "black",
        fontWeight: "bold",
        width: 40,
        height: 40
      }}>
        #{player.number}
      </Avatar>
      <Typography variant="subtitle2" fontWeight="bold" noWrap>
        {player.username}
      </Typography>
      <Chip 
        label={player.position} 
        size="small" 
        sx={{ 
          mt: 0.5,
          backgroundColor: "secondary.main",
          color: "white",
          fontSize: "0.7rem",
          maxWidth: "90%"
        }} 
      />
    </Paper>
  );
};

export default PlayerCard;