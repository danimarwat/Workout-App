import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const workouts = {
  Monday: {
    name: 'Back Workout',
    exercises: [
      { image: require('../assets/back/10.gif'), text: 'Barbell Row - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/back/13.gif'), text: 'Seated cable row - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/back/15.gif'), text: 'Single Arm Pulldown - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/back/16.gif'), text: 'Chest Supported Row - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/back/3.gif'), text: 'Bent over rows - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/back/5.gif'), text: 'T-bar row - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/back/19.gif'), text: 'Dumbell Deadlift - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/back/7.gif'), text: 'Pull Ups - 4 Sets of 10 to 12 reps' },
    ],
  },
  Tuesday: {
    name: 'Legs Workout',
    exercises: [
      { image: require('../assets/legs/15.gif'), text: 'Squats - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/legs/8.gif'), text: 'Leg Press - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/legs/2.gif'), text: 'Standind Calf - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/legs/9.gif'), text: 'Leg Extension - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/legs/7.gif'), text: 'Inner Hamstring - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/legs/6.gif'), text: 'Dumbbell Calf - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/legs/11.gif'), text: 'Split Hamstring - 3 Sets of 12 to 15 reps' },
      { image: require('../assets/legs/4.jpg'), text: 'Seated Position - 4 Sets of 1 to 2 mins' },
    ],
  },
  Wednesday: {
    name: 'Chest Workout',
    exercises: [
      { image: require('../assets/chest/barbell-incline-bench-press.gif'), text: 'Incline benchpress - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/chest/bench.gif'), text: 'Benchpress - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/chest/chest fly.gif'), text: 'Chest flys - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/chest/decline dumbell.gif'), text: 'Decline Dumbell - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/chest/lower chest press.gif'), text: 'Lower Chest press - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/chest/lower chest dumbell.gif'), text: 'Dumbbell pullover- 5 Sets of 12 to 15 reps' },
      { image: require('../assets/chest/upper dumbell.gif'), text: 'Upper Dumbell - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/chest/upper machine.gif'), text: 'Upper Machine - 4 Sets of 10 to 12 reps' },
    ],
  },
  Thursday: {
    name: 'Arms Workout',
    exercises: [
      { image: require('../assets/arms/4.gif'), text: 'Overhead Dumbbell Tricep  - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/arms/skull crusher.gif'), text: 'Seated Skull Crusher - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/arms/spider curls.gif'), text: 'Spider Hammer Curl - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/arms/bb10.gif'), text: 'Barbell Curl - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/arms/barbell.gif'), text: 'Spider Curl - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/arms/dumbell push.gif'), text: 'Dumbell Pushback - 3 Sets of 10 to 12 reps' },
    ],
  },
  Friday: {
    name: 'Shoulder Workout',
    exercises: [
      { image: require('../assets/shoulder/15.gif'), text: 'Shoulder Press - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/shoulder/1.gif'), text: 'Back shoulder Press - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/shoulder/5.gif'), text: 'Seated Raise - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/shoulder/18.gif'), text: 'Lateral Raise - 4 Sets of 10 to 12 reps' },
      { image: require('../assets/shoulder/4.gif'), text: 'Barbell Shrugs - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/shoulder/7.gif'), text: 'RearDelt Fly - 4 Sets of 12 to 15 reps' },
      { image: require('../assets/shoulder/6.gif'), text: 'Front Dealt - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/shoulder/10.gif'), text: 'Dumbell Press - 4 Sets of 12 to 15 reps' },
    ],
  },
  Saturday: {
    name: 'Abs Workout',
    exercises: [
      { image: require('../assets/abs/crunches.gif'), text: 'Crunches - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/abs/plank.gif'), text: 'Plank - 4 Sets of 30 seconds hold' },
      { image: require('../assets/abs/leg-raise.gif'), text: 'Leg Raise - 5 Sets of 12 to 15 reps' },
      { image: require('../assets/abs/russian-twist.gif'), text: 'Russian Twist - 3 Sets of 10 to 12 reps' },
      { image: require('../assets/abs/mountain-climber.gif'), text: 'Mountain Climber - 4 Sets of 12 to 15 reps' },
    ],
  },
  Sunday: {
    name: 'Rest Day',
    exercises: [
      { image: require('../assets/rests.jpg'), text: 'Rest and recover' },
    ],
  },
};

export default function AdvanceScreen() {
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
        <Text style={styles.headerTitle}>Advance Workout</Text>
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
    backgroundColor: '#4CAF50', // Green color for the header
  },
  backIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
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
