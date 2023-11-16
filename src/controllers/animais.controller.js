import {AnimaisList} from '../models/animais/listanimais.js';

const list = new AnimaisList();

export const  buscarTodosAnimais = (req, res) => {
  const animais =  AnimaisList. buscarTodosAnimais();
 
  if (animais.length) {
    return res.status(200).json(animais);
  }
  return res.status(200).json({ message: "Não há animais cadastrados" });
};

export const buscarAnimalPorID = (req, res) => {
  const { id } = req.params;
  const animal = AnimaisList.buscarAnimalPorID(id);

  if (!animal) res.status(404).send({ message: "Animal não encontrado!" });

  return res.send(animal);
};

export const criarAnimal = (req, res) => {
  const {nome, idade, tipo, cor,vacina, imagem} = req.body;
  const animal = new Animal(nome, idade, tipo, cor,vacina, imagem);

  AnimaisList.criarAnimal(animal);

  if (!nome || !idade || !tipo || cor || vacina || imagem){
    return res.status(400).send({message: 'Dados inválidos',
    origem:"Controller",})
};
return res.status(201).send({
    message: "Rota POST animais",
    origem: "Controller"
});
 return res.status(201).send(animal);
};

export const atualizarAnimal = (req, res) => {
  const { id } = req.params;
  const {nome, idade, tipo, cor,vacina, imagem} = req.body;

  const animal = li.buscarAnimalPorID(id);

  if (!animal) res.status(404).send({ message: "Animal não encontrado!" });

  AnimaisList.atualizarAnimal(id,nome, idade, tipo, cor,vacina, imagem);

  return res.send(animal);
};

export const deletarAnimal = (req, res) => {
  const { id } = req.params;
  const animal = AnimaisRepository.buscarAnimalPorID(id);

  if (!animal) res.status(404).send({ message: "Animal não encontrado!" });

  AnimaisList.deletarAnimal(id);

  return res.send(animal);
};