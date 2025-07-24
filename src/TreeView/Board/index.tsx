import { TreeItem } from "@mui/x-tree-view";
import type { TBaseTreeView } from "../types";
// import type { BoardTreeViewRecipeVariantProps } from "./board.recipe";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MenuIcon from "@mui/icons-material/Menu";

export type BoardTreeViewProps = TBaseTreeView & { type: "board" };

const BoardTreeView = ({
  id,
  label,
  disabled,
  children,
}: BoardTreeViewProps) => {
  const hasChildren = children && children.length > 0;

  return (
    <TreeItem
      itemId={id}
      label={label}
      disabled={disabled}
      slots={{
        collapseIcon: hasChildren ? FolderOpenIcon : undefined,
        expandIcon: hasChildren ? FolderIcon : undefined,
        endIcon: !hasChildren ? MenuIcon : undefined,
      }}
    >
      {children &&
        children.map((child) => (
          <BoardTreeView
            key={child.id}
            id={child.id}
            label={child.label}
            disabled={child.disabled}
            children={child.children}
            type="board"
          />
        ))}
    </TreeItem>
  );
};

export default BoardTreeView;
