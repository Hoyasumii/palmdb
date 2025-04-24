import { Coconut } from "./core";
import { Sea } from "./core/sea";
import { isNodeOrBun } from "./global/utils";
import { Provider as NodeProvider } from "./runtime/node/provider";
import { Provider as BunProvider } from "./runtime/bun/provider";

type SettingPalmProperties = {
  secret: string;
};

export default ({ secret }: SettingPalmProperties) => {
  const runner = isNodeOrBun();

  const runtime = runner === "node" ? new NodeProvider() : new BunProvider();

  global.palm = {
    cache: new Sea(),
    coconut: new Coconut(),
    info: {
      currDir: process.env.PWD || "",
      dbFolderPath: ".palm",
      secret,
    },
    randomUUID: runtime.randomUUID,
    save: runtime.save,
  };
};
