import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const router = useRouter();

  const handleSave = async () => {
    const profile = {
      fullName,
      username,
      email,
      phone,
      dob,
      gender,
      // You can add photo later if needed
    };
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(profile));
      Alert.alert('Success', 'Profile saved!');
      router.back(); // Go back to Settings page
    } catch (e) {
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 22 }} />
      </View>
      {/* Profile Photo */}
      <View style={styles.photoSection}>
        <View style={styles.photoWrapper}>
          <Ionicons name="person-circle-outline" size={80} color="#E0E6ED" />
          <TouchableOpacity style={styles.cameraIcon}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder="@Choose a username" value={username} onChangeText={setUsername} />
        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+1</Text>
            <Ionicons name="chevron-down" size={16} color="#A0A0A0" />
          </View>
          <TextInput style={[styles.input, { flex: 1, marginLeft: 8 }]} placeholder="Enter phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        </View>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder="MM/DD/YYYY" value={dob} onChangeText={setDob} />
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {['Male', 'Female', 'Custom', 'Prefer not to say'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.genderBtn, gender === option && styles.genderBtnActive]}
              onPress={() => setGender(option)}
            >
              <Text style={[styles.genderText, gender === option && styles.genderTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'space-between',
  },
  headerBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  backBtnText: {
    color: '#5CA6E8',
    fontSize: 15,
    marginLeft: 2,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  doneText: {
    color: '#3578E5',
    fontSize: 16,
    fontWeight: '500',
  },
  photoSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  photoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3578E5',
    borderRadius: 16,
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  changePhotoText: {
    color: '#3578E5',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: '#222',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 4,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  countryCodeText: {
    fontSize: 14,
    color: '#222',
    marginRight: 2,
  },
  genderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    marginBottom: 10,
    gap: 8,
  },
  genderBtn: {
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 8,
    marginBottom: 8,
  },
  genderBtnActive: {
    backgroundColor: '#3578E5',
  },
  genderText: {
    color: '#222',
    fontSize: 14,
    fontWeight: '500',
  },
  genderTextActive: {
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: '#3578E5',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    marginTop: 10,
    marginBottom: 24,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});