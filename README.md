# Sistema de Cadastro de Clientes - Laravel + Next.js

- Aplicação fullstack com backend em Laravel (PHP) e frontend em React com Next.js. Permite realizar o cadastro de clientes, consulta via API externa de CEP (ViaCEP), e exibição da lista no frontend.

---

##  Tecnologias utilizadas

- PHP 8.2 + Laravel 11
- PostgreSQL (via Docker)
- React 18 + Next.js 14
- Axios, Tailwind CSS

---


### Como Rodar o Projeto com integração do Backend com o Frontend

1. Clone o repositório e acesse em um terminal especifíco o `\backend`

```bash
 git clone https://github.com/DiegoH3nr1que/cadastro_clientes_php.git
```

```bash
  cd backend
```

2. Instale as dependências do Laravel
``` bash
composer install
```

3. Copie `.env.example` no `.env` e gere a key
```bash
cp .env.example .env
php artisan key:generate
```

4. Rode o arquivo `docker-compose.yaml` para subir o banco postgreSQL no Docker
```bash
docker-compose up -d
```

5. Rode as migrações: `php artisan migrate`
```bash
php artisan migrate
```

6. Inicie o backend: `php artisan serve`
```bash
php artisan serve
```

7. Vá até a pasta do frontend: `cd frontend`
```bash
cd frontend
```
8. Instale dependências: `npm install`
```bash
npm install
```

9. Rode o frontend: `npm run dev`
```bash
npm run dev
```


