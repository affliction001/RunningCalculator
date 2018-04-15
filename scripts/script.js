'use strict';

var arrayDays = [];
var arrayForShow = [];
var weekPattern = [];
var fullKm = 0;
var needKm = 0;
var weekKm = 0;
var currentDay = new Date();
var finalDay;

//**************************
for (;;) {
	var countDays = 0;

	if (!(finalDay === undefined)) {
		currentDay = new Date(finalDay.setDate(finalDay.getDate() + 1.01));
	}

	finalDay = prompt("Введите дату окончания тренировочного периода в формате 'гггг-мм-дд' (дефис обязателен)");
	finalDay = new Date(finalDay);

	fullKm = prompt("Какой километраж хотите набрать за этот период?");

	arrayDays = getTrainingPeriodDays(currentDay, finalDay);

	needKm = Math.ceil(fullKm / arrayDays.length);

	weekPattern = prompt("Ваш план на неделю. Сделайте шаблон для распределения км по дням учитывая 100% за неделю. Для примера, значения через пробел: 0 20 10 20 15 5 30", "0 20 10 20 15 5 30").split(" ");

	for (let d of arrayDays) {
		arrayForShow.push(`${d} :: ${writeDayWeek(needKm, weekPattern, d)[0]}`);
		countDays += writeDayWeek(needKm, weekPattern, d)[1];
	}

	arrayForShow.push(`<br>ИТОГО: Ваш общий километраж составит: ------ ${countDays} км.`);
	arrayForShow.push(`-----: Cредний километраж в день составит: - ${Math.round(countDays / arrayDays.length * 10) / 10} км.`);

	arrayForShow.push(`<br><hr>`);

	if (confirm("Вывести результат - <OK>! Ввести еще один период <Отмена>!")) {
		break;
	}
}

for (let d of arrayForShow) {
	document.write(d, "<br>");
}
//**************************

function writeDay(day) {
	var yyyy = day.getFullYear();
	var dd = day.getDate();
	var mm = day.getMonth() + 1;

	return `${yyyy}-${mm}-${dd}`;
}

function getTrainingPeriodDays(startDay, endDay) {
	var trainingDay = [];

	let start = new Date(startDay);
	let end = new Date(endDay);

	var incrDay = 86400000;
	var count = 0;

	while (start.getTime() <= (end.getTime() + incrDay)) {

		trainingDay[count] = writeDay(start);
		count++;

		start = new Date(start.getTime() + incrDay);
	}

	return trainingDay;
}

function writeDayWeek(dayKm, weekKm, dayDate) {
	var fullWeek = dayKm * 7;
	var str = "";
	var weekValue = 0;
	var week1 = Math.round(weekKm[0] / 100 * fullWeek);
	var week2 = Math.round(weekKm[1] / 100 * fullWeek);
	var week3 = Math.round(weekKm[2] / 100 * fullWeek);
	var week4 = Math.round(weekKm[3] / 100 * fullWeek);
	var week5 = Math.round(weekKm[4] / 100 * fullWeek);
	var week6 = Math.round(weekKm[5] / 100 * fullWeek);
	var week7 = Math.round(weekKm[6] / 100 * fullWeek);

	switch (new Date(dayDate).getDay()) {
		case 0: str = "Понедельник - " + week1 + " км.";
				weekValue = week1;
				break;
		case 1: str = "Вторник ----- " + week2 + " км.";
				weekValue = week2;
				break;
		case 2: str = "Среда ------- " + week3 + " км.";
				weekValue = week3;
				break;
		case 3: str = "Четверг ----- " + week4 + " км.";
				weekValue = week4;
				break;
		case 4: str = "Пятница ----- " + week5 + " км.";
				weekValue = week5;
				break;
		case 5: str = "Суббота ----- " + week6 + " км.";
				weekValue = week6;
				break;
		case 6: str = "Воскресенье - " + week7 + " км.";
				weekValue = week7;
				break;
	}

	return [str, weekValue];
}