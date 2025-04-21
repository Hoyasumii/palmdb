import { randomUUID } from "node:crypto";
import { beforeEach, expect, it } from "vitest";
import { z } from "zod";
import { describe } from "@/global/test";
import { Collection, Coconut } from "@/core";
import { faker } from "@faker-js/faker";

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

	it("should create a new entity", async () => {
		await expect(
			sut.create({
				name: faker.person.fullName(),
				email: faker.internet.email(),
			}),
		).resolves.toBeDefined();
	});

	it("should not create a invalid entity", async () => {
		await expect(
			sut.create({
				name: "Alan",
				email: "email",
			}),
		).rejects.toBeInstanceOf(Error);
	});

	it("should update a unique entity with an object", async () => {
		const firstEmail = faker.internet.email();

		const entityId = await sut.create({
			name: faker.person.fullName(),
			email: firstEmail,
		});

		const updatedEntity = await sut.updateUnique(entityId, {
			email: faker.internet.email(),
		});

		expect(updatedEntity._updatedAt).toBeDefined();
		expect(firstEmail === updatedEntity.email).toBeFalsy();
	});

	it("should update a unique entity with an method", async () => {
		const firstEmail = faker.internet.email();

		const entityId = await sut.create({
			name: faker.person.fullName(),
			email: firstEmail,
		});

		const updatedEntity = await sut.updateUnique(entityId, (entity) => ({
			...entity,
			email: faker.internet.email(),
		}));

		expect(updatedEntity._updatedAt).toBeDefined();
		expect(firstEmail === updatedEntity.email).toBeFalsy();
	});

	it("should not update a entity with invalid properties", async () => {
		const entityId = await sut.create({
			name: faker.person.fullName(),
			email: faker.internet.email(),
		});

		await expect(
			sut.updateUnique(entityId, { email: "testing" }),
		).rejects.toBeInstanceOf(Error);
	});

	it("should update a many entities", async () => {
		const name = faker.person.fullName();

		for (let i = 0; i < 10; i++) {
			if (i % 3 === 0) {
				await sut.create({
					name: faker.person.fullName(),
					email: faker.internet.email(),
				});
			}

			await sut.create({
				name,
				email: faker.internet.email(),
			});
		}
	});
	it.todo("should not update entities with invalid properties");
	it.todo("should not update inexistent entities");

	// it("should update a entity with where as a string and data as a object", async () => {
	// 	const entityId = await sut.create({
	// 		name: faker.person.fullName(),
	// 		email: faker.internet.email(),
	// 	});

	// 	const updatedEntity = await sut.update(entityId, {
	// 		name: "Alberto",
	// 	});

	// 	expect(updatedEntity.name).toBe("Alberto");
	// });

	// it("should update a entity with where as a string and data as a method", async () => {
	// 	const entityId = await sut.create({
	// 		name: faker.person.fullName(),
	// 		email: faker.internet.email(),
	// 	});

	// 	const desiredEmail = faker.internet.email();

	// 	const updatedEntity = await sut.update(entityId, (entity) => {
	// 		entity.email = desiredEmail;

	// 		return entity;
	// 	});

	// 	expect(updatedEntity.email).toBe(desiredEmail);
	// });

	// it.todo("should update a entity with where as a method and data as a object");
	// it.todo("should update a entity with where as a method and data as a method");

	// it.todo("should not update a entity with invalid where as string");
	// it.todo("should not update a entity with invalid data as object");
	// it.todo("should not update a entity with invalid data as method");

	// it.todo("should read a entity");
	// it.todo("should read an group of entities");
	// it.todo("should not read an inexistent entity");

	// it.todo("should delete a entity");
	// it.todo("should delete an group of entities");
	// it.todo("should not delete an inexistent entity");

	// it("should get a collection length", async () => {
	// 	for (let i = 0; i < 5; i++) {
	// 		await sut.create({
	// 			name: faker.person.fullName(),
	// 			email: faker.internet.email(),
	// 		});
	// 	}

	// 	await expect(sut.length()).resolves.toBe(5);
	// });
});
