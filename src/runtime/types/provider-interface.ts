export interface ProviderInterface {
  randomUUID(): string;

  get(path: string): Promise<string>;
  save(path: string, data: Buffer): Promise<string>;
}
