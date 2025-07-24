import DndTreeView from "./DndTreeView";
import treeData from "./treeData.json";
import TreeItemSelector, { TreeViewWrapper } from "./TreeItem";

type TreeViewProps = {
  type?: "board" | "menu" | "dnd";
};

/**
 * TreeView 컴포넌트
 * 트리 데이터를 기반으로 트리 뷰를 렌더링하는 컴포넌트입니다.
 *
 *
 * @param type - board, menu, dnd 중 하나를 선택할 수 있는 옵션
 * @returns
 */
export default function TreeView({ type }: TreeViewProps) {
  if (type === "dnd") {
    return <DndTreeView />;
  }

  return (
    <TreeViewWrapper>
      {treeData.treeItems.map((item) => (
        <TreeItemSelector key={item.id} {...item} type={type} />
      ))}
    </TreeViewWrapper>
  );
}
