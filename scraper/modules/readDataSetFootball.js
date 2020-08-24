'use strict';

const cheerio = require('cheerio');
const {recordFile} = require('../../database/tempStorage.js');
const {mode} = require('../../tools/dictionaries.js');

const pariMatch = data => {
	const time = new Date();
	const profile = []
	const footballIndicator = ['esport', 'киберфутбол'];
	const $ = cheerio.load(data, { decodeEntities: false });
	const table = $('div.container:nth-child(3)').find('.sport.item');
	$(table).each((i, elem) => {
		const liga  = $(elem).text();
		if(liga.toLowerCase().indexOf(footballIndicator[0]) !== -1 && liga.toLowerCase().indexOf(footballIndicator[1]) !== -1){
			const games = $('.subitem').eq(i).find('.td_n');
			$(games).each((j, game) => {
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
	return recordFile(profile, mode[0]);
}

const winLine = data => {
	const time = new Date();
	const profile = [];
	const footballIndicator = 'esport';
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.sheet.wl-inf-scroll-championship-block');
	$(tables).each((i, table) => {
		const formattedNameLiga = $(table).find('.sheet-navigation.ng-scope').find('.ng-binding').text().trim();
		if(formattedNameLiga.toLowerCase().indexOf(footballIndicator) !== -1){
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
	})
	return recordFile(profile, mode[0]);
}

const baltBet = data => {
	const time = new Date();
	const profile = [];
	const footballIndicator = 'киберфутбол';
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.events-table.m-expanded.m-not-collapsable.m-live.m-expandable');
	$(tables).each((i, table) => {
		const nameTable = $(table).find('.events-table__sport-title').text();
		if(nameTable.toLowerCase().indexOf(footballIndicator) !== -1){
			const games = $(table).find('.events-table__row-main-info');
			$(games).each((a, game) => {
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
			})
		}
	})
	return recordFile(profile, mode[0]);
}

const ligaStavok = data => {
	const time = new Date();
	const profile = [];
	const footballIndicator = ['футбол', 'esport'];
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.events-block-a2cd1d.live__events-bc4f20');
	$(tables).each((i, table) => {
		const nameTable = $(table).find('.live__sport-name-e953fd').text();
		if(nameTable.toLowerCase().indexOf(footballIndicator[0]) !== -1){
			const ligs = $(table).find('.bui-event-row__league-4784b4');
			$(ligs).each((j, liga) => {
				const formattedNameLiga = $(liga).text();
				if(formattedNameLiga.toLowerCase().indexOf(footballIndicator[1]) !== -1){
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
						position: 0,
						bets: false	
					})
				}
			})
		}
	})
	return recordFile(profile, mode[0]);
}

const marathonBet = data => {
	const time = new Date();
	const profile = [];
	const footballIndicator = 'esport';
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.category-container');
	$(tables).each((i, table) => {
		const formattedNameLiga = $(table).find('.category-label.simple-live').text();
		if(formattedNameLiga.toLowerCase().indexOf(footballIndicator) !== -1){
			const games = $(table).find('.coupon-row')
			$(games).each((j, game) => {
				const nameGame = $(game).find('.live-today-member-name.nowrap');
				const formattedNamePlayer_1 = $(nameGame).eq(0).text().replace(/[\s{2,}]+/g, ' ').trim();
				const formattedNamePlayer_2 = $(nameGame).eq(1).text().replace(/[\s{2,}]+/g, ' ').trim();
				profile.push({
					bk: 'MarathonBet',
					date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
					time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
					liga: formattedNameLiga,
					namePlayer1: formattedNamePlayer_1,
					namePlayer2: formattedNamePlayer_2,
					match: false,
					position: 0,
					bets: false
				})
			})
		}
	})
	return recordFile(profile, mode[0]);
}

const bet365 = data => {
	const time = new Date();
	const profile = [];
	const footballIndicator = ['esoccer', 'esport', '8 mins'];
	const $ = cheerio.load(data[0], { decodeEntities: false });
	const tables = $('.ovm-Competition.ovm-Competition-open');
	$(tables).each((i, table) => {
		const formattedNameLiga = $(table).find('.ovm-CompetitionHeader_Name').text();
		if(formattedNameLiga.toLowerCase().indexOf(footballIndicator[0]) !== -1 && formattedNameLiga.toLowerCase().indexOf(footballIndicator[2]) !== -1){
			const games = $(table).find('.ovm-FixtureDetailsTwoWay_TeamsWrapper');
			$(games).each((j, game) =>{
				const nameGame = $(game).text();
				if(nameGame.toLowerCase().indexOf(footballIndicator[1]) !== -1){
					const formattedNamePlayer_1 = $(game).find('.ovm-FixtureDetailsTwoWay_TeamName').eq(0).text().slice(0, -8);
					const formattedNamePlayer_2 = $(game).find('.ovm-FixtureDetailsTwoWay_TeamName').eq(1).text().slice(0, -8);
					profile.push({
						bk: 'Bet365',
						date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
						time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
						liga: formattedNameLiga,
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
	return recordFile(profile, mode[0]);
}

const fonBet = data => {
	const time = new Date();
	const profile = [];
	const footballIndicator = 'esport';
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.table__body');
	$(tables).each((i, table) => {
		const formattedNameLiga = $(table).find('.table__title-text').text();
		if(formattedNameLiga.toLowerCase().indexOf(footballIndicator) !== -1){
			const games = $(table).find('h3.table__match-title-text');
			$(games).each((j, game) => {
				const nameGame = $(game).text();
				const formattedNamePlayer_1 = nameGame.split('—')[0].trim();
				const formattedNamePlayer_2 = nameGame.split('—')[1].trim();
				profile.push({
					bk: 'FonBet',
					date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
					time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
					liga: formattedNameLiga,
					namePlayer1: formattedNamePlayer_1,
					namePlayer2: formattedNamePlayer_2,
					match: false,
					position: 0,
					bets: false
				})
			})
		}
	})
	return recordFile(profile, mode[0]);
}

const williamHill = data => {
	const time = new Date();
	const profile = [];
	const $ = cheerio.load(data, { decodeEntities: false });
	const box = $('#ip_type_43846')
	if(box){
		const games = $(box).find('tbody').eq(0).find('.rowLive')
		if(games){
			$(games).each((j, game) => {
				const style = $(game).attr('style')
				if(!style){
					const checkLive = $(game).find('td').eq(0).text().toLowerCase();
					if(checkLive.indexOf('live в') === -1){
						const nameGame = $(game).find('td').eq(2).text();
						const formattedNameGame = nameGame.replace(/[\s{2,}]+/g, ' ').trim();
						const formattedNamePlayer_1 = formattedNameGame.split(' v ')[0];
						const formattedNamePlayer_2 = formattedNameGame.split(' v ')[1];
						profile.push({
							bk: 'WilliamHill',
							date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear(),
							time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
							namePlayer1: formattedNamePlayer_1,
							namePlayer2: formattedNamePlayer_2,
							match: false,
							position: 0,
							bets: false
						})
					}
				}
			})
		}
	}
	return recordFile(profile, mode[0]);
}

const olimp = data => {
	const time = new Date();
	const profile = [];
	const footballIndicator = 'футбол';
	const nameId = 's';
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.smallwnd3.live_main_table').find('tr');
	$(tables).each((i, table) => {
		const formattedNameLiga = $(table).find('a').text();
		if(formattedNameLiga.toLowerCase().indexOf(footballIndicator) !== -1){
			let index = i + 1;
			let game = $(tables).eq(index);
			let idGame = $(game).attr('id');
			let nameGame = $(game).find('a.l-name-tab').text();
			let formattedNamePlayer_1 = nameGame.split(' - ')[0];
			let formattedNamePlayer_2 = nameGame.split(' - ')[1];
			while(idGame.indexOf(nameId) !== -1){
				formattedNamePlayer_1 = nameGame.split(' - ')[0];
				formattedNamePlayer_2 = nameGame.split(' - ')[1];
				if(formattedNamePlayer_1.indexOf('(') !== -1 && formattedNamePlayer_1.indexOf(')') !== -1){
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
				}
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
	return recordFile(profile, mode[0]);
}
const leon = data => {
	const time = new Date();
	const profile = [];
	const $ = cheerio.load(data, { decodeEntities: false });
	const tables = $('.st-event-body');
	$(tables).each((i, table) => {
		const nameGame = $(table).find('.st-name.st-link').text();
		const formattedNameGame = nameGame.replace(/[\s{2,}]+/g, ' ').trim();
		const formattedNamePlayer_1 = formattedNameGame.split('-')[0].trim();
		const formattedNamePlayer_2 = formattedNameGame.split('-')[1].trim();
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
	return recordFile(profile, mode[0]);
}

const toto = data => {
	const time = new Date();
	const footballIndicator = [ '8 mins', 'fifa']
	const profile = [];
	const $ = cheerio.load(data, {decodeEntities: false});
	const tables = $('.live_menu_item');
	$(tables).each((i, table) => {
		const liga = $(table).find('#overviewEventHeader').children().eq(0).text();
		if(liga.toLowerCase().indexOf(footballIndicator[0]) !== -1 && liga.toLowerCase().indexOf(footballIndicator[1]) !== -1){
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
	return recordFile(profile, mode[0]);
}

module.exports = {
	pariMatch,
	winLine,
	baltBet,
	ligaStavok,
	marathonBet,
	bet365,
	fonBet,
	williamHill,
	olimp,
	leon,
	toto
}