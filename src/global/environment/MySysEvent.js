import EventEmitter from 'events';

export function MyRegisterEvent(eventName, eventCB) {
    if (global.myEventEmitter === undefined) {
        global.myEventEmitter = new EventEmitter();
    }
    // 注册事件
    global.myEventEmitter.addListener(eventName, eventCB);
}

export function MyUnregisterEvent(eventName, eventCB) {
    if (global.myEventEmitter !== undefined) {
        // 取消事件
        global.myEventEmitter.removeListener(eventName, eventCB);
    }
}

export function MySendEvent(eventName, data) {
    if (global.myEventEmitter) {
        global.myEventEmitter.emit(eventName, data);
    }
}
