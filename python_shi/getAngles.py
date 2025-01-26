import pandas as pd
import cv2
import os
import numpy as np
from getScore import getScore

def getFrame(pose_path, ball_path, rightFoot, video_path):
    pp = pd.read_csv(pose_path)
    bp = pd.read_csv(ball_path)
    min_frame = 0
    min_diff = float('inf')

    cap = cv2.VideoCapture(video_path)
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

    print(pp.shape[0], bp.shape[0])
    for i in range(min(pp.shape[0], bp.shape[0])):

        if rightFoot:
            x_lm = pp.iloc[i]['landmark_28_x']*width
            y_lm = pp.iloc[i]['landmark_28_y']*height
        else:
            x_lm = pp.iloc[i]['landmark_27_x']*width
            y_lm = pp.iloc[i]['landmark_27_y']*height

        x1_ball = bp.iloc[i]['X1']
        y1_ball = bp.iloc[i]['Y1']
        x2_ball = bp.iloc[i]['X2']
        y2_ball = bp.iloc[i]['Y2'] 

        x_center = (x1_ball + x2_ball) / 2
        y_center = (y1_ball + y2_ball) / 2

        diff = (x_lm - x_center) ** 2 + (y_lm - y_center) ** 2
        print(diff)
        if diff < min_diff:
            min_diff = diff
            min_frame = i+1
    print(min_frame)
    return getAngles(video_path, min_frame, rightFoot)

def calculate_angle(ax, ay, bx, by, cx, cy):

    BAx = ax - bx
    BAy = ay - by
    
    
    BCx = cx - bx
    BCy = cy - by
    
    
    dot = BAx * BCx + BAy * BCy
    magBA = np.sqrt(BAx**2 + BAy**2)
    magBC = np.sqrt(BCx**2 + BCy**2)
    
    
    if magBA == 0 or magBC == 0:
        return 0.0

    
    cos_angle = dot / (magBA * magBC)
    
    cos_angle = max(-1.0, min(1.0, cos_angle))
    angle = np.degrees(np.arccos(cos_angle))
    return angle

def lx(landmark_id): return f"landmark_{landmark_id}_x"
def ly(landmark_id): return f"landmark_{landmark_id}_y"


def getAngles(video_path, frame, rightFoot):
    df = pd.read_csv(pose_csv)
    row = df.iloc[frame]

    LEFT_HIP, LEFT_KNEE, LEFT_ANKLE, LEFT_TOE = 23, 25, 27, 31
    RIGHT_HIP, RIGHT_KNEE, RIGHT_ANKLE, RIGHT_TOE = 24, 26, 28, 32
    LEFT_SHOULDER, RIGHT_SHOULDER = 11, 12
    LEFT_ELBOW, LEFT_WRIST = 13, 15
    RIGHT_ELBOW, RIGHT_WRIST = 14, 16

    if rightFoot == "right":
        kickingHip, kickingKnee, kickingAnkle, kickingToe = RIGHT_HIP, RIGHT_KNEE, RIGHT_ANKLE, RIGHT_TOE
        plantHip, plantKnee, plantAnkle, plantToe = LEFT_HIP, LEFT_KNEE, LEFT_ANKLE, LEFT_TOE
        elbow, wrist = RIGHT_ELBOW, RIGHT_WRIST
    else:
        kickingHip, kickingKnee, kickingAnkle, kickingToe = LEFT_HIP, LEFT_KNEE, LEFT_ANKLE, LEFT_TOE
        plantHip, plantKnee, plantAnkle, plantToe = RIGHT_HIP, RIGHT_KNEE, RIGHT_ANKLE, RIGHT_TOE
        elbow, wrist = LEFT_ELBOW, LEFT_WRIST

    def lx(n): return f"landmark_{n}_x"
    def ly(n): return f"landmark_{n}_y"

    def get_xy(n): return (df.iloc[frame][lx(n)], df.iloc[frame][ly(n)])

    
    hip_kx, hip_ky = get_xy(kickingHip)
    knee_kx, knee_ky = get_xy(kickingKnee)
    ankle_kx, ankle_ky = get_xy(kickingAnkle)
    toe_kx, toe_ky = get_xy(kickingToe)
    knee_angle = calculate_angle(hip_kx, hip_ky, knee_kx, knee_ky, ankle_kx, ankle_ky)
    ankle_angle = calculate_angle(knee_kx, knee_ky, ankle_kx, ankle_ky, toe_kx, toe_ky)

    
    hip_px, hip_py = get_xy(plantHip)
    knee_px, knee_py = get_xy(plantKnee)
    ankle_px, ankle_py = get_xy(plantAnkle)
    toe_px, toe_py = get_xy(plantToe)
    plant_knee_angle = calculate_angle(hip_px, hip_py, knee_px, knee_py, ankle_px, ankle_py)
    plant_ankle_angle = calculate_angle(knee_px, knee_py, ankle_px, ankle_py, toe_px, toe_py)


    lshoulder_x, lshoulder_y = get_xy(LEFT_SHOULDER)
    rshoulder_x, rshoulder_y = get_xy(RIGHT_SHOULDER)
    lhip_x, lhip_y = get_xy(LEFT_HIP)
    rhip_x, rhip_y = get_xy(RIGHT_HIP)
    mid_shoulder_x = (lshoulder_x + rshoulder_x) / 2
    mid_shoulder_y = (lshoulder_y + rshoulder_y) / 2
    mid_hip_x = (lhip_x + rhip_x) / 2
    mid_hip_y = (lhip_y + rhip_y) / 2
    body_straight_angle = calculate_angle(mid_hip_x, mid_hip_y + 1, mid_hip_x, mid_hip_y, mid_shoulder_x, mid_shoulder_y)


    print(knee_angle, ankle_angle, "angles")
    print(plant_knee_angle, plant_ankle_angle, "plant angles")
    print(body_straight_angle, "body angle")

    score = getScore(knee_angle, ankle_angle, body_straight_angle, plant_knee_angle, plant_ankle_angle)
    return knee_angle, ankle_angle, plant_knee_angle, plant_ankle_angle, body_straight_angle, score




pose_csv = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'csv_files', 'pose_landmarks.csv')
soccer_csv = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'csv_files', 'soccer_ball_coordinates.csv')
video_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'og_vids', 'footy_video.mp4')

