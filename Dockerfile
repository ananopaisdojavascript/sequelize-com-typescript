# Imagem oficial do NodeJS como base
FROM node:latest

# Pasta de trabalho
WORKDIR /usr

# Copiar os arquivos package
COPY package*.json ./

# Instalação das dependências do projeto
RUN npm install 

# Copiar os demais arquivos
COPY . .

# Expor uma porta do conteiner
EXPOSE 8000

# Comando para inicializar o aplicativo
CMD ["node" "./src/index.ts"]