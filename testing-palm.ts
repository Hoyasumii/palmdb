import { Palm } from "@/core";
import palmConfig from "./palm.config";

const palm = new Palm(palmConfig);

await palm.start();

const account = await palm.pick("account");

const accountId = await account.create({
	name: "Alan",
	email: "alanreisanjo@gmail.com",
});

await account.update(accountId, {
	name: "Alan Reis",
});

// await account.delete((target) => true);
