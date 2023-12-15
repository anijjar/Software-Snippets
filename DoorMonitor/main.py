import cv2
import numpy as np
from playsound import playsound

# Play the free shop keeper door sound
def sound_bell():
    playsound('./bell/Shop-door-bell-sound.mp3')

# Load the pre-trained MobileNet SSD model and its configuration
net = cv2.dnn.readNetFromCaffe('./models/deploy.prototxt', './models/mobilenet_iter_73000.caffemodel')

# Open a connection to the webcam (usually 0 for the default camera)
cap = cv2.VideoCapture(0)

while True:
    # Read a frame from the webcam
    ret, frame = cap.read()

    # Resize the frame for faster processing (optional)
    frame = cv2.resize(frame, (300, 300))

    # Extract the height and width of the frame
    (h, w) = frame.shape[:2]

    # Preprocess the frame for the SSD model
    blob = cv2.dnn.blobFromImage(frame, 0.007843, (300, 300), 127.5)

    # Pass the preprocessed frame through the network to perform object detection
    net.setInput(blob)
    detections = net.forward()

    # Loop over the detections and draw bounding boxes around people
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.2:  # Filter out weak detections
            class_id = int(detections[0, 0, i, 1])

            # People class in the COCO dataset is 15
            if class_id == 15:
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")

                # Draw a bounding box around the person
                cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)

                # Play a sound
                sound_bell()

    # Display the frame with bounding boxes
    cv2.imshow("People Detection", frame)

    # Break the loop if 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
