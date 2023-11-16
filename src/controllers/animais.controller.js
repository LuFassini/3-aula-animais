import { AnimaisList } from '../models/animais/listanimais.js';
import { Animal } from "../models/animais/animais.js";

const list = new AnimaisList();

function verifyImage(url) {
  var allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

  var extension = url.split('.').pop().toLowerCase();

  return allowedExtensions.includes(extension);
}


export const buscarTodosAnimais = (req, res) => {
  let animais = list.buscarTodosAnimais();

  const tipo = req.query.tipo;

  if(tipo) {
    animais = list.buscarAnimalPorTipo(tipo);
    return res.status(200).send({
      totalTipo: animais.length, animais
    })
  } else {
    animais = list.buscarTodosAnimais();
  }

  if(!animais) {
    return res.status(404).send({
      message: `Não existem animais cadastrados`
    })
  }

  return res.status(200).send({
    totalAnimais: animais.length, animais
  });

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

  let numerosErros = 0;
  let erros = [];

  if (!nome || !idade || !tipo || !cor || !imagem) {
    numerosErros++;
    erros.push("Campo obrigatório vazio!");
  }

  if (nome.length < 3) {
    numerosErros++;
    erros.push("O nome precisa ter no mínimo 3 caracteres");
  }

  if (!Number.isInteger(idade)) {
    numerosErros++;
    erros.push("A idade não pode ser negativa");
  }

  if (tipo.length > 30) {
    numerosErros++;
    erros.push("O tipo do animal deve ter até 30 caracteres!");
  }

  if (cor.length > 20) {
    numerosErros++;
    erros.push("A cor do animal deve ter até 20 caracteres!");
  }

  if(verifyImage(imagem) == false) {
    numerosErros++;
    erros.push('Imagem inválida');
  }

  if (vacina !== true && vacina !== false) {
    numerosErros++;
    erros.push("Você precisa informar se o animal está vacinado ou não!");
  }

  if (numerosErros > 0) {
    return res.status(400).send({
      errors: erros,
      status: "BAD REQUEST"
    });
  } else {
    list.criarAnimal(animal);
    return res.status(201).send(animal);
  }
};

export const atualizarAnimal = (req, res) => {
  const { id } = req.params;
  const { nome, idade, tipo, cor, vacina, imagem } = req.body;

  // Buscar o animal
  const animal = list.buscarAnimalPorID(id);

  if (!animal) res.status(404).send({ message: "Animal não encontrado!" });

  //Se deu certo, enviar todos os dados para o método no Model
  list.atualizarAnimal(id, nome, idade, tipo, cor, vacina, imagem);

  // Retornar animal atualizado
  return res.send(animal);
};


export const deletarAnimal = (req, res) => {
  const { id } = req.params;
  const animal = list.buscarAnimalPorID(id);

  if (!animal) res.status(404).send({ message: "Animal não encontrado!" });

  list.deletarAnimal(id);

  return res.send({ message: `Animal deletado` });
};