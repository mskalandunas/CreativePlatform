(function() {
  export class EventEmitter {
    // utils/EventEmitter.js
    static GLOBAL_ACCESSOR = '__BROWSER_CLIENT_EVENT_EMITTER__';

    constructor() {
      this._events = {};
    }

    /**
     * Emit an event to all registered subscribers
     * @param {Object} event -- { type: String, ...Optional properties }
     * @returns this
     */
    emit(event) {
      if (this._events[event.type]) {
        this._events[event.type].forEach(handler => handler(event));
      }

      return this;
    }

    /**
     * Register an event subscriber and handler
     * @param {String} eventType  -- String defining the
     * @param {Function} handler -- A callback fired when specified event is published
     * @returns
     */
    on(eventType, handler) {
      if (!this._events[eventType]) {
        this._events[eventType] = [];
      }
      this._events[eventType].push(handler);

      return this;
    }
  }

  // index.js
  (function main(BrowserEventEmitter) {
    window[BrowserEventEmitter.GLOBAL_ACCESSOR] = new BrowserEventEmitter();
  })(EventEmitter);
});