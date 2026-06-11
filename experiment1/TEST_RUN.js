var jsPsych = initJsPsych({
    on_finish: function () {
        jsPsych.data.displayData();
    }
});

let my_trials;
// This is a temporary solution --> the code works if you run it on a python server
//In the fetch section --> you should enter the server path from the directory in which the generated trials are stored
async function loadExperiment() {
    var expNum = Math.floor(Math.random() * 100) + 1
    var response = await fetch(`http://localhost:8000/Trial_sequences/experiment01/\p_experiment_${expNum}.json?v=${Date.now()}`);
    my_trials = await response.json();
    startExperiment();
}


var probe_duration = 1600;
var prime_duration = 200;
var long_isi_duration = 1000;
var long_isi_blank_duration = 1600;
var short_isi_duration = 33;
var short_isi_blank_duration = 2567;
var probe_stim_duration = 200;
var timeline = [];
var probe_index = 0;

// Welcome
var WelcomeTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <h2>Üdvözlünk a Metatudomány Kutatócsoport vizsgálatában!</h2>
    <p>Egy tudományos kutatásban veszel részt, amelynek vezetője Bognár Miklós, az ELTE Affektív Pszichológia Tanszékének kutatója.
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
    <h2> A feladatod az lesz, hogy a megjelenő ingernek megfelelő gombot nyomd be olyan gyorsan, amilyen gyorsan csak tudod </h2>
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

/*var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 2000,
    data: {
        task: 'fixation'
    }
};*/

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
            return `< h2 > Kísérlet vége</h2 > <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px"> Köszönjük, hogy részt vettél a vizsgálatban!</p>`
        },
    choices: "ALL_KEYS"
}

var practiceStart = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h2> Gyakorló blokk</h2 > <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A kísérlet egy gyakorló blokkal kezdődik.
		    Kérjük, törekedj a minál gyorsabb és pontosabb válaszadásra! Amint készen állsz, nyomj meg egy tetszőleges billentyűt a kezdéshez!</p>`,
    choices: "ALL_KEYS"
};

var practiceEnd = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h2>Gyakorló blokk vége</h2 > <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A gyakorló blokk véget ért. Most a kísérleti blokk következik. Ha készen állsz, nyomj le egy tetszőleges billentyűt a kezdéshez!<h2>`,
    choices: "ALL_KEYS",

};


var blockEnd = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<pstyle = "text-align: center; max-width: 800px; margin: auto; font-size: 24px" > A kísérletnek ezen szakasza befejeződött, most pihenhetsz kicsit, legfeljebb 2 perc áll rendelkezésedre. Amennyiben készen állsz, nyomj le egy tetszőleges billentyűt a kezdéshez!</p>`,
    choices: "ALL_KEYS",
    stimulus_duration: 120000
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

var debug = 0;


// Creating the practice block
/*i = Math.floor(Math.random() * 100) + 1;
var path = '../randomized/practice/p_experiment_' + i + '.json';


var practice_block;

fetch(path)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data = practice_block;
    })
    .catch(error => console.log('Error loading file: ', error));

// ?? eddig tuti jo 

// ?? innentol ?
*/
/*var trial_sequence = {
    timeline: [prime, isi, probe, fixation],
    timeline_variables: my_trials
};

timeline.push(
    WelcomeTrial,
    IntroTrial,
    practiceStart,
    trial_sequence
);*/
function startExperiment() {


    let experimental_blocks = [];

    let longFirst = (Math.floor(Math.random() * 2)) == 1


    for (let i = 0; i < my_trials.length; i++) {

        var blockStart = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${i + 1}. Blokk kezdődik</h1>`,
            trial_duration: 2000,
            choices: "NO_KEYS"
        }

        experimental_blocks.push(blockStart)

        if (longFirst == true) {
            if (i < my_trials.length - 5) {
                experimental_blocks.push({
                    timeline: [prime, long_isi, probe, long_isi_blank],
                    timeline_variables: my_trials[i]
                })
            }
            else {
                experimental_blocks.push({
                    timeline: [prime, short_isi, probe, short_isi_blank],
                    timeline_variables: my_trials[i]
                })
            }
        }
        else {
            if (i < my_trials.length - 5) {
                experimental_blocks.push({
                    timeline: [prime, short_isi, probe, short_isi_blank],
                    timeline_variables: my_trials[i]
                })
            }
            else {
                experimental_blocks.push({
                    timeline: [prime, long_isi, probe, long_isi_blank],
                    timeline_variables: my_trials[i]
                })
            }
        }

        if (i < my_trials.length - 1) { experimental_blocks.push(blockEnd) }
    }



    timeline.push(
        WelcomeTrial,
        IntroTrial,
        practiceStart,
        practiceEnd,
        ...experimental_blocks, //- this unpacking operator is some pretty cool shit
        debriefTrial
    );
    //console.log(experimental_blocks[0].timeline_variables[0])
    jsPsych.run(timeline)
    console.log(experimental_blocks[1].timeline_variables[1])
    console.log(experimental_blocks)
    console.log(timeline)
}

loadExperiment()

//jsPsych.run(timeline)

// Practice reloop node
// 1. definialom az accuracyt, majd kiszedem az adatbol
// 2. ha 80% alatti akkor reloop 
