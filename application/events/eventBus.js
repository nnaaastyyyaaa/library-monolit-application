class EventBus {
  constructor() {
    this.handlers = {};
  }

  subscribe(eventName, handler) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  publish(name, event) {
    const handlers = this.handlers[name] || [];

    for (const handler of handlers) {
      setImmediate(() => handler(event));
    }
  }
}

module.exports = { EventBus };
