import { describe } from "@/global/test";
import { Entity } from ".";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";

type User = {
	name: string;
};

describe("Testing Entity", () => {
	let sut: Entity<User>;

	beforeEach(async () => {
		vi.useFakeTimers();

		vi.setSystemTime(new Date(2023, 11, 10));

		sut = new Entity({ value: { name: "Alan" }, id: randomUUID() });
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should update a entity", () => {
		sut.update({ name: "Alan Reis" });

		expect(sut.value.name).toBe("Alan Reis");
	});

	it(`should update a entity, and update "_updatedAt" parameter`, () => {
		const targetDate = new Date(2025, 3, 18);

		vi.setSystemTime(targetDate);

		sut.update({ name: "Alan Reis Anjos" });

		expect(sut.value._updatedAt?.toISOString()).toBe(targetDate.toISOString());
	});

	it("should get a value with EntityType base parameters", () => {
		expect("_id" in sut.value).toBeTruthy();
	});

	it("should serialize a Entity", () => {
		expect(sut.serialize().length).toBe(2);
	});

	it("should deserialize a string and make a new Entity", () => {
		sut.update({
			name: "Alberto",
		});

		const content = sut.serialize();

		expect(Entity.deserialize(...content).value._id).toBe(content[0]);
	});
});
