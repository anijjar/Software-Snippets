import numpy as np
import cv2 as cv

GATE_WIDTH = 120
GATE_HEIGHT = 60
PATH_TO_IMAGE = "./Gates/1508.jpg"

# Function to find the distance
# between parallel lines
def dist(m, b1, b2):
    return abs(b2 - b1) / ((m * m) - 1)

def main():
    # Read the original image
    img = cv.imread(PATH_TO_IMAGE, cv.IMREAD_GRAYSCALE)
    dimensions = img.shape
    print(dimensions)
    # Equalize the histogram
    equ = cv.equalizeHist(img)
    # Blur the image for better edge detection
    img_blur = cv.GaussianBlur(equ, (3,3), 0) 
    cv.imshow('Grey Histogram Blur', img_blur)
    cv.waitKey(0)

    # Apply Canny to get lines of images
    edges = cv.Canny(img_blur, 50, 150, apertureSize=3)
    cv.imshow('canny', edges)
    cv.waitKey(0)
    print("image array = ", edges)
    # grab the image dimensions
    h = edges.shape[0]
    w = edges.shape[1]
    
    # loop over the image, pixel by pixel
    kernal = [5,5]
    
    for y in range(0, h):
        for x in range(0, w):
            # skip the edge of the cameras
            if y == 0 or x == 0 or x == w or y == h:
                pass


            # if the pixel above several and below several poi
    # Find distance between two parallel lines


    cv.destroyAllWindows()

if __name__ == "__main__":
    print( cv.__version__ )
    main()