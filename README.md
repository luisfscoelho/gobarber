# GoBarber

API da aplicação de agendamento e gerenciamento serviços de beleza.

## Como executar o projeto

### Clone o projeto

`git clone https://github.com/luisfscoelho/gobarber.git && cd gobarber`

### Instale as dependências

`yarn`

### Copie e configure as variáveis de ambiente

`cp .env.example .env`


### Copie e configure as as configurações do banco de dados

`cp example.ormconfig.json ormconfig.json`

### Inicie uma instancia do banco de dados

```bash
docker run --name gobarber-postgres \
            -e POSTGRES_PASSWORD=docker \
            -p 5432:5432 \
            -d postgres
```

### Inicie uma instancia do mongoDb

`docker run --name gobarber-mongodb -p 27017:27017 -d -t mongo`

### Inicie uma instancia do redis

`docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine`

### Execute as migrations

`yarn typeorm migration:run`

### Execute a API

`yarn dev:server`
