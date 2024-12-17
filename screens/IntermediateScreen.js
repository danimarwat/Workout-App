// BeginnerScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define workout data for each day
const workouts = {
  Monday: {
    name: 'Legs Workout',
    exercises: [
      { image: require('../assets/legs/1.gif'), text: 'Squats - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/legs/8.gif'), text: 'Leg Press - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/legs/5.gif'), text: 'Hamstring - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/legs/9.gif'), text: 'Leg Extension - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/legs/3.gif'), text: 'Split Squat - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/legs/12.gif'), text: 'Dumbbell Squats - 4 Sets of 10 to 12 reps' },
    ],
  },
  Tuesday: {
    name: 'Shoulder Workout',
    exercises: [
      { image: require('../assets/shoulder/15.gif'), text: 'Shoulder Press - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/shoulder/2.gif'), text: 'Arnold Press - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/shoulder/3.gif'), text: 'Front Raise - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/shoulder/18.gif'), text: 'Lateral Raise - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/shoulder/14.gif'), text: 'Weighted Shrugs - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/shoulder/13.gif'), text: 'Rear Delt Fly - 4 Sets of 12 to 15 reps' },
    ],
  },
  Wednesday: {
    name: 'Abs Workout',
    exercises: [
      { image: require('../assets/abs/crunches.gif'), text: 'Crunches - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/abs/plank.gif'), text: 'Plank - 4 Sets of 30 seconds hold' },
      { image: require('../assets/abs/leg-raise.gif'), text: 'Leg Raise - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/abs/russian-twist.gif'), text: 'Russian Twist - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/abs/mountain-climber.gif'), text: 'Mountain Climber - 4 Sets of 12 to 15 reps' },
    ],
  },
  Thursday: {
    name: 'Chest Workout',
    exercises: [
      { image: require('../assets/chest/cable flys.gif'), text: 'Cable flys - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/chest/chest dips.gif'), text: 'Chest dips - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/chest/chest press.gif'), text: 'Chest press - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/chest/compound cable.gif'), text: 'Compound cable - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/chest/barbell-incline-bench-press.gif'), text: 'Incline benchpress - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/chest/bench.gif'), text: 'Benchpress - 4 Sets of 10 to 12 reps' },
    ],
  },
  Friday: {
    name: 'Arms Workout',
    exercises: [
      { image: require('../assets/arms/pushdown.gif'), text: 'Tricep Pushdown - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/arms/lying.gif'), text: 'Barbell Skull Crusher - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/arms/spider curls.gif'), text: 'Spider Hammer Curl - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/arms/seated.gif'), text: 'Preacher Curl - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/arms/rope.gif'), text: 'Rope Pushdown - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/arms/arnold.gif'), text: 'Standing Preacher Curl - 3 Sets of 10 to 12 reps' },
    ],
  },
  Saturday: {
    name: 'Back Workout',
    exercises: [
      { image: require('../assets/back/11.gif'), text: 'Barbell Row - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/back/18.gif'), text: 'Lower Pulldown - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/back/17.gif'), text: 'Chin Up - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/back/22.gif'), text: 'V Pulldown - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/back/2.gif'), text: 'Back Machine - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/back/23.gif'), text: 'Back Extension - 4 Sets of 10 to 12 reps' },
    ],
  },
  Sunday: {
    name: 'Rest Day',
    exercises: [
      { image: require('../assets/rests.jpg'), text: 'Rest and recover' },
    ],
  },
};

export default function IntermediateScreen() {
  const navigation = useNavigation();

  const handleCardPress = (day) => {
    // Pass the workout data for the selected day
    navigation.navigate('DetailScreen', { workout: workouts[day.name] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon 
          name="arrow-back" 
          size={24} 
          color="white" 
          onPress={() => navigation.goBack()} 
          style={styles.backIcon} 
        />
        <Text style={styles.headerTitle}>Intermediate Workouts</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#444',
  },
  backIcon: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
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
