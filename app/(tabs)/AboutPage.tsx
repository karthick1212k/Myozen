import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AboutPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.replace('/(tabs)/SettingsPage')}>
          <Ionicons name="arrow-back-outline" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.appName}>MYOZEN</Text>
        <Text style={styles.appTagline}>Your Path to Recovery</Text>

        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#5CA6E8" style={{ marginRight: 8 }} />
          <Text style={styles.infoText}>support@rehabionics.in</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="globe-outline" size={20} color="#5CA6E8" style={{ marginRight: 8 }} />
          <Text style={styles.infoText}>www.rehabionics.in</Text>
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialIcon} onPress={() => Linking.openURL('https://linkedin.com')}>
            <FontAwesome name="linkedin-square" size={24} color="#0077B5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon} onPress={() => Linking.openURL('https://twitter.com')}>
            <FontAwesome name="twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon} onPress={() => Linking.openURL('https://facebook.com')}>
            <FontAwesome name="facebook-square" size={24} color="#1877F3" />
          </TouchableOpacity>
        </View>

        <View style={styles.versionBox}>
          <Text style={styles.versionText}>Version 2.1.0 (Build 2024.01)</Text>
          <Text style={styles.copyrightText}>© 2024 PhysioFlow. All rights reserved.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  headerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  contentBox: {
    flex: 1,
    alignItems: 'center',
    marginTop: 32,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    marginTop: 8,
  },
  appTagline: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#222',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },
  socialIcon: {
    marginHorizontal: 8,
    backgroundColor: '#F3F6FA',
    borderRadius: 20,
    padding: 6,
  },
  versionBox: {
    marginTop: 32,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  copyrightText: {
    fontSize: 12,
    color: '#A0A0A0',
  },
});