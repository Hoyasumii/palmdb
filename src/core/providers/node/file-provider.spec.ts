import { beforeAll, describe, expect, it, test } from "vitest";
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

	it("should read a File", async () => {
		await expect(sut.read("doc.txt")).resolves.toBe("Hello World");
	});

	it("shouldn't read an inexistent File", async () => {
		await expect(sut.read("doc2.txt")).rejects.toBeInstanceOf(Error);
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

	it("shouldn't remove an inexistent file", async () => {
		await expect(sut.remove("doc.txt")).rejects.toBeInstanceOf(Error);
	});

	it("should make a new directory", async () => {
		await expect(sut.mkDir("testing")).resolves.toBe(join(currDir, "testing"));
	});

	it("should't make an existent directory", async () => {
		await expect(sut.mkDir("testing")).rejects.toBeInstanceOf(Error);
	});

	it("should remove a directory", async () => {
		await expect(sut.rmDir("testing")).resolves.toBe(join(currDir, "testing"));
	});

	it("shouldn't remove an inexistent directory", async () => {
		await expect(sut.rmDir("testing")).rejects.toBeInstanceOf(Error);
	});
});
