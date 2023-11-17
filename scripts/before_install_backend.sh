#!/bin/bash

# Navegue até o diretório do backend
cd /home/ec2-user/SyncFlow/backend

# Pare o serviço, se estiver em execução
pm2 stop app.js
