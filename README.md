Migration Ideia:
Sempre que o diretório .palm for criado, ele vai serializar os dados dos schemas e sempre que o palm inicializar e os dados forem carregados.
Caso ocorra algum erro durante a deserialização dos dados para a Entity, o palm irá comparar o schema do .palm com o inserido no construtor.
Caso os dados não coicidam, irá aparecer uma mensagem de erro, a coleção será salva no backup no formato NAME_TIMESTAMP.csv.
Para devolver os dados à coleção, você pode converter esse csv para um objeto convencional, mas você terá que fazer esse processo sozinho, sem auxílio do PalmDB. O PalmDB não serve para pessoas indecisas, que precisam ficar fazendo migrations a todo momento. Ele é pensado para o pior cenário. Se em seu desenvolvimento, os dados importarem no nível que eles não possam ser removidos, talvez o PalmDB não seja a ferramenta ideal para você.


Collections -> Entities

<!-- TODO: Adicionar em algum momento os enums -->
<!-- TODO: Adicionar em property uma propriedade chamada default -->

Collection -> Schema -> Propperty

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

await usersCollection.find.unique("id");

// Como seria o enum:
enum([]);