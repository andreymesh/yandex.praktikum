/* eslint-disable @typescript-eslint/no-explicit-any */
export type Listener<T extends any[] = any[]> = (...args: T) => void;

class EventBus<E extends string = string, M extends { [K in E]: any[] } = Record<E, any[]>> {
  private listeners: { [key in E]?: Listener<M[E]>[] } = {};

  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push?.(callback);
  }

  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback,
    );
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]!.forEach(function (listener) {
      listener(...args);
    });
  }
}

export default EventBus;
