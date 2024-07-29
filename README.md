How to run:

- Install and run docker locally (see: https://docs.docker.com/desktop/install/windows-install/)
- Run PostgreSQL on docker (see: https://hub.docker.com/_/postgres)
- Run command 'npm install' on project folder to install dependencies
- Create .env file on project folder
- Fill .env file with following variables:
  - DB_NAME=product
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_HOST=your_db_host
    DB_PORT=your_db_port
- Run command 'npm run db:exec' on project folder to create database and run migrations
- Run command 'npm run start' on project folder
- See endpoints on Postman collection file on project folder
- Enjoy
