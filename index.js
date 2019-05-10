#!/usr/bin/env node

let program = require('commander');
let package = require('./package.json');
let init = require('./bin/init');
let list = require('./bin/list');

program
    .version(package.version)
    .usage('<command> [options]');
program.command('init (template)')
    .description("Create new project base on template")
    .alias('i')
    .action(function(template){
         init(template);
    })
program.command('list')
    .description("Available template list")
    .alias('l')
    .action(function(){
       list();
    })
program.parse(process.argv);
if(program.args.length==0){
    // Show help info.
    program.help();
}