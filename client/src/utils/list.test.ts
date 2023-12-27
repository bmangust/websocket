import { expect, test } from "@jest/globals";
import { insertOneItemInList } from "./lists";

test("insert null in array", () => {
  expect(insertOneItemInList(JSON.parse("null"), [])).toBe([]);
});
