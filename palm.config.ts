import { definePalmConfig } from "@/utils/define-palm-config";
import { z } from "zod";

const config = definePalmConfig({
	secret: "",
	schema: {
		account: z.object({
			name: z.string(),
			email: z.string().email(),
		}),
	},
});

export default config;
