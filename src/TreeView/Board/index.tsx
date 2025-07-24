import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { styled } from "@mui/material/styles";
import type { TBaseTreeView } from "../types";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MenuIcon from "@mui/icons-material/Menu";

export type BoardTreeViewProps = TBaseTreeView & { type: "board" };

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `2px dashed white`,
  },
  ...theme.applyStyles("light", {
    color: "white",
  }),
}));

const BoardTreeView = ({
  id,
  label,
  disabled,
  children,
}: BoardTreeViewProps) => {
  const hasChildren = children && children.length > 0;

  return (
    <CustomTreeItem
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
    </CustomTreeItem>
  );
};

export default BoardTreeView;
