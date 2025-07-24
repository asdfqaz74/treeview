import { Box } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import BoardTreeView, { type BoardTreeViewProps } from "./Board";
import MenuTreeView, { type MenuTreeViewProps } from "./Menu";
import type { TBaseTreeView } from "./types";
import { boardData } from "./dummy/boardData";

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
  children?: React.ReactNode;
  sx?: object;
  type?: "board" | "menu";
};

export const TreeViewWrapper = ({
  children,
  sx = { minHeight: 352, minWidth: 250 },
  type = "menu",
}: TreeViewWrapperProps) => {
  // Board 타입이면 boardData 사용, 그 외는 기존 children 사용
  if (type === "board") {
    return (
      <Box sx={sx}>
        <SimpleTreeView>
          {boardData.treeItems.map((item: TBaseTreeView) => (
            <TreeItemSelector key={item.id} {...item} type="board" />
          ))}
        </SimpleTreeView>
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      <SimpleTreeView>{children}</SimpleTreeView>
    </Box>
  );
};

export default TreeItemSelector;
