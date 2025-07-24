import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TreeItem } from "@mui/x-tree-view";
import type { TBaseTreeView } from "../types";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FolderIcon from "@mui/icons-material/Folder";
import { Box } from "@mui/material";

export type DndMenuTreeViewProps = TBaseTreeView & {
  type: "menu";
  depth?: number; // 노드의 깊이 추가
  onMove?: (
    draggedId: string,
    targetId: string,
    position: "before" | "after" | "inside"
  ) => void;
};

const ITEM_TYPE = "MENU_TREE_ITEM";

interface DragItem {
  id: string;
  type: string;
  node: TBaseTreeView;
  depth: number; // 드래그 아이템의 깊이 추가
}

const DndMenuTreeView = ({
  id,
  label,
  disabled,
  children,
  depth = 0,
  onMove,
}: DndMenuTreeViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasChildren = children && children.length > 0;
  const [currentDropPosition, setCurrentDropPosition] = useState<
    "before" | "after" | "inside" | null
  >(null);

  // Drag 기능 설정
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: {
      id,
      type: ITEM_TYPE,
      node: { id, label, disabled, children },
      depth,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop 기능 설정 - 더 정교한 위치 결정
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: DragItem, monitor) => {
      if (!monitor.didDrop() && item.id !== id) {
        // 드롭 위치 결정 로직
        const clientOffset = monitor.getClientOffset();
        const targetElement = ref.current;

        if (clientOffset && targetElement) {
          const targetRect = targetElement.getBoundingClientRect();
          const relativeY = clientOffset.y - targetRect.top;
          const elementHeight = targetRect.height;

          let position: "before" | "after" | "inside";

          // 상단 25%: before, 하단 25%: after, 중간 50%: inside
          if (relativeY < elementHeight * 0.25) {
            position = "before";
          } else if (relativeY > elementHeight * 0.75) {
            position = "after";
          } else {
            // 모든 노드에 inside 허용 (자식이 없어도 새로 생성)
            position = "inside";
          }

          onMove?.(item.id, id, position);
        }
      }
    },
    hover: (_item: DragItem, monitor) => {
      // 호버 중 위치 표시를 위한 로직
      const clientOffset = monitor.getClientOffset();
      const targetElement = ref.current;

      if (clientOffset && targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const relativeY = clientOffset.y - targetRect.top;
        const elementHeight = targetRect.height;

        // 드롭 위치 업데이트
        if (relativeY < elementHeight * 0.25) {
          setCurrentDropPosition("before");
        } else if (relativeY > elementHeight * 0.75) {
          setCurrentDropPosition("after");
        } else {
          setCurrentDropPosition("inside");
        }
      }
    },
    canDrop: (item: DragItem) => {
      // 자기 자신에게는 드롭할 수 없음
      // 부모를 자식에게 드롭하는 것도 방지
      return item.id !== id && !disabled;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  // 호버가 끝날 때 드롭 위치 리셋
  if (!isOver) {
    if (currentDropPosition !== null) {
      setCurrentDropPosition(null);
    }
  }

  // ref 연결
  drag(drop(ref));

  const opacity = isDragging ? 0.5 : 1;

  // 드롭 위치에 따른 시각적 피드백
  let borderTop = "none";
  let borderBottom = "none";
  let backgroundColor = "transparent";

  if (isOver && canDrop) {
    if (currentDropPosition === "before") {
      borderTop = "3px solid #1976d2";
    } else if (currentDropPosition === "after") {
      borderBottom = "3px solid #1976d2";
    } else {
      backgroundColor = "rgba(25, 118, 210, 0.1)";
    }
  }

  // 아이콘 설정 - 드롭 가능한 상태를 고려
  const getIcons = () => {
    if (hasChildren) {
      return {
        collapseIcon: MenuOpenIcon,
        expandIcon: FolderIcon,
        endIcon: undefined,
      };
    } else {
      // 자식이 없는 노드도 드롭 가능함을 표시
      if (isOver && canDrop && currentDropPosition === "inside") {
        return {
          collapseIcon: undefined,
          expandIcon: undefined,
          endIcon: FolderIcon, // 드롭 가능한 상태에서는 폴더 아이콘
        };
      } else {
        return {
          collapseIcon: undefined,
          expandIcon: undefined,
          endIcon: MenuIcon,
        };
      }
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity,
        backgroundColor,
        borderTop,
        borderBottom,
        transition: "all 0.2s ease",
        cursor: isDragging ? "grabbing" : "grab",
        borderRadius: 1,
      }}
    >
      <TreeItem
        itemId={id}
        label={hasChildren ? "- " + label : label}
        disabled={disabled}
        slots={getIcons()}
      >
        {children &&
          children.map((child) => (
            <DndMenuTreeView
              key={child.id}
              id={child.id}
              label={child.label}
              disabled={child.disabled}
              children={child.children}
              depth={depth + 1}
              type="menu"
              onMove={onMove}
            />
          ))}
      </TreeItem>
    </Box>
  );
};

export default DndMenuTreeView;
