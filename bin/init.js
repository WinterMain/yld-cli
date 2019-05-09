let co = require('co');
let prompt = require('co-prompt');
let chalk = require('chalk');
let templates = require("../templates");
let download = require('download-git-repo');
let ora = require('ora');
let fs = require('fs');
let util = require('./util.js')
let tempKeyDict = {};
let tempNameDict = {};

module.exports = function (name) {
  initTemplates(templates);
  co(generator(name));
}

function initTemplates(templates) {
  for (let key in templates.list) {
    let item = templates.list[key]
    tempKeyDict[key] = item.name;
    tempNameDict[item.name] = item.path;
  };
}

let generator = function* (name) {
  let tempName = name;
  let path = tempNameDict[name];
  let projectName = "";

  if(!path) {
    let defaultTempName = "react-next-framework";
    tempName = defaultTempName;
    path = tempNameDict[tempName];
    projectName = typeof name === "string" ? name : "";
    name = defaultTempName;
  }

  if (!name) {
    console.log('Available templates:')
    for (let key in tempKeyDict) {
      let tempName = tempKeyDict[key]
      console.log(
        '     ' + chalk.green(key) +
        ' : ' + chalk.green(tempName))
    };
    tempName = yield prompt("Choose template:")
    path = tempNameDict[tempKeyDict[tempName]];
  }
  if (tempKeyDict[tempName] || tempNameDict[tempName]) {
    console.log();
    console.log("Initializtion from template <" + tempName + ">:");

    if(!projectName || projectName === name) {
      projectName = yield prompt("Project name(demo):")
    };
    if (!projectName) {
      projectName = "demo"
    }
    console.log()
    downloadTemplates(path, projectName);
  } else {
    console.log(chalk.red(`✘ template [${tempName}] not exist`))
    process.exit(0);
  }
}

function downloadTemplates(path, projectName) {
  let spanner = ora("Initializing......");
  spanner.start();
  if (fs.existsSync('download')) {
    //刪除原文件
    fs.rmdirSync('download');
  }
  download(path, __dirname + '/download', function (err) {
    if (err) {
      spanner.stop();
      console.log()
      console.log(chalk.red("✘"), chalk.red('Initialize failed'), err);
      console.log(chalk.green('✔'), chalk.green('Initialize successfully'), err);
      process.exit(0);
    }
    startBuildProject(spanner, projectName)
  })

}

function startBuildProject(spanner, projectName) {
  let targetPath = process.cwd() + "/" + projectName
  util.copyDirSync(__dirname + '/download', targetPath)
  console.log();
  console.log(chalk.green('✔'), chalk.green('Initialize successfully'));
  console.log();
  spanner.stop();
  process.exit(0);
}