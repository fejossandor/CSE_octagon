
var jsPsych = initJsPsych({
    on_finish: function () {
        jsPsych.data.displayData();
        jsPsych.data.get().filter({ collect: true }).ignore(['trial_type', 'plugin_version', 'participant', 'collect']).localSave('csv', `octagon_participant_${participant_id}.csv`)
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
    var practice_response = await fetch(`http://localhost:8000/practice_trials/practice_trial_sequence_${expNum}.json`)
    practice_trials = await practice_response.json();
    console.log("right after fetch:", practice_trials)

    var response = await fetch(`http://localhost:8000/experimental_trials/p_experiment_${expNum}.json`);
    experimental_trials = await response.json();
    startExperiment();
}








var fixation_duration = 300
var pre_fix_blank_short_isi = 967
var probe_duration = 1500;
var probe_stim_duration = 200; //they had 1500ms to respond from target onset in exp1 -> exp3 is a modification of exp1 with 5 exceptions, so we ought to take into account what they did in exp1 if not specififed
var prime_duration = 200;
var long_isi_duration = 1000;
var short_isi_duration = 33;
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
    practice_passed = true
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

let enterFullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `<p><b>A kísérlet teljes képernyős módba fog váltani. Kérlek kattintsd a <span class="key"> FOLYTATÁS </span> gombra</b></p>`,
    button_label: "FOLYTATÁS"
}

//Declaration of consent 
let consentTrial = {
    type: jsPsychSurveyMultiChoice,
    questions: [{
        prompt: "A beleegyező nyilatkozatot elolvastam és beleegyezem a kutatásban való részvételbe.",
        name: "Beleegyezés",
        options: ['Igen', 'Nem'],
        required: true
    }],
    data: { collect: true }
}

//Credentials 
let neptunCodeTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: `<p>Kérlek add meg a Neptun-kódod! </p>`,
    html: '<input type= "text" name="response" required>',
    button_label: 'Folytatás',
    data: { collect: true }
}

let genderTrial = {
    type: jsPsychSurveyMultiChoice,
    questions: [{
        prompt: "Kérlek add meg a nemed!",
        name: "Gender",
        options: ['Férfi', 'Nő', 'Nem szeretném megadni', 'Egyéb'],
        required: true,
        data: { collect: true }
    }]
}

let ageTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>Kérlek add meg az életkorod!</p>',
    html: '<input type= "text" name= "response" required>',
    button_label: 'Folytatás',
    data: { collect: true }
}


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
    <p> Ha készen állsz, nyomd meg a <span class ='key'>SPACE</span> billentyűt a gyakorló blokk elkezdéséhez!</p>
    `,
    choices: [' ']
};

var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<h1>+</h1>",
    trial_duration: fixation_duration,
    choices: "NO_KEYS"
}

var lead_in_blank = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    trial_duration: pre_fix_blank_short_isi,
    choices: 'NO_KEYS'
}

var prime = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () { return `<span class = "prime_stimulus">${jsPsych.evaluateTimelineVariable('prime')}</span>` },
    choices: "NO_KEYS",
    trial_duration: prime_duration,
    data: {
        task: "prime",
        collect: true
    }
};

var probe = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return `<span class="probe_stimulus">${jsPsych.evaluateTimelineVariable('probe')}</span>`
    },
    choices: 'ALL_KEYS',
    stimulus_duration: probe_stim_duration,
    trial_duration: probe_duration,
    response_ends_trial: false,
    data: {
        correct_response: jsPsych.timelineVariable('correct_response'),
        task: "probe",
        collect: true
    },
    on_finish: function (data) {
        probe_index = probe_index + 1
        data.correct = data.response === data.correct_response;
        data.probe_index = probe_index
    }
};


var long_isi = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    choices: "NO_KEYS",
    trial_duration: long_isi_duration,
    data: {
        task: "blank"
    }
}



var long_isi_blank = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    choices: "NO_KEYS",
    trial_duration: long_isi_blank_duration,
    data: {
        task: "blank"
    }
}

var short_isi = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    choices: "NO_KEYS",
    trial_duration: short_isi_duration,
    data: {
        task: "blank"
    }
}

var short_isi_blank = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
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




var practiceEnd = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h2>Gyakorló blokk vége</h2 > <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A gyakorló blokk véget ért. Most a kísérleti blokk következik. Ha készen állsz, nyomj le egy tetszőleges billentyűt a kezdéshez!<h2>`,
    choices: "ALL_KEYS",

};


var blockEnd = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
        A kísérletnek ezen szakasza befejeződött, most pihenhetsz kicsit.
        Amennyiben készen állsz, nyomj le egy tetszőleges billentyűt a folytatáshoz!</p>
        <p style="font-size: 24px;  position: absolute; top: 40px; right: 80px;">Hátralévő idő: <span id="timer" class="timer">2:00</span></p>
    `,
    choices: "ALL_KEYS",
    trial_duration: 120000, // trial auto-ends after 2 minutes
    /*
    Timer - full Claude 

    */
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
        `<h2> Kísérlet vége</h2 > <p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
		Köszönjük, hogy részt vettél a vizsgálatban!</p>`,
    choices: "ALL_KEYS"
};

//Same conditional function logic as below --> timeline is only shown, if the n-2 object's response property is null - so they did not answer. Otherwise it is always skipped. 
var too_slow = {
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function () {
            var lastTrialResponse = jsPsych.data.get().last(1).values()[0];
            if (lastTrialResponse.response == null) {
                return '<p style="font-size:32px">Túl lassú voltál!</p>'
            }
            else { return '<pstyle="font-size:32px">Hibás válasz!</p>' }
        },
        choices: 'ALL_KEYS',
        trial_duration: 3000
    }],
    conditional_function: function () {
        let is_response = jsPsych.data.get().last(1).values()[0];
        console.log(is_response);
        if (is_response.response == is_response.correct_response) {
            return false
        }
        else {
            return true
        }
    }
}

if (debug) {
    too_slow = {
        timeline: [{
            type: jsPsychHtmlKeyboardResponse,
            stimulus: "<p> Túl lassú voltál. Kérlek törekedj arra, hogy minél gyorsabban válaszolj!</p>",
            choices: 'ALL_KEYS',
            trial_duration: "3000"
        }],
        conditional_function: function () {
            let is_response = jsPsych.data.get().last(1).values()[0];
            console.log(is_response);
            if (is_response.response !== null) {
                return false
            }
            else { return false }
        }
    }
}

function startExperiment() {
    timeline.push(
        WelcomeTrial,
        enterFullscreen,
        consentTrial,
        neptunCodeTrial,
        genderTrial,
        ageTrial,
        IntroTrial,
        practiceStart)

    let practice_procedure = [];


    //same for loop strategy as in the case of the experimental trials --> i represents the index of the given block


    /*very simple conditional function --> given that it is in a for loop --> if the 
    practice passed condtion is fulfilled --> return false, so it does not progress to the next practice block
    if the practice_passed condition is not fulfilled --> return true, so the for loop keeps going*/
    //IMPORTANT: 1. you can define every feature of a trial inside the timeline part  2.for conditional functions: you need the timeline, it does not work if embedded in a single trial 


    /* Explanation, as to what is happening here: 
   
   Python:
   1. The python trial generation works the same way as for the experimental trials --> so that we don't have to work with various structures --> 
   - The python code generates practice trials with the same constraints --> 10 blocks, but less trials in each block compared to the experimental trials
   
   JS:
   0. var practice_passed is defined at the very top, as a global variable 
   
   1. First a loop is created - Given the structure of the json files, this loop "goes through" the first layer,
   so the length of the practice trials object is the number of blocks. 
   If we were to write another loop, like for (let j = 0; j < practice_trials[i].lenght; i++) within this one, 
   that would go through the block itself, and the length would become the number of trials within a block. 

   2. var practice block is created
   - the timeline just gives it the structure based on the objects defined above:
   In the timeline, there is prime --> checks the prime object in the code --> given that we are working inside practice_trials, 
   the evaluate timelineVariable part sees the practice_trials json --> grabs the first "prime". This applies to probe as well, 
   the long_isi, long_isi_blank are self-explanatory. 
   - Second part: conditional_function --> it is telling the code basically to not run the object, if practice_passed is true - BUT: by default it is set to true above
   Therefore, it runs until the block ends.

   3.repeat_prac_message - it is just a trial that the participant is displayed, if they fail to reach the sufficient level of accuracy


   4. Accuracy check
   - Not the most elegant solution, but at least easier to grasp
   - It is a separate trial that comes in the loop after the first block of the practice block ran
   - The timeline contains WHAT will run --> it is an empty trial basically with an on_finish function
   - When the trial is finished --> on_finish function --> a var last_prac_trials is defined which contains the number of probes
   from the last block (given the filter in the jsPsych.data.get part)
   - var n_correct contains the number of correct responses of the previous practice block
   - prop corr --> basic division
   - if the prop corr is bigger than 0.8 --> IT CHANGES THE practice_passed to true !!!! --> This is why
   the practice_block will always run at least once, because the practice_passed basic value is false


   5. Repeat prac
   - This is just the repeat prac_message
   - The condition of this in order to to run is practice_passed to be true


   So how does it all work: 
   - Loop: basic value of practice_passed: false --> practice_block - first block runs if practice_passed is FALSE --> 
   accuracy_check runs if practice passed is FALSE --> determines whether to change the practice_passed value or not -->
   
   IF THE PARTICIPANT REACHED 80% ACCURACY: practice_passed is set to TRUE --> the next trial only runs, if it is false, so it does
   not run --> next - given it is a loop - we return to practice block, BUT: its condition is that it only runs if practice_passed is FALSE,
   so it does not run, accuracy check does not run, so the loop ends. 

   IF THE PARTICIPANT DID NOT REACH 80% ACCURACY: practice_passed remains FALSE --> the next trial runs, they see a message to restart --> 
   after that the loop returns to the practice_block with the next block of practice trials included, and it runs because practice_passed is false -
   so everything starts over again --> this goes until they pass or until they go through 10 blocks without passing - hopefully that does not happen
   
   */


    for (let i = 0; i < practice_trials.length; i++) {
        var practice_block = {
            timeline: [fixation, prime, long_isi, probe, too_slow], //What runs
            timeline_variables: practice_trials[i],
            conditional_function: function () { //Whether it runs
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
                data: { collect: true },
                on_finish: function () {
                    var last_prac_trials = jsPsych.data.get().filter({ task: 'probe' }).last(practice_trials[i].length)
                    var n_correct = last_prac_trials.filter({ correct: true }).count();
                    var prop_corr = n_correct / last_prac_trials.count();  //count should be used because by using jsPsych.data.get, it creates a DataCollection, not a string --> DataCollection has no length property, hence the count
                    if (prop_corr > 0.8) {
                        practice_passed = true;
                    }
                }
            }], //What runs
            conditional_function: function () {
                if (practice_passed == true) {
                    return false
                }
                else { return true } //Whether it runs

            }
        }

        practice_procedure.push(accuracy_check)
        var repeat_prac = {
            timeline: [repeat_prac_meassage], //what runs
            conditional_function: function () { //Whether it runs
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

    let longFirst = (Math.floor(Math.random() * 2))


    for (let i = 0; i < experimental_trials.length; i++) {

        var blockStart = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${i + 1}. Blokk kezdődik</h1>`,
            trial_duration: 2000,
            choices: "NO_KEYS",
            data: { collect: true }
        }

        experimental_blocks.push(blockStart)

        if (longFirst == 1) {
            if (i < experimental_trials.length - 5) {
                experimental_blocks.push({
                    timeline: [fixation, prime, long_isi, probe],
                    timeline_variables: experimental_trials[i]
                })
            }
            else {
                experimental_blocks.push({
                    timeline: [lead_in_blank, fixation, prime, short_isi, probe],
                    timeline_variables: experimental_trials[i]
                })
            }
        }
        else {
            if (i < experimental_trials.length - 5) {
                experimental_blocks.push({
                    timeline: [lead_in_blank, fixation, prime, short_isi, probe],
                    timeline_variables: experimental_trials[i]
                })
            }
            else {
                experimental_blocks.push({
                    timeline: [fixation, prime, long_isi, probe],
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


