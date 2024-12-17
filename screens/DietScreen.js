import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, Alert } from 'react-native';

export default function DietScreen() {
  const [visibleForm, setVisibleForm] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    currentWeight: '',
    expectedWeight: '',
  });
  const [dietPlan, setDietPlan] = useState(null); // State to store diet plan
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const toggleForm = () => {
    setVisibleForm(!visibleForm);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async () => {
    try {
      const response = await fetch('https://a8b0-35-188-230-83.ngrok-free.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: formData.age,
          height: formData.height,
          current_weight: formData.currentWeight,
          expected_weight: formData.expectedWeight,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('Server Response:', result);
        if (response.ok) {
          setDietPlan(result); // Set the diet plan in state
          setModalVisible(true); // Show the modal
        } else {
          Alert.alert('Error', result.error || 'Something went wrong.');
        }
      } else {
        const text = await response.text();
        console.error('Non-JSON Response:', text);
        Alert.alert('Error', 'Unexpected server response: ' + text);
      }
    } catch (error) {
      console.error('Request Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Select Your Diet Plan</Text>

      <TouchableOpacity onPress={toggleForm} style={styles.button}>
        <Text style={styles.buttonText}>Get Your Diet</Text>
      </TouchableOpacity>

      {visibleForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Diet Plan Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('age', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('height', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Current Weight (kg)"
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('currentWeight', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Expected Weight (kg)"
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('expectedWeight', text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for Diet Plan */}
      {dietPlan && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Diet Plan</Text>
              <Text style={styles.modalCategory}>Category: {dietPlan.Category}</Text>
              {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
                <View key={meal} style={styles.mealContainer}>
                  <Text style={styles.mealTitle}>{meal}</Text>
                  <Text>Food: {dietPlan[meal].Food}</Text>
                  <Text>Quantity: {dietPlan[meal].Quantity}</Text>
                  <Text>Protein: {dietPlan[meal].Protein}g</Text>
                  <Text>Carbs: {dietPlan[meal].Carbs}g</Text>
                  <Text>Fats: {dietPlan[meal].Fats}g</Text>
                  <Text>Minerals: {dietPlan[meal].Minerals}g</Text>
                  <Text>Calories: {dietPlan[meal].Calories} kcal</Text>
                </View>
              ))}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#004d40',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 16,
    backgroundColor: '#004d40',
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  formHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  submitButton: {
    padding: 16,
    backgroundColor: '#00796b',
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  mealContainer: {
    marginBottom: 15,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
