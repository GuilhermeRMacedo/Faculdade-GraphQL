const express = require('express');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const Alunos = require('./alunos.js');
var alunos = Alunos;

const Matriculas = require('./matriculas.js');
var matriculas = Matriculas;

const Disciplinas = require('./disciplinas.js')
var dicliplinas = Disciplinas;


app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Aluno {
            _id: Int!
            nome: String!
            nascimento: String!
            endereco: String!
            cpf: String!
            foto: String! 
        }

        type Disciplina {
           _id: Int!
           nome: String!
           horario: String!
           professores: String! 
        }

        type Matricula {
            idAluno: Int!
            idDisciplina: Int!
            semestre: String!
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
            disciplinas: [Disciplina!]!
            matriculas: [Matricula!]!
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
        matriculas: () => {
            return matriculas;
        },
        disciplinas: () => {
            return dicliplinas;
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