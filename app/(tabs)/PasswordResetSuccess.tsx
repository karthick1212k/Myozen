import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PasswordResetSuccess() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={styles.headerBtnText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
        <View style={{ width: 24 }} /> {/* Placeholder for symmetry */}
      </View>
      <View style={styles.iconWrapper}>
        <View style={styles.circle}>
          <Ionicons name="checkmark" size={48} color="#4CAF50" />
        </View>
      </View>
      <Text style={styles.title}>Password Reset Successful!</Text>
      <Text style={styles.subtitle}>
        Your password has been updated.{"\n"}
        You can now log in with your new password.
      </Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/(tabs)/LoginScreen')}>
        <Text style={styles.loginButtonText}>Go to Login</Text>
      </TouchableOpacity>
      <View style={styles.loaderWrapper}>
        <Ionicons name="ellipse-outline" size={24} color="#E5E5E5" />
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
    marginBottom: 24,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'center',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 28,
    textAlign: 'center',
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
    fontSize: 16,
  },
  loaderWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
});