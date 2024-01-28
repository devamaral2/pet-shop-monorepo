# Segrega o espaço de trabalho builder
FROM node:18.19.0-alpine AS builder
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
# Isola apenas a aplicação backend e suas dependências do repositório
RUN turbo prune --scope=@pet-shop/backend --docker

# Começa um novo espaço que será criado a partir da pasta out gerada pelo comando turbo prune
FROM node:18.19.0-alpine AS runner
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
# Faz cache das dependências instaladas
RUN yarn install --imutable
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --scope=@pet-shop/backend --include-dependencies --no-deps
WORKDIR /app/apps/backend/
CMD [ "npm", "start" ]