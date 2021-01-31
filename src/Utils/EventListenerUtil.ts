import { Util } from "./Util";

export default class EventListenerUtil extends Util {
    private listeners: Map<string, Array<Function | boolean>> = new Map;

    addEventListener(name: string, func: Function, removable?: boolean): void {
        if (!this.listeners.has(name))
            this.listeners.set(name, []); 
        var listeners = this.listeners.get(name)
        listeners.push(func);
        listeners.push(removable || true);
        return;
    }

    removeEventListener(name: string, func: Function): void {
        if (!this.listeners.has(name))
            return;
        
        console.log(this.listeners);

        var listeners = this.listeners.get(name);
        var index: number = listeners.indexOf(listeners.find((a: Function) => a == func));
        if (listeners[index + 1])
            this.listeners.get(name).splice(index, 1);

        console.log(this.listeners);

        return;
    }

    emit(name: string, data: object): void {
        if (!this.listeners.has(name))
            return;
        this.listeners.get(name).forEach(function(f) {
            if (f instanceof Function)
                f(data);
        });
        return;
    }
}