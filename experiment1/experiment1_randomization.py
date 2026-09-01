
import random
import json
import os

os.makedirs("practice_trials", exist_ok = True) 
os.makedirs("experimental_trials", exist_ok = True)

all_experiments = []


for experiment in range(100):
   all_blocks = []  

   trial_order = ["alfa"]* 5 + ["beta"]* 5
   random.shuffle(trial_order)
   
    
   for block in range(10):
        

      conditions = (
    [("incongruent", "congruent")] * 8 +
    [("congruent", "incongruent")] * 8 +
    [("congruent", "congruent")] * 8 +
    [("incongruent", "incongruent")] * 8
)

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
           "condition": inducer_prime_trial["condition"] , 
           "block": inducer_prime_trial["block"], 
           "id": i,
           "trial_order":trial_order[block]
           
         }
         
         
         diagnostic_trial = {
           "prime": diagnostic_prime_trial["stimulus"],
           "probe": diagnostic_probe_trial["stimulus"],
           "ind_diag": diagnostic_probe_trial["ind_diag"],  
           "condition": diagnostic_probe_trial["condition"], 
           "block": diagnostic_probe_trial["block"], 
           "id": i, 
           "trial_order":trial_order[block]
         }


         trials.append(inducer_trial)
         trials.append(diagnostic_trial)
      
      if (trial_order[block] == "beta"):
       for trial in trials:
        if (trial["ind_diag"] == "inducer"):
          new_prime = []
          if (trial["prime"] == "A"):
            new_prime.append("Y")
          elif(trial["prime"] == "B"):
            new_prime.append("Z")
          trial["prime"] = new_prime[0]
          new_probe = []
          if(trial["probe"] == "A"):
            new_probe.append("Y")
          elif(trial["probe"] == "B"):
            new_probe.append("Z")
          trial["probe"] = new_probe[0]

        elif (trial["ind_diag"] == "diagnostic"):
          new_prime = []
          if (trial["prime"] == "Y"):
           new_prime.append("A")
          elif(trial["prime"] == "Z"):
            new_prime.append("B")
          trial["prime"] = new_prime[0]
          new_probe = []
          if(trial["probe"] == "Y"):
            new_probe.append("A")
          elif(trial["probe"] == "Z"):
            new_probe.append("B")
          trial["probe"] = new_probe[0]

      for trial in trials: 
        new_cor = []
        if (trial["probe"] == "Y"): 
          new_cor.append("j")
          trial["correct_response"] = new_cor[0]
        elif (trial["probe"] == "Z"): 
          new_cor.append("n")
          trial["correct_response"] = new_cor[0]
        elif (trial["probe"] == "A"):
         new_cor.append("f")
         trial["correct_response"] = new_cor[0]
        elif (trial["probe"] == "B"):
          new_cor.append("g")
          trial["correct_response"] = new_cor[0]

      num65_trial = { 
                   "block": diagnostic_probe_trial["block"], 
                    "id": i, 
                    "trial_order":trial_order[block], 
                    "condition": random.choice(["C", "I"])}

      if (trials[-1]["prime"] == "Y" or trials[-1]["prime"] == "Z"):
          num65_trial["prime"] = random.choice(["A", "B"])
      elif (trials[-1]["prime"] == "A" or trials[-1]["prime"] == "B"):
          num65_trial["prime"] = random.choice(["Y", "Z"])

      if(num65_trial["condition"] == "C"):
          num65_trial["probe"] = num65_trial["prime"]
      elif(num65_trial["condition"] == "I"):
          if(num65_trial["prime"] == "A"):
            num65_trial["probe"] = "B"
          elif(num65_trial["prime"] == "B"):
            num65_trial["probe"] = "A"
          elif(num65_trial["prime"] == "Y"):
            num65_trial["probe"] = "Z"
          elif(num65_trial["prime"] == "Z"):
            num65_trial["probe"] = "Y"

      if(num65_trial["probe"] == "A"):
          num65_trial["correct_response"] = "f"
      elif(num65_trial["probe"] == "B"):
          num65_trial["correct_response"] = "g"
      elif(num65_trial["probe"] == "Y"):
          num65_trial["correct_response"] = "j"
      elif(num65_trial["probe"] == "Z"): 
          num65_trial["correct_response"] = "z"
      trials.append(num65_trial)
           

         
      all_blocks.append(trials)
   all_experiments.append(all_blocks)
   with open(f"experimental_trials/p_experiment_{experiment+1}.json", "w") as f:
    json.dump(all_blocks, f, indent = 4)
print(trials)

print(len(trials))
print(len(all_blocks))
print(len(all_blocks[0]))



practice_experiments = []


for practice in range(100):
   practice_blocks = [] 

   trial_order = ["alfa"]* 5 + ["beta"]* 5
   random.shuffle(trial_order)
   
    
   for block in range(10):
        
      
      conditions = (
    [("incongruent", "congruent")] * 2 +
    [("congruent", "incongruent")] * 2 +
    [("congruent", "congruent")] * 2 +
    [("incongruent", "incongruent")] * 2
)

     
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
           "condition": inducer_prime_trial["condition"] , 
           "block": inducer_prime_trial["block"], 
           "id": i, 
           "trial_order":trial_order[block]
           
           
         }
         
         diagnostic_trial = {
           "prime": diagnostic_prime_trial["stimulus"],
           "probe": diagnostic_probe_trial["stimulus"],
           "ind_diag": diagnostic_probe_trial["ind_diag"],  
           "condition": diagnostic_probe_trial["condition"], 
           "block": diagnostic_probe_trial["block"], 
           "id": i, 
           "trial_order":trial_order[block]
           
         }
           

         trials.append(inducer_trial)
         trials.append(diagnostic_trial)
      if (trial_order[block] == "beta"):
       for trial in trials:
        if (trial["ind_diag"] == "inducer"):
          new_prime = []
          if (trial["prime"] == "A"):
            new_prime.append("Y")
          elif(trial["prime"] == "B"):
            new_prime.append("Z")
          trial["prime"] = new_prime[0]
          new_probe = []
          if(trial["probe"] == "A"):
            new_probe.append("Y")
          elif(trial["probe"] == "B"):
            new_probe.append("Z")
          trial["probe"] = new_probe[0]

        elif (trial["ind_diag"] == "diagnostic"):
          new_prime = []
          if (trial["prime"] == "Y"):
           new_prime.append("A")
          elif(trial["prime"] == "Z"):
            new_prime.append("B")
          trial["prime"] = new_prime[0]
          new_probe = []
          if(trial["probe"] == "Y"):
            new_probe.append("A")
          elif(trial["probe"] == "Z"):
            new_probe.append("B")
          trial["probe"] = new_probe[0]

      for trial in trials: 
        new_cor = []
        if (trial["probe"] == "Y"): 
          new_cor.append("j")
          trial["correct_response"] = new_cor[0]
        elif (trial["probe"] == "Z"): 
          new_cor.append("n")
          trial["correct_response"] = new_cor[0]
        elif (trial["probe"] == "A"):
         new_cor.append("f")
         trial["correct_response"] = new_cor[0]
        elif (trial["probe"] == "B"):
          new_cor.append("g")
          trial["correct_response"] = new_cor[0]
      num65_trial = { 
                  "block": diagnostic_probe_trial["block"], 
                  "id": i, 
                  "trial_order":trial_order[block], 
                  "condition": random.choice(["C", "I"])}
      
      if (trials[-1]["prime"] == "Y" or trials[-1]["prime"] == "Z"):
          num65_trial["prime"] = random.choice(["A", "B"])
      elif (trials[-1]["prime"] == "A" or trials[-1]["prime"] == "B"):
          num65_trial["prime"] = random.choice(["Y", "Z"])

      if(num65_trial["condition"] == "C"):
          num65_trial["probe"] = num65_trial["prime"]
      elif(num65_trial["condition"] == "I"):
          if(num65_trial["prime"] == "A"):
            num65_trial["probe"] = "B"
          elif(num65_trial["prime"] == "B"):
            num65_trial["probe"] = "A"
          elif(num65_trial["prime"] == "Y"):
            num65_trial["probe"] = "Z"
          elif(num65_trial["prime"] == "Z"):
            num65_trial["probe"] = "Y"

      if(num65_trial["probe"] == "A"):
          num65_trial["correct_response"] = "f"
      elif(num65_trial["probe"] == "B"):
          num65_trial["correct_response"] = "g"
      elif(num65_trial["probe"] == "Y"):
          num65_trial["correct_response"] = "j"
      elif(num65_trial["probe"] == "Z"): 
          num65_trial["correct_response"] = "z"
      trials.append(num65_trial)
                 
      
         
      practice_blocks.append(trials)
   practice_experiments.append(all_blocks)
   with open(f"practice_trials/practice_trial_sequence_{practice+1}.json", "w") as f:
    json.dump(practice_blocks, f, indent = 4)





#f_trials_exp1 = pd.DataFrame(trials)
#df_trials_exp1.to_csv("C:/ELTE_ST/Additional_research_activity/python_practice/exp1_trials.csv", index = False)

#with open("/Users/ludmanyboglarka/Documents/metalab/cse-replication/CSE_octagon/randomized/practice_trials.json", "w") as f:
    #json.dump(all_blocks, f, indent=4)

#with open(f"/Users/ludmanyboglarka/Documents/metalab/cse-replication/CSE_octagon/randomized/practice/p_experiment_{experiment+1}.json", "w") as f:
    #json.dump(all_blocks, f, indent = 4)