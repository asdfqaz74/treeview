import { TreeItem } from "@mui/x-tree-view/TreeItem";

interface TreeItemData {
  id: string;
  label: string;
  disabled?: boolean;
  children?: TreeItemData[];
}

interface TreeItemProps {
  data: TreeItemData;
}

export default function TreeItemComponent({ data }: TreeItemProps) {
  return (
    <TreeItem itemId={data.id} label={data.label} disabled={data.disabled}>
      {data.children &&
        data.children.map((child) => (
          <TreeItemComponent key={child.id} data={child} />
        ))}
    </TreeItem>
  );
}
