import { TreeItem } from "@mui/x-tree-view/TreeItem";

interface TreeItemProps {
  itemId: string;
  label: string;
  disabled?: boolean;
  children?: TreeItemProps[];
}

export default function TreeItemComponent({
  itemId,
  label,
  disabled = false,
  children,
}: TreeItemProps) {
  return (
    <TreeItem itemId={itemId} label={label} disabled={disabled}>
      {children &&
        children.map((child) => (
          <TreeItem
            key={child.itemId}
            itemId={child.itemId}
            label={child.label}
            disabled={child.disabled}
          />
        ))}
    </TreeItem>
  );
}
