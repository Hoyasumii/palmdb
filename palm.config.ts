import { definePalmConfig } from "@/utils/define-palm-config";
import { z } from "zod";

const config = definePalmConfig({
  secret: "",
  enableFileSystem: true,
  schema: {
    account: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  },
});

export type Account = z.infer<typeof config.schema.account>;

export default config;
