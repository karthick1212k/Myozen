import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  // Simple password strength check
  const getStrength = (pwd: string) => {
    if (pwd.length > 7 && /[A-Z]/.test(pwd) && /\d/.test(pwd)) return 'Strong';
    if (pwd.length > 5) return 'Medium';
    if (pwd.length > 0) return 'Weak';
    return '';
  };
  const strength = getStrength(password);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={styles.headerBtnText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set New Password</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color="#5CA6E8" />
      </View>

      {/* Lock Icon */}
      <View style={styles.iconWrapper}>
        <Ionicons name="lock-closed-outline" size={40} color="#5CA6E8" />
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Create Your New Password</Text>
      <Text style={styles.subtitle}>
        Please create a strong password to secure your account
      </Text>

      {/* New Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirm((prev) => !prev)}>
            <Ionicons
              name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Password Strength */}
      {strength ? (
        <View style={styles.strengthRow}>
          <View
            style={[
              styles.strengthBar,
              {
                backgroundColor:
                  strength === 'Strong'
                    ? '#4CAF50'
                    : strength === 'Medium'
                    ? '#FFC107'
                    : '#F44336',
              },
            ]}
          />
          <Text
            style={[
              styles.strengthText,
              {
                color:
                  strength === 'Strong'
                    ? '#4CAF50'
                    : strength === 'Medium'
                    ? '#FFC107'
                    : '#F44336',
              },
            ]}
          >
            {strength}
          </Text>
        </View>
      ) : null}

      {/* Set New Password Button */}
      <TouchableOpacity style={styles.setButton} onPress={() => router.push('/(tabs)/PasswordResetSuccess')}>
        <Text style={styles.setButtonText}>Set New Password</Text>
      </TouchableOpacity>

      {/* Info */}
      <View style={styles.infoRow}>
        <Ionicons name="shield-checkmark-outline" size={16} color="#A0A0A0" />
        <Text style={styles.infoText}>
          Your password is encrypted and securely stored
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 18,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 22,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 14,
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
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 2,
  },
  strengthBar: {
    height: 6,
    width: 80,
    borderRadius: 3,
    marginRight: 8,
  },
  strengthText: {
    fontSize: 13,
    fontWeight: '500',
  },
  setButton: {
    backgroundColor: '#5CA6E8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 10,
  },
  setButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
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