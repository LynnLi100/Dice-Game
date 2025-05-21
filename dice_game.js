let score = 0;


function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// 判断当前是大 小 还是 豹子
function judgeResult(dices) {
  // 豹子
  if (dices[0] === dices[1] && dices[1] === dices[2]) {
    return "豹子";
  }
  
  const sum = dices.reduce((a, b) => a + b, 0);
  
  // 大小
  if (sum >= 1 && sum <= 10) {
    return "小";
  } else if (sum >= 11 && sum <= 18) {
    return "大";
  }
}

function handleGuess(guess, dices) {
  const result = judgeResult(dices);
  console.log(`骰子点数: ${dices.join(', ')}, 总和: ${dices.reduce((a, b) => a + b, 0)}`);
  console.log(`结果是: ${result}`);
  
  if (guess === result) {
    if (result === "豹子") {
      score += 18;
      console.log("猜中豹子！获得18分");
    } else {
      score += 1;
      console.log(`猜中${result}！获得1分`);
    }
  } else {
    if (result === "豹子") {
      score -= 18;
      console.log(`哈哈，你猜错了。结果是豹子，你猜的是${guess}，扣除18分`);
    } else {
      score -= 1;
      console.log(`哈哈，你猜错了。结果是${result}，你猜的是${guess}，扣除1分`);
    }
  }
  
  console.log(`当前分数: ${score}`);
}

//Main game loop
function playGame() {
  console.log("=== 欢迎来到掷骰子游戏 ===");
  console.log("游戏规则:");
  console.log("1. 三个六面骰子，每个骰子点数为:1，2，3，4，5，6");
  console.log("2. 三个骰子数加起来，1-10为小，11-18为大");
  console.log("3. 大和小分值1分");
  console.log("4. 如果三个骰子的数值一样，就称为豹子，豹子18分");
  console.log("5. 猜对了就加分，猜错了就扣分");
  console.log("输入指令: '大'、'小'、'豹子' 来猜测结果");
  console.log("输入 'q' 退出游戏");
  console.log("================");
  
  score = 0;
  console.log(`初始分数: ${score}`);
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


  function promptInput() {
    rl.question('请输入您的猜测 (大/小/豹子) 或 q 退出: ', (input) => {
      const guess = input.trim().toLowerCase();
      
      if (guess === 'q') {
        console.log(`游戏结束，最终分数: ${score}`);
        rl.close();
        return;
      }
      
      // Check if the guess is valid or not
      if (guess !== '大' && guess !== '小' && guess !== '豹子') {
        console.log('无效输入，请输入 "大"、"小" 或 "豹子"');
        promptInput();
        return;
      }
      
      const dices = [rollDice(), rollDice(), rollDice()];
      
      handleGuess(guess, dices);
      
      // Continue
      promptInput();
    });
  }
  
  // game start
  promptInput();
}

playGame();