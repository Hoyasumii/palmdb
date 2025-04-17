import { afterAll, beforeAll, expect, it } from "vitest";
import { File } from "./file";
import { join } from "node:path";
import { rm } from "node:fs/promises";
import { describe } from "@/test";

describe("Testing Node.js File Provider", () => {
	let sut: File;

	beforeAll(() => {
		sut = new File();
	});

	afterAll(async () => {
		await rm("doc.txt");
	});

	it("should write a New File", async () => {
		await expect(sut.write("doc.txt", "Hello World")).resolves.toBe(
			`${join(process.palm.currDir, "doc.txt")}`,
		);
	});

	it("should read a File", async () => {
		await sut.write("doc.txt", "Hello World");

		await expect(sut.read("doc.txt")).resolves.toBe("Hello World");
	});

	it("shouldn't read an inexistent File", async () => {
		await expect(sut.read("doc2.txt")).rejects.toBeInstanceOf(Error);
	});
});
