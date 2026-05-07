import numpy as np
import pandas as pd
import random


trials = []

inducer_congruency = ["congruent"] * 100000 + ["incongruent"] * 100000
diagnostic_congruency = ["congruent"] * 100000 + ["incongruent"] * 100000

random.shuffle(inducer_congruency)
random.shuffle(diagnostic_congruency)


for i, (ind_c, diag_c) in enumerate(zip(inducer_congruency, diagnostic_congruency)): #???? 
    inducer_prime_trial = {
    "type": "jsPsychHtmlKeyboardResponse", 
    "stimulus": [], 
    "choices": []
}

    inducer_probe_trial = {
    "type": "jsPsychHtmlKeyboardResponse", 
    "stimulus": [], 
    "choices": []
}
    inducer_prime_trial["stimulus"] = random.choice(["A", "B"])
    inducer_prime_trial["class"] = "prime"
    inducer_prime_trial["pair_id"] = i
    if ind_c == "congruent":
        if inducer_prime_trial["stimulus"] == "A":
            inducer_probe_trial["stimulus"] = "A"
        else: 
            inducer_probe_trial["stimulus"] = "B"
    else: 
        if inducer_prime_trial["stimulus"] == "A":
            inducer_probe_trial["stimulus"] = "B"
        else:
            inducer_probe_trial["stimulus"] = "A"
    inducer_probe_trial["class"] = "probe"
    inducer_probe_trial["pair_id"] = i
    trials.append(inducer_prime_trial)
    trials.append(inducer_probe_trial)
    
    
    diagnostic_prime_trial = {
    "type": "jsPsychHtmlKeyboardResponse", 
    "stimulus": [], 
    "choices": []
}

    diagnostic_probe_trial = {
    "type": "jsPsychHtmlKeyboardResponse", 
    "stimulus": [], 
    "choices": []
}
    diagnostic_prime_trial["stimulus"] = random.choice(["Z", "Y"])
    diagnostic_prime_trial["class"] = "prime"
    diagnostic_prime_trial["pair_id"] = i
    if diag_c == "congruent":
        if diagnostic_prime_trial["stimulus"] == "Z":
            diagnostic_probe_trial["stimulus"] = "Z"
        else: 
            diagnostic_probe_trial["stimulus"] = "Y"
    else: 
        if diagnostic_prime_trial["stimulus"] == "Z":
            diagnostic_probe_trial["stimulus"] = "Y"
        else:
            diagnostic_probe_trial["stimulus"] = "Z"
    diagnostic_probe_trial["class"] = "probe"
    diagnostic_probe_trial["pair_id"] = i
    trials.append(diagnostic_prime_trial)
    trials.append(diagnostic_probe_trial)

print(trials)

print(len(trials))

df_trials_exp1 = pd.DataFrame(trials)
df_trials_exp1.to_csv("C:/ELTE_ST/Additional_research_activity/python_practice/exp1_trials.csv", index = False)