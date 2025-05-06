import { it, expect, afterAll, beforeEach } from "vitest";
import { Provider } from "./provider";
import { describe } from "@/global/test";
import { PathNotFoundError } from "@/errors";

await describe("Testing Node.js Provider", () => {
  let sut: Provider;

  beforeEach(() => {
    sut = new Provider();
  });

  afterAll(async () => {
    await sut.fs.rm("testing.txt");
  });

  it("should write a new file", async () => {
    await expect(sut.save("testing.txt", Buffer.from("hello world"))).resolves.toBeDefined();
  });

  it("should get a file content", async () => {
    await expect(sut.get("testing.txt")).resolves.toBeDefined();
  });

  it("should get a randomUUID", () => {
    const targetUUID = sut.randomUUID();

    expect(targetUUID).toBeDefined();
  });

  it("should gives an PathNotFoundError to get a inexistent file", async () => {
    await expect(sut.get("blibli.txt")).rejects.toBeInstanceOf(
      PathNotFoundError
    );
  });
});
