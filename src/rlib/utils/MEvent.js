import EventEmitter from 'events';

class MEvent {
    register(eventName, eventCB) {
        if (global.myEventEmitter === undefined) {
            global.myEventEmitter = new EventEmitter();
        }
        // 注册事件
        global.myEventEmitter.addListener(eventName, eventCB);
    }

    unregister(eventName, eventCB) {
        if (global.myEventEmitter !== undefined) {
            // 取消事件
            global.myEventEmitter.removeListener(eventName, eventCB);
        }
    }

    send(eventName, data) {
        if (global.myEventEmitter) {
            global.myEventEmitter.emit(eventName, data);
        }
    }
}

export default new MEvent();
