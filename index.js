#!/usr/bin/env node

let program = require('commander');
let package = require('./package.json');
let init = require('./bin/init');
let list = require('./bin/list');

program
    .version(package.version)
    .usage('<command> [options]');
program.command('init (template)')
    .description("创建新新项目")
    .alias('i')
    .action(function(template){
         init(template);
    })
program.command('list')
    .description("显示可使用的模板列表")
    .alias('l')
    .action(function(){
       list();
    })
program.parse(process.argv);
if(program.args.length==0){
    //默认没有输入参数或者命令的时候，显示help信息
    program.help();
}