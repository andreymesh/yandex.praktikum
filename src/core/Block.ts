/* eslint-disable @typescript-eslint/no-explicit-any */
import EventBus from "./EventBus";
import { nanoid } from 'nanoid';
import Handlebars from "handlebars";
import { isDeepEqual } from "../utils";

interface BaseProps {
  events?: Record<string, any>;
  [key: string]: any;
}

export type IProps<T = Record<string,any>> = BaseProps & T;

class Block<Props extends Record<string, any> = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
        FLOW_CWUM: "flow:component-will-unmount"
    } as const;

    public id = nanoid();
    protected props: IProps<Props>;
    protected _element: HTMLElement | null = null;
    protected _meta: { props: IProps<Props>; } | null = null;
    private _eventBus: () => EventBus;
    private children: Record<string, Block<Props>> = {};
    protected refs: Record<string, Block<Props>> = {};

  constructor(propsWithChildren = {} as IProps<Props>) {
      const eventBus = new EventBus();
      const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
          props
        };

        this.children = children;
        this.props = this._makePropsProxy(props, this);

        this._eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: IProps<Props>) {
      const props: any = {};
      const children: Record<string, Block<Props>> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

      return { props, children };
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWUM, this._componentWillUnmount.bind(this));
    }

    private _init() {
        this.init();

        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {
    }

    public dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

  private _componentDidUpdate(oldProps: IProps<Props>, newProps: IProps<Props>) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

    protected componentDidUpdate(oldProps: IProps<Props>, newProps: IProps<Props>) {
      return isDeepEqual(oldProps, newProps);
    }

    private _componentWillUnmount() {
        this.componentWillUnmount()
        this._removeEvents();
  }

  protected componentWillUnmount() {
    this._removeEvents();
  }

  setProps = (nextProps: IProps<Props>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

    

    get element() {
        return this._element;
    }

    public value() {
        return this._element && (<HTMLInputElement>this._element).value ? (<HTMLInputElement>this._element).value : '';
    }

    public getRefs() {
        return this.refs
  }
  
  private _render() {
    const fragment = this.compile(this.render(), this.props);
    
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }
    
  _addEvents() {
    const {events = {}} = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
        this._element?.addEventListener(eventName, events[eventName]);
    });
  }
  
  _removeEvents() {
    const {events = {}} = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
        this._element?.removeEventListener(eventName, events[eventName]);
    });
  }
  
  private compile(template: string, context: object) {

    const contextAndStubs = {...context, __children: [] as Array<{ component: unknown, embed(node: DocumentFragment): void }>, __refs: this.refs};

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }
  
  _makePropsProxy(props: any, self: Block<Props>) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target }

        target[prop] = value;

        self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  transformToString(): string {
    const container = document.createElement('div');
    container.appendChild(this._element as HTMLElement);
    return container.innerHTML;
  }

  public show() {
    const app = document.getElementById('app');
    const htmlElement = this.getContent();
    if (!app?.firstElementChild) {
      app?.append(document.createElement('div'));
    }
    if (htmlElement) {
      app?.firstElementChild?.replaceWith(htmlElement);
    }
  }

  public remove() {
    this._removeEvents();
    this._element?.remove();
  }
}

export default Block;
