let chalk = require('chalk');
let templates = require("../templates.js");

module.exports = function () {
    for (let key in templates.list) {
        let temp = templates.list[key]
        console.log(
            '  ' + chalk.yellow('★') +
            '  ' + chalk.green(temp.name) +
            '  ' + chalk.gray(temp.desc));
    };
    if (!templates.list || templates.list.length == 0) {
        console.log(chalk.yellow('No available template'))
    }
}