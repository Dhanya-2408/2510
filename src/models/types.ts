type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
type InputFocusEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

type OnclickEvent = React.MouseEvent<HTMLButtonElement>;
type OnSubmitEvent = React.FormEvent<HTMLFormElement>;

type ChildrenType = {
  children: React.ReactNode;
};

type AsyncData<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
};

export type {
  OnclickEvent,
  OnSubmitEvent,
  ChildrenType,
  InputChangeEvent,
  InputFocusEvent,
  AsyncData,
};
