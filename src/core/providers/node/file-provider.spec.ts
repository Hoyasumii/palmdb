import { beforeAll, describe, expect, it } from "vitest";
import { FileProvider } from "./file-provider";
import { cwd } from "node:process";
import { join } from "node:path";

describe("Testing Node.js File Provider", () => {
	let sut: FileProvider;
	const currDir = cwd();

	beforeAll(() => {
		sut = new FileProvider(currDir);
	});

	it("should write a New File", async () => {
		await expect(sut.write("doc.txt", "Hello World")).resolves.toBe(
			`${join(currDir, "doc.txt")}`,
		);
	});

	it("shoult read a File", async () => {
		await expect(sut.read("doc.txt")).resolves.toBe("Hello World");
	});

	it("should check if the file exists", async () => {
		await expect(sut.exists("doc.txt")).resolves.toBeTruthy();
	});

	it("should check if the file doesn't exists", async () => {
		await expect(sut.exists("doc2.txt")).resolves.toBeFalsy();
	});

	it("should check if the file is a file", async () => {
		await expect(sut.isFileOrDir("doc.txt")).resolves.toBe("file");
	});

	it("should remove a file", async () => {
		await expect(sut.remove("doc.txt")).resolves.toBe(join(currDir, "doc.txt"));
	});
});
