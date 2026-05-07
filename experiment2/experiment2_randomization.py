import random
import pandas as pd 
import numpy as np 

trials = []


inducer_congruency = (
    ["ic_level_0"] * 20000 +
    ["ic_level_1"] * 20000 +
    ["ic_level_2"] * 20000 +
    ["ic_level_3"] * 20000 +
    ["ic_level_4"] * 20000 +
    ["ic_level_5"] * 20000 +
    ["ic_level_6"] * 20000 +
    ["ic_level_7"] * 20000 +
    ["ic_level_8"] * 20000
)


diagnostic_congruency = ["congruent"] * 90000 + ["incongruent"] * 90000 


random.shuffle(inducer_congruency)
random.shuffle(diagnostic_congruency)

for i, (ind_c, diag_c) in enumerate(zip(inducer_congruency, diagnostic_congruency)): #???? 
    inducer_prime_trial = {
    "type": "jsPsychHtmlKeyboardResponse", 
    "stimulus": [], 
    "choices": [], 
}

    inducer_probe_trial = {
    "type": "jsPsychHtmlKeyboardResponse", 
    "stimulus": [], 
    "choices": []
}
    inducer_probe_trial["stimulus"] = random.choice(["A", "B"])
    inducer_prime_trial["class"] = "prime"
    inducer_prime_trial["pair_id"] = i
    inducer_prime_trial["incongruency_level"] = ind_c
    inducer_probe_trial["class"] = "probe"
    inducer_probe_trial["pair_id"] = i
    inducer_probe_trial["incongruency_level"] = ind_c
    if ind_c == "ic_level_0":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "A"]
        else: 
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "B"]
    elif ind_c == "ic_level_1":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["B", "A", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
        else:
            inducer_prime_trial["stimulus"] = ["A", "B", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
    elif ind_c == "ic_level_2":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["B", "B", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
        else:
            inducer_prime_trial["stimulus"] = ["A", "A", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
    elif ind_c == "ic_level_3":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
        else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
    elif ind_c == "ic_level_4":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
        else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
    elif ind_c == "ic_level_5":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
        else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
    elif ind_c == "ic_level_6":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
        else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
    elif ind_c == "ic_level_7":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
        else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
    elif ind_c == "ic_level_8":
        if inducer_probe_trial["stimulus"] == "A":
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
        else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
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
    diagnostic_probe_trial["stimulus"] = random.choice(["Z", "Y"])
    diagnostic_prime_trial["class"] = "prime"
    diagnostic_prime_trial["pair_id"] = i
    diagnostic_prime_trial["incongruency_level"] = diag_c
    diagnostic_probe_trial["class"] = "probe"
    diagnostic_probe_trial["pair_id"] = i
    diagnostic_probe_trial["incongruency_level"] = diag_c
    if diag_c == "congruent":
        if diagnostic_probe_trial["stimulus"] == "Y":
            diagnostic_prime_trial["stimulus"] = ["Y", "Y"]
        else: 
            diagnostic_prime_trial["stimulus"] = ["Z", "Z"]
    else: 
        if diagnostic_probe_trial["stimulus"] == "Z":
            diagnostic_probe_trial["stimulus"] = ["Y", "Y"]
        else:
            diagnostic_probe_trial["stimulus"] = ["Z", "Z"]
   
    trials.append(diagnostic_prime_trial)
    trials.append(diagnostic_probe_trial)


print(trials)
print(len(trials))

df_trials_exp2 = pd.DataFrame(trials)
df_trials_exp2.to_csv("C:/ELTE_ST/Additional_research_activity/python_practice/exp2_trials.csv", index = False)