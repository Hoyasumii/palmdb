import { describe } from "@/test";
import { EntityType } from "./entity-type";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";

type User = {
	name: string;
};

describe("Testing Entity Type", () => {
	let sut: EntityType<User>;

	beforeEach(async () => {
		vi.useFakeTimers();

		vi.setSystemTime(new Date(2023, 11, 10));

		sut = new EntityType({ name: "Alan" }, randomUUID());
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should update a entity", () => {
		sut.update = { name: "Alan Reis" };

		expect(sut.value.name).toBe("Alan Reis");
	});

	it(`should update a entity, and update "_updatedAt" parameter`, () => {
		const targetDate = new Date(2025, 3, 18);

		vi.setSystemTime(targetDate);

		sut.update = { name: "Alan Reis Anjos" };

		expect(sut.value._updatedAt?.toISOString()).toBe(targetDate.toISOString());
	});

	it("should get a value without EntityType base parameters", () => {
		expect("_id" in sut.baseValue).toBeFalsy();
	});

	it("should get a value with EntityType base parameters", () => {
		expect("_id" in sut.value).toBeTruthy();
	});
});
