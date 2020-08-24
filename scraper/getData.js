'use strict';

const parse = require('./modules/parseHTML.js');
const {readCheckSheet, recordHistorySheet, checkMatches, recordCheckSheet} = require('../database/cloudStorage.js');
const {mode} = require('../tools/dictionaries.js');



const analysisSport = () =>{
	parse.openBrowser().then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.pariMatchProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.ligaStavokProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.olimpProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.marathonBetProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.baltBetProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.winLineFootballProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.winLineTableTennisProps_1);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.winLineTableTennisProps_2);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.bet365Props);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.fonBetProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.betCityProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.leonFootballProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.leonTableTennisProps_1);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.leonTableTennisProps_2);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.williamHillProps);
	}).then(() => {
		console.log('.')
		return parse.getHTML(parse.properties.totoProps);
	}).then(() => {
		console.log('.')
		return parse.endParse();
	}).then(() => {
		console.log('Parse complete: ' + Date.now());
		mode.map(sport => {
			checkMatches(sport);
			recordHistorySheet(sport);
			recordCheckSheet(sport);
		});
		return 1;
	})

	/*.then(() => {
		console.log('Check complete: ' + Date.now());
		mode.map((sport) => {
			recordHistorySheet(sport);
		});
		return 1;
	}).then(() => {
		mode.map((sport) => {
			recordCheckSheet(sport);
		})
		return 1;
	})*/
	.then(() => {
		console.log('Record complete: ' + Date.now());
		console.log('----------------');
		return analysisSport();
	})
}



module.exports = {
	analysisSport
}


