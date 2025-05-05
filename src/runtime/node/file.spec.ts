import { beforeEach, expect, it } from "vitest";
import { File } from "./file";
import { posix } from "node:path";
import { rm } from "node:fs/promises";
import { describe } from "@/global/test";

await describe("Testing Node.js File Provider", () => {
	let sut: File;

	beforeEach(() => {
		sut = new File();
	});

	it("should write a New File", async () => {
		await expect(sut.write("doc.txt", "Hello World")).resolves.toBe(
			`${posix.join(global.palm.info.currDir, "doc.txt")}`,
		);

		await rm("doc.txt");
	});

	it("should read a File", async () => {
		await sut.write("doc.txt", "Hello World");

		await expect(sut.read("doc.txt")).resolves.toBe("Hello World");

		await rm("doc.txt");
	});

	it("shouldn't read an inexistent File", async () => {
		await expect(sut.read("doc2.txt")).rejects.toBeInstanceOf(Error);
	});
});
