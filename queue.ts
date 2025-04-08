import { randomUUID } from "node:crypto";
import EventEmitter from "node:events";

type EmitterProps<T> = {
  "create-entity": [
    { id: string; content: T },
    (value: T | PromiseLike<T>) => void
  ];
  "update-collection": [
    { id: string; content: T },
    (value: T | PromiseLike<T>) => void
  ];
  "remove-collection": [
    { id: string; content: T },
    (value: T | PromiseLike<T>) => void
  ];
  "read-collection": [
    { id: string; content: T },
    (value: T | PromiseLike<T>) => void
  ];
};

// TODO: Coloco o Emissor de Eventos no Construtor

export class Coconut<T> {
  private items: Array<{ id: string; content: T }> = [];

  private emitter: EventEmitter<EmitterProps<T>> = new EventEmitter({
    captureRejections: false,
  });

  constructor(private processFunction: (target: T) => Promise<unknown>) {
    this.emitter.on("create-entity", async (content, resolve) => {
      while (this.items[0].id != content.id) {
        console.log("Diferente");
      }
      await this.processFunction(content.content);

      this.items.shift();

      console.log("Hello World");
      resolve(content.content);
    });
  }

  public async enqueue(action: keyof EmitterProps<T>, content: T): Promise<T> {
    return new Promise<T>((resolve) => {
      const newId = randomUUID();

      this.items.push({ id: newId, content });

      this.emitter.emit(action, { id: newId, content }, resolve);
    });
  }
}
