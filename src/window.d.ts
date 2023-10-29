import { Store } from "./core/Store";
import { IAppState } from "./types/IAppState";

declare global {
  interface Window {
    store: Store<IAppState>;
  }
}

