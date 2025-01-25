

def getScore(
    knee_angle, 
    ankle_angle, 
    hip_angle, 
    plant_knee_angle, 
    plant_ankle_angle,  
    plant_hip_angle,    
    torso_lean_angle, 
    arm_angle
):
    """
    Calculates a performance score based on various body angles.

    Parameters:
        knee_angle (float): Current knee angle.
        ankle_angle (float): Current ankle angle.
        hip_angle (float): Current hip angle.
        plant_knee_angle (float): Current knee angle during planting.
        plant_ankle_angle (float): Current ankle angle during planting.
        plant_hip_angle (float): Current hip angle during planting.
        torso_lean_angle (float): Current torso lean angle.
        arm_angle (float): Current arm angle.

    Returns:
        float: Calculated score ranging from 0 to 100.
    """
    
    
    optimal = {
        "knee_angle": 140,
        "ankle_angle": 25,
        "hip_angle": 90,
        "plant_knee_angle": 17.5,
        "plant_ankle_angle": 20,  
        "plant_hip_angle": 85, 
        "torso_lean_angle": 15,
        "arm_angle": 37.5
    }

    weights = {
        "knee_angle": 2,
        "ankle_angle": 1.5,
        "hip_angle": 1.5,
        "plant_knee_angle": 1,
        "plant_ankle_angle": 1,  
        "plant_hip_angle": 1,   
        "torso_lean_angle": 1,
        "arm_angle": 0.5
    }
    
    penalties = {
        "knee_angle": abs(knee_angle - optimal["knee_angle"]) * weights["knee_angle"],
        "ankle_angle": abs(ankle_angle - optimal["ankle_angle"]) * weights["ankle_angle"],
        "hip_angle": abs(hip_angle - optimal["hip_angle"]) * weights["hip_angle"],
        "plant_knee_angle": abs(plant_knee_angle - optimal["plant_knee_angle"]) * weights["plant_knee_angle"],
        "plant_ankle_angle": abs(plant_ankle_angle - optimal["plant_ankle_angle"]) * weights["plant_ankle_angle"],
        "plant_hip_angle": abs(plant_hip_angle - optimal["plant_hip_angle"]) * weights["plant_hip_angle"],
        "torso_lean_angle": abs(torso_lean_angle - optimal["torso_lean_angle"]) * weights["torso_lean_angle"],
        "arm_angle": abs(arm_angle - optimal["arm_angle"]) * weights["arm_angle"],
    }

    # Calculate total penalty and derive the score
    total_penalty = sum(penalties.values())
    score = 100 - total_penalty
    return max(score, 0)  # Ensure the score doesn't go below 0


print(getScore(10, 30, 85, 15, 18, 80, 12, 40))
