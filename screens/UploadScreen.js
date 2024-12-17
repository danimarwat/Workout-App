import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import * as Animatable from 'react-native-animatable'; // For animation
import { FontAwesome } from '@expo/vector-icons'; // Icon library

const { height: screenHeight } = Dimensions.get('window');

export default function UploadScreen() {
  const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [label, setLabel] = useState(null); // State to store API label response
  const [isUploading, setIsUploading] = useState(false); // State for upload status
  const [isFirstPress, setIsFirstPress] = useState(true); // State to track first button press

  const navigation = useNavigation(); // Initialize navigation

  // Handle selecting a video from the gallery
  const handleSelectVideo = async () => {
    if (isFirstPress) {
      setIsFirstPress(false); // Mark that the button has been pressed at least once
    }

    try {
      // Request permission to access the gallery
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        setModalMessage('You need to grant permission to access the gallery!');
        setModalVisible(true);
        return;
      }

      // Launch the image picker to select a video
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 1,
      });

      if (!result.canceled) {
        const videoUri = result.assets[0].uri;
        console.log('Video selected:', videoUri);
        setSelectedVideo(videoUri); // Store the selected video URI in state
        setModalMessage('Video Selected! You can now submit the video.');
        setModalVisible(true);
      } else {
        console.log('User canceled video selection');
      }
    } catch (error) {
      console.error('Error selecting video:', error);
      setModalMessage('An unexpected error occurred while selecting the video.');
      setModalVisible(true);
    }
  };

  // Handle submitting the selected video to the server
  const handleSubmitVideo = async () => {
    if (!selectedVideo) {
      setModalMessage('Please select a video before submitting.');
      setModalVisible(true);
      return;
    }

    // Show "Uploading..." message with spinner
    setIsUploading(true);
    setModalMessage('Uploading...');

    try {
      // Prepare the video file for the API request
      const formData = new FormData();
      formData.append('file', {
        uri: selectedVideo,
        name: 'video.mp4', // Provide a name for the file
        type: 'video/mp4', // Set the content type
      });

      const apiUrl = 'https://thalapathy123-gym-exercise.hf.space/upload-video/';
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Upload Success:', response.data);
        setLabel(response.data.label); // Set the label from API response
        setModalMessage('Upload Successful!');
      } else {
        console.error('Upload Error:', response.status, response.data);
        setModalMessage(`Upload Failed! Error: ${response.status}`);
        setLabel(null); // Clear label on error
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setModalMessage('An unexpected error occurred while uploading the video.');
      setLabel(null); // Clear label on error
    } finally {
      setIsUploading(false); // Hide the spinner after the upload is complete
      setModalVisible(true); // Show the result modal
    }
  };

  // Determine label style based on success/failure
  const getLabelStyle = () => {
    if (label && label.endsWith('_correct')) {
      return { color: 'green', fontWeight: 'bold' };
    }
    return { color: 'red', fontWeight: 'bold' };
  };

  // Handle modal OK button press and navigation
  const handleModalOkPress = () => {
    console.log("Modal OK Pressed", label); // Log the label

    // Check if the label contains 'correct' or 'incorrect' by checking the suffix
    if (label && label.endsWith('_correct')) {
      // If the label is correct, navigate to the Dashboard
      setModalVisible(false); // Close modal before navigating
      navigation.navigate('Dashboard');
    } else if (label && label.endsWith('_incorrect')) {
      // If the label is incorrect, navigate to the VideoScreen and pass the video name (label)
      setModalVisible(false); // Close modal before navigating
      navigation.navigate('VideoScreen', { videoName: label });  // Pass label as the video name
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Video</Text>
      <Image
        source={require('../assets/front.png')}
        style={styles.image}
      />
      {/* Select Video Button */}
      <TouchableOpacity onPress={handleSelectVideo} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Select Video</Text>
      </TouchableOpacity>

      {/* Caution message for first time button press */}
      {isFirstPress && (
        <Text style={styles.cautionText}>Make sure your current video is 3 seconds</Text>
      )}

      {/* Submit Video Button */}
      <TouchableOpacity onPress={handleSubmitVideo} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Video</Text>
      </TouchableOpacity>

      {/* Modal for Result */}
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} animationIn="fadeIn" animationOut="fadeOut">
        <Animatable.View style={styles.modalContent} animation="zoomIn" duration={500}>
          {isUploading ? (
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size="large" color="#00695c" />
              <Text style={styles.modalText}>{modalMessage}</Text>
            </View>
          ) : label ? (
            <>
              <Text style={styles.modalTitle}>Upload Successful!</Text>
              <FontAwesome
                name={label.endsWith('_correct') ? 'check-circle' : 'times-circle'}
                size={50}
                color={label.endsWith('_correct') ? 'green' : 'red'}
                style={styles.modalIcon}
              />
              <Text style={[styles.modalLabel, getLabelStyle()]}>{label}</Text>
              {/* Show "OK" for correct or "Open" for incorrect */}
              <TouchableOpacity onPress={handleModalOkPress} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>
                  {label.endsWith('_correct') ? 'OK' : 'Open'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.modalText}>{modalMessage}</Text>
          )}
        </Animatable.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 24,
    textAlign: 'center',
  },
  image: {
    width: '80%',
    height: screenHeight / 2,
    marginBottom: 40,
  },
  uploadButton: {
    width: '80%',
    padding: 16,
    backgroundColor: '#004d40',
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    width: '80%',
    padding: 16,
    backgroundColor: '#00695c',
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cautionText: {
    color: 'white',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#004d40',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalIcon: {
    marginBottom: 15,
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
