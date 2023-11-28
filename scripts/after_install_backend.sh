#!/bin/bash

# Navegue até o diretório do backend
cd /home/ec2-user/SyncFlow/backend

# Instale as dependências do backend
npm install

# Reinicie o serviço usando o PM2
pm2 start app.js