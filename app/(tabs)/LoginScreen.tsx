import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('doctor'); // temp login id
  const [password, setPassword] = useState('doctor123'); // temp password
  const [error, setError] = useState(""); // Add error state
  const router = useRouter();

  const handleLogin = () => {
    if (email === 'doctor' && password === 'doctor123') {
      setError(""); // Clear error on success
      router.push('/(tabs)/DoctorAccessPortal');
    } else {
      setError('incorrect id or password'); // Set error message
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>MYOZEN</Text>
      <Text style={styles.welcome}>Welcome back, Healthcare Professional</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.emailcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your professional email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#A0A0A0" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Message */}
      {error !== "" && (
        <Text style={{ color: 'red', marginBottom: 12, alignSelf: 'center' }}>{error}</Text>
      )}

      <TouchableOpacity onPress={() => router.push('/(tabs)/ForgotPassword')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In Securely</Text>
      </TouchableOpacity>

      <View style={styles.secureLogin}>
        <Ionicons name="lock-closed-outline" size={18} color="#A0A0A0" />
        <Text style={styles.secureLoginText}>Secure Medical Login</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 125,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5CA6E8',
    alignSelf: 'center',
    marginBottom: 12,
  },
  welcome: {
    fontSize: 15,
    color: '#333',
    alignSelf: 'center',
    marginBottom: 32,
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
  emailcontainer: {
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
  forgot: {
    color: '#5CA6E8',
    alignSelf: 'flex-end',
    marginBottom: 24,
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: '#5CA6E8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
  secureLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  secureLoginText: {
    color: '#A0A0A0',
    marginLeft: 8,
    fontSize: 14,
  },
});