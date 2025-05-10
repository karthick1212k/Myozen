import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.replace('/(tabs)/PatientDashboard')}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={styles.headerBtnText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Profile */}
      <TouchableOpacity
        style={styles.profileCard}
        onPress={() => router.push('/(tabs)/ProfilePage')}
      >
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.profileName}>Doctor</Text>
          <Text style={styles.profileEmail}>example@gmail.com</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#A0A0A0" style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>

      {/* Settings List */}
      <View style={styles.settingsList}>
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => router.push('/(tabs)/SecurityPrivacy')}
        >
          <Ionicons name="shield-checkmark-outline" size={22} color="#5CA6E8" style={styles.settingsIcon} />
          <View>
            <Text style={styles.settingsTitle}>Security & Privacy</Text>
            <Text style={styles.settingsSubtitle}>Manage your account security</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => router.push('/(tabs)/GraphSettingsPage')}
        >
          <MaterialIcons name="bar-chart" size={22} color="#5CA6E8" style={styles.settingsIcon} />
          <View>
            <Text style={styles.settingsTitle}>Graph Settings</Text>
            <Text style={styles.settingsSubtitle}>View analytics and data</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => router.push('/(tabs)/ContactSupport')}
        >
          <Ionicons name="help-circle-outline" size={22} color="#5CA6E8" style={styles.settingsIcon} />
          <View>
            <Text style={styles.settingsTitle}>Customer Support</Text>
            <Text style={styles.settingsSubtitle}>Get help with your account</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => router.push('/(tabs)/AboutPage')}
        >
          <Ionicons name="information-circle-outline" size={22} color="#5CA6E8" style={styles.settingsIcon} />
          <View>
            <Text style={styles.settingsTitle}>About</Text>
            <Text style={styles.settingsSubtitle}>App version and information</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => router.replace('/(tabs)/LoginScreen')}
      >
        <MaterialCommunityIcons name="logout" size={22} color="#F44336" style={styles.settingsIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Version */}
      <View style={styles.versionBox}>
        <Text style={styles.versionText}>Version 2.0.1</Text>
        <Text style={styles.versionSubText}>Build #2023112</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 16,
    margin: 18,
    marginBottom: 8,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  profileEmail: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  settingsList: {
    marginHorizontal: 18,
    marginTop: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  settingsIcon: {
    marginRight: 14,
  },
  settingsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  settingsSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginHorizontal: 18,
    marginTop: 18,
  },
  logoutText: {
    color: '#F44336',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 10,
  },
  versionBox: {
    alignItems: 'center',
    marginTop: 32,
  },
  versionText: {
    fontSize: 13,
    color: '#888',
  },
  versionSubText: {
    fontSize: 11,
    color: '#C0C0C0',
    marginTop: 2,
  },
});