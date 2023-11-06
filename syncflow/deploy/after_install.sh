#!/bin/bash

cd /home/ubuntu/app

# Removemos o arquivo .env antigo

sudo rm -f .env

# Injetamos o parâmetro salvo no AWS Parameter Store (some-env) na variável .env
# Repita o código para cada parâmetro

echo some-env=$(aws ssm get-parameters --output text --region sa-east-1 --names some-env --with-decryption --query Parameters[0].Value) >> .env

# Executamos o build da nossa aplicação com o docker-compose

docker-compose build --no-cache