import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define workout data for each day
const workouts = {
  Monday: {
    name: 'Chest Workout',
    exercises: [
      { image: require('../assets/barbell-decline-bench-press.gif'), text: 'Barbell Decline Bench Press - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/barbell-incline-bench-press.gif'), text: 'Barbell Incline Bench Press - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/bench.gif'), text: 'Bench Press - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/cable.webp'), text: 'Cable Fly - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/Close grip bench press.gif'), text: 'Close Grip Bench Press - 3 Sets of 10 to 12 reps' },
    ],
  },
  Tuesday: {
    name: 'Back Workout',
    exercises: [
      { image: require('../assets/deadlift.gif'), text: 'Deadlift - 4 Sets of 8 to 12 reps' },
      { image: require('../assets/pull-up.gif'), text: 'Pull Up - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/rows.gif'), text: 'Rows - 4 Sets of 12 reps' },
      { image: require('../assets/lat-pulldown.gif'), text: 'Lat Pulldown - 4 Sets of 12 reps' },
      { image: require('../assets/face-pull.gif'), text: 'Face Pull - 3 Sets of 12 to 15 reps' },
    ],
  },
  Wednesday: {
    name: 'Arms Workout',
    exercises: [
      { image: require('../assets/bicep-curl.gif'), text: 'Bicep Curl - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/tricep-extension.gif'), text: 'Tricep Extension - 4 Sets of 12 reps' },
      { image: require('../assets/hammer-curl.gif'), text: 'Hammer Curl - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/tricep-dips.gif'), text: 'Tricep Dips - 4 Sets of 12 reps' },
      { image: require('../assets/concentration-curl.gif'), text: 'Concentration Curl - 3 Sets of 12 to 15 reps' },
    ],
  },
  Thursday: {
    name: 'Shoulder Workout',
    exercises: [
      { image: require('../assets/shoulder-press.gif'), text: 'Shoulder Press - 4 Sets of 8 to 12 reps' },
      { image: require('../assets/lateral-raise.gif'), text: 'Lateral Raise - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/front-raise.gif'), text: 'Front Raise - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/rear-delt-fly.webp'), text: 'Rear Delt Fly - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/upright-row.gif'), text: 'Upright Row - 4 Sets of 8 to 12 reps' },
    ],
  },
  Friday: {
    name: 'Abs Workout',
    exercises: [
      { image: require('../assets/crunches.gif'), text: 'Crunches - 4 Sets of 20 reps' },
      { image: require('../assets/plank.gif'), text: 'Plank - 3 Sets of 30 to 60 seconds' },
      { image: require('../assets/leg-raise.gif'), text: 'Leg Raise - 3 Sets of 15 to 20 reps' },
      { image: require('../assets/russian-twist.gif'), text: 'Russian Twist - 4 Sets of 20 twists (10 each side)' },
      { image: require('../assets/mountain-climber.gif'), text: 'Mountain Climber - 4 Sets of 30 seconds' },
    ],
  },
  Saturday: {
    name: 'Legs Workout',
    exercises: [
      { image: require('../assets/squats.gif'), text: 'Squats - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/lunges.gif'), text: 'Lunges - 3 Sets of 10 reps per leg' },
      { image: require('../assets/leg-press.gif'), text: 'Leg Press - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/calf-raise.gif'), text: 'Calf Raise - 4 Sets of 15 to 20 reps' },
      { image: require('../assets/leg-curl.gif'), text: 'Leg Curl - 3 Sets of 12 to 15 reps' },
    ],
  },
  Sunday: {
    name: 'Rest Day',
    exercises: [
      { image: require('../assets/rests.jpg'), text: 'Rest and recover' },
    ],
  },
};

export default function BeginnerScreen() {
  const navigation = useNavigation();

  const handleCardPress = (day) => {
    navigation.navigate('DetailScreen', { workout: workouts[day.name] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Icon 
          name="arrow-back" 
          size={24} 
          color="white" 
          onPress={() => navigation.goBack()} 
          style={styles.backIcon} 
        />
        <Text style={styles.appBarText}>Beginner Workouts</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardsContainer}>
          {Object.keys(workouts).map((day, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress({ name: day })}>
              <Image source={workouts[day].exercises[0].image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{day}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green color for the app bar
    paddingVertical: 20, // Increase the height of the app bar
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  backIcon: {
    marginRight: 16,
  },
  appBarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    paddingVertical: 20,
  },
  cardsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#444',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    width: '90%',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
