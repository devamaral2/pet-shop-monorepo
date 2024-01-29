# Nome da Aplicação

## Descrição

Este é um sistema para pet-shops que permite agendar consultas, buscar consultas registradas e alterar o status delas. A aplicação apresenta uma tabela com paginação para lidar com um grande volume de entidades no banco de dados e pesquisa usando debounce para melhorar a experiência do usuário. A aplicação se utiliza do turborepo para compartilhar configurações e entidades em comum e para possibilitar a e para facilitar a experiência do desenvolvedor que pode executar a aplicação e navegar por ela com maior facilidade. 

## Recursos

- Agendamento de consultas
- Busca de consultas registradas
- Alteração do status das consultas
- Tabela com paginação
- Pesquisa com debounce
- Geração automática de migrations e seeds ao iniciar a aplicação com o servidor do banco de dados ligado

## Como rodar a aplicação

1. Clone o repositório
2. Instale as dependências com `yarn install`
3. Inicie o servidor do banco de dados com `yarn docker:up`
4. Execute a aplicação com `yarn start`
5. Para executar o teste de todas as aplicações use o comando `yarn test`

## Tecnologias utilizadas

- Node.js
- React
- Turborepo
- Vitetest
- PostgreSQL
- Docker

Esperamos que você goste da experiência!