import 'dotenv/config'

import usuarioController from './controller/usuarioController.js';
import FilmeController from './controller/FilmeController.js'

import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

//configurações
server.use('storage/capaFilmes', express.static('storage/capaFilmes'));

//configuração dos endpoints
server.use(usuarioController);
server.use(FilmeController);



server.listen(process.env.PORT, () => console.log(`API online na porta ${process.env.PORT}`));