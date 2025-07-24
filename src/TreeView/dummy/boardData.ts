export const boardData = {
  treeItems: [
    {
      id: "projects",
      label: "프로젝트",
      children: [
        {
          id: "frontend",
          label: "Frontend",
          children: [
            { id: "react-app", label: "React App" },
            { id: "vue-app", label: "Vue App" },
            { id: "angular-app", label: "Angular App" },
          ],
        },
        {
          id: "backend",
          label: "Backend",
          children: [
            { id: "node-api", label: "Node.js API" },
            { id: "python-api", label: "Python API" },
            { id: "java-api", label: "Java API" },
          ],
        },
      ],
    },
    {
      id: "documents",
      label: "문서",
      children: [
        { id: "readme", label: "README.md" },
        { id: "changelog", label: "CHANGELOG.md" },
        { id: "license", label: "LICENSE" },
      ],
    },
    {
      id: "config",
      label: "설정 파일",
      children: [
        { id: "package-json", label: "package.json" },
        { id: "tsconfig", label: "tsconfig.json" },
        { id: "eslint", label: ".eslintrc.js" },
      ],
    },
    {
      id: "assets",
      label: "에셋",
      disabled: true,
      children: [
        { id: "images", label: "이미지" },
        { id: "fonts", label: "폰트" },
        { id: "icons", label: "아이콘" },
      ],
    },
  ],
};
