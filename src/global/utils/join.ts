import path from "path";
import os from "os";

export const join =
  os.platform() === "win32" ? path.win32.join : path.posix.join;
