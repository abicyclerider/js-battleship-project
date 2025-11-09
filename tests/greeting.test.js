import { getGreeting } from "../src/modules/greeting.js";

test("getGreeting returns correct message", () => {
  expect(getGreeting()).toBe("Hello from The Odin Project!");
});
