import numpy as np
import pandas as pd
import random
import json


all_experiments = []


for experiment in range(100):
   all_blocks = []  
   
    
   for block in range(1):
        
      #inducer_congruency = ["congruent"] * 16 + ["incongruent"] * 16
      #diagnostic_congruency = ["congruent"] * 16 + ["incongruent"] * 16
      conditions = (
    [("incongruent", "congruent")] * 4 +
    [("congruent", "incongruent")] * 4 +
    [("congruent", "congruent")] * 4 +
    [("incongruent", "incongruent")] * 4
)

     # random.shuffle(inducer_congruency)
     # random.shuffle(diagnostic_congruency)
      random.shuffle(conditions)
        
      trials = []
      

      
      for i, (ind_c, diag_c) in enumerate(conditions): #???? 
         condition = (
         ("I" if ind_c == "incongruent" else "C") +
         ("I" if diag_c == "incongruent" else "C")
         )
         inducer_prime_trial = {
         "type": "jsPsychHtmlKeyboardResponse", 
         "stimulus": [], 
         "choices": [], 
         "ind_diag": "inducer"
         }

         inducer_probe_trial = {
         "type": "jsPsychHtmlKeyboardResponse", 
         "stimulus": [], 
        "choices": [], 
        "ind_diag": "inducer"
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

         inducer_prime_trial["condition"] = condition
         inducer_probe_trial["condition"] = condition



         
    
    
         diagnostic_prime_trial = {
        "type": "jsPsychHtmlKeyboardResponse", 
        "stimulus": [], 
        "choices": [], 
        "ind_diag": "diagnostic"
        }

         diagnostic_probe_trial = {
        "type": "jsPsychHtmlKeyboardResponse", 
        "stimulus": [], 
        "choices": [], 
        "ind_diag": "diagnostic"
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

         diagnostic_prime_trial["condition"] = condition
         diagnostic_probe_trial["condition"] = condition


         inducer_prime_trial["experiment"] = experiment 
         inducer_probe_trial["experiment"] = experiment 
         diagnostic_prime_trial["experiment"] = experiment 
         diagnostic_probe_trial["experiment"] = experiment 
         inducer_prime_trial["block"] = block 
         inducer_probe_trial["block"] = block 
         diagnostic_prime_trial["block"] = block 
         diagnostic_probe_trial["block"] = block 


         inducer_trial = {
           "prime": inducer_prime_trial["stimulus"],
           "probe": inducer_probe_trial["stimulus"],
           "ind_diag": inducer_prime_trial["ind_diag"], 
           "class":inducer_prime_trial["class"], 
           "condition": inducer_prime_trial["condition"] , 
           "block": inducer_prime_trial["block"], 
           "pair_id": inducer_prime_trial["pair_id"]
           
         }
         diagnostic_trial = {
           "prime": diagnostic_prime_trial["stimulus"],
           "probe": diagnostic_probe_trial["stimulus"],
           "ind_diag": inducer_probe_trial["ind_diag"], 
           "class":inducer_probe_trial["class"], 
           "condition": inducer_probe_trial["condition"], 
           "block": inducer_probe_trial["block"], 
           "pair_id": inducer_probe_trial["pair_id"]
         }

         trials.append(inducer_trial)
         trials.append(diagnostic_trial)
         
      all_blocks.append(trials)
   all_experiments.append(all_blocks)
   with open(f"C:\ELTE_ST\Additional_research_activity\Python_practice\Trial_sequences\experiment01\p_experiment_{experiment+1}.json", "w") as f:
    json.dump(all_blocks, f, indent = 4)
print(trials)

print(len(trials))

#f_trials_exp1 = pd.DataFrame(trials)
#df_trials_exp1.to_csv("C:/ELTE_ST/Additional_research_activity/python_practice/exp1_trials.csv", index = False)

#with open("/Users/ludmanyboglarka/Documents/metalab/cse-replication/CSE_octagon/randomized/practice_trials.json", "w") as f:
    #json.dump(all_blocks, f, indent=4)

#with open(f"/Users/ludmanyboglarka/Documents/metalab/cse-replication/CSE_octagon/randomized/practice/p_experiment_{experiment+1}.json", "w") as f:
    #json.dump(all_blocks, f, indent = 4)