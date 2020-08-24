'use strict';

const Nightmare = require('nightmare');
const readTableTennis = require('./readDataSetTableTennis.js');
const readFootball = require('./readDataSetFootball.js');
const {send} = require('../../tools/log.js');


let nightmare;

const userAgent = 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36';

const openBrowser = () => {
	return nightmare = Nightmare({
	  waitTimeout: 30000,
	  executionTimeout: 999999,
	  show: false
	});
}

const properties = {

	pariMatchProps: {
		url: 'https://parimatch.com/live.html',
		selector: '#inplay',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [
			readTableTennis.pariMatch,
			readFootball.pariMatch
		]
	},

	ligaStavokProps: {
		url: 'https://www.ligastavok.ru/bets/live',
		selector: '#content',
		modeAction: async() => {
			document.body.style.zoom = "30%";
			while(1){
				let button = document.getElementsByClassName('bui-events-lazy-bar__button-106539');
				if(!button[0]){
					break;
				}else{
					await new Promise((resolve, reject) => {
						setTimeout(() => {
							button[button.length - 1].click();
						}, 100)
						setTimeout(() => {
							resolve();
						}, 300)
					})
				}
			}
			return document.body.innerHTML;
		},
		modeRead: [
			readTableTennis.ligaStavok,
			readFootball.ligaStavok
		]
	},

	olimpProps: {
		url: 'https://olimp.com/betting',
		selector: 'body',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML
		},
		modeRead: [
			readTableTennis.olimp,
			readFootball.olimp
		]
	},

	marathonBetProps: {
		url: 'https://www.marathonbet.com/su/live/?ecids=all&epcids=all',
		selector: '.category-label-td',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [
			readTableTennis.marathonBet,
			readFootball.marathonBet
		]
	},

	baltBetProps: {
		url: 'https://baltbet.ru/live',
		selector: 'body',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [
			readTableTennis.baltBet,
			readFootball.baltBet
		]
	},

	winLineFootballProps: {
		url: 'https://winline.ru/now/',
		selector: '.sorting.ng-scope',
		modeAction: async() => {
			document.body.style.zoom = "30%";
			const footballIndicator = 'Кибер FIFA';

			const button = document.getElementsByClassName("sorting__item ng-scope")
			for(let i = 0; i < button.length; i++){
				if(button[i].title === footballIndicator){
					button[i].click();
				}
			}
			
			const html = document.getElementsByClassName('desktop landscape')[0];
			let switcher = document.getElementsByClassName('sheet-navigation__dropdown')
			for(let i = 0; i < switcher.length; i++){
				switcher[i].click();
			}

			const titles = document.getElementsByClassName('sheet-navigation__title')
			for(let i = 0; i < titles.length; i++){
				await new Promise ((resolve, reject) => {
					if(titles[i].textContent.toLowerCase().indexOf('esport') !== -1){
						setTimeout(() => {
							switcher[i].click();
						}, 100);	
					}
					if(i === titles.length - 1) setTimeout(() => resolve(), 300);
					else resolve();
				})
			}

			return document.body.innerHTML;
		},
		modeRead: [
			readFootball.winLine
		]
	},

	winLineTableTennisProps_1: {
		url: 'https://winline.ru/stavki/sport/nastolijnyj_tennis/mezhdunarodnye/setka_cup__muzhchiny/',
		selector: '.sorting.ng-scope',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [ 
			readTableTennis.winLine 
		]
	},

	winLineTableTennisProps_2: {
		url: 'https://winline.ru/stavki/sport/nastolijnyj_tennis/mezhdunarodnye/setka_cup__zhenshhiny/',
		selector: '.sorting.ng-scope',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [ 
			readTableTennis.winLine 
		]
	},

	bet365Props: {
		url: 'https://www.bet365.com/#/IP/B1',
		selector: '.ovm-OverviewView_Content',
		modeAction: async() => {
			document.body.style.zoom = "30%";
			const data = [];
			let scroll = document.getElementsByClassName('ovm-OverviewScroller ovm-OverviewScroller-enabled ')[0];
			for(let i = 0; i < 3; i++){
				scroll.scrollTop += scroll.scrollHeight*0.5;
			}
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					data.push(document.body.innerHTML);
					resolve();
				}, 100)
			})
			const button = document.getElementsByClassName('ovm-ClassificationBarButton ovm-ClassificationBarButton-92')[0];
			if(button){
				button.click();
				let scroll = document.getElementsByClassName('ovm-OverviewScroller ovm-OverviewScroller-enabled ')[0];
				for(let i = 0; i < 3; i++){
					scroll.scrollTop += scroll.scrollHeight*0.5;
				}
				await new Promise((resolve, reject) => {
					setTimeout(() => {
						data.push(document.body.innerHTML);
						resolve();
					}, 100)
				})
			}
			return data;
		},
		modeRead: [
			readTableTennis.bet365,
			readFootball.bet365
		]
	},
	/*
	bet365PrematchProps: {
		url:'https://www.bet365.com/#/AS/B92/',
		selector: '.wcl-CommonElementStyle_PrematchCenter.wc-SplashPage_CenterColumn',
		modeAction: async() => {
			document.body.style.zoom = "30%";
			let data;
			let scroll = document.getElementsByClassName('ovm-OverviewScroller ovm-OverviewScroller-enabled ')[0];
			for(let i = 0; i < 3; i++){
				scroll.scrollTop += scroll.scrollHeight*0.5;
			}
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					data = document.body.innerHTML;
					resolve();
				}, 100)
			})
			return data;
		}
	}*/
	fonBetProps: {
		url: 'https://www.fonbet.ru/live/',
		selector: '.table__match-title-text',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [
			readTableTennis.fonBet,
			readFootball.fonBet
		]
	},

	betCityProps: {
		url: 'https://betcityru.com/ru/live/table-tennis',
		selector: '.line__champ',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [ 
			readTableTennis.betCity
		]
	},

	leonFootballProps: {
		url: 'https://www.leon.bet/events/Soccer/region/1970324836975348-FIFA-eSports',
		selector: '.main',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [
			readFootball.leon
		]
	},

	leonTableTennisProps_1: {
		url: 'https://en.leonbets.com/events/TableTennis/1970324836985523-Ukraine-Setka-Cup-Men',
		selector: '.main',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [ 
			readTableTennis.leon 
		]
	},

	leonTableTennisProps_2: {
		url: 'https://en.leonbets.com/events/TableTennis/1970324836985524-Ukraine-Setka-Cup-Women',
		selector: '.main',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [ 
			readTableTennis.leon 
		]
	},

	williamHillProps: {
		url: 'http://sports.williamhill.com/bet/ru/betlive/all',
		selector: '#change_sport',
		modeAction: () => {
			document.body.style.zoom = "30%";
			return document.body.innerHTML;
		},
		modeRead: [
			readFootball.williamHill,
		]
	},

	totoProps: {
		url: 'https://sport.totogaming.am/SportsBook/Overview',
		selector: '#MultiBetPage',
		modeAction: async() => {
			document.body.style.zoom = "30%";
			const buttons = document.getElementsByClassName('sport_type tg-flex-grow tg--pad-8 tg__text_with_shadow tg--oe');

			for(let i = 0; i < buttons.length; i++){
				await new Promise((resolve, reject) => {
					setTimeout(() => {
						if(buttons[i].innerHTML.indexOf('E-Футбол') !== -1 || buttons[i].innerHTML.toLowerCase().indexOf('настольный теннис') !== -1){
							buttons[i].click()
						}
						if(i === buttons.length - 1) setTimeout(() => resolve(), 300);
						else resolve();
					}, 200);
					
				})
					
			}
			return document.body.innerHTML;
		},
		modeRead: [
			readFootball.toto,
			readTableTennis.toto
		]
	}

}

const getHTML = (props) => {
	return nightmare
		.useragent(userAgent)
		.viewport(1366, 654)
		.goto(props.url)
		.wait(props.selector)
		.evaluate(props.modeAction)
		.then(data => {
			props.modeRead.map(func => {
				func(data);
			})
			return;
		})
		.catch(error => {
			console.log(error);
			send(error);
		})
}

const endParse = () =>{
	return nightmare.end();
}

module.exports = {
	openBrowser,
	endParse,
	getHTML,
	properties
};