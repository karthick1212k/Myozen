import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const devices = [
  {
    name: 'EMG Sensor Pro',
    type: 'EMG Sensor',
    icon: <Ionicons name="wifi" size={24} color="#5CA6E8" />,
    status: 'Connected',
    battery: 85,
    lastSynced: '6 min',
    connected: true,
  },
  {
    name: 'StimUnit X200',
    type: 'Stimulation Unit',
    icon: <MaterialIcons name="bolt" size={24} color="#5CA6E8" />,
    status: 'Connected',
    battery: 62,
    lastSynced: '12 min',
    connected: true,
  },
  {
    name: 'Motion Tracker PT1',
    type: 'Motion Sensor',
    icon: <Ionicons name="walk" size={24} color="#A0A0A0" />,
    status: 'Disconnected',
    battery: 45,
    lastSynced: '1 hour ago',
    connected: false,
  },
  {
    name: 'Pressure Pad Elite',
    type: 'Pressure Sensor',
    icon: <MaterialCommunityIcons name="tablet-dashboard" size={24} color="#5CA6E8" />,
    status: 'Connected',
    battery: 91,
    lastSynced: '2 min',
    connected: true,
  },
];

export default function DevicesPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={() => router.push('/(tabs)/PatientDashboard')}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Device Management</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Device Cards */}
        {devices.map((device, idx) => (
          <View key={idx} style={[styles.deviceCard, !device.connected && styles.deviceCardInactive]}>
            <View style={styles.deviceRow}>
              <View style={styles.deviceIcon}>{device.icon}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceType}>{device.type}</Text>
                <View style={styles.deviceInfoRow}>
                  <Ionicons name="checkmark-circle" size={14} color={device.connected ? "#4CAF50" : "#A0A0A0"} />
                  <Text style={[styles.deviceInfo, { color: device.connected ? "#4CAF50" : "#A0A0A0" }]}>
                    {device.status}
                  </Text>
                  <Ionicons name="battery-half" size={14} color="#A0A0A0" style={{ marginLeft: 10 }} />
                  <Text style={styles.deviceInfo}>{device.battery}%</Text>
                </View>
                <Text style={styles.lastSynced}>
                  Last synced: {device.lastSynced}
                </Text>
              </View>
              <View style={styles.statusBtnWrapper}>
                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    device.connected ? styles.statusConnected : styles.statusDisconnected,
                  ]}
                  disabled={device.connected}
                >
                  <Text style={styles.statusBtnText}>
                    {device.connected ? 'Connected' : 'Connect'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Add New Device Button */}
        <TouchableOpacity
          style={styles.addDeviceBtn}
          onPress={() => router.push('/(tabs)/AddDevicePage')}
        >
          <Ionicons name="add" size={22} color="#fff" />
          <Text style={styles.addDeviceText}>Add New Device</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/PatientDashboard')}>
          <Ionicons name="grid-outline" size={20} color="#A0A0A0" />
          <Text style={styles.navLabelInactive}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/EMGMonitor')}>
          <Ionicons name="pulse-outline" size={22} color="#A0A0A0" />
          <Text style={styles.navLabelInactive}>EMG</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="fitness-outline" size={22} color="#A0A0A0" />
            <Text style={styles.navLabelInactive}>COMBO</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="laptop-outline" size={22} color="#5CA6E8" />
          <Text style={styles.navLabel}>Devices</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18, // Add for consistency
    paddingTop: 30,        // Add for consistency
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  deviceCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  deviceCardInactive: {
    opacity: 0.6,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deviceIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  deviceType: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  deviceInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  deviceInfo: {
    fontSize: 13,
    marginLeft: 4,
    color: '#888',
  },
  lastSynced: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
  statusBtnWrapper: {
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  statusBtn: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 14,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusConnected: {
    backgroundColor: '#E8F5E9',
  },
  statusDisconnected: {
    backgroundColor: '#E3E3E3',
  },
  statusBtnText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 13,
  },
  addDeviceBtn: {
    flexDirection: 'row',
    backgroundColor: '#3578E5',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 18,
    marginTop: 28,
    marginBottom: 10,
  },
  addDeviceText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: '#5CA6E8',
    marginTop: 2,
    fontWeight: '600',
  },
  navLabelInactive: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
    fontWeight: '600',
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
});