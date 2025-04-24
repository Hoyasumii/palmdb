import { Coconut } from "./core";
import { Sea } from "./core/sea";

type SettingPalmProperties = {
  secret: string;
};

export default ({ secret }: SettingPalmProperties) => {
  global.palm = {
    cache: new Sea(),
    coconut: new Coconut(),
    info: {
      currDir: process.env.PWD || "",
      dbFolderPath: ".palm",
      secret,
    },
    randomUUID: undefined,
    save: undefined,
  };
};
