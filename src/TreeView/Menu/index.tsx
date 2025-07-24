import { TreeItem } from "@mui/x-tree-view";
import type { TBaseTreeView } from "../types";
import MenuIcon from "@mui/icons-material/Menu";

export type MenuTreeViewProps = TBaseTreeView & { type: "menu" };

const MenuTreeView = ({ id, label, disabled, children }: MenuTreeViewProps) => {
  const hasChildren = children && children.length > 0;

  return (
    <TreeItem
      itemId={id}
      label={hasChildren ? "- " + label : label}
      disabled={disabled}
      slots={{
        endIcon: MenuIcon,
      }}
    >
      {children &&
        children.map((child) => (
          <MenuTreeView
            key={child.id}
            id={child.id}
            label={child.label}
            disabled={child.disabled}
            children={child.children}
            type="menu"
          />
        ))}
    </TreeItem>
  );
};

export default MenuTreeView;
