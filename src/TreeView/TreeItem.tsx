import { Box } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import BoardTreeView, { type BoardTreeViewProps } from "./Board";
import MenuTreeView, { type MenuTreeViewProps } from "./Menu";
import type { TBaseTreeView } from "./types";

export type TreeItemProps = BoardTreeViewProps | MenuTreeViewProps;
export type TreeItemSelectorProps = TBaseTreeView & {
  type?: "board" | "menu";
};

const TreeItemSelector = (props: TreeItemSelectorProps) => {
  const { type = "board", ...rest } = props;

  // TypeGuard pattern
  if (type === "board") {
    return <BoardTreeView {...rest} type="board" />;
  }

  return <MenuTreeView {...rest} type="menu" />;
};

export type TreeViewWrapperProps = {
  children: React.ReactNode;
  sx?: object;
};

export const TreeViewWrapper = ({
  children,
  sx = { minHeight: 352, minWidth: 250 },
}: TreeViewWrapperProps) => {
  return (
    <Box sx={sx}>
      <SimpleTreeView>{children}</SimpleTreeView>
    </Box>
  );
};

export default TreeItemSelector;
