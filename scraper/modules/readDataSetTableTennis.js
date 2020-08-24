'use strict';

const cheerio = require('cheerio');
const {recordFile} = require('../../database/tempStorage.js');
const {mode} = require('../../tools/dictionaries.js');

const pariMatch = (data) => {
	const time = new Date();
	const profile = [];
	const tennisIndicator_1 = 'setka cup';
	const tennisIndicator_2 = 'настольный теннис';
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('div.container:nth-child(3)').find('.sport.item');
	$(tables).each((i, table) => {
		const liga  = $(table).text();
		if(liga.toLowerCase().indexOf(tennisIndicator_1) !== -1 && liga.toLowerCase().indexOf(tennisIndicator_2) !== -1){
			const games = $('.subitem').eq(i).find('.td_n');
			$(games).each((j, game) => {
				const formattedNameLiga = liga.split('(')[0];
				const nameGame = $(game).text();
				const formattedNamePlayer_1 = nameGame.split('-')[0].trim();
				const formattedNamePlayer_2 = nameGame.split('-')[1].slice(0, -1).trim();
				profile.push({
					bk: 'Parimatch',
					date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
					time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
					namePlayer1: formattedNamePlayer_1,
					namePlayer2: formattedNamePlayer_2,
					match: false,
					position: 0,
					bets: false
				})
			});
		};
	})
	return recordFile(profile, mode[1]);

}

const ligaStavok = (data) => {
	const time = new Date();
	const profile = [];
	const tableTennisIndicator = ['настольный теннис', 'setka cup'];
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.events-block-a2cd1d.live__events-bc4f20');
	$(tables).each((i, table) => {
		const nameTable = $(table).find('.live__sport-name-e953fd').text();
		if(nameTable.toLowerCase().indexOf(tableTennisIndicator[0]) !== -1){
			const ligs = $(table).find('.bui-event-row__league-4784b4');
			$(ligs).each((j, liga) => {
				const formattedNameLiga = $(liga).text();
				if(formattedNameLiga.toLowerCase().indexOf(tableTennisIndicator[1]) !== -1){
					const game = $(table).find('.bui-commands-9a4e49.bui-event-row__command-39f930').eq(j).children();
					const formattedNamePlayer_1 = game.eq(0).text();
					const formattedNamePlayer_2 = game.eq(1).text();
					profile.push({
						bk: 'LigaStavok',
						date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
						time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
						namePlayer1: formattedNamePlayer_1,
						namePlayer2: formattedNamePlayer_2,
						match: false,
						position: 0	,
						bets: false
					})
				}
			})
		}
	})
	return recordFile(profile, mode[1]);

}

const olimp = (data) => {
	const time = new Date();
	const profile = [];
	const tableTennisIndicator = 'настольный теннис';
	const nameId = 's';
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.smallwnd3.live_main_table').find('tr');
	$(tables).each((i, table) => {
		const formattedNameLiga = $(table).find('a').text();
		if(formattedNameLiga.toLowerCase().indexOf(tableTennisIndicator) !== -1){
			let index = i + 1;
			let game = $(tables).eq(index);
			let idGame = $(game).attr('id');
			let nameGame = $(game).find('a.l-name-tab').text();
			let formattedNamePlayer_1 = nameGame.split(' - ')[0];
			let formattedNamePlayer_2 = nameGame.split(' - ')[1];
			while(idGame.indexOf(nameId) !== -1){
				formattedNamePlayer_1 = nameGame.split(' - ')[0];
				formattedNamePlayer_2 = nameGame.split(' - ')[1];
				profile.push({
					bk: 'Olimp',
					date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
					time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
					namePlayer1: formattedNamePlayer_1,
					namePlayer2: formattedNamePlayer_2,
					match: false,
					position: 0,
					bets: false
				})
				index++;
				game = $(tables).eq(index);
				idGame = $(game).attr('id');
				nameGame = $(game).find('a.l-name-tab').text();
				if(idGame === undefined){
					break;
				}
			}
		}
	})
	return recordFile(profile, mode[1]);
}

const marathonBet = (data) => {
	const time = new Date();
	const profile = [];
	const tableTennisIndicator = 'кубок сетка';
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.category-container');
	$(tables).each((i, table) => {
		const formattedNameLiga = $(table).find('.category-label.simple-live').text();
		if(formattedNameLiga.toLowerCase().indexOf(tableTennisIndicator) !== -1){
			const games = $(table).find('.coupon-row')
			$(games).each((j, game) => {
				const nameGame = $(game).find('.live-today-member-name.nowrap');
				const formattedNamePlayer_1 = $(nameGame).eq(0).text().replace(/[\s{2,}]+/g, ' ').trim();
				const formattedNamePlayer_2 = $(nameGame).eq(1).text().replace(/[\s{2,}]+/g, ' ').trim();
				profile.push({
					bk: 'MarathonBet',
					date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
					time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
					namePlayer1: formattedNamePlayer_1,
					namePlayer2: formattedNamePlayer_2,
					match: false,
					position: 0,
					bets: false
				})
			})
		}
	})
	return recordFile(profile, mode[1]);

}

const baltBet = (data) => {
  	const time = new Date();
	const profile = [];
	const tableTennisIndicator = ['настольный теннис', 'setka cup'];
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.events-table.m-expanded.m-not-collapsable.m-live.m-expandable');
	$(tables).each((i, table) => {
		const nameTable = $(table).find('.events-table__sport-title').text();
		if(nameTable.toLowerCase().indexOf(tableTennisIndicator[0]) !== -1){
			const games = $(table).find('.events-table__row-main-info');
			$(games).each((a, game) => {
				const nameLiga = $(game).find('div.events-table__league').text();
				if(nameLiga.toLowerCase().indexOf(tableTennisIndicator[1]) !== -1){
					const formattedNameLiga = nameLiga.replace(/[\s{2,}]+/g, ' ').trim();
					const nameGame = $(game).find('div.events-table__title').text();
					const formattedNameGame = nameGame.replace(/[\s{2,}]+/g, ' ').trim();
					const formattedNamePlayer_1 = formattedNameGame.split('—')[0].trim();
					const formattedNamePlayer_2 = formattedNameGame.split('—')[1].trim();
					profile.push({
						bk: 'BaltBet',
						date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
						time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
						namePlayer1: formattedNamePlayer_1,
						namePlayer2: formattedNamePlayer_2,
						match: false,
						position: 0,
						bets: false
					})
				}
			})
		}
	})
	return recordFile(profile, mode[1]);
}

//  −/−
const winLine = (data) => {
	const time = new Date();
	const profile = [];
	const $ = cheerio.load(data, { decodeEntities: false });
	const table = $('.sheet.wl-inf-scroll-championship-block');
	if(table){
		const games = $(table).find('.statistic__team');
		$(games).each((j, game) => {
			const nameGame = $(game).text();
			const formattedNameGame = nameGame.replace(/[\s{2,}]+/g, ' ').trim();
			const formattedNamePlayer_1 = formattedNameGame.split('-')[0].trim();
			const formattedNamePlayer_2 = formattedNameGame.split('-')[1].trim();
			profile.push({
				bk: 'WinLine',
				date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
				time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
				namePlayer1: formattedNamePlayer_1,
				namePlayer2: formattedNamePlayer_2,
				match: false,
				position: 0,
				bets: false
			})
		})
	}
	return recordFile(profile, mode[1]);
}

const bet365 = (data) => {
	const time = new Date();
	const profile = [];
	const $ = cheerio.load(data[1], { decodeEntities: false });
	const tables = $('.ovm-Fixture_Container');
	$(tables).each((i, table) => {
		const game = $(table).find('.ovm-FixtureDetailsWithIndicators_TeamsWrapper');
		const formattedNamePlayer_1 = $(game).children().eq(0).text();
		const formattedNamePlayer_2 = $(game).children().eq(1).text();
		profile.push({
			bk: 'Bet365',
			date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
			time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
			namePlayer1: formattedNamePlayer_1,
			namePlayer2: formattedNamePlayer_2,
			match: false,
			position: 0,
			bets: false
		})
	})
	return recordFile(profile, mode[1]);
}
/*
bet365Prematch = (data) => {
	const time = new Date();
	const profile = [];
	const tableTennisIndicator = ['setka cup', 'matches'];
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.sm-SplashMarketGroup.sm-SplashMarketGroup_Cn2');
	$(tables).each((i, table) => {
		const nameLiga = $(talbe).find('.sm-SplashMarketGroupButton_Text').text();
		if(nameLiga.toLowerCase() === tableTennisIndicator[0]){
			const listMatches = $(table).find('.sm-SplashMarket_Title').text();
			if(listMatches.toLowerCase === tableTennisIndicator[1]){

			}
		}
	})
}*/
const fonBet = (data) => {
	const time = new Date();
	const profile = [];
	const tableTennisIndicator = [ 'настольный теннис', 'setka cup'];
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.table__body');
	$(tables).each((i, table) => {
		const formattedNameLiga = $(table).find('.table__title-text').text();
		if(formattedNameLiga.toLowerCase().indexOf(tableTennisIndicator[0]) !== -1 && formattedNameLiga.toLowerCase().indexOf(tableTennisIndicator[1]) !== -1){
			const games = $(table).find('h3.table__match-title-text');
			$(games).each((j, game) => {
				const nameGame = $(game).text();
				const formattedNamePlayer_1 = nameGame.split('—')[0].trim();
				const formattedNamePlayer_2 = nameGame.split('—')[1].trim();
				profile.push({
					bk: 'FonBet',
					date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
					time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
					namePlayer1: formattedNamePlayer_1,
					namePlayer2: formattedNamePlayer_2,
					match: false,
					position: 0,
					bets: false
				})
			})
		}
	})
	return recordFile(profile, mode[1]);
}

const betCity = (data) => {
	const time = new Date();
	const profile = [];
	const tableTennisIndicator = ['setka cup'];
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.line__champ');
	$(tables).each((i, table) => {
		const nameTable = $(table).find('.line-champ__header-name').text();
		if(nameTable.toLowerCase().indexOf(tableTennisIndicator[0]) !== -1){
			const formattedNameLiga = nameTable.trim();
			const games = $(table).find('span.line-event__name');
			$(games).each((j, game) => {
				const nameGame = $(game).find('.bold-nowrap-text'); 
				const formattedNamePlayer_1 = nameGame.eq(0).text();
				const formattedNamePlayer_2 = nameGame.eq(1).text();
				profile.push({
					bk: 'BetCity',
					date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
					time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
					namePlayer1: formattedNamePlayer_1,
					namePlayer2: formattedNamePlayer_2,
					match: false,
					position: 0,
					bets: false
				})
			})
		}
	})	
	return recordFile(profile, mode[1]);

}

const leon = (data) => {
	const time = new Date();
	const profile = [];
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.st-event-body');
	$(tables).each((i, table) => {
		const nameGame = $(table).find('.st-name.st-link').text();
		const formattedNameGame = nameGame.replace(/[\s{2,}]+/g, ' ').trim();
		const formattedNamePlayer_1 = formattedNameGame.split('-')[0].trim();
		let formattedNamePlayer_2 = formattedNameGame.split('-')[1].trim();
		if(formattedNamePlayer_2.indexOf('(') !== -1){
			formattedNamePlayer_2 = formattedNamePlayer_2.slice(0, formattedNamePlayer_2.indexOf('(')-1);
		}
		profile.push({
			bk: 'Leon',
			date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
			time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
			namePlayer1: formattedNamePlayer_1,
			namePlayer2: formattedNamePlayer_2,
			match: false,
			position: 0,
			bets: false
		})
	})
	return recordFile(profile, mode[1]);
}

const toto = data => {
	const time = new Date();
	const footballIndicator = 'setka cup';
	const profile = [];
	const $ = cheerio.load(data, {decodeEntities: false});
	const tables = $('.live_menu_item');
	$(tables).each((i, table) => {
		const liga = $(table).find('#overviewEventHeader').children().eq(0).text();
		if(liga.toLowerCase().indexOf(footballIndicator) !== -1){
			const formattedNameGame = $(table).find('.tg-flex-grow.tg--pad-8.tg--oe.tg_team_name');
			const formattedNamePlayer_1 = formattedNameGame.eq(0).text();
			const formattedNamePlayer_2 = formattedNameGame.eq(1).text();
			profile.push({
				bk: 'Toto',
				date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
				time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
				namePlayer1: formattedNamePlayer_1,
				namePlayer2: formattedNamePlayer_2,
				match: false,
				position: 0,
				bets: false
			})
		}

	})
	return recordFile(profile, mode[1]);
}

module.exports = {
	pariMatch,
	ligaStavok,
	olimp,
	marathonBet,
	baltBet,
	winLine,
	bet365,
	fonBet,
	betCity,
	leon,
	toto
}