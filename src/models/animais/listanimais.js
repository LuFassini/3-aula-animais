
export class AnimaisList {
    constructor() {
      this.animais = [];
    }
  
    buscarTodosAnimais() {
      return this.animais;
    }
  
    buscarAnimalPorID(id) {
      return this.animais.find((animal) => animal.id === id);
    }
  
    criarAnimal(animal) {
      this.animais.push(animal);
    }
  
    atualizarAnimal(id, nome, idade, tipo, cor, vacina,imagem) {
      const animal = this.buscarAnimalPorID(id);
  
      if (animal) {
        animal.nome = nome;
        animal.idade = idade;
        animal.tipo = tipo;
        animal.cor = cor;
        animal.vacina = vacina;
        animal.imagem = imagem;
      }
  
      return animal;
    }
  
    deletarAnimal(id) {
      this.animais = this.animais.filter((animal) => animal.id !== id);
    }
  }