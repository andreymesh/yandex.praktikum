import { Store } from "./core";
import { IAppState } from "./types";

declare global {
  interface Window {
    store: Store<IAppState>;
  }
}

