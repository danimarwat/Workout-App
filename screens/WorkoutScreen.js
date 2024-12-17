import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const workoutData = [
  {
    id: '1',
    title: 'Beginners',
    icon: require('../assets/arnold1.png'),
    color: '#FFC107',
  },
  {
    id: '2',
    title: 'Intermediate',
    icon: require('../assets/arnold2.png'),
    color: '#00BCD4',
  },
  {
    id: '3',
    title: 'Advance',
    icon: require('../assets/arnold3.png'),
    color: '#FF5722',
  },
];

export default function WorkoutScreen() {
  const navigation = useNavigation();

  const handlePress = (title) => {
    if (title === 'Beginners') {
      navigation.navigate('BeginnerScreen');
    } else if (title === 'Intermediate') {
      navigation.navigate('IntermediateScreen');
    } else if (title === 'Advance') {
      navigation.navigate('AdvanceScreen');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.title)} style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>Workout Types</Text>
      </View>
      <FlatList
        data={workoutData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  appBar: {
    backgroundColor: '#004d40', // Green color
    paddingVertical: 30, // Increased padding for a larger app bar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Slightly larger margin
    borderRadius: 10,
  },
  appBarText: {
    fontSize: 32, // Increased font size for the text
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#444',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
