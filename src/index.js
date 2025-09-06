// ===== CLASSE DE PERSONAGEM =====
class Personagem {
  constructor(nome, velocidade, manobrabilidade, poder) {
    this.NOME = nome;
    this.VELOCIDADE = velocidade;
    this.MANOBRABILIDADE = manobrabilidade;
    this.PODER = poder;
    this.PONTOS = 0;
  }
}

// ===== PERSONAGENS DISPONÍVEIS =====
const personagens = [
  new Personagem("Mario", 4, 3, 3),
  new Personagem("Princesa", 3, 4, 4),
  new Personagem("Luigi", 3, 4, 3),
  new Personagem("Yoshi", 4, 4, 2),
  new Personagem("Bowser", 2, 2, 5),
];

// ===== FUNÇÕES AUXILIARES =====
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

async function getRandomAttack() {
  return Math.random() < 0.5 ? "CASCO" : "BOMBA";
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`
  );
}

// ===== MOTOR DO JOGO =====
async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    // --- RETA ---
    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
    }

    // --- CURVA ---
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }

    // --- CONFRONTO ---
    if (block === "CONFRONTO") {
      let powerResul1 = diceResult1 + character1.PODER;
      let powerResul2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
      await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

      if (powerResul1 > powerResul2) {
        let ataque = await getRandomAttack();
        let perda = ataque === "CASCO" ? 1 : 2;
        character2.PONTOS = Math.max(0, character2.PONTOS - perda);
        character1.PONTOS++;
        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} levou um ${ataque} (-${perda} ponto[s])`);
      } else if (powerResul2 > powerResul1) {
        let ataque = await getRandomAttack();
        let perda = ataque === "CASCO" ? 1 : 2;
        character1.PONTOS = Math.max(0, character1.PONTOS - perda);
        character2.PONTOS++;
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} levou um ${ataque} (-${perda} ponto[s])`);
      } else {
        console.log("Confronto empatado!");
      }
    }

    // --- VENCEDOR DA RODADA ---
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} venceu a rodada!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} venceu a rodada!`);
      character2.PONTOS++;
    }

    console.log("-------------------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("A corrida terminou em empate!");
  }
}

// ===== INÍCIO DO JOGO =====
(async function main() {
  console.log("🏁🚨 Começou a corrida!");

  const player1 = personagens[0]; // Mario
  const player2 = personagens[4]; // Bowser (exemplo)

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();