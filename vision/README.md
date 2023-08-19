This project takes an image from the Gates folder and runs it through an algorithm to get a filtered image that would make it easier to detect a gate underwater. The idea is to isolate parallel lines and find the euclidean distance between them. The AUV should find the middle of the distance, take its pixel position, and try to keep it center of the camera. 

Input:
![image info](./Gates/1508.jpg)

Output:
![image info](./Outputs/Output.jpg)