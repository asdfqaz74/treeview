// 공통된 트리뷰 타입 정의

export type TBaseTreeView = {
  id: string;
  label: string;
  disabled?: boolean;
  children?: TBaseTreeView[];
};
