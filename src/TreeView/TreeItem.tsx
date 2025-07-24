import { Box } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import BoardTreeView, { type BoardTreeViewProps } from "./Board";
import MenuTreeView, { type MenuTreeViewProps } from "./Menu";
import type { TBaseTreeView } from "./types";

export type TreeItemProps = BoardTreeViewProps | MenuTreeViewProps;

// TreeItem 데이터와 타입을 결합하는 인터페이스
export type TreeItemSelectorProps = TBaseTreeView & {
  type?: "board" | "menu"; // 옵셔널로 만들어서 기본값 제공
};

const TreeItemSelector = (props: TreeItemSelectorProps) => {
  const { type = "board", ...rest } = props; // 기본값을 "board"로 설정

  // TypeGuard pattern
  if (type === "board") {
    return <BoardTreeView {...rest} type="board" />;
  }

  return <MenuTreeView {...rest} type="menu" />; // Default to MenuTreeView
};

// 공통으로 Box와 SimpleTreeView로 감싸는 컴포넌트
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
