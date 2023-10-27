import Block from "./Block";
import Route from "./Route";

class Router {
  private static __instance: Router;
  private routes: Route[] | undefined;
  private history: History | undefined;
  private _currentRoute: null | Route=null;
  private _rootQuery: string | undefined;
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    this.history = window.history;

    this._currentRoute = null;

    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public static getRouter(){
      return this.__instance;
  }

  public get currentRoute() {
    return this._currentRoute?.pathname;
  }

  use(pathname: string, block: typeof Block, context = {}) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, context });
    this.routes?.push(route);
    return this;
  }

  start() {
    window.onpopstate = event => {
      this._onRoute((event?.currentTarget as Window)?.location?.pathname);
    };    
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname:string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  update() {
    this.history?.go(0);
  }

  getRoute(pathname: string) {
    return this.routes?.find(route => route.match(pathname));
  }
}

export default Router;
