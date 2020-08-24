const {analysisSport} = require('./scraper/getData.js')
const {readCheckSheet} = require('./database/cloudStorage.js');
const {cleanFiles} = require('./database/tempStorage.js');
const {mode} = require('./tools/dictionaries.js');


const start = async() => {
	cleanFiles();
	mode.map(async(sport) => {
		readCheckSheet(sport);
	})
	console.log('Read complete: ' + Date.now());
	console.log('--------------');
	analysisSport();
}

start();