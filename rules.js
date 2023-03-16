export class Rules {
  constructor(moves) {
      this.moves = moves;
  }

  rulesGame() {
    const count = (this.moves.length - 1) / 2;
    const table = [];
    const result = ['Draw', ...'Lose '.repeat(count).slice(0, -1).split(' '), ...'Win '.repeat(count).slice(0, -1).split(' ')];
    
    for (let i = 0; i < this.moves.length; i++) {
      const row = [];
      for (let j = 0; j < this.moves.length; j++) {
        row.push(result[(j - i + this.moves.length) % this.moves.length]);
      }
      table.push(row);
    }
    return table;
  }
  
}