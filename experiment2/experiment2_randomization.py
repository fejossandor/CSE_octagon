import random
import pandas as pd 
import numpy as np 
import json
import os 

os.mkdir("practice_trials")
os.mkdir("experimental_trials")



all_experiments = []


for experiment in range(100):
    all_blocks = []

   

    for block in range(10):
    
     
     
     
     inducer_congruency = (
     ["ic_level_0"] * 4 +
     ["ic_level_1"] * 4 +
     ["ic_level_2"] * 4 +
     ["ic_level_3"] * 4 +
     ["ic_level_4"] * 4 +
     ["ic_level_5"] * 4 +
     ["ic_level_6"] * 4 +
     ["ic_level_7"] * 4 +
     ["ic_level_8"] * 4
     )

     diagnostic_congruency = ["congruent"] * 18 + ["incongruent"] * 18

     random.shuffle(inducer_congruency)
     random.shuffle(diagnostic_congruency)
     trials = []

     for i, (ind_c, diag_c) in enumerate(zip(inducer_congruency, diagnostic_congruency)): #???? 
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
      inducer_probe_trial["stimulus"] = random.choice([["A"], ["B"]])
      inducer_prime_trial["pair_id"] = i
      inducer_prime_trial["incongruency_level"] = ind_c
      inducer_probe_trial["pair_id"] = i
      inducer_probe_trial["incongruency_level"] = ind_c
      if ind_c == "ic_level_0":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "A"]
         else: 
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "B"]
      elif ind_c == "ic_level_1":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "A", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
         else:
            inducer_prime_trial["stimulus"] = ["A", "B", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
      elif ind_c == "ic_level_2":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
         else:
            inducer_prime_trial["stimulus"] = ["A", "A", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
      elif ind_c == "ic_level_3":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
         else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
      elif ind_c == "ic_level_4":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
         else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
      elif ind_c == "ic_level_5":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
         else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
      elif ind_c == "ic_level_6":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
         else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
      elif ind_c == "ic_level_7":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
         else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
      elif ind_c == "ic_level_8":
         if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
         else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
      

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
      diagnostic_probe_trial["stimulus"] = random.choice([["Z"], ["Y"]])
      diagnostic_prime_trial["class"] = "prime"
      diagnostic_prime_trial["pair_id"] = i
      diagnostic_prime_trial["incongruency_level"] = diag_c
      diagnostic_probe_trial["class"] = "probe"
      diagnostic_probe_trial["pair_id"] = i
      diagnostic_probe_trial["incongruency_level"] = diag_c
      inducer_prime_trial["block"] = block 
      inducer_probe_trial["block"] = block 
      diagnostic_prime_trial["block"] = block 
      diagnostic_probe_trial["block"] = block 
      if diag_c == "congruent":
         if diagnostic_probe_trial["stimulus"] == ["Y"]:
            diagnostic_prime_trial["stimulus"] = ["Y", "Y"]
         else: 
            diagnostic_prime_trial["stimulus"] = ["Z", "Z"]
      else: 
          if diagnostic_probe_trial["stimulus"] == ["Z"]:
            diagnostic_prime_trial["stimulus"] = ["Y", "Y"]
          else:
            diagnostic_probe_trial["stimulus"] = ["Z", "Z"]
   
      inducer_trial = {
           "prime": inducer_prime_trial["stimulus"],
           "probe": inducer_probe_trial["stimulus"],
           "incongruency_level": inducer_prime_trial["incongruency_level"], 
           "block": inducer_prime_trial["block"], 
           "pair_id": inducer_prime_trial["pair_id"]
           
         }
      diagnostic_trial = {
           "prime": diagnostic_prime_trial["stimulus"],
           "probe": diagnostic_probe_trial["stimulus"],
           "incongruency_level": inducer_probe_trial["incongruency_level"],  
           "block": inducer_probe_trial["block"], 
           "pair_id": inducer_probe_trial["pair_id"]
         }
                
      trials.append(inducer_trial)
      trials.append(diagnostic_trial)

     
     all_blocks.append(trials)
    all_experiments.append(all_blocks)
    with open(f"experimental_trials/p_experiment_{experiment+1}.json", "w") as f:
     json.dump(all_blocks, f, indent=4)

print(trials)
print(len(trials))
print(len(all_blocks))
print(len(all_blocks[0]))


all_practice = []


for practice in range(100):
    all_practice_blocks = []

   


    for block in range(10):
     
     
     inducer_congruency = (
     ["ic_level_0"] * 4 +
     ["ic_level_1"] * 4 +
     ["ic_level_2"] * 4 +
     ["ic_level_3"] * 4 +
     ["ic_level_4"] * 4 +
     ["ic_level_5"] * 4 +
     ["ic_level_6"] * 4 +
     ["ic_level_7"] * 4 +
     ["ic_level_8"] * 4
     )
     diagnostic_congruency = ["congruent"] * 18 + ["incongruent"] * 18

     random.shuffle(inducer_congruency)
     random.shuffle(diagnostic_congruency)
     practice_trials = []

     for i, (ind_c, diag_c) in enumerate(zip(inducer_congruency, diagnostic_congruency)): #???? 
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
       inducer_probe_trial["stimulus"] = random.choice([["A"], ["B"]])
       inducer_prime_trial["pair_id"] = i
       inducer_prime_trial["incongruency_level"] = ind_c
       inducer_probe_trial["pair_id"] = i
       inducer_probe_trial["incongruency_level"] = ind_c
       if ind_c == "ic_level_0":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "A"]
          else: 
             inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "B"]
       elif ind_c == "ic_level_1":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "A", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
          else:
            inducer_prime_trial["stimulus"] = ["A", "B", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
       elif ind_c == "ic_level_2":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
          else:
            inducer_prime_trial["stimulus"] = ["A", "A", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
       elif ind_c == "ic_level_3":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
          else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
       elif ind_c == "ic_level_4":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
          else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
       elif ind_c == "ic_level_5":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
          else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
       elif ind_c == "ic_level_6":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
          else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
       elif ind_c == "ic_level_7":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
          else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
       elif ind_c == "ic_level_8":
          if inducer_probe_trial["stimulus"] == ["A"]:
            inducer_prime_trial["stimulus"] = ["B", "B", "B", "B", "B", "B", "B", "B"]
            random.shuffle(inducer_prime_trial["stimulus"])
          else:
            inducer_prime_trial["stimulus"] = ["A", "A", "A", "A", "A", "A", "A", "A"]
            random.shuffle(inducer_prime_trial["stimulus"])
      

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
       diagnostic_probe_trial["stimulus"] = random.choice([["Z"], ["Y"]])
       diagnostic_prime_trial["class"] = "prime"
       diagnostic_prime_trial["pair_id"] = i
       diagnostic_prime_trial["incongruency_level"] = diag_c
       diagnostic_probe_trial["class"] = "probe"
       diagnostic_probe_trial["pair_id"] = i
       diagnostic_probe_trial["incongruency_level"] = diag_c
       inducer_prime_trial["block"] = block 
       inducer_probe_trial["block"] = block 
       diagnostic_prime_trial["block"] = block 
       diagnostic_probe_trial["block"] = block 
       if diag_c == "congruent":
          if diagnostic_probe_trial["stimulus"] == ["Y"]:
            diagnostic_prime_trial["stimulus"] = ["Y", "Y"]
          else: 
            diagnostic_prime_trial["stimulus"] = ["Z", "Z"]
       else: 
           if diagnostic_probe_trial["stimulus"] == ["Z"]:
            diagnostic_prime_trial["stimulus"] = ["Y", "Y"]
           else:
            diagnostic_probe_trial["stimulus"] = ["Z", "Z"]
   
       inducer_trial = {
           "prime": inducer_prime_trial["stimulus"],
           "probe": inducer_probe_trial["stimulus"],
           "incongruency_level": inducer_prime_trial["incongruency_level"], 
           "block": inducer_prime_trial["block"], 
           "pair_id": inducer_prime_trial["pair_id"]
           
         }
       diagnostic_trial = {
           "prime": diagnostic_prime_trial["stimulus"],
           "probe": diagnostic_probe_trial["stimulus"],
           "incongruency_level": inducer_probe_trial["incongruency_level"], 
           "block": inducer_probe_trial["block"], 
           "pair_id": inducer_probe_trial["pair_id"]
         }
       
       practice_trials.append(inducer_trial)
       practice_trials.append(diagnostic_trial)
       
      
                
     all_practice_blocks.append(practice_trials)
    all_practice.append(all_practice_blocks)
    with open(f"practice_trials/p_practice_{practice+1}.json", "w") as f:
     json.dump(all_practice_blocks, f, indent=4)

print(trials)
print(len(trials))
print(len(all_blocks))
print(len(all_blocks[0]))

