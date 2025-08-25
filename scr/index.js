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
      
      await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    };

    if (block == "CONFRONTO") {
      let powerResul1 = diceResult1 + character1.PODER;
      let powerResul2 = diceResult2 + character2.PODER;
      console.log();
    };
    
    if(totalTestSkill1> totalTestSkill2){
        console.log(`${character1.NOME} venceu a rodada!`)
    } else if(totalTestSkill2> totalTestSkill1){
      console.log(`${character2.NOME} venceu a rodada!`)
    }

    console.log("-----------------------------------------")
    };

}

//ROUNDS
(async function main() { 
    console.log("🏁🚨Começou a corrida!")

  await playRaceEngine(player1,player2)
})();

