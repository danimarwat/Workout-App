import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';  // Importing expo-av for video
import { useRoute, useNavigation } from '@react-navigation/native'; // For accessing route params and navigation

export default function VideoScreen() {
  const route = useRoute(); // Access the route object
  const navigation = useNavigation(); // Hook for navigation
  const { videoName } = route.params; // Get videoName passed from UploadScreen

  // Define the video path conditionally based on videoName
  let videoUri;

  if (videoName === 'lateral raise_incorrect') {
    videoUri = require('../assets/recommendation/lateral raise.mp4');
  } else if (videoName === 'biceps_incorrect') {
    videoUri = require('../assets/recommendation/biceps.mp4');
  } else if (videoName === 'Squat_incorrect') {
    videoUri = require('../assets/recommendation/Squat.mp4');
  } 
  else if (videoName === 'tricep pushdown_incorrect') {
    videoUri = require('../assets/recommendation/tricep pushdown.mp4');
  } else if (videoName === 'bench press_incorrect') {
    videoUri = require('../assets/recommendation/bench press.mp4');
  }
  else if (videoName === 'deadlift_incorrect') {
    videoUri = require('../assets/recommendation/deadlift.mp4');
  }
  else if (videoName === 'lat pulldown_incorrect') {
    videoUri = require('../assets/recommendation/lat pulldown.mp4');
  }
  else  {
    videoUri = require('../assets/recommendation/lat pulldown.mp4');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Video: {videoName}</Text>
      <Video
        source={videoUri} // Use the dynamic video URI to load the video
        style={styles.video}
        useNativeControls // Show native play/pause controls
        resizeMode="contain" // Maintain aspect ratio
        isLooping // Loop the video
      />
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 300, // Set the height of the video player
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#004d40',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
