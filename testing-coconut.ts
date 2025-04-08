import { Coconut } from "@/core/coconut";

const c = new Coconut();

async function run(id: string) {
  console.log(`${id} esperando...`);
  await c.letMeKnowWhenAvailable();
  console.log(`${id} executando...`);
  await new Promise((r) => setTimeout(r, 1000)); // simula trabalho
  console.log(`${id} finalizando`);
  c.release();
}

run("A");
run("B");
run("C");
