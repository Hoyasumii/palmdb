export interface StoreProvider {
  add(key: string): void;
  remove(): unknown;
}
// TODO: Mais um problema