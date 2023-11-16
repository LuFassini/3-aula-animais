import { Router } from 'express';
import {
    buscarAnimalPorID,
    buscarTodosAnimais,
    criarAnimal,
    atualizarAnimal,
    deletarAnimal
} from '../controllers/animais.controller.js';

const rotasAnimais = Router();

//todos
rotasAnimais.get("/", buscarTodosAnimais);
//id
rotasAnimais.get('/:id', buscarAnimalPorID);
//criar
rotasAnimais.post('/', criarAnimal);
//atualizar
rotasAnimais.put('/:id', atualizarAnimal);
//deletar
rotasAnimais.delete('/:id', deletarAnimal);
//exportar
export default rotasAnimais;
