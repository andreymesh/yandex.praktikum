/* eslint-disable @typescript-eslint/no-explicit-any */
import Block, { IProps } from "./Block"

class Route {
  private _pathname: string;
  private readonly _blockClass: typeof Block;
  private _block: Block | null = null;
  private readonly _props: IProps;
  
  constructor(pathname: string, view: typeof Block, props: Record<string, any>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }
  

  public get pathname() {
    return this._pathname;
  }
  
  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }
  


  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props.context);
      this.render();
    } else {
      this._block.show();
    }
  }
}

export default Route;
