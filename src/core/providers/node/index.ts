import { cwd } from "node:process";
import { Provider } from "./provider";
import { FileProvider } from "./file-provider";

export default new Provider(cwd(), new FileProvider(cwd()));
