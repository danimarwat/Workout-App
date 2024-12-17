import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  LogBox,
} from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { AirbnbRating } from 'react-native-ratings'; // Install: npm install react-native-ratings

// Suppress the deprecation warning for defaultProps in function components
LogBox.ignoreLogs([
  'Warning: TapRating: Support for defaultProps will be removed from function components in a future major release.',
  'Warning: Star: Support for defaultProps will be removed from function components in a future major release.',
]);

export default function RatingScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]); // State to store fetched ratings
  const user = FIREBASE_AUTH.currentUser; // Get the logged-in user

  // Fetch ratings from Firestore
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'ratings'));
        const fetchedRatings = [];
        querySnapshot.forEach((doc) => {
          fetchedRatings.push({ id: doc.id, ...doc.data() });
        });
        setRatings(fetchedRatings);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        Alert.alert('Error', 'Failed to load ratings. Please try again.');
      }
    };

    fetchRatings();
  }, [rating]); // Re-fetch ratings whenever a new rating is submitted

  const handleRatingSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to submit a rating.');
      return;
    }
    if (!rating) {
      Alert.alert('Error', 'Please provide a rating.');
      return;
    }
    try {
      // Save rating to Firestore
      const userRatingRef = doc(FIREBASE_DB, 'ratings', user.uid);
      await setDoc(userRatingRef, {
        userId: user.uid,
        rating,
        comment,
        timestamp: new Date().toISOString(),
      });
      Alert.alert('Success', 'Your rating has been submitted.');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error', 'Failed to submit rating. Please try again.');
    }
  };

  const renderRatingItem = ({ item }) => (
    <View style={styles.ratingItem}>
      <Text style={styles.userName}>{item.userId}</Text>
      <AirbnbRating
        isDisabled
        defaultRating={item.rating}
        size={20}
        showRating={false}
      />
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate this App</Text>
      <AirbnbRating
        count={5}
        reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
        defaultRating={rating}
        size={30}
        showRating
        onFinishRating={(value) => setRating(value)} // Make stars touchable and capture rating
      />
      <TextInput
        style={styles.input}
        placeholder="Write a review..."
        placeholderTextColor="#888"
        multiline
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRatingSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>User Ratings</Text>
      <FlatList
        data={ratings}
        keyExtractor={(item) => item.id}
        renderItem={renderRatingItem}
        contentContainerStyle={styles.ratingsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginVertical: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#004d40',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  ratingsList: {
    marginTop: 10,
    paddingBottom: 10,
  },
  ratingItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
