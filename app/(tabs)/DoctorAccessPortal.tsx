import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DoctorAccessPortal() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [patientId, setPatientId] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [error, setError] = useState(''); // Add error state

  const handleLogin = () => {
    if (patientId === '12345' && patientPassword === 'patient123') {
      setError('');
      router.push('/(tabs)/PatientDashboard');
    } else {
      setError('Incorrect ID or password'); // Set error message
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/LoginScreen')}>
        <Ionicons name="arrow-back-outline" size={24} color="#5CA6E8" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.iconWrapper}>
        <Ionicons name="snow-outline" size={32} color="#5CA6E8" />
      </View>
      <Text style={styles.title}>Doctor Access Portal</Text>
      <Text style={styles.subtitle}>
        Securely access patient records using their credentials
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          This portal is for authorized medical personnel only. Please ensure patient consent before accessing records.
        </Text>
      </View>

      {/* Show error message if present */}
      {error !== '' && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Patien Name</Text>
        <View style={styles.patientcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter patient's internal ID"
            autoCapitalize="none"
            value={patientId}
            onChangeText={setPatientId}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Patient Internal ID</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter patient's password"
            secureTextEntry={!showPassword}
            value={patientPassword}
            onChangeText={setPatientPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#A0A0A0" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Access Patient Account</Text>
      </TouchableOpacity>

      <Text style={styles.supportText}>
        Need assistance? Contact IT Support
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#5CA6E8',
    fontSize: 16,
    marginLeft: 4,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 18,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#F7F8FA',
    borderColor: '#5CA6E8',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 22,
  },
  infoText: {
    color: '#5CA6E8',
    fontSize: 13,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
    color: '#222',
  },
  input: {
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    color: '#222',
    flex: 1,
  },
  patientcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position:'relative',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  loginButton: {
    backgroundColor: '#5CA6E8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 6,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  supportText: {
    color: '#A0A0A0',
    alignSelf: 'center',
    fontSize: 13,
    marginTop: 8,
  },
  errorText: {
    color: '#F44336',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});