import type { TBaseTreeView } from "./types";

// 트리 데이터 조작을 위한 유틸리티 함수들
export const TreeUtils = {
  // ID로 노드 찾기
  findNode: (tree: TBaseTreeView[], id: string): TBaseTreeView | null => {
    for (const node of tree) {
      if (node.id === id) return node;
      if (node.children) {
        const found = TreeUtils.findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  },

  // 부모 노드 찾기
  findParent: (
    tree: TBaseTreeView[],
    childId: string
  ): TBaseTreeView | null => {
    for (const node of tree) {
      if (node.children?.some((child) => child.id === childId)) {
        return node;
      }
      if (node.children) {
        const found = TreeUtils.findParent(node.children, childId);
        if (found) return found;
      }
    }
    return null;
  },

  // 노드 제거
  removeNode: (tree: TBaseTreeView[], id: string): TBaseTreeView[] => {
    return tree.filter((node) => {
      if (node.id === id) return false;
      if (node.children) {
        node.children = TreeUtils.removeNode(node.children, id);
      }
      return true;
    });
  },

  // 노드를 특정 위치에 삽입
  insertNode: (
    tree: TBaseTreeView[],
    newNode: TBaseTreeView,
    targetId: string,
    position: "before" | "after" | "inside"
  ): TBaseTreeView[] => {
    if (position === "inside") {
      return tree.map((node) => {
        if (node.id === targetId) {
          return {
            ...node,
            children: [...(node.children || []), newNode],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: TreeUtils.insertNode(
              node.children,
              newNode,
              targetId,
              position
            ),
          };
        }
        return node;
      });
    }

    // before/after 로직
    const newTree: TBaseTreeView[] = [];
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];

      if (node.id === targetId) {
        if (position === "before") {
          newTree.push(newNode, node);
        } else {
          newTree.push(node, newNode);
        }
      } else {
        if (node.children) {
          newTree.push({
            ...node,
            children: TreeUtils.insertNode(
              node.children,
              newNode,
              targetId,
              position
            ),
          });
        } else {
          newTree.push(node);
        }
      }
    }
    return newTree;
  },

  // 노드 이동
  moveNode: (
    tree: TBaseTreeView[],
    draggedId: string,
    targetId: string,
    position: "before" | "after" | "inside"
  ): TBaseTreeView[] => {
    // 드래그된 노드 찾기
    const draggedNode = TreeUtils.findNode(tree, draggedId);
    if (!draggedNode) return tree;

    // 순환 참조 방지: 타겟이 드래그된 노드의 자손인지 확인
    const isDescendant = (node: TBaseTreeView, ancestorId: string): boolean => {
      if (node.id === ancestorId) return true;
      if (node.children) {
        return node.children.some((child) => isDescendant(child, ancestorId));
      }
      return false;
    };

    const targetNode = TreeUtils.findNode(tree, targetId);
    if (targetNode && isDescendant(targetNode, draggedId)) {
      return tree; // 순환 참조 방지
    }

    // 1. 드래그된 노드 제거
    let newTree = TreeUtils.removeNode(tree, draggedId);

    // 2. 새 위치에 삽입
    newTree = TreeUtils.insertNode(newTree, draggedNode, targetId, position);

    return newTree;
  },
};
