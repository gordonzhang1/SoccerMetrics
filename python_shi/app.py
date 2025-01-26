from flask import Flask, jsonify, request, send_file
from ball_detection import detect_ball
import os
import pandas as pd
from io import StringIO
import generate
from getAngles import getFrame
from coach_rec import generate_advice
import base64
import json

app = Flask(__name__)

# Directory to save uploaded videos
UPLOAD_FOLDER = 'og_vids'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the directory exists

@app.route('/get_stuff', methods=['POST'])
def get_ball():
    # Check if a file is provided in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    rightFoot = request.form.get('rightFoot')

    # Check if the file has a valid filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        video_path = os.path.join(UPLOAD_FOLDER, 'footy_video.mp4')
        file.save(video_path)
        
        generate.main()
        knee_angle, ankle_angle, plant_knee_angle, plant_ankle_angle, body_straight_angle, score = getFrame('csv_files/pose_landmarks.csv', 'csv_files/soccer_ball_coordinates.csv', rightFoot, video_path)

        print('worked until here 2')
        advice = generate_advice(knee_angle=knee_angle, ankle_angle=ankle_angle, plant_knee_angle=plant_knee_angle, plant_ankle_angle=plant_ankle_angle, body_straight_angle=body_straight_angle)

        print(advice, 'advice')
        video_path = 'new_vids/processed_output.mp4'
        with open(video_path, 'rb') as video_file:
            encoded_video = base64.b64encode(video_file.read()).decode('utf-8')
        advice_json = json.loads(advice)
        
        return jsonify({'score': score, 'advice': advice_json, 'video': encoded_video})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)
