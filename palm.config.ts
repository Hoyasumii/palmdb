import { defineCollection } from "@/utils/define-collection";
import { definePalmConfig } from "@/utils/define-palm-config";
import { z } from "zod";

const config = definePalmConfig({
	secret: "",
	collections: {
		account: defineCollection({
			schema: z.object({
				name: z.string(),
				email: z.string().email(),
			}),
			rules: {
				uniqueKeys: ["email"],
			},
		}),
	},
});

export default config;
