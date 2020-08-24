'use strict';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const {readFile, recordFile} = require('./tempStorage.js');
const tools = require('./../tools/dictionaries.js');
const { translate, similarity } = require('./../tools/otherTools.js');
const {send} = require('./../tools/log.js');

const checkSheetFootball = '19wvuEhDvfNjnkffKzWh0QY9Ilx99p21EAkvzkXhGo2k';
const checkSheetTableTennis = '1HoU1jtAgnFrVnonuJAI-vjOoosy6SgE4DC02_L4py9o';

const sheetFootball = '15Ir6AxKxiC5ohBaPLRxxui8Bl5p98a76gmTlZJWiUbA';
const sheetTableTennis = '1z1RGXJ_W8qRDXVVzWpqJhGRNFGamSAE3LpnfVFX8nzA';

const sheduleFootball = [];
const sheduleTableTennis = [];


const recordHistorySheet = async(sport) => {
	let headers = [];
	let sheetId;
	if(sport === 'Football'){
		headers = ['Parimatch', 'WinLine', 'BaltBet', 'LigaStavok', 'MarathonBet', 'Bet365', 'FonBet', 'WilliamHill', 'Olimp', 'Leon', 'Toto'];
		sheetId = sheetFootball;
	}else if(sport === 'TableTennis'){
		headers = ['Parimatch', 'LigaStavok', 'Olimp', 'Marathon', 'BaltBet', 'WinLine',  'Bet365', 'Fonbet', 'FavBet', 'BetCity', 'WilliamHill',  'Leon', 'Toto'];
		sheetId = sheetTableTennis;
	}
	
	const doc = new GoogleSpreadsheet(sheetId);
	await doc.useServiceAccountAuth(require('./client_secret.json'))
	await doc.loadInfo();
	
	const sheets = doc.sheetsByIndex;
 	let mainSheet;
	let flag = true;
	const time = new Date();
	const nameTitle = time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear();

	sheets.map((sheet) => {
		if(sheet.title === nameTitle){
			flag = false;
			mainSheet = sheet;
		}
	})
	if(flag){
		mainSheet = await doc.addSheet({
			title: nameTitle,
			headerValues: headers,
		});
	}
	const profile = readFile(sport);

	await mainSheet.loadCells();
	const i = [];
	let max_index = 0;
	for(let j = 0; j < headers.length; j++){
		let null_index = 1;
		let cell = mainSheet.getCell(null_index, j);
		while(cell.value !== null){
			null_index++;
			cell = mainSheet.getCell(null_index, j);
		}
		i.push(null_index);
	}

	profile.map(async(game) => {
		if(game.time !== undefined){
			let columnIndex;
			if(sport === 'Football') columnIndex = tools.dictionaryRecordHistorySheetFootball(game.bk);
			if(sport === 'TableTennis') columnIndex = tools.dictionaryRecordHistorySheetTableTennis(game.bk);
			const cell = mainSheet.getCell(i[columnIndex], columnIndex);
			cell.value = game.time + " " + game.namePlayer1 + " - " + game.namePlayer2;
			if(game.match === 'true'){
				cell.backgroundColor = { "red": 0, "green": 1, "blue": 0, "alpha": 0 };
			}
			i[columnIndex]++;
			if(i[columnIndex] > max_index) max_index = i[columnIndex];
		}
	})
	
	for(let j = 0; j < headers.length; j++){
		let feel_index = i[j];
		for(feel_index; feel_index <= max_index; feel_index++){
			const cell = mainSheet.getCell(feel_index, j);
			cell.value = '-'
			if(feel_index === max_index){
				cell.backgroundColor = { "red": 0, "green": 0, "blue": 1, "alpha": 0 };
			}
		}
	}

	await mainSheet.saveUpdatedCells();

	recordFile(profile, sport);
	
	return 1;
}



const readCheckSheet = async(sport) => {
	let sheetId;

	if(sport === 'Football'){
		sheetId = checkSheetFootball;
	}else if(sport === 'TableTennis'){
		sheetId = checkSheetTableTennis;
	}

	const doc = new GoogleSpreadsheet(sheetId);
	await doc.useServiceAccountAuth(require('./client_secret.json'))
	await doc.loadInfo();

	const mainSheet = doc.sheetsByIndex[0];
	
	if(mainSheet){
		await mainSheet.loadCells();

		if(sport === 'Football'){
			let null_index = 1;
			let cell = mainSheet.getCell(null_index, 3);
			while(cell.value !== null){
				cell = mainSheet.getCell(null_index, 3);
				if(cell.value !== null){
					const str = cell.value.toString();
					sheduleFootball.push({
						time: str.split(' ')[0],
						namePlayer1: str.split(' - ')[0].substr(str.split(' ')[0].length + 1),
						namePlayer2: str.split(' - ')[1]
					})
				}
				null_index++;
			}
		}

		if(sport === 'TableTennis'){
			let null_index = 1;
			let cell = mainSheet.getCell(null_index, 4);
			let timeCell = mainSheet.getCell(null_index, 3);
			while(cell.value !== null){
				cell = mainSheet.getCell(null_index, 4);
				timeCell = mainSheet.getCell(null_index, 3);
				if(cell.value !== null){
					const time = timeCell.value;
					const str = cell.value.toString();
					let formattedNamePlayer1 = str.split(' - ')[0];
					let formattedNamePlayer2 = str.split(' - ')[1];
					if(formattedNamePlayer2 === undefined){
						formattedNamePlayer1 = str.split(' – ')[0];
						formattedNamePlayer2 = str.split(' – ')[1];
					}
					sheduleTableTennis.push({
						time: time,
						namePlayer1: formattedNamePlayer1,
						namePlayer2: formattedNamePlayer2
					})
				}
				null_index++;
			}
		}

	}
}

const recordCheckSheet = async(sport) => {
	let sheetId;

	if(sport === 'Football'){
		sheetId = checkSheetFootball;
	}else if(sport === 'TableTennis'){
		sheetId = checkSheetTableTennis;
	}
	
	const doc = new GoogleSpreadsheet(sheetId);
	await doc.useServiceAccountAuth(require('./client_secret.json'))
	await doc.loadInfo();

	const mainSheet = doc.sheetsByIndex[0];

	const profile = readFile(sport);

	if(mainSheet) {
		let max_row = 1;
		await mainSheet.loadCells();
		profile.map(liveGame => {
			if(liveGame.match === 'true'){
				let index_column;
				if(max_row < liveGame.position){
					max_row = liveGame.position;
				}
				if(sport === 'Football'){
					index_column = tools.dictionaryRecordCheckSheetFootball(liveGame.bk) + 5;
				}
				if(sport === 'TableTennis'){
					index_column = tools.dictionaryRecordCheckSheetTableTennis(liveGame.bk) + 6;
				}
				const cell = mainSheet.getCell(liveGame.position, index_column);
				cell.value = 1;
			}
		})

		//fix two
		//await mainSheet.saveUpdatedCells();
		
		let max_column;
		let start_column;
		if(sport === 'Football'){
			max_column = 16;
			start_column = 5;
		}
		if(sport === 'TableTennis'){
			max_column = 18;
			start_column = 6;
		}

		for(let i = 1; i <= max_row; i++){
			for(let j = start_column; j < max_column; j++){
				const cell = mainSheet.getCell(i, j);
				if(cell.value !== 1){
					cell.value = 0;
				}
			}
		}

		await mainSheet.saveUpdatedCells();
		
	}

	return 1;
}

//sync
const checkMatches = (mode) => {
	const sport = mode;

	let TIMER = 720000;
	let sheduleSport = [];
	let profile = [];
	if(sport === 'Football') {
		TIMER = 720000;
		sheduleSport = sheduleFootball;
	}
	if(sport === 'TableTennis'){
		TIMER = 1800000;	
		sheduleSport = sheduleTableTennis;
	}

	profile = readFile(sport);

	sheduleSport.map((sheduleGame) => {
		profile.map((liveGame) => {
			if(liveGame.time !== undefined){
				const sheduleTime = new Date();
				sheduleTime.setHours(parseInt(sheduleGame.time.split(':')[0]) + 3, sheduleGame.time.split(':')[1], 0, 0);
				const liveTime = new Date();
				liveTime.setHours(parseInt(liveGame.time.split(':')[0]) + 3, liveGame.time.split(':')[1], 0, 0);
				const difference = liveTime - sheduleTime;
				if(difference <= TIMER && difference >= 0){
					if(sport === 'Football'){
						try{
							if(liveGame.namePlayer2.indexOf('(') !== -1 && liveGame.namePlayer1.indexOf('(') !== -1){
								const namePlayer1_1 = sheduleGame.namePlayer1.split('(')[1].slice(0, -1).trim().toLowerCase();
								const namePlayer2_1 = sheduleGame.namePlayer2.split('(')[1].slice(0, -1).trim().toLowerCase();

								const checkFlag_1 = liveGame.namePlayer1.toLowerCase().indexOf(namePlayer1_1);
								const checkFlag_2 = liveGame.namePlayer2.toLowerCase().indexOf(namePlayer2_1);

								const checkFlag_3 = liveGame.namePlayer1.toLowerCase().indexOf(namePlayer2_1);
								const checkFlag_4 = liveGame.namePlayer2.toLowerCase().indexOf(namePlayer1_1);
		 						
		 						const namePlayer1_2 = liveGame.namePlayer1.split('(')[1].slice(0, -1).trim().toLowerCase();
								const namePlayer2_2 = liveGame.namePlayer2.split('(')[1].slice(0, -1).trim().toLowerCase();

		 						const checkFlag_5 = similarity(namePlayer1_1, namePlayer1_2);
		 						const checkFlag_6 = similarity(namePlayer2_1, namePlayer2_2);
		 						const checkFlag_7 = similarity(namePlayer1_1, namePlayer2_2);
		 						const checkFlag_8 = similarity(namePlayer2_1, namePlayer1_2);


								if(checkFlag_1 !== -1 && checkFlag_2 !== -1 || checkFlag_3 !== -1 && checkFlag_4 !== -1){
									liveGame.match = true;
									liveGame.position = sheduleSport.indexOf(sheduleGame) + 1;
								}
								else if(checkFlag_5 <= 3 && checkFlag_6 <= 3 || checkFlag_7 <= 3 && checkFlag_8 <= 3){
									liveGame.match = true;
									liveGame.position = sheduleSport.indexOf(sheduleGame) + 1;
								}

							}
						}
						catch(err) {
							console.error(err);
						}
					}
					if(sport === 'TableTennis'){
						try{
							if(sheduleGame.namePlayer2 !== undefined){
								const namePlayer1_1 = sheduleGame.namePlayer1.split(' ')[0].trim().toLowerCase();
								const namePlayer2_1 = sheduleGame.namePlayer2.split(' ')[0].trim().toLowerCase();

								let namePlayer1_2 = liveGame.namePlayer1.split(' ')[0].toLowerCase();
								let namePlayer2_2 = liveGame.namePlayer2.split(' ')[0].toLowerCase();
								
								const checkFlag_1 = liveGame.namePlayer1.toLowerCase().indexOf(namePlayer1_1);
								const checkFlag_2 = liveGame.namePlayer2.toLowerCase().indexOf(namePlayer2_1);

								const check_1 = checkFlag_1 !== -1 && checkFlag_2 !== -1;

								const checkFlag_3 = liveGame.namePlayer1.toLowerCase().indexOf(namePlayer2_1);
								const checkFlag_4 = liveGame.namePlayer2.toLowerCase().indexOf(namePlayer1_1);

								const check_2 = checkFlag_3 !== -1 && checkFlag_4 !== -1

								let checkFlag_5 = similarity(namePlayer1_1,namePlayer1_2);
								let checkFlag_6 = similarity(namePlayer2_1,namePlayer2_2);
								let checkFlag_7 = similarity(namePlayer1_1,namePlayer2_2);
								let checkFlag_8 = similarity(namePlayer2_1,namePlayer1_2);
								
								let check_3 = checkFlag_5 <= 3 && checkFlag_6 <= 3;
								let check_4 = checkFlag_7 <= 3 && checkFlag_8 <= 3;

								if(liveGame.bk === 'Bet365' || liveGame.bk === 'Leon'){

									namePlayer1_2 = liveGame.namePlayer1.split(' ')[1].toLowerCase();
									namePlayer2_2 = liveGame.namePlayer2.split(' ')[1].toLowerCase();

									checkFlag_5 = similarity(translate(namePlayer1_1),namePlayer1_2);
									checkFlag_6 = similarity(translate(namePlayer2_1),namePlayer2_2);
									checkFlag_7 = similarity(translate(namePlayer1_1),namePlayer2_2);
									checkFlag_8 = similarity(translate(namePlayer2_1),namePlayer1_2);
									
									check_3 = checkFlag_5 <= 3 && checkFlag_6 <= 3;
									check_4 = checkFlag_7 <= 3 && checkFlag_8 <= 3;

									if( check_3 || check_4){
										liveGame.match = true;
										liveGame.position = sheduleSport.indexOf(sheduleGame) + 1;
									}


									if(liveGame.bk === 'Leon' && liveGame.match === 'false'){
										namePlayer1_2 = liveGame.namePlayer1.split(' ')[0].toLowerCase();
										namePlayer2_2 = liveGame.namePlayer2.split(' ')[0].toLowerCase();

										checkFlag_5 = similarity(translate(namePlayer1_1),namePlayer1_2);
										checkFlag_6 = similarity(translate(namePlayer2_1),namePlayer2_2);
										checkFlag_7 = similarity(translate(namePlayer1_1),namePlayer2_2);
										checkFlag_8 = similarity(translate(namePlayer2_1),namePlayer1_2);

										check_3 = checkFlag_5 <= 3 && checkFlag_6 <= 3;
										check_4 = checkFlag_7 <= 3 && checkFlag_8 <= 3;

										if( check_3 || check_4){
											liveGame.match = true;
											liveGame.position = sheduleSport.indexOf(sheduleGame) + 1;
										}
										else{
											namePlayer1_2 = liveGame.namePlayer1.split(' ')[0].toLowerCase();
											namePlayer2_2 = liveGame.namePlayer2.split(' ')[1].toLowerCase();

											checkFlag_5 = similarity(translate(namePlayer1_1),namePlayer1_2);
											checkFlag_6 = similarity(translate(namePlayer2_1),namePlayer2_2);
											checkFlag_7 = similarity(translate(namePlayer1_1),namePlayer2_2);
											checkFlag_8 = similarity(translate(namePlayer2_1),namePlayer1_2);

											check_3 = checkFlag_5 <= 3 && checkFlag_6 <= 3;
											check_4 = checkFlag_7 <= 3 && checkFlag_8 <= 3;

											if( check_3 || check_4) {
												liveGame.match = true;
												liveGame.position = sheduleSport.indexOf(sheduleGame) + 1;
											}
											else{
												namePlayer1_2 = liveGame.namePlayer1.split(' ')[1].toLowerCase();
												namePlayer2_2 = liveGame.namePlayer2.split(' ')[0].toLowerCase();

												checkFlag_5 = similarity(translate(namePlayer1_1),namePlayer1_2);
												checkFlag_6 = similarity(translate(namePlayer2_1),namePlayer2_2);
												checkFlag_7 = similarity(translate(namePlayer1_1),namePlayer2_2);
												checkFlag_8 = similarity(translate(namePlayer2_1),namePlayer1_2);

												check_3 = checkFlag_5 <= 3 && checkFlag_6 <= 3;
												check_4 = checkFlag_7 <= 3 && checkFlag_8 <= 3;

												if( check_3 || check_4){
													liveGame.match = true;
													liveGame.position = sheduleSport.indexOf(sheduleGame) + 1;
												}
											}

										}
										
									}
									
								}


								if( check_1 || check_2) {
									liveGame.match = true;
									liveGame.position = sheduleSport.indexOf(sheduleGame) + 1;
								}
								else if(check_3 || check_4) {
									liveGame.match = true;
									liveGame.position = sheduleSport.indexOf(sheduleGame) + 1;
								}
								
							}
							
						}
						catch(err){
							console.error(err)
						}
						
					}
				}
			}
		})
	})

	recordFile(profile, sport);
	return 1;
}

module.exports = {
	readCheckSheet,
	checkMatches,
	recordHistorySheet,
	recordCheckSheet
}
