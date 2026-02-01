type EventHandler<T = any> = (data: T) => void;

class EventBus {
  private listeners: Record<string, EventHandler[]> = {};

  on<T>(event: string, handler: EventHandler<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  }

  off<T>(event: string, handler: EventHandler<T>): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(h => h !== handler);
  }

  emit<T>(event: string, data: T): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(handler => handler(data));
  }
}

export const events = new EventBus();

// Event Constants
export const EVENTS = {
  IDENTITY_CHANGED: 'identity:changed',
  SYSTEM_CHANGED: 'system:changed',
  VISUAL_PARAM_CHANGED: 'visual:param_changed',
  EXPORT_REQUESTED: 'export:requested',
};
