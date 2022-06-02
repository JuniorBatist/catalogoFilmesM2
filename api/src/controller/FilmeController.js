import { alterarFilme, alterarImagem, buscarPorId, buscarPorNome, inserirFilme, listarTodosFilme, removerFilme } from "../repository/FilmeRepository.js";

import multer from 'multer'
import { Router } from 'express'

const server = Router();
const upload = multer({ dest: 'storage/capaFilmes'})

server.post('/filme', async (req, resp) => {
    try {
        const novoFilme = req.body;

        const FilmeInserido = await inserirFilme(novoFilme);

        resp.send(FilmeInserido);

    } catch (err) {
        resp.send(400).send({
            erro: err.message
        })
    }
})

server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
   try {
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id);
        if (resposta != 1)
            throw new Error('A imagem não pode ser salva.');

        resp.status(204).send(); 

   }catch (err) {
       resp.status(400).send({
           erro: err.message
       })
   }
})

server.get('/filme', async (req, resp) => {
    try {
        const resposta = await listarTodosFilme();
        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/busca', async (req, resp) => {
    try {
        const { nome }  = req.query;

        const resposta = await buscarPorNome(nome);

        if (!resposta)
            resp.status(404).send([])
        else
            resp.send(resposta)

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/:id', async (req, resp) => {
    try {
        const id  = Number(req.params.id);

        const resposta = await buscarPorId(id);

        resp.send(resposta);
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.delete('/filme/:id', async (req, resp) => {
    try{
        const { id } = req.params;

        const resposta = await removerFilme(id);
        if (resposta != 1)

        throw new Error ('filme não pode ser removido');
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

    server.put('/filme/:id', async (req, resp) => {
        try {
            const { id } = req.params;
            const filme = req.body;

            const resposta = await alterarFilme (id, filme);
            if (resposta != 1)
                 throw new Error ('filme não pode ser alterado');
            else
                 resp.status(204).send();

        } catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
    })

})
export default server;