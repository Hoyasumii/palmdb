import { Coconut, Sea } from "./core";
import { isNodeOrBun } from "./global/utils";

type SettingPalmProperties = {
  secret: string;
};

export default async ({ secret }: SettingPalmProperties) => {
  const runner = isNodeOrBun();

  const runtime =
    runner === "node"
      ? (await import("./runtime/node")).default
      : (await import("./runtime/bun")).default;

  global.palm = {
    cache: new Sea(),
    coconut: new Coconut(),
    info: {
      currDir: process.env.PWD || "",
      dbFolderPath: ".palm",
      secret,
    },
    randomUUID: runtime.randomUUID,
    save: async () => "",
  };
};
