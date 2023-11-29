
/* Change 1: Adding the image hosting site */
// define the site that hosts stimuli images
// usually https://<your-github-username>.github.io/<your-experiment-name>/
var repo_site = "https://mikelinpsy.github.io/Letter-Task/"; 

/* create timeline */
var timeline = [];

/* define welcome message trial */
var welcome_block = {
    type: "html-keyboard-response",
    stimulus: "Next, please complete a figure judgement task. Press any key to begin."
};
timeline.push(welcome_block);

/* define instructions trial */
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>In this experiment, a circle will appear in the center " +
        "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
        "press the letter F on the keyboard as fast as you can.</p>" +
        "<p>If the circle is <strong>orange</strong>, press the letter J " +
        "as fast as you can.</p>" +
        "<div style='width: 700px;'>" +
        "<div style='float: left;'><img src='" + repo_site + "img/blue.png'></img>" + // Change 2: Adding `repo_site` in `instructions`
        "<p class='small'><strong>Press the F key</strong></p></div>" +
        "<div class='float: right;'><img src='" + repo_site + "img/orange.png'></img>" + // Change 2: Adding `repo_site` in `instructions`
        "<p class='small'><strong>Press the J key</strong></p></div>" +
        "</div>" +
        "<p>Press any key to begin.</p>",
    post_trial_gap: 2000
};
timeline.push(instructions);

/* test trials */

var test_stimuli = [{
        stimulus: repo_site + "img/global_h_f.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: 'h',
            catergory: 'global'
        }
    },
    {
        stimulus: repo_site + "img/global_h_l.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: 'h',
            catergory: 'global'
        }
    },
    {
        stimulus: repo_site + "img/global_t_f.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: 't',
            catergory: 'global'
        }
    },
    {
        stimulus: repo_site + "img/global_t_l.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: 't',
            catergory: 'global'
        }
    },
    {
        stimulus: repo_site + "img/local_h_f.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: 'h',
            catergory: 'local'
        }
    },
    {
        stimulus: repo_site + "img/local_h_l.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: 'h',
            catergory: 'local'
        }
    },
    {
        stimulus: repo_site + "img/local_t_f.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: 't',
            catergory: 'local'
        }
    },
    {
        stimulus: repo_site + "img/local_t_l.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: 't',
            catergory: 'local'
        }
    }
];

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: function () {
        return jsPsych.randomization.sampleWithoutReplacement([500], 1)[0];
    },
    data: {
        test_part: 'fixation'
    }
}

var test = {
    type: "image-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['h', 't'],
    data: jsPsych.timelineVariable('data'),
    on_finish: function (data) {
        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
        data.logrt = Math.log(data.rt);
    },
}

var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    repetitions: 1,
    randomize_order: true
}
timeline.push(test_procedure);

/* define debrief */

var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function () {

        var trials = jsPsych.data.get().filter({
            test_part: 'test'
        });
        
        var correct_trials = trials.filter({
            correct: true
        });

        var rtvalid_trials = trials.filter(trials.select('rt')< trials.select('rt').mean() + 3 * trials.select('rt').sd()
        && trials.select('rt')> trials.select('rt').mean() - 3 * trials.select('rt').sd()
        );

        var valid_trials = rtvalid_trials.filter({
            correct: true
        });
        
        var valid_global_trials = valid_trials.filter({
            catergory: 'global' 
        });

        var valid_local_trials = correct_trials.filter({
            catergory: 'local' 
        });

        var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
        var rtvalid = Math.round(rtvalid_trials.count() / trials.count() * 100);
        var valid = Math.round(valid_trials.count() / trials.count() * 100);
        var rt = Math.round(valid_trials.select('rt').mean());
        var global_rt = Math.round(valid_global_trials.select('rt').mean());
        var local_rt = Math.round(valid_local_trials.select('rt').mean());
        var log_global_rt = Math.round(Math.log(valid_global_trials.select('rt')).mean());
        var log_local_rt = Math.round(Math.log(valid_local_trials.select('rt')).mean());

        return "<p>You responded correctly on " + accuracy + "% of the trials.</p>" +
            "<p>Your average response time was " + rt + "ms.</p>" +
            "<p>Press any key to complete the experiment. Thank you!</p>";



    }
};
timeline.push(debrief_block);
