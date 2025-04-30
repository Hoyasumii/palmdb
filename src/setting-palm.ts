import { ResourceRequester, Cache } from "./core";
import { isNodeOrBun } from "./global/utils";

type SettingPalmProperties = {
  secret: string;
  testing?: boolean;
};

export default async ({ secret, testing }: SettingPalmProperties) => {
  const runner = isNodeOrBun();

  const runtime =
    runner === "node"
      ? (await import("./runtime/node")).default
      : (await import("./runtime/bun")).default;

  global.palm = {
    cache: new Cache(),
    request: new ResourceRequester(),
    info: {
      currDir: process.cwd(),
      dbFolderPath: ".palm",
      secret,
    },
    randomUUID: runtime.randomUUID,
    save: !testing ? runtime.save : async () => "",
  };
};
