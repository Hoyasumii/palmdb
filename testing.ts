import { Palm } from "@/core";
import palmConfig from "./palm.config";

const palm = new Palm(palmConfig);
console.log(palm.config.schema);
console.log(palm.pick("account"));
