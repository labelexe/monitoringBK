'use strict';

const mode = ['Football', 'TableTennis'];

const dictionaryRecordHistorySheetFootball = (word) => {
	switch(word){
		case 'Parimatch':
			return 0;
		case 'WinLine':
			return 1;
		case 'BaltBet':
			return 2;
		case 'LigaStavok':
			return 3;
		case 'MarathonBet':
			return 4;
		case 'Bet365':
			return 5;
		case 'FonBet':
			return 6;
		case 'WilliamHill':
			return 7;
		case 'Olimp':
			return 8;
		case 'Leon':
			return 9;
		case 'Toto':
			return 10;
		default: return;
	}
}

const dictionaryRecordHistorySheetTableTennis = (word) => {
	switch(word){
		case 'Parimatch':
			return 0;
		case 'LigaStavok':
			return 1;
		case 'Olimp':
			return 2;
		case 'MarathonBet':
			return 3;
		case 'BaltBet':
			return 4;
		case 'WinLine':
			return 5;
		case 'Bet365':
			return 6;
		case 'FonBet':
			return 7;
		case 'FavBet':
			return 8;
		case 'BetCity':
			return 9;
		case 'WilliamHill':
			return 10;
		case 'Leon':
			return 11;
		case 'Toto':
			return 12;
		default: return;
	}
}

const dictionaryRecordCheckSheetFootball = (word) => {
	switch(word){
		case 'Parimatch':
			return 0;
		case 'WinLine':
			return 1;
		case 'BaltBet':
			return 2;
		case 'LigaStavok':
			return 3;
		case 'MarathonBet':
			return 4;
		case 'Bet365':
			return 5;
		case 'FonBet':
			return 6;
		case 'WilliamHill':
			return 7;
		case 'Olimp':
			return 8;
		case 'Leon':
			return 9;
		case 'Toto':
			return 10;
		default: return;
	}
}

const dictionaryRecordCheckSheetTableTennis = (word) => {
	switch(word){
		case 'Parimatch':
			return 0;
		case 'LigaStavok':
			return 1;
		case 'Olimp':
			return 2;
		case 'MarathonBet':
			return 3;
		case 'BaltBet':
			return 4;
		case 'WinLine':
			return 5;
		case 'Bet365':
			return 6;
		case 'FonBet':
			return 8;
		//case 'FavBet':
			//return 8;
		case 'BetCity':
			return 9;
		//case 'WilliamHill':
			//return 10;
		case 'Leon':
			return 10;
		case 'Toto':
			return 11;
		default: return;
	}
}


module.exports = {
	dictionaryRecordHistorySheetFootball,
	dictionaryRecordHistorySheetTableTennis,
	dictionaryRecordCheckSheetTableTennis,
	dictionaryRecordCheckSheetFootball,
	mode
}