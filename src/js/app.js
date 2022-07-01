


EventTarget.prototype.on = function (type, listener, options) {
	this.addEventListener(type, listener, options);
};

Number.prototype.displace = function (n) {
	return (this + "").padStart(n, 0);
};
Element.prototype.addClass = function (className) {
	this.classList.add(className);
};

Element.prototype.removeClass = function (className) {
	this.classList.remove(className);
};

let referenceTime = Date.now();
let time = false;
let startChrono = 0;
let startLap = 0;
let hour12 = false;
let countLap = 0;
let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
let lightMode = window.matchMedia("prefers-color-scheme: light").matches

const $ = selector => document.querySelector(selector);

const $APP = $("#app");

const $MODAL = $("#modal");
const $MODAL_TEXT = $("#modalText");
const $MODAL_BTN = $("#modalBtn");
const $MODAL_CONTAINER = $("#modalContainer");

const $MODE_BTN_DARK = $("#modeBtnDark");
const $MODE_BTN_LIGHT = $("#modeBtnLight");

const $CLOCK = $("#clock");
const $CLOCK_INPUT = $("#clockInput");
const $CLOCK_BTN_HOUR12 = $("#clockBtnHour12");
const $CLOCK_BTN_HOUR24 = $("#clockBtnHour24");

const $CHRONO = $("#chrono");
const $CHRONO_INPUT = $("#chronoInput");

const $CHRONO_BTN_START = $("#chronoStart");
const $CHRONO_BTN_LAP = $("#chronoLap");
const $CHRONO_BTN_STOP = $("#chronoStop");
const $CHRONO_BTN_RESET = $("#chronoReset");
const $CHRONO_BTN_RESUME = $("#chronoResume");

const $CHRONO_OUTPUT_LAP = $("#chronoOutputLap");
const $CHRONO_INPUT_LAP = $("#chronoInputLap");

const $CHRONO_TABLE_LAP = $("#chronoTableLap");
const $CHRONO_BLOCK_LAP = $("#chronoBlockLap");

const $TIMER = $("#timer");
const $TIMER_BTN = $("#timerBtn");
const $TIMER_INPUT_HOUR = $("#timerInputHour");
const $TIMER_INPUT_MINUTE = $("#timerInputMinute");
const $TIMER_INPUT_SECOND = $("#timerInputSecond");

const $MENU_BTN_SHOW_TIME = $("#btnTime");
const $MENU_BTN_SHOW_CHRONO = $("#btnChrono");
const $MENU_BTN_TIMER = $("#btnTimer");

function resetMiliseconds(milisecondsTime) {
	let miliseconds = (milisecondsTime % 1000).displace(3).slice(0, -1);

	let resetMiliseconds = Math.floor((milisecondsTime - miliseconds) / 1000);
	
	let seconds = (resetMiliseconds % 60).displace(2);
	let minutes = (Math.floor((resetMiliseconds / 60) % 60)).displace(2);

	return `${minutes} : ${seconds} . ${miliseconds}`;
};

function addModal(text) {
	$MODAL.removeClass("d-none");
	$MODAL_TEXT.textContent = text;
};

setInterval(() => {
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let suffix = "";
	
	if (hour12) {
		suffix = "PM";
		
		if(hours > 12) {
			hours = hours - 12;
			suffix = "AM";

		}

		hours = hours == "00" ? "12" : hours; 
	};

	hours = hours.displace(2);
	minutes = minutes.displace(2);
	seconds = seconds.displace(2);

	$CLOCK_INPUT.value = `${hours} : ${minutes} : ${seconds} ${suffix}`;
});

setInterval(() => {
	startChrono += time ? Date.now() - referenceTime : 0;
	startLap += time ? Date.now() - referenceTime : 0;

	referenceTime = Date.now();

	$CHRONO_INPUT.value = resetMiliseconds(startChrono);
	$CHRONO_INPUT_LAP.value = resetMiliseconds(startLap);

}, (1000 / 17) + 10);	

$CLOCK_BTN_HOUR12.on("click", () => {
	$CLOCK_BTN_HOUR12.addClass("d-none")
	$CLOCK_BTN_HOUR24.removeClass("d-none");

	hour12 = true;
});

$CLOCK_BTN_HOUR24.on("click", () => {
	$CLOCK_BTN_HOUR12.removeClass("d-none")
	$CLOCK_BTN_HOUR24.addClass("d-none");

	hour12 = false;
});

$CHRONO_BTN_START.on("click", () => {
	time = true;

	$CHRONO_BTN_LAP.disabled = false;

	$CHRONO_BTN_STOP.removeClass("d-none");
	$CHRONO_BTN_START.addClass("d-none");
	$CHRONO_BTN_RESET.addClass("d-none");
	$CHRONO_BTN_RESUME.addClass("d-none");
	$CHRONO_BTN_LAP.removeClass("d-none");	
});

$CHRONO_BTN_RESUME.on("click", () => {
	time = true;

	$CHRONO_BTN_START.addClass("d-none");
	$CHRONO_BTN_STOP.removeClass("d-none");
	$CHRONO_BTN_RESET.addClass("d-none");
	$CHRONO_BTN_RESUME.addClass("d-none");	
	$CHRONO_BTN_LAP.removeClass("d-none");
});

$CHRONO_BTN_STOP.on("click", () => {
	time = false;

	$CHRONO_BTN_STOP.addClass("d-none");
	$CHRONO_BTN_RESET.removeClass("d-none");
	$CHRONO_BTN_RESUME.removeClass("d-none");
	$CHRONO_BTN_START.addClass("d-none");
	$CHRONO_BTN_LAP.addClass("d-none");
});

$CHRONO_BTN_RESET.on("click", () => {
	startChrono = 0;
	startLap = 0;
	countLap = 0;
	time = false;

	$CHRONO_TABLE_LAP.addClass("d-none");
	$CHRONO_INPUT_LAP.addClass("d-none");
	$CHRONO_BLOCK_LAP.innerHTML = "";

	$CHRONO_BTN_LAP.disabled = true;
	
	$CHRONO_BTN_STOP.addClass("d-none");
	$CHRONO_BTN_RESET.addClass("d-none");
	$CHRONO_BTN_RESUME.addClass("d-none");
	$CHRONO_BTN_START.removeClass("d-none");
	$CHRONO_BTN_LAP.removeClass("d-none");
});

$CHRONO_BTN_LAP.on("click", () => {	
	startLap = 0;
	countLap++;

	if (countLap == 15) {
		$CHRONO_BTN_LAP.disabled = true;
		addModal("The maximum number of laps has been reached");
	};

	$CHRONO_INPUT_LAP.removeClass("d-none");
	$CHRONO_TABLE_LAP.removeClass("d-none");

	$CHRONO_BLOCK_LAP.scrollY += 1000;
	$CHRONO_BLOCK_LAP.innerHTML += `
	<tr>
		<td class="box" style="width:30px;">${countLap}</td>
		<td class="box">${$CHRONO_INPUT_LAP.value}</td>
		<td class="box">${$CHRONO_INPUT.value}</td>
	</tr>
	`;
});

$MENU_BTN_SHOW_TIME.on("click", () => {
	$CLOCK.removeClass("d-none");
	$CHRONO.addClass("d-none");
	$TIMER.addClass("d-none");

	$MENU_BTN_SHOW_TIME.addClass("btn-purple");	
	$MENU_BTN_SHOW_CHRONO.removeClass("btn-purple");	
	$MENU_BTN_TIMER.removeClass("btn-purple");	
});

$MENU_BTN_SHOW_CHRONO.on("click", () => {
	$CLOCK.addClass("d-none");
	$CHRONO.removeClass("d-none");
	$TIMER.addClass("d-none")

	$MENU_BTN_SHOW_TIME.removeClass("btn-purple");
	$MENU_BTN_SHOW_CHRONO.addClass("btn-purple");
	$MENU_BTN_TIMER.removeClass("btn-purple");
});

$MENU_BTN_TIMER.on("click", () => {
	$CLOCK.addClass("d-none");
	$CHRONO.addClass("d-none");
	$TIMER.removeClass("d-none");

	$MENU_BTN_SHOW_TIME.removeClass("btn-purple");	
	$MENU_BTN_SHOW_CHRONO.removeClass("btn-purple");
	$MENU_BTN_TIMER.addClass("btn-purple");
});

$MODAL_BTN.on("click", () => {
	$MODAL.addClass("d-none");
});

if (darkMode) {
	$MODE_BTN_DARK.addClass("d-none");
	$MODE_BTN_LIGHT.removeClass("d-none");

	$APP.removeClass("bg-light");
	$APP.addClass("bg-dark");

	$MODAL_CONTAINER.removeClass("bg-light");
	$MODAL_CONTAINER.addClass("bg-dark");
};

if (lightMode) {
	$MODE_BTN_DARK.addClass("d-none");
	$MODE_BTN_LIGHT.removeClass("d-none");

	$APP.removeClass("bg-dark");
	$APP.addClass("bg-light");

	$MODAL_CONTAINER.removeClass("bg-dark");
	$MODAL_CONTAINER.addClass("bg-light");
};

$MODE_BTN_DARK.on("click", () => {
	$APP.removeClass("bg-light");
	$APP.addClass("bg-dark");
	
	$MODAL_CONTAINER.removeClass("bg-light");
	$MODAL_CONTAINER.addClass("bg-dark");
	
	$MODE_BTN_DARK.addClass("d-none");
	$MODE_BTN_LIGHT.removeClass("d-none");

	$CHRONO_BTN_LAP.removeClass("btn-gray");
	$CHRONO_BTN_LAP.addClass("btn-dark-gray");

	$CHRONO_BTN_RESET.removeClass("btn-gray");
	$CHRONO_BTN_RESET.addClass("btn-dark-gray");
});

$MODE_BTN_LIGHT.on("click", () => {
	$APP.removeClass("bg-dark");
	$APP.addClass("bg-light");

	$MODAL_CONTAINER.removeClass("bg-dark");
	$MODAL_CONTAINER.addClass("bg-light");

	$MODE_BTN_DARK.removeClass("d-none");
	$MODE_BTN_LIGHT.addClass("d-none");	

	$CHRONO_BTN_LAP.removeClass("btn-dark-gray");
	$CHRONO_BTN_LAP.addClass("btn-gray");

	$CHRONO_BTN_RESET.removeClass("btn-dark-gray");
	$CHRONO_BTN_RESET.addClass("btn-gray");
});

$TIMER_BTN.on("click", () => {
	setTimeout(() => {
		addModal(`Time's up ${$TIMER_INPUT_HOUR.value} : ${$TIMER_INPUT_MINUTE.value} : ${$TIMER_INPUT_SECOND.value}`);
		
	}, `${$TIMER_INPUT_HOUR.value}${$TIMER_INPUT_MINUTE.value}${$TIMER_INPUT_SECOND.value}000`);	
});
