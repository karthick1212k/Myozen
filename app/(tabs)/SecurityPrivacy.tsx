import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SecurityPrivacy() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={styles.headerBtnText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security & Privacy</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity style={styles.row} onPress={() => {/* Navigate to Change Password */}}>
          <Text style={styles.text}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Data</Text>
        <TouchableOpacity style={styles.row} onPress={() => {/* Download Data logic */}}>
          <Text style={styles.text}>Download Your Data</Text>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => {/* Delete Account logic */}}>
          <Text style={[styles.text, { color: '#FF3B30' }]}>Delete Account</Text>
          <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 8,
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  headerBtnText: {
    color: '#5CA6E8',
    fontSize: 15,
    marginLeft: 2,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    textAlign: 'center',
    marginLeft: -44, // Adjust for back button width
  },
  section: {
    marginTop: 18,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    color: '#222',
  },
});
