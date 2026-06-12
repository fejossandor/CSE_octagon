
var jsPsych = initJsPsych({
    on_finish: function () {
        jsPsych.data.displayData();
        jsPsych.data.get().localSave('csv', `octagon_participant_${participant_id}.csv`)
    }
});


var participant_id = jsPsych.randomization.randomID(2);
jsPsych.data.addProperties({ participant: participant_id });

var experimental_trials;
var practice_trials;
var practice_passed = false
// This is a temporary solution --> the code works if you run it on a python server
//In the fetch section --> you should enter the server path from the directory in which the generated trials are stored
async function loadExperiment() {
    var expNum = Math.floor(Math.random() * 100) + 1
    var practice_response = await fetch(`http://localhost:8000/experiment1/Practice_trials/\practice_trial_sequence_${expNum}.json`)
    practice_trials = await practice_response.json();
    console.log("right after fetch:", practice_trials)

    var response = await fetch(`http://localhost:8000/experiment1/Trial_sequences/experiment01/\p_experiment_${expNum}.json`);
    experimental_trials = await response.json();
    startExperiment();
}
console.log("one practice block:", practice_trials);
//console.log("one practice trial:", practice_trials[0][0]);








var probe_duration = 1600;
var prime_duration = 200;
var long_isi_duration = 1000;
var long_isi_blank_duration = 1600;
var short_isi_duration = 33;
var short_isi_blank_duration = 2567;
var probe_stim_duration = 200;
var timeline = [];
var probe_index = 0;

var debug = new URLSearchParams(window.location.search).get('debug') === '1'

if (debug) {
    short_isi_duration = 1;
    long_isi_duration = 1;
    short_isi_blank_duration = 1;
    long_isi_blank_duration = 1;
    probe_duration = 1;
    prime_duration = 1;
}


// Welcome
var WelcomeTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <h2>Üdvözlünk a <b>Metatudomány Kutatócsoport</b> vizsgálatában!</h2>
    <p>Egy tudományos kutatásban veszel részt, amelynek vezetője <b>Bognár Miklós</b>, az ELTE Affektív Pszichológia Tanszékének kutatója.
    A kutatás célja megvizsgálni, hogy miként működik a kognitív kontroll.</p>
    <h3>Részvétel</h3>
    <p>A kutatásban való részvétel teljesen önkéntes. A vizsgálatot bármikor indoklás nélkül megszakíthatod.
    Ha bármilyen kérdésed, észrevételed vagy problémád van a kutatással kapcsolatban,
    írj Bognár Miklósnak a <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a> címre.</p>
  `,
    choices: ["Vissza", "Tovább"]
};

// Intro
let IntroTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h2> A feladatod az lesz, hogy a megjelenő ingernek megfelelő gombot nyomd le olyan gyorsan, amilyen gyorsan csak tudod </h2>
    <p><b>Kérlek helyezd a bal középső ujjad a <span class ='key'>F</span> billentyűre, a bal mutató ujjad a <span class ='key'>G</span> billentyűre, a jobb középső ujjad a <span class ='key'>J</span> billentyűre, a jobb mutató ujjad a <span class ='key'>N</span> billentyűre.</b></p>
    <p> Először egy nagyobb méretű betűt fogsz látni, amelyre <b> nem kell reagálnod</b> </p> 
    <p> Ezt követően rövid ideig fehér képernyőt fogsz látni, majd megjelenik az a betű, amelyre reagálnod kell</p>
    <p> Ammennyiben <b>A</b> betűt látsz, nyomd meg a <span class ='key'>F</span> billentyűt </p> <p>Ammennyiben <b>B</b> betűt látsz, nyomd meg a <span class ='key'>G</span> billentyűt </p> 
    <p>Ammennyiben <b>Y</b> betűt látsz, nyomd meg a <span class ='key'>J</span> billentyűt </p> 
    <p>Ammennyiben <b>Z</b> betűt látsz, nyomd meg a <span class ='key'>N</span> billentyűt </p>
    <p> Ha készen állsz, nyomd meg a <span class ='key'>SPACE</span> billentyűt a gyakorló blokk elkezdéséhez.</p>
    `,
    choices: [' ']
};

var prime = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () { return `<span class = "prime_stimulus">${jsPsych.evaluateTimelineVariable('prime')}</span>` },
    choices: "NO_KEYS",
    trial_duration: prime_duration,
    data: {
        task: "prime"
    }
};

var probe = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return `<span class="probe_stimulus">${jsPsych.evaluateTimelineVariable('probe')}</span>`
    },
    choices: ["f", "g", "j", "n"],
    stimulus_duration: probe_stim_duration,
    trial_duration: probe_duration,
    response_ends_trial: false,
    data: {
        correct_response: jsPsych.timelineVariable('correct_response'),
        task: "probe"
    },
    on_finish: function (data) {
        probe_index = probe_index + 1
        data.correct = data.response === data.correct_response;
        data.probe_index = probe_index
    }
};


var long_isi = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ' ',
    choices: "NO_KEYS",
    trial_duration: long_isi_duration,
    data: {
        task: "blank"
    }
}



var long_isi_blank = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ' ',
    choices: "NO_KEYS",
    trial_duration: long_isi_blank_duration,
    data: {
        task: "blank"
    }
}

var short_isi = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ' ',
    choices: "NO_KEYS",
    trial_duration: short_isi_duration,
    data: {
        task: "blank"
    }
}

var short_isi_blank = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ' ',
    choices: "NO_KEYS",
    trial_duration: short_isi_blank_duration,
    data: {
        task: "blank"
    }
}

var goodbye = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        function () {
            return `<h2> Kísérlet vége</h2> <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px"> Köszönjük, hogy részt vettél a vizsgálatban!</p>`
        },
    choices: "ALL_KEYS"
}

var practiceStart = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h2> Gyakorló blokk</h2 > <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A kísérlet egy gyakorló blokkal kezdődik.
		    Kérjük, törekedj a minél gyorsabb és pontosabb válaszadásra! Amint készen állsz, nyomj meg egy tetszőleges billentyűt a kezdéshez!</p>`,
    choices: "ALL_KEYS"
};

var practiceLoop = {

}



var practiceEnd = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h2>Gyakorló blokk vége</h2 > <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A gyakorló blokk véget ért. Most a kísérleti blokk következik. Ha készen állsz, nyomj le egy tetszőleges billentyűt a kezdéshez!<h2>`,
    choices: "ALL_KEYS",

};


blockEnd = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
        A kísérletnek ezen szakasza befejeződött, most pihenhetsz kicsit.
        Amennyiben készen állsz, nyomj le egy tetszőleges billentyűt a folytatáshoz!</p>
        <p style="font-size: 24px;  position: absolute; top: 40px; right: 80px;">Hátralévő idő: <span id="timer" class="timer">2:00</span></p>
    `,
    choices: "ALL_KEYS",
    trial_duration: 120000, // trial auto-ends after 2 minutes
    on_load: function () {
        var timeLeft = 120; // seconds
        var timerElement = document.getElementById('timer');

        var countdown = setInterval(function () {
            timeLeft--;
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;
            timerElement.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

            if (timeLeft <= 0) {
                clearInterval(countdown);
            }
        }, 1000);


        jsPsych.getCurrentTrial().countdown_id = countdown;
    },
    on_finish: function () {

        clearInterval(jsPsych.getCurrentTrial().countdown_id);
    }
}

// -------------------------------
// csak vazlat
// -------------------------------
// var practice_block = a json file, amit randomizalva kihuzok a ..//randomized/practice jsonokbol.
// itt a trial timeline ezeket a jsonokon iteralna vegig, es olvasna be a prime es a probe propertyket (mivel azok a timeline variable-ek)

// var trial_timeline[prime, isi, probe, fixation]
// var timeline_variables = practice_block -- igy hogy ezt definialtam, a kod fel tudja ismerni, hogy mit kell kiolvasni a jsonokbol
// var timeline = trial_timeline 



// Debrief 
var debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        `< h2 > Kísérlet vége</h2 > <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
		Köszönjük, hogy részt vettél a vizsgálatban!</p>`,
    choices: "ALL_KEYS"
};


function startExperiment() {
    timeline.push(
        WelcomeTrial,
        IntroTrial,
        practiceStart)

    let practice_procedure = [];

    for (let i = 0; i < practice_trials.length; i++) {
        //same for loop strategy as in the case of the experimental trials --> i represents the index of the given block


        /*very simple conditional function --> given that it is in a for loop --> if the 
        practice passed condtion is fulfilled --> return false, so it does not progress to the next practice block
        if the practice_passed condition is not fulfilled --> return true, so the for loop keeps going*/
        var practice_block = {
            timeline: [prime, long_isi, probe, long_isi_blank],
            timeline_variables: practice_trials[i],
            conditional_function: function () {
                if (practice_passed == true) {
                    return false
                }
                else { return true }
            }
        }
        practice_procedure.push(practice_block)


        //for the sake of easier understanding
        var repeat_prac_meassage = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p>Túl sokat hibáztál a gyakorló blokkban. Kérlek nyomd be a <span class= "key">SPACE</span> billentyűt,
     hogy újrakezd a gyakorlást</p>`,
            choices: [' ']
        }



        var accuracy_check = {
            timeline: [{
                type: jsPsychHtmlKeyboardResponse,
                stimulus: [],
                trial_duration: 0,
                choices: "NO_KEYS",
                on_finish: function () {
                    var last_prac_trials = jsPsych.data.get().filter({ task: 'probe' }).last(practice_trials[i].length)
                    var n_correct = last_prac_trials.filter({ correct: true }).count();
                    var prop_corr = n_correct / last_prac_trials.count();  //count should be used because by using jsPsych.data.get, it creates a DataCollection, not a string --> DataCollection has no length property, hence the count
                    if (prop_corr < 0.8) {
                        practice_passed = false;
                    }
                }
            }],
            conditional_function: function () {
                if (practice_passed == true) {
                    return false
                }
                else { return true }

            }
        }

        practice_procedure.push(accuracy_check)
        var repeat_prac = {
            timeline: [repeat_prac_meassage],
            conditional_function: function () {
                if (practice_passed == true) {
                    return false;
                } else {
                    return true;
                }
            },

        };
        practice_procedure.push(repeat_prac)
    }






    let experimental_blocks = [];

    let longFirst = (Math.floor(Math.random() * 2)) == 1


    for (let i = 0; i < experimental_trials.length; i++) {

        var blockStart = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${i + 1}. Blokk kezdődik</h1>`,
            trial_duration: 2000,
            choices: "NO_KEYS"
        }

        experimental_blocks.push(blockStart)

        if (longFirst == true) {
            if (i < experimental_trials.length - 5) {
                experimental_blocks.push({
                    timeline: [prime, long_isi, probe, long_isi_blank],
                    timeline_variables: experimental_trials[i]
                })
            }
            else {
                experimental_blocks.push({
                    timeline: [prime, short_isi, probe, short_isi_blank],
                    timeline_variables: experimental_trials[i]
                })
            }
        }
        else {
            if (i < experimental_trials.length - 5) {
                experimental_blocks.push({
                    timeline: [prime, short_isi, probe, short_isi_blank],
                    timeline_variables: experimental_trials[i]
                })
            }
            else {
                experimental_blocks.push({
                    timeline: [prime, long_isi, probe, long_isi_blank],
                    timeline_variables: experimental_trials[i]
                })
            }
        }

        if (i < experimental_trials.length - 1) { experimental_blocks.push(blockEnd) }
    }



    timeline.push(
        ...practice_procedure,
        practiceEnd,
        ...experimental_blocks, //- this unpacking operator is some pretty cool shit
        debriefTrial
    );
    jsPsych.run(timeline)

}

loadExperiment()


