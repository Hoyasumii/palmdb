import { Coconut } from "./core";
import { Sea } from "./core/sea";
import { isNodeOrBun } from "./global/utils";
import { Provider } from "./runtime/node/provider";

type SettingPalmProperties = {
  secret: string;
};

export default ({ secret }: SettingPalmProperties) => {
  const runner = isNodeOrBun();

  if (runner === "bun") throw new Error();

  const runtime = new Provider();

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
