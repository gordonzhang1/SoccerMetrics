import cv2
import csv
import pandas as pd 
from ultralytics import YOLO
# Load the YOLOv8 model


def detect_ball(vid_path):
    model = YOLO("yolov8s.pt")  # Use 'yolov8l.pt' for better accuracy

    # Open the video file
    video_path = vid_path
    cap = cv2.VideoCapture(video_path)

    detection_data = []

    # Prepare CSV file to save coordinates
    csv_filename = "csv_files/soccer_ball_coordinates.csv"
    with open(csv_filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Frame", "X1", "Y1", "X2", "Y2", "Confidence"])  # CSV Header

        frame_number = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break  # Exit if video is finished

            frame_number += 1

            # Run YOLOv8 on the frame
            results = model(frame)

            # Process detections
            for result in results:
                for box in result.boxes.data:  # YOLOv8 format: [x1, y1, x2, y2, conf, class]
                    x1, y1, x2, y2, conf, cls = box

                    if int(cls) == 32:  # Filter for "sports ball" (COCO class 32)
                        
                        detection_data.append({
                            "Frame": frame_number,
                            "X1": int(x1),
                            "Y1": int(y1),
                            "X2": int(x2),
                            "Y2": int(y2),
                            "Confidence": f"{conf:.2f}"
                        })

                        # Draw bounding box
                        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                        cv2.putText(frame, f"Soccer Ball: {conf:.2f}", (int(x1), int(y1) - 10),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

                        # Print coordinates
                        print(f"Frame {frame_number}: Soccer Ball at ({int(x1)}, {int(y1)}) -> ({int(x2)}, {int(y2)}) with confidence {conf:.2f}")

                        # Save coordinates to CSV
                        writer.writerow([frame_number, int(x1), int(y1), int(x2), int(y2), f"{conf:.2f}"])

            # Display frame (optional)
            cv2.imshow("Soccer Ball Detection", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    
    cap.release()
    cv2.destroyAllWindows()
    print(f"Coordinates saved in {csv_filename}")

    df = pd.DataFrame(detection_data)
    return df


#testing

# print(detect_ball("videos/footy_video.mp4"))