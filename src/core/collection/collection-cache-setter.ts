type CollectionCacheSetterConstructorProperties = {
  collection: string;
  uniqueProperties: Array<string>;
  value: Record<string, string>;
};

export function collectionCacheSetter({
  collection,
  uniqueProperties,
  value,
}: CollectionCacheSetterConstructorProperties) {
  for (const property of uniqueProperties) {
    global.palm.cache.set(`${collection}/${property}`, value[property]);
  }
}
