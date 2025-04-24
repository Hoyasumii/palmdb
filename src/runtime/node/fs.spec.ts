import { beforeEach, expect, it } from "vitest";
import { FS } from "./fs";
import { describe } from "@/global/test";
import { join } from "node:path";

describe("Testing Node.js FS Provider", () => {
	let sut: FS;

	beforeEach(() => {
		sut = new FS();
	});

	it("should touch a file", async () => {
		await expect(sut.touch("file.txt")).resolves.toBe(
			join(global.palm.info.currDir, "file.txt"),
		);

		await sut.rm("file.txt");
	});

	it("should remove a file", async () => {
		await sut.touch("file.txt");

		await expect(sut.rm("file.txt")).resolves.toBeTruthy();
	});

	it("shouldn't remove an inexistent file", async () => {
		await expect(sut.rm("file.txt")).resolves.toBeFalsy();
	});

	it("should create a directory", async () => {
		await expect(sut.mkDir("__test__")).resolves.toBeDefined();
		await sut.rm("__test__", true);
	});

	it("shouldn't create an existent directory", async () => {
		await sut.mkDir("__test__");
		await expect(sut.mkDir("__test__")).rejects.toBeInstanceOf(Error);
		await sut.rm("__test__", true);
	});

	it("should check if the file exists", async () => {
		await sut.touch("doc.txt");

		expect(sut.exists("doc.txt")).toBeTruthy();

		await sut.rm("doc.txt");
	});

	it("should check if the file doesn't exists", async () => {
		expect(sut.exists("doc2.txt")).toBeFalsy();
	});

	it("should check if the file is a file", async () => {
		await sut.touch("doc.txt");
		await expect(sut.isFileOrDir("doc.txt")).resolves.toBe("file");
		await sut.rm("doc.txt");
	});

	it("should verify if the directory isn't a file", async () => {
		await sut.mkDir("__test__");
		await expect(sut.isFileOrDir("__test__")).resolves.not.toBe("file");
		await sut.rm("__test__", true);
	});
});
