import { HashMap } from "./hashmap.js";

describe("Testing my hashmap implementation", () => {
  let map;
  beforeEach(() => {
    map = new HashMap();

    map.set("task", 1);
    map.set("tasktwo", 2);
    map.set("taskthree", 3);
  });

  test("Expect to hash a string", () => {
    const hash = map.hash("javascript");
    expect(hash).toBeGreaterThanOrEqual(0);
    expect(hash).toBeLessThan(16);
  });
  test("Should return the value", () => {
    expect(map.get("task")).toBe(1);
  });
  test("Should return null when not found key", () => {
    expect(map.get("item")).toBe(null);
  });
  test("should return false if key not exists", () => {
    expect(map.has("taskxxx")).toBe(false);
  });
  test("should return true if key exists", () => {
    expect(map.has("tasktwo")).toBe(true);
  });
  test("Should return true if i delete a", () => {
    expect(map.remove("task")).toBe(true);
  });
  test("should return the maximum stored keys in the hashmap", () => {
    expect(map.length()).toBe(3);
  });
  test("should keys be equal to ", () => {
    expect(map.keys()).toEqual(["task", "tasktwo", "taskthree"]);
  });
  test("should values be equal to ", () => {
    expect(map.values()).toEqual([1, 2, 3]);
  });
  test("should return the pairs of table hash ", () => {
    expect(map.entries()).toEqual([
      ["task", 1],
      ["tasktwo", 2],
      ["taskthree", 3],
    ]);
  });
  test("should clear the hashmap", () => {
    expect(map.clear()).toBeUndefined();
  });
});
