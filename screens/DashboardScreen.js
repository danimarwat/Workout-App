import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';

// Get device dimensions
const { width: screenWidth } = Dimensions.get('window');

// Replace these placeholders with your actual image imports
const motivationalImages = [
  require('../assets/motivation1.jpg'), // Replace with your images
  require('../assets/motivation2.jpg'),
  require('../assets/motivation3.jpg'),
  require('../assets/motivation5.jpg'),
  require('../assets/motivation6.jpg'),
];

// Replace these with the actual images/icons for each button
const buttonIcons = {
  angleDetector: require('../assets/pose.png'), // Replace with uploaded bodybuilder image
  workoutPlans: require('../assets/healthy.png'), // Replace with a workout-related image
  dietPlan: require('../assets/gym.png'), // Replace with a diet-related image
  rating: require('../assets/rating.png'), // Replace with a rating/star image
};

export default function DashboardScreen({ navigation }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null);

  // Automatically move the slider every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === motivationalImages.length - 1 ? 0 : prevIndex + 1
      );
      if (sliderRef.current) {
        sliderRef.current.scrollToIndex({
          index: currentImageIndex === motivationalImages.length - 1 ? 0 : currentImageIndex + 1,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const buttons = [
    {
      title: 'Angle Detector',
      icon: buttonIcons.angleDetector,
      onPress: () => navigation.navigate('Upload'),
    },
    {
      title: 'Workout Plans',
      icon: buttonIcons.workoutPlans,
      onPress: () => navigation.navigate('Workout'),
    },
    {
      title: 'Diet Plan',
      icon: buttonIcons.dietPlan,
      onPress: () => navigation.navigate('Diet'),
    },
    {
      title: 'Rating',
      icon: buttonIcons.rating,
      onPress: () => navigation.navigate('Rating'),
    },
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Dashboard Title */}
      <Text style={styles.title}>Welcome to Your Fitness Journey</Text>

      {/* Motivational Image Slider */}
      <FlatList
        ref={sliderRef}
        data={motivationalImages}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Image source={item} style={styles.sliderImage} />}
        style={styles.sliderContainer}
        pagingEnabled
      />

      {/* First Row: Angle Detector and Workout Plans */}
      <View style={styles.row}>
        {buttons.slice(0, 2).map((button, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={button.onPress}>
            <Image source={button.icon} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Second Row: Diet Plan and Rating */}
      <View style={styles.row}>
        {buttons.slice(2).map((button, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={button.onPress}>
            <Image source={button.icon} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background color
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderImage: {
    width: screenWidth,
    height: 200,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    width: 140,
    height: 140,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  logoutButtonText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
