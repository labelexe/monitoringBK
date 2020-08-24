'use strict';

const fs = require('fs');
const path = require('path');
const {mode} = require('./../tools/dictionaries.js');
const {send} = require('./../tools/log.js');

const time = new Date();
const nameFileFootball = path.join(__dirname,'../history/tempFootball.txt');
const nameFileTableTennis = path.join(__dirname,'../history/tempTableTennis.txt');
const nameFiles = [nameFileFootball, nameFileTableTennis]

let nameFile;

const cleanFiles = () => {
	nameFiles.map(nameFile => {
		fs.writeFileSync(nameFile, '')
	})
}

const recordFile = (profile, sport) => {
	mode.map((name, i) => {
		if(name === sport) nameFile = nameFiles[i];
	})

	if(nameFile) {
		profile.map((game) => {
			const string = game.date + ' >>> ' + game.time + ' >>> ' + game.bk + ' >>> ' + game.namePlayer1 + ' >>> ' + game.namePlayer2 + ' >>> ' + game.match + ' >>> ' + game.position + ' >>> ' + game.bets + '\r\n';
			if(string.indexOf('undefined') === -1){
				//fix one
				fs.appendFileSync(nameFile, string)
			}
		})
	}
	nameFile = '';
	return;
}

const readFile = (sport) => {

	mode.map((name, i) => {
		if(name === sport) nameFile = nameFiles[i];
	})

	if(nameFile) {
		const profile = [];
		if(fs.openSync(nameFile, 'r')){
			const data = fs.readFileSync(nameFile, 'utf8');
			const array = data.toString().split("\r\n");

		    array.map((str, i) => {
		    	profile.push({
		    		date: str.split(' >>> ')[0],
		    		time: str.split(' >>> ')[1],
		    		bk: str.split(' >>> ')[2],
		    		namePlayer1: str.split(' >>> ')[3],
		    		namePlayer2: str.split(' >>> ')[4],
		    		match: str.split(' >>> ')[5],
		    		position: str.split(' >>> ')[6],
		    		bets: str.split(' >>> ')[7]
		    	})
		    })
		}
			
		fs.writeFileSync(nameFile, '')
		nameFile = '';
		
		return profile;
	}
	nameFile = '';
	return;
}

module.exports = {
	readFile,
	recordFile,
	cleanFiles
}