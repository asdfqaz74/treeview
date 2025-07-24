import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import treeData from "./treeData.json";
import { TreeViewWrapper } from "./TreeItem";
import DndMenuTreeView from "./Dnd";
import type { TBaseTreeView } from "./types";
import { TreeUtils } from "./treeUtils";

export default function DndTreeView() {
  const [data, setData] = useState<TBaseTreeView[]>(treeData.treeItems);

  const handleMove = (
    draggedId: string,
    targetId: string,
    position: "before" | "after" | "inside"
  ) => {
    console.log(`Moving ${draggedId} to ${targetId} (${position})`);

    const newTree = TreeUtils.moveNode(data, draggedId, targetId, position);
    setData(newTree);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TreeViewWrapper>
        {data.map((item) => (
          <DndMenuTreeView
            key={item.id}
            id={item.id}
            label={item.label}
            disabled={item.disabled}
            children={item.children}
            depth={0}
            type="menu"
            onMove={handleMove}
          />
        ))}
      </TreeViewWrapper>
    </DndProvider>
  );
}
