/* eslint-disable @typescript-eslint/no-explicit-any */
import EventBus from "./EventBus";

export enum StoreEvents {
    Updated = 'Updated'
}

export class Store<State extends Record<string, any>> extends EventBus {
    private state = {} as State;

    constructor(initState: State) {
        super();
        this.state = initState;
        this.set(this.state);
    }

    public getState() {
        return this.state;
    }

    public set(nextState: Partial<State>) {
        const prevState = {...this.state};
        this.state = {...this.state, ...nextState};
        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}
