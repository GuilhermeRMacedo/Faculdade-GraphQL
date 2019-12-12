const express = require('express');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const alunos = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Aluno {
            _id: ID!
            nome: String!
            nascimento: String!
            endereco: String!
            cpf: String!
            foto: String! 
        }

        input AlunoInput {
            nome: String!
            nascimento: String!
            endereco: String!
            cpf: String!
            foto: String!
        }

        type RootQuery {
            alunos: [Aluno!]!
        }

        type RootMutation {
            createAluno(alunoInput: AlunoInput): Aluno
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        alunos: () => {
            return alunos;
        },
        createAluno: (args) => {
            const aluno = {
                _id: Math.random().toString(),
                nome: args.alunoInput.nome,
                nascimento: args.alunoInput.nascimento,
                endereco: args.alunoInput.endereço,
                cpf: args.alunoInput.cpf,
                foto: args.alunoInput.foto
            }

            alunos.push(aluno);
            return aluno;
        }
    },
    graphiql: true
}));

app.listen(3000);