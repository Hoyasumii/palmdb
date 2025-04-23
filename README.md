Migration Ideia:
Sempre que o diretório .palm for criado, ele vai serializar os dados dos schemas e sempre que o palm inicializar e os dados forem carregados.
Caso ocorra algum erro durante a deserialização dos dados para a Entity, o palm irá comparar o schema do .palm com o inserido no construtor.
Caso os dados não coicidam, irá aparecer uma mensagem de erro, a coleção será salva no backup no formato NAME_TIMESTAMP.csv.
Para devolver os dados à coleção, você pode converter esse csv para um objeto convencional, mas você terá que fazer esse processo sozinho, sem auxílio do PalmDB. O PalmDB não serve para pessoas indecisas, que precisam ficar fazendo migrations a todo momento. Ele é pensado para o pior cenário. Se em seu desenvolvimento, os dados importarem no nível que eles não possam ser removidos, talvez o PalmDB não seja a ferramenta ideal para você.


Collections -> Entities

Collection -> Schema -> Propperty
