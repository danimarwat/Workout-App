// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { workout } = route.params; // Get the passed workout data

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
        <Text style={styles.headerTitle}>{workout.name} Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {workout.exercises.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
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
    padding: 20,
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20, // Rounded corners for a better look
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
