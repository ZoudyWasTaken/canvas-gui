import { Util } from "./Util";

export default class EventListenerUtil extends Util {
    private listeners: Map<string, Array<Function>> = new Map;

    addEventListener(name: string, func: Function): void {
        if (!this.listeners.has(name))
            this.listeners.set(name, []); 
        this.listeners.get(name).push(func);
        return;
    }

    removeEventListener(name: string, func: Function): void {
        if (!this.listeners.has(name))
            return;
        
        console.log(this.listeners);

        var index: number = this.listeners.get(name).indexOf(this.listeners.get(name).find((a: Function) => a == func));
        this.listeners.get(name).splice(index, 1);

        console.log(this.listeners);

        return;
    }

    emit(name: string, data: object): void {
        if (!this.listeners.has(name))
            return;
        this.listeners.get(name).forEach(function(f) {
            f(data);
        });
        return;
    }
}
