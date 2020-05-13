# Pacotes
1. npm install express
2. npm install sucrase nodemon -D
3. npm install sequelize
4. npm install sequelize-cli -D
5. npm install pg pg-hstore
6. npm install bcryptjs
7. npm install jsonwebtoken
8. npm install yup

# Sequelize CLI
npx sequelize db:migrate:undo:all
npx sequelize migration:create --name=create-users



# Glossário
1. sucrase - para utilizar recursos mais atuais do javascript (import/export && module.exports para export default)
2. express - framework de requisições
3. jwt - criptografia 
4. nodemon - reinicia o servidor express 
5. yup - Biblioteca de Schema Validation (Valida se as requisições estão sendo passadas corretamente)




# Processos
1. Configurar ambiente
2. instalar dependencias e montar estrutura (subrase,sequelize e etc)
3. config database
4. montar migration
5. criar model
6. Criar o Loader de Model / Editar
7. Criar Controller
8. add route