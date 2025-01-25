

def getScore(
    knee_angle, 
    ankle_angle, 
    hip_angle, 
    plant_knee_angle, 
    plant_ankle_angle,
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
        "knee_angle": 150,
        "ankle_angle": 150,
        "hip_angle": 180,
        "plant_knee_angle": 158,
        "plant_ankle_angle": 140,
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
    }

    # Calculate total penalty and derive the score
    total_penalty = sum(penalties.values())
    score = 100 - total_penalty
    return max(score, 0)  # Ensure the score doesn't go below 0


