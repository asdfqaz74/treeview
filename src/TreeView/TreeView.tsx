import { Box } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import treeData from "./treeData.json";
import TreeItemComponent from "./TreeItem";

export default function TreeView() {
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        {treeData.treeItems.map((item) => (
          <TreeItemComponent
            key={item.id}
            itemId={item.id}
            label={item.label}
            disabled={item.disabled}
            children={item.children?.map((child) => ({
              itemId: child.id,
              label: child.label,
            }))}
          />
        ))}
      </SimpleTreeView>
    </Box>
  );
}
