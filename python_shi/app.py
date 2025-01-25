from flask import Flask, jsonify, request, send_file
from ball_detection import detect_ball
import os
import pandas as pd
from io import StringIO

app = Flask(__name__)

# Directory to save uploaded videos
UPLOAD_FOLDER = 'videos'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the directory exists

@app.route('/get_ball', methods=['POST'])
def get_ball():
    # Check if a file is provided in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']

    # Check if the file has a valid filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        video_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(video_path)

        db = detect_ball(video_path)

        output = StringIO()
        db.to_csv(output, index=False)
        output.seek(0)

        csv_content = output.getvalue()
        
        return jsonify({'csv': csv_content})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
