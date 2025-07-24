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

    // before/after의 경우, 타겟 노드의 부모를 찾아서 해당 레벨에서 삽입
    const targetParent = TreeUtils.findParent(tree, targetId);

    if (!targetParent) {
      // 루트 레벨의 노드인 경우
      return TreeUtils.insertAtRootLevel(tree, newNode, targetId, position);
    } else {
      // 중첩된 노드인 경우, 부모의 children 배열에서 삽입
      return tree.map((node) => {
        if (node.id === targetParent.id) {
          return {
            ...node,
            children: TreeUtils.insertAtRootLevel(
              node.children || [],
              newNode,
              targetId,
              position
            ),
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
  },

  // 루트 레벨에서 before/after 삽입
  insertAtRootLevel: (
    tree: TBaseTreeView[],
    newNode: TBaseTreeView,
    targetId: string,
    position: "before" | "after"
  ): TBaseTreeView[] => {
    const newTree: TBaseTreeView[] = [];

    for (const node of tree) {
      if (node.id === targetId) {
        if (position === "before") {
          newTree.push(newNode, node);
        } else {
          newTree.push(node, newNode);
        }
      } else {
        newTree.push(node);
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
    if (!draggedNode) {
      return tree;
    }

    // 순환 참조 방지를 위한 헬퍼 함수들
    const isDescendant = (node: TBaseTreeView, ancestorId: string): boolean => {
      if (node.id === ancestorId) return true;
      if (node.children) {
        return node.children.some((child) => isDescendant(child, ancestorId));
      }
      return false;
    };

    const isAncestor = (
      potentialAncestorId: string,
      nodeId: string
    ): boolean => {
      const ancestor = TreeUtils.findNode(tree, potentialAncestorId);
      if (!ancestor) return false;
      return isDescendant(ancestor, nodeId);
    };

    const targetNode = TreeUtils.findNode(tree, targetId);
    const draggedParent = TreeUtils.findParent(tree, draggedId);

    // 특수 케이스 1: 직접 자식을 부모 레벨로 승격
    if (
      draggedParent &&
      draggedParent.id === targetId &&
      position !== "inside"
    ) {
      return TreeUtils.moveChildToParentLevel(
        tree,
        draggedId,
        targetId,
        position
      );
    }

    // 특수 케이스 2: 후손을 조상 레벨로 승격
    if (
      targetNode &&
      isAncestor(targetId, draggedId) &&
      position !== "inside"
    ) {
      return TreeUtils.moveChildToParentLevel(
        tree,
        draggedId,
        targetId,
        position
      );
    }

    // 순환 참조 방지: 부모를 자식으로 이동 방지
    if (targetNode && isDescendant(targetNode, draggedId)) {
      return tree;
    }

    // 일반적인 이동: 제거 후 삽입
    let newTree = TreeUtils.removeNode(tree, draggedId);
    newTree = TreeUtils.insertNode(newTree, draggedNode, targetId, position);

    return newTree;
  },

  // 자식 노드를 부모 레벨로 승격시키는 함수
  moveChildToParentLevel: (
    tree: TBaseTreeView[],
    childId: string,
    parentId: string,
    position: "before" | "after"
  ): TBaseTreeView[] => {
    // 자식 노드 찾기
    const childNode = TreeUtils.findNode(tree, childId);
    if (!childNode) {
      return tree;
    }

    // 부모의 부모 찾기 (조부모)
    const grandParent = TreeUtils.findParent(tree, parentId);

    // 1. 자식 노드를 트리에서 제거
    let newTree = TreeUtils.removeNode(tree, childId);

    // 2. 부모와 같은 레벨에 삽입
    if (!grandParent) {
      // 부모가 루트 레벨에 있는 경우
      newTree = TreeUtils.insertAtRootLevel(
        newTree,
        childNode,
        parentId,
        position
      );
    } else {
      // 부모가 중첩되어 있는 경우, 조부모의 children 레벨에서 삽입
      newTree = newTree.map((node) => {
        if (node.id === grandParent.id) {
          return {
            ...node,
            children: TreeUtils.insertAtRootLevel(
              node.children || [],
              childNode,
              parentId,
              position
            ),
          };
        }
        if (node.children) {
          return {
            ...node,
            children: TreeUtils.insertNode(
              node.children,
              childNode,
              parentId,
              position
            ),
          };
        }
        return node;
      });
    }

    return newTree;
  },
};
