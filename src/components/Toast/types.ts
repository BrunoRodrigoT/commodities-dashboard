type IToastTypes = 'success' | 'error' | 'warning' | 'info';

interface IToastProps {
  id: string | number;
  type: IToastTypes;
  message: string;
  duration?: number;
}

export type { IToastTypes, IToastProps };
