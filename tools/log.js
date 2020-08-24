const TeleBot = require("telebot");
const bot = new TeleBot("969293868:AAGW7PrzLkZjtZs_cAvxvzwfnkeqyLpd78c");

const send = (str) => {
	return bot.sendMessage("431055553", str, "notification");
}

module.exports = {
	send
}