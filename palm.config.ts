import { definePalmConfig } from "@/utils/define-palm-config";
import { z } from "zod";

const config = definePalmConfig({
	secret: "",
	collections: {
		account: {
			schema: z.object({
				name: z.string(),
				email: z.string().email(),
			}),
			rules: {
				uniqueKeys: [""]
			}
		}
	},
	// rules: {
	// 	uniqueKeys: {
	// 		account: [""]
	// 	}
	// }
});

type A = Array<keyof z.infer<typeof config.schema.account>>

const a: A = [""]

export default config;

// TODO: Alterar o Palm Config para
/* 
{
secret: string;
collections: {
	name: {
		schema: ZodSchema,
		rules: PalmConfigRules
	}
}
}
*/