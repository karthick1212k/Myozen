import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={styles.headerBtnText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconWrapper}>
        <Ionicons name="lock-closed-outline" size={36} color="#5CA6E8" />
      </View>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email address and we'll send you instructions to reset your password
      </Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Ionicons name="mail-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => router.push('/(tabs)/SetNewPassword')}
      >
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <View style={styles.signInRow}>
        <Text style={styles.signInText}>Remember your password? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="shield-checkmark-outline" size={16} color="#A0A0A0" />
        <Text style={styles.infoText}>Your information is secure and encrypted</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 18, // Match other pages
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // For symmetry
    marginBottom: 18,
  },
  headerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtnText: {
    color: '#5CA6E8',
    fontSize: 15,
    marginLeft: 2,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
    color: '#222',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222',
    backgroundColor: 'transparent',
  },
  inputIcon: {
    marginLeft: 6,
  },
  resetButton: {
    backgroundColor: '#5CA6E8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  signInText: {
    color: '#666',
    fontSize: 14,
  },
  signInLink: {
    color: '#5CA6E8',
    fontSize: 14,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  infoText: {
    color: '#A0A0A0',
    fontSize: 13,
    marginLeft: 6,
  },
});