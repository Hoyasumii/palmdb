type CollectionCacheSetterConstructorProperties = {
  collection: string;
  uniqueProperties: Array<string>;
  value: Record<string, string>;
  id: string;
};

export function collectionCacheSetter({
  collection,
  uniqueProperties,
  value,
  id,
}: CollectionCacheSetterConstructorProperties) {
  for (const property of uniqueProperties) {
    global.palm.cache.set({
      path: `${collection}/${property}`,
      key: value[property],
      id,
    });
  }
}
