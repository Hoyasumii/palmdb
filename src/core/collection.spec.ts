import { randomUUID } from "node:crypto";
import { beforeEach, it } from "vitest";
import { z } from "zod";
import { describe } from "@/test";
import { Collection, Coconut } from "@/core";

const User = z.object({
	name: z.string(),
	email: z.string().email(),
});

type User = z.infer<typeof User>;

describe("Testing Collection Operations", () => {
	let sut: Collection<User>;

	beforeEach(() => {
		sut = new Collection<User>(
			{},
			new Coconut(),
			User,
			randomUUID,
			async () => {},
		);
	});

	it.todo("should create a new entity");
	it.todo("should not create a invalid entity");

	it.todo("should update a entity with where as a string and data as a object");
	it.todo("should update a entity with where as a string and data as a method");
	it.todo("should update a entity with where as a method and data as a object");
	it.todo("should update a entity with where as a method and data as a method");

	it.todo("should not update a entity with invalid where as string");
	it.todo("should not update a entity with invalid data as object");
	it.todo("should not update a entity with invalid data as method");

	it.todo("should read a entity");
	it.todo("should read an group of entities");
	it.todo("should not read an inexistent entity");

	it.todo("should delete a entity");
	it.todo("should delete an group of entities");
	it.todo("should not delete an inexistent entity");

	it.todo("should get a collection length");
});
