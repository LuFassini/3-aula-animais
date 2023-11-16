import { AnimaisList } from '../models/animais/listanimais.js';
import {Animal } from "../models/animais/animais.js"

const list = new AnimaisList();

export const buscarTodosAnimais = (req, res) => {
  const animais = list.buscarTodosAnimais();

  if (animais.length) {
    return res.status(200).send(animais);
  }
  return res.status(200).se({ message: "Não há animais cadastrados" });
};

export const buscarAnimalPorID = (req, res) => {
  const { id } = req.params;
  const animal = list.buscarAnimalPorID(id);

  if (!animal) res.status(404).send({ message: "Animal não encontrado!" });

  return res.send(animal);
};

export const criarAnimal = (req, res) => {
  const { nome, idade, tipo, cor, vacina, imagem } = req.body;
  const animal = new Animal(nome, idade, tipo, cor, vacina, imagem);

  list.criarAnimal(animal);

  if (!nome || !idade || !tipo || !cor || !vacina || !imagem) {
    return res.status(400).send({
      message: 'Dados inválidos',
      origem: "Controller",
    })
  };
  return res.status(201).send({
    nome, 
    idade, 
    tipo, 
    cor, 
    vacina, 
    imagem 
  });
  return res.status(201).send(animal);
};

export const atualizarAnimal = (req, res) => {
  const { id } = req.params;
  const { nome, idade, tipo, cor, vacina, imagem } = req.body;

  const animal = li.buscarAnimalPorID(id);

  if (!animal) res.status(404).send({ message: "Animal não encontrado!" });

  list.atualizarAnimal(id, nome, idade, tipo, cor, vacina, imagem);

  return res.send(animal);
};

export const deletarAnimal = (req, res) => {
  const { id } = req.params;
  const animal = AnimaisRepository.buscarAnimalPorID(id);

  if (!animal) res.status(404).send({ message: "Animal não encontrado!" });

  list.deletarAnimal(id);

  return res.send(animal);
};