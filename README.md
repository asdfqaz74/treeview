```tsx
import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeview";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

export default function App() {
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        <TreeItem itemId="grid" label="Data Grid">
          <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
          <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
          <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
        </TreeItem>
        <TreeItem itemId="pickers" label="Date and Time Pickers">
          <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
          <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
        </TreeItem>
        <TreeItem itemId="charts" label="Charts">
          <TreeItem itemId="charts-community" label="@mui/x-charts" />
          <TreeItem itemId="charts-pro" label="@mui/x-charts-pro" />
        </TreeItem>
        <TreeItem itemId="tree-view" label="Tree View" disabled>
          <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
          <TreeItem itemId="tree-view-pro" label="@mui/x-tree-view-pro" />
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
}
```

## Item identifier

각 트리 아이템에는 고유한 `itemId`가 있어야 합니다. 이는 내부적으로 다양한 모델에서 항목을 식별하고 업데이트에서 추적하는 데 사용됩니다.

## Item label

`label`을 각각의 트리 아이템 컴포넌트에 전달해줘야합니다.

## Disabled items

`disabled` 속성을 사용하여 트리 아이템 컴포넌트를 비활성화 할 수 있습니다.
