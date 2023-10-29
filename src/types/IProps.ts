/* eslint-disable @typescript-eslint/no-explicit-any */
interface BaseProps {
  events?: Record<string, any>;
  [key: string]: any;
}

export type IProps<T = Record<string,any>> = BaseProps & T;
