# Usando uma imagem Node.js oficial
FROM node:18-slim
# Define o diretório de trabalho dentro do container
WORKDIR /app
# Copia o arquivo package.json para o container
COPY package.json .
# Instala as dependências
RUN npm install
# Roda o app
RUN apt-get update && apt-get install -y nano
# Copia o código do projeto para o container
COPY . .
# Exponha a porta usada pela API
EXPOSE 3000
# Comando para iniciar o servidor
CMD [ "node", "app.js" ]