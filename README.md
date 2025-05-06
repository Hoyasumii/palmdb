

Collections -> Entities

<!-- TODO: Adicionar em algum momento os enums -->
<!-- TODO: Adicionar em property uma propriedade chamada default -->

Collection -> Schema -> Propperty

```ts
// palm.config.ts
await palm.start({
  logging: boolean,
  secret: "",
  collections: {
    users: schema({
      name: string({ }),
      email: string({ unique: true }),
      password: string({ }),
    }),
    brand: schema({
      name: string({ }),
      logo: string({ }),
    }),
    category: schema({
      name: string({ }),
      parentCategoryId: string({ nullable: true, default: null }),
    })
    products: schema({
      productName: string({  }),
      brandId: string({  }),
      categoryId: string({  }),
      price: number({  }),
      stock: number({ }),
    }),
    selectedProduct: schema({
      productId: string({ }),
      amount: number({ })
    })
    cart: schema({
      userId: string({ unique: true }),
      selectedProductsId: array({ }),
    }),
    address: schema({
      userId: string({ }),
      cep: string({ }),
      number: string({ }),
      additionalInfo: string({ }),
    }),
    order: schema({
      userId: string({ }),
      addressId: string({ }),
      orderDetailsId: string({ }),
      totalPrice: number({ }),
      trackingCode: string({ }),
      status: enum([
        "PENDING",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "RETURNED"
      ]),
    }),
    orderDetails: schema({
      userId: string({ }),
      selectedProductsId: array({ }),
      price: number({ }),
    }),
  },
  rules: {
    users: {
      "on-create": () => {
        bliblibli
      },
      "on-remove": () => {
        blobloblo
      }
    }
  }
})

// Uso do palm
const usersCollection = await palm.pick("users");

// await usersCollections.filter()

await usersCollection.find.unique("id");

// Como seria o enum:
enum([]);

```

.temp/palm/unique_keys/<COLLECTION>/<property>.jsonl
.temp/palm/cache/specs.jsonl

```

```

.temp/palm/cache/<GROUP_ALIAS>/config
.temp/palm/cache/<GROUP_ALIAS>/config.jsonl
.temp/palm/collections/<COLLECTION>/<ENTITY>.jsonl
.temp/palm/collections/<COLLECTION>/group/<GROUPNAME>.jsonl

Vai ter 2 diretórios:
1. .palm -> database normal
2. /tmp/.palm/* -> database que abstrai do .palm no intuito de memoizar resultados de processos, como locks e caches de grupos


collection.create
collection.find
collection.update
collection.remove

collection.group.create(name, filter, refresh?: { days?: number, hours?: number, minutes?: number, seconds?: number  })
collection.group.find(groupName)
collection.group.update(groupName, data)
collection.group.remove(groupName)


<!-- TODO: Adicionar um sistema de backup pós término de processo -->