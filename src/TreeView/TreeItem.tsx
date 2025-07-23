import { TreeItem } from "@mui/x-tree-view/TreeItem";
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

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
  const hasChildren = data.children && data.children.length > 0;
  
  return (
    <TreeItem 
      itemId={data.id} 
      label={data.label} 
      disabled={data.disabled}
      slots={{
        collapseIcon: hasChildren ? FolderOpenIcon : undefined,
        expandIcon: hasChildren ? FolderIcon : undefined,
      }}
    >
      {data.children &&
        data.children.map((child) => (
          <TreeItemComponent key={child.id} data={child} />
        ))}
    </TreeItem>
  );
}
