import {HMAC} from "./hmacKey.js";
import {Rules} from "./rules.js";
import {Table} from "./table.js";
import readlineSync from "readline-sync";

class App {
    isDataWrong(data) {
      const hasDuplicates = new Set(data).size !== data.length;
      return data.length % 2 === 0 || data.length < 2 || hasDuplicates;
    }
  
    menu(data) {
      data.forEach((value, index) => console.log(`${index + 1} - ${value}`));
      console.log("0 - Exit\n? - help");
    }
  
    matter(query) {
      return readlineSync.matter(query).replace(/\s+/g, ' ').trim().split(' ');
    }
  
    checkInput() {
      const rightInput = 'Rock Paper Scissors';
      let data = process.argv.slice(2);
      while (this.isDataWrong(data)) {
        console.log(`The number of moves must be odd and >= 3. Moves must be unique. Example: ${rightInput}`);
        data = this.matter('Please, enter data again:\n');
      }
      return data;
    }
  
    isKeyValid(userKey, dataLength) {
      if (userKey === '0') {
        console.log('Goodbye!\n');
        return false;
      }
      if (userKey !== '?' && (userKey < '1' || userKey > dataLength)) {
        console.log(`wrong move, click "1" to "${dataLength}" to move or "0" to exit, or "?" for help`);
        return false;
      }
      return true;
    }
  
    startGame() {
      let userMove;
      const inputData = this.checkInput();
      const rules = new Rules(inputData).rulesGame();
      const table = new Table();
      while (userMove !== '0') {
        const move = inputData[Math.floor(Math.random() * inputData.length)];
        const hash = new HMAC(move);
        console.log(`HMAC: ${hash.generateHMAC()}`);
        console.log('Available moves:');
        this.menu(inputData);
        userMove = this.matter('Enter your move: ')[0];
        if (this.isKeyValid(userMove, inputData.length)) {
          if (userMove === '?') {
            table.printHelp(inputData, rules);
          } else if (userMove !== '0') {
            console.log(`Your move: ${inputData[userMove - 1]}`);
            console.log(`Computer move: ${move}`);
            console.log(rules[userMove - 1][inputData.lastIndexOf(move)]);
            console.log(`HMAC key: ${hash.key}`);
            console.log('\nNEXT GAME');
          }
        }
      }
    }
  }
  
let app = new App();
app.startGame();