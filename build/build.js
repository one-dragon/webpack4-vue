

const fs = require('fs');
const webpack = require('webpack');
const { resolve, join } = require('./utils');
const Options = require('./options');
const ora = require('ora');
const chalk = require('chalk');


// dll公共文件打包
let dllConfigPack = (callback) => {
	const spinner = ora('building for dll...\n');
	spinner.start();
	const dllConfig = require('./dll.config');
	webpack(dllConfig, (err, stats) => {
    	spinner.stop();
    	
		if (err) {
			console.log(chalk.red(err.message))
			throw err
		}
		
		process.stdout.write(stats.toString({
	      	colors: true,
	      	modules: false,
	      	children: false,
	      	chunks: false,
	      	chunkModules: false
	    }) + '\n\n');
	    
	    if (stats.hasErrors()) {
  			console.log(chalk.red('  Build dll failed with errors.\n'));
  			process.exit(1);
		}
	    
	    callback ? callback() : '';
	})
}

// fundebug文件打包
let fundebugConfigPack = (callback) => {
	const spinner = ora('building for fundebug...\n');
	spinner.start();
	const fundebugConfig = require('./fundebug.config');
	webpack(fundebugConfig, (err, stats) => {
		spinner.stop();
		
		if (err) {
			console.log(chalk.red(err.message))
			throw err
		}
		
		process.stdout.write(stats.toString({
	      	colors: true,
	      	modules: false,
	      	children: false,
	      	chunks: false,
	      	chunkModules: false
	    }) + '\n\n');
	    
	    if (stats.hasErrors()) {
  			console.log(chalk.red('  Build fundebug failed with errors.\n'));
  			process.exit(1);
		}
	    
		callback ? callback() : '';
	})
}

// build生成打包
let prodConfigPack = () => {
	const spinner = ora('building for production...\n');
	spinner.start();
	const prodPromise = require('./prod.config');
	prodPromise.then((prodConfig) => {
		webpack(prodConfig, (err, stats) => {
			spinner.stop();
			
			if (err) {
				console.log(chalk.red(err.message))
				throw err
			}
			
			process.stdout.write(stats.toString({
		      	colors: true,
		      	modules: false,
		      	children: false,
		      	chunks: false,
		      	chunkModules: false
		    }) + '\n\n');
			
			if (stats.hasErrors()) {
      			console.log(chalk.red('  Build failed with errors.\n'));
      			process.exit(1);
    		}
			
			console.log(chalk.cyan('  Build complete.\n'));
		})
	})
}

// 调用函数打包
dllConfigPack(() => {
	if(Options.build.useFundebug) {
		fundebugConfigPack(() => {
			prodConfigPack();
		})
	}else {
		prodConfigPack();
	}
})

