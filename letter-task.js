var repo_site = "https://mikelinpsy.github.io/Letter-Task/"; 
/* create timeline */
var timeline = [];
/* define welcome message trial */


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
    },
}

var practice = {
    type: "image-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['h', 't'],
    data: jsPsych.timelineVariable('data'),
    on_finish: function (data) {
        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    },
}

var practice_block = {
    type: "html-keyboard-response",
    stimulus: "Next, you will be in the practice stage. Press any key to begin."
};
timeline.push(practice_block);

var practice_procedure = {
    timeline: [fixation, practice],
    timeline_variables: test_stimuli,
    repetitions: 1,
    randomize_order: true
}
timeline.push(practice_procedure);

var test_block = {
    type: "html-keyboard-response",
    stimulus: "Next, you will be in the test stage. Press any key to begin."
};
timeline.push(test_block);

var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    repetitions: 2,
    randomize_order: true
}
timeline.push(test_procedure);

