import { EventEmitter } from "events";

/**
 * Represents a class that handles security events.
 */
class SecurityEvents extends EventEmitter {
  /**
   * Reports an attack.
   * @param type - The type of attack.
   * @param value - The value associated with the attack.
   * @param message - An optional message describing the attack.
   */
  reportAttack(type: string, value: any, message?: string) {
    this.emit("attackDetected", { type, value, message });
  }
}

export const securityEvents = new SecurityEvents();
