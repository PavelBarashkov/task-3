export class Table {
    printHelp(data, rules) {
        const table = {};
        for (let i = 0; i < data.length; i++) {
          const ruleObj = {};
          for (let j = 0; j < data.length; j++) {
            ruleObj[data[j]] = rules[i][j];
          }
          table[data[i]] = ruleObj;
        }
        console.log("Help Table:");
        console.table(table);
      }
}