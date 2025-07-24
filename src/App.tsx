import TreeView from "./TreeView/TreeView";
import { Box, Typography } from "@mui/material";

export default function App() {
  return (
    <Box sx={{ p: 3, display: "flex", gap: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h5" gutterBottom>
          Board TreeView
        </Typography>
        <TreeView type="board" />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h5" gutterBottom>
          Menu TreeView
        </Typography>
        <TreeView type="menu" />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h5" gutterBottom>
          DnD TreeView
        </Typography>
        <TreeView type="dnd" />
      </Box>
    </Box>
  );
}
