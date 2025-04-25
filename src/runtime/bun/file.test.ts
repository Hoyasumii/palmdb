import { describe } from "@/global/test";
import {beforeEach, it, expect} from "bun:test";
import Bun from 'bun';
import { File } from "./file";
import { join } from "node:path";

await describe("Testing Bun File Provider", () => {
	let sut: File;

	beforeEach(() => {
		sut = new File();
	});

	it("should write a New File", async () => {
		expect(sut.write("doc.txt", "Hello World")).resolves.toBe(
			`${join(global.palm.info.currDir, "doc.txt")}`,
		);

		await Bun.file("doc.txt").delete();
	});

	it("should read a File", async () => {
		await sut.write("doc.txt", "Hello World");

		expect(sut.read("doc.txt")).resolves.toBe("Hello World");

		await Bun.file("doc.txt").delete();
	});

	it("shouldn't read an inexistent File", async () => {
		expect(sut.read("doc2.txt")).rejects.toBeInstanceOf(Error);
	});
});
