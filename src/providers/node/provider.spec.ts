import { it, expect, afterAll, beforeEach } from "vitest";
import { Provider } from "./provider";
import { z } from "zod";
import { describe } from "@/test";

describe("Testing Node.js Provider", () => {
	let sut: Provider;

	beforeEach(() => {
		sut = new Provider();
	});

	afterAll(async () => {
		await sut.fs.rm("testing.txt");
	});

	it("should write a new file", async () => {
		await expect(sut.save("testing.txt", "hello world")).resolves.toBeDefined();
	});

	it("should get a file content", async () => {
		await expect(sut.get("testing.txt")).resolves.toBeDefined();
	});

	it("should get a randomUUID", () => {
		const uuidSchema = z.string().uuid();
		const targetUUID = sut.randomUUID();

		expect(uuidSchema.safeParse(targetUUID).success).toBeTruthy();
	});
});
