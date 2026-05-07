var jsPsych = initJsPsych({
	on_finish: function () {
		jsPsych.data.displayData();
	}
});

var probe_duration = 1600;
var prime_duration = 200;
var isi_duration = 1000;
var probe_stim_duration = 200;
var timeline = [];
var probe_index = 0;

var welcome = {
	type: jsPsychButtonResponse, 
	 stimulus: `<img src="Experimental material/University_logo.png" alt=University Logo" style="width: 300px; display: block; margin: auto;">
            <h2>Üdvözlünk a Metatudomány kutatócsoport vizsgálatában!</h2>
                <p>Egy tudományos kutatásban veszel részt, amelynek vezetője Bognár Miklós, az ELTE Affektív Pszichológia Tanszékének kutatója. 
                A kutatás célja megvizsgálni, hogy miként működik a kognitív kontroll.</p>
                <h3>Részvétel</h3>
                <p>A kutatásban való részvétel teljesen önkéntes. A vizsgálatot bármikor indoklás nélkül megszakíthatod. 
		Ha bármilyen kérdésed, észrevételed vagy problémád van a kutatással kapcsolatban,
		írj Bognár Miklósnak a <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a> címre.</p>  `,
        choices: ["Vissza", "Tovább"]
};

var prime = {
	type: jsPsychHtmlKeyboardResponse, 
	stimulus: jsPsych.timelineVariable('prime'), 
	choices: "NO_KEYS", 
	trial_duration: prime_duration, 
	data: {
		task: "prime"
	}
}; 

var probe = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable('probe'),
        choices: ["a", "b", "y", "z"],
        stimulus_duration: probe_stim_duration,
        trial_duration: probe_duration,
        response_ends_trial: false,
        data: {
            correct_response: jsPsych.timelineVariable('correct_response'),
            task: "probe",
            congruency: jsPsych.timelineVariable('congruency'),
            probe_index: probe_index
        },
        on_finish: function (data) {
            probe_index = probe_index + 1
            data.correct = data.response === data.correct_response;
            data.probe_index = probe_index
        }
};

var isi = {
	type: jsPsychHtmlKeyboardResponse,
        stimulus: ' ',
        choices: "NO_KEYS",
        trial_duration: isi_duration,
        data: {
        	task: "blank"
	}
}

var goodbye = {
 type: jsPsychHtmlKeyboardResponse,
        stimulus:
            function () {
                return `<h2>Kísérlet vége</h2> <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px"> Köszönjük, hogy részt vettél a vizsgálatban!</p>`
            },
        choices: "ALL_KEYS"
}

var practiceStart = {
y	type: jsPsychHtmlKeyboardResponse, 
	stimulus: 
		function () {
			return `<h2>Gyakorló blokk</h2> <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A kísérlet egy gyakorló blokkal kezdődik. 
			Kérjük, törekedj a minál gyorsabb és pontosabb válaszadásra! Amint készen állsz, nyomj meg egy tetszőleges billentyűt a kezdéshez!</p>`
	}, 
	choices: "ALL_KEYS"
};

var practiceEnd = {
	type: jsPsychHtmlKeyboardResponse, 
	stimulus: 
		function () {
			return `<h2>Gyakorló blokk vége</h2> <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A gyakorló blokk véget ért. Most a kísérleti blokk következik. Ha készen állsz, nyomj le egy tetszőleges billentyűt a kezdéshez!</p>`
	}, 
	choices: "ALL_KEYS"

}; 

var blockEnd = {
	type: jsPsychHtmlKeyboardResponse, 
	stimulus: 
		function () {
			return `<p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A kísérletnek ezen szakasza befejeződött, most pihenhetsz kicsit, legfeljebb 2 perc áll rendelkezésedre. Amennyiben készen állsz, nyomj le egy tetszőleges billentyűt a kezdéshez!</p>`
	},
	choices: "ALL_KEYS"
};


