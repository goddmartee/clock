


const $ = selector => document.querySelector(selector);

let m;
let s;
let ml;
let id;
let suf;
let date;
let id_2;
let id_1;
let hrsTime;
let minTime;
let secTime;
let timeNow;

m = 0;
s = 0;
ml = 0;

function setTime(){
	date = new Date();
	hrsTime = date.getHours();
	minTime = date.getMinutes();
	secTime = date.getSeconds();	
}

function timeValue(){
	timeNow = (hrsTime < 10 ? "0" + hrsTime : hrsTime)
	  + ":" + (minTime < 10 ? "0" + minTime : minTime)
	  + ":" + (secTime < 10 ? "0" + secTime : secTime);
}

function time(){
	clearInterval(id_1);
	
	id = setInterval(() => {
		setTime();
		timeValue();

		$("#time").value = timeNow;		
	});	
}

function timeChange(){
	clearInterval(id);
	
	id_1 = setInterval(() => {
		setTime();

		suf = "AM";
		hrsTime = 12;

		if(hrsTime > 12){
			hrsTime = hrsTime - 12;
			suf = "PM"			
		}
		
		timeValue();
		
		$("#time").value = timeNow + " " + suf;	
	});
}

time();

// $("#btnChangeTime").onchange = () => $("#btnChangeTime").checked ? timeChange() : time();

$("#btnStartTimer").onclick = () => {
	setTimeout(()=>{
		$("#outputTimer").textContent = `${$("#inputHTimer").value}:${$("#inputMTimer").value}:${$("#inputSTimer").value} Time's Up`;

		console.log(`${$("#inputHTimer").value}:${$("#inputMTimer").value}:${$("#inputSTimer").value} Time's Up`);
	}, `${$("#inputHTimer").value}${$("#inputMTimer").value}${$("#inputSTimer").value}000`);
}

$("#btnStartSW").onclick = () => {
	$("#btnStartSW").classList.add("d-none");
	$("#btnStopSW").classList.remove("d-none");
	$("#btnResetSW").classList.add("d-none");
	$("#btnLapSW").classList.remove("d-none");
	$("#btnLapSW").disabled = false;

	id_2 = setInterval(() => {0
	 	ml++; ml++; ml++; ml++;
		
		if(ml > 999){
			ml = 0;
			s++;	
		}
		
		if(s > 59){
			s = 0;
			m++;
		}

		$("#stopwatch").value = (m 	< 10  ? "0" + m  : m)
				   		+ ":" + (s  < 10  ? "0" + s  : s)
				   		+ "." + (ml < 100 ? "0" + ml :ml);

	});

}

$("#btnStopSW").onclick = () => {
	clearInterval(id_2);

	$("#btnStartSW").textContent = "Resume";
	$("#btnStartSW").classList.remove("d-none");
	$("#btnStopSW").classList.add("d-none");
	$("#btnLapSW").classList.add("d-none");
	$("#btnResetSW").classList.remove("d-none");
}

$("#btnResetSW").onclick = () => {
	clearInterval(id_2);

	m = 0;
	s = 0;
	ml = 0;

	$("#btnStartSW").textContent = "Start";	

	$("#btnLapSW").classList.remove("d-none");
	$("#btnLapSW").disabled = true;

	$("#btnStartSW").classList.remove("d-none");
	$("#btnStopSW").classList.add("d-none");
	$("#btnResetSW").classList.add("d-none");
	$("#outputLaps").textContent = "";
	$("#stopwatch").value = "00:00.000";
}

$("#btnLapSW").onclick = () => {
	$("#outputLaps").textContent = $("#stopwatch").value;
}

$("#btnMenuClock").onclick = () => {
	$("#time").classList.remove("d-none");
	$("#containerSW").classList.remove("d-block");
	$("#containerTimer").classList.remove("d-block");

	$("#btnMenuClock").classList.add("btn--default");
	$("#btnMenuSW").classList.remove("btn--default");
	$("#btnMenuTimer").classList.remove("btn--default");
}

$("#btnMenuSW").onclick = () => {
	$("#time").classList.add("d-none");
	$("#containerSW").classList.add("d-block");
	$("#containerTimer").classList.remove("d-block");

	$("#btnMenuClock").classList.remove("btn--default");
	$("#btnMenuSW").classList.add("btn--default");
	$("#btnMenuTimer").classList.remove("btn--default");
}

$("#btnMenuTimer").onclick = () => {
	$("#time").classList.add("d-none");
	$("#containerSW").classList.remove("d-block");
	$("#containerTimer").classList.add("d-block");

	$("#btnMenuClock").classList.remove("btn--default");
	$("#btnMenuSW").classList.remove("btn--default");
	$("#btnMenuTimer").classList.add("btn--default");
}