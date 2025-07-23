```
    src/
    └─ TreeView/
        ├── treeData.json # TreeView 컴포넌트에 들어갈 더미데이터
        ├── TreeItems.tsx # TreeView 를 구성하는 컴포넌트
        └── TreeView.tsx
```

# Sample

![예시사진](public/image.png)

## Item identifier

각 트리 아이템에는 고유한 `itemId`가 있어야 합니다. 이는 내부적으로 다양한 모델에서 항목을 식별하고 업데이트에서 추적하는 데 사용됩니다.

## Item label

`label`을 각각의 트리 아이템 컴포넌트에 전달해줘야합니다.

## Disabled items

`disabled` 속성을 사용하여 트리 아이템 컴포넌트를 비활성화 할 수 있습니다.
