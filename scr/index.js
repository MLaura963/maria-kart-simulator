//PLAYERS
const player1 = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS: 0
};

 const player2 = {
    NOME : "Princesa",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS: 0
 };

 //ROLL DICE
 async function rollDice(){
   return Math.floor( Math.random() * 6) + 1;
 };

//GET RANDOM BLOCK
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
    result= "RETA";
    break;

    case random < 0.66:
    result= "CURVA";
      break;
  
    default:
      result = "CONFRONTO"
      break;
  };

  return result;
};


async function logRollResult(characterName, block, diceResult, attribute){
  console.log(`${characterName} 🎲 rolou um dado de ${block} 
    ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}


 //PLAY
async function playRaceEngine(character1,character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁Rodada ${round}`);

      let block =  await getRandomBlock();
      console.log(`Bloco: ${block}`);

          let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block == "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
      
      await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
    };

    if (block == "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
      
      await logRollResult(
        character1.NOME, 
        "manobrabilidade", 
        diceResult1, 
        character1.MANOBRABILIDADE);

      await logRollResult(
        character2.NOME, 
        "manobrabilidade", 
        diceResult2, 
        character2.MANOBRABILIDADE);
    };

    if (block == "CONFRONTO") {
      let powerResul1 = diceResult1 + character1.PODER;
      let powerResul2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrotou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder", 
        diceResult1, 
        character1.PODER);

      await logRollResult(
        character2.NOME, 
        "poder", 
        diceResult2, 
        character2.PODER)
      

      if(powerResul1 > powerResul2 && character2.PONTOS > 0) {
        console.log(`${character1.NOME} venceu o confronto e ganhou um ponto! 
        ${character2.NOME} perdeu 1 ponto`)
        character1.PONTOS++;
        character2.PONTOS--;
      }

      if(powerResul2 > powerResul1 && character1.PONTOS > 0) {
        console.log(`${character2.NOME} venceu o confronto e ganhou um ponto! 
        ${character1.NOME} perdeu 1 ponto`)
        character2.PONTOS++;
        character1.PONTOS--;
      }

      if(powerResul1 === powerResul2){
        console.log("Confronto empatado!")
        };
    };


    //verifica vencedor
    if(totalTestSkill1> totalTestSkill2){
      console.log(`${character1.NOME} venceu a rodada!`)
      character1.PONTOS++;
    } else if(totalTestSkill2> totalTestSkill1){
      console.log(`${character2.NOME} venceu a rodada!`)
      character2.PONTOS++;
    }

    console.log("-------------------------------------------")
    };
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS){
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  }else if (character2.PONTOS > character1.PONTOS){
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  }else console.log("A corrida terminou em empate");
}

//ROUNDS
(async function main() { 
    console.log("🏁🚨Começou a corrida!")

  await playRaceEngine(player1,player2);
  await declareWinner(player1, player2);
})();

