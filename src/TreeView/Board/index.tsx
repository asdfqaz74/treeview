import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { styled } from "@mui/material/styles";
import type { TBaseTreeView } from "../types";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MenuIcon from "@mui/icons-material/Menu";

export type BoardTreeViewProps = TBaseTreeView & {
  type: "board";
  isLastChild?: boolean;
};

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[200],

  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    position: "relative",
    [`& .${treeItemClasses.label}`]: {
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  },

  // 자식 그룹에 세로 점선
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    position: "relative",

    // 세로 점선을 가상 요소로 직접 그리기
    "&::before": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "1px",
      borderLeft: `1px dashed white`,
    },

    // 직접 자식들에게 가로 점선 추가
    [`& > div .${treeItemClasses.content}::before`]: {
      content: '""',
      position: "absolute",
      left: "-18px",
      top: "50%",
      width: "12px",
      height: "1px",
      borderTop: "1px dashed white",
      transform: "translateY(-50%)",
    },
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
  isLastChild = false,
}: BoardTreeViewProps) => {
  const hasChildren = children && children.length > 0;

  return (
    <CustomTreeItem
      itemId={id}
      label={label}
      disabled={disabled}
      data-is-last-child={isLastChild}
      slots={{
        collapseIcon: hasChildren ? FolderOpenIcon : undefined,
        expandIcon: hasChildren ? FolderIcon : undefined,
        endIcon: !hasChildren ? MenuIcon : undefined,
      }}
    >
      {children &&
        children.map((child, index) => (
          <BoardTreeView
            key={child.id}
            id={child.id}
            label={child.label}
            disabled={child.disabled}
            children={child.children}
            type="board"
            isLastChild={index === children.length - 1}
          />
        ))}
    </CustomTreeItem>
  );
};

export default BoardTreeView;
