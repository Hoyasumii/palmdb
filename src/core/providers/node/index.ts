import { cwd } from "node:process";
import { Provider } from "./provider";

const currPath = cwd();

export default new Provider(currPath);
