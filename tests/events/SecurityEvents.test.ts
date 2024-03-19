import { securityEvents } from "../../src";

describe("SecurityEvents", () => {
  it("should emit attackDetected event with correct payload", (done) => {
    const type = "xss";
    const value = "<script>alert('XSS')</script>";
    const message = "XSS attack detected!";

    securityEvents.on("attackDetected", (payload) => {
      expect(payload).toEqual({ type, value, message });
      done();
    });

    securityEvents.reportAttack(type, value, message);
  });
});
