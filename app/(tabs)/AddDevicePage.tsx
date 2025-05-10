import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // <-- Add this import

const availableDevices = [
  {
    name: 'PhysioFlex Pro',
    type: 'Therapy Device',
    status: 'connected',
    statusText: 'Connected',
    statusColor: '#4CAF50',
    action: 'Disconnect',
    actionColor: '#FF3B30',
    error: false,
  },
  {
    name: 'MotionTracker X1',
    type: 'Movement Sensor',
    status: 'disconnected',
    statusText: 'Disconnected',
    statusColor: '#A0A0A0',
    action: 'Connect',
    actionColor: '#3578E5',
    error: false,
  },
  {
    name: 'PulseMonitor Elite',
    type: 'Heart Rate Monitor',
    status: 'error',
    statusText: 'Connection Failed',
    statusColor: '#FF3B30',
    action: 'Connect',
    actionColor: '#3578E5',
    error: true,
  },
];

export default function AddDevicePage() {
  const [scanning, setScanning] = useState(false);
  const router = useRouter(); // <-- Add this line

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={() => router.push('/(tabs)/DevicesPage')}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Device</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Scan Section */}
        <View style={styles.scanSection}>
          <View style={styles.bluetoothCircle}>
            <Ionicons name="bluetooth" size={48} color="#5CA6E8" />
          </View>
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={() => setScanning(true)}
            disabled={scanning}
          >
            <Text style={styles.scanBtnText}>
              {scanning ? 'Scanning...' : 'Scan for Devices'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Available Devices */}
        <Text style={styles.availableLabel}>Available Devices</Text>
        {availableDevices.map((device, idx) => (
          <View key={idx} style={styles.deviceCard}>
            <View style={styles.deviceCardRow}>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceType}>{device.type}</Text>
                <View style={styles.statusRow}>
                  {device.status === 'connected' && (
                    <>
                      <Ionicons name="checkmark-circle" size={16} color={device.statusColor} />
                      <Text style={[styles.statusText, { color: device.statusColor }]}>
                        {device.statusText}
                      </Text>
                    </>
                  )}
                  {device.status === 'disconnected' && (
                    <>
                      <Ionicons name="ellipse-outline" size={16} color={device.statusColor} />
                      <Text style={[styles.statusText, { color: device.statusColor }]}>
                        {device.statusText}
                      </Text>
                    </>
                  )}
                  {device.status === 'error' && (
                    <>
                      <Ionicons name="alert-circle" size={16} color={device.statusColor} />
                      <Text style={[styles.statusText, { color: device.statusColor }]}>
                        {device.statusText}
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  device.action === 'Disconnect'
                    ? styles.disconnectBtn
                    : styles.connectBtn,
                  device.error && styles.errorBtn,
                ]}
              >
                <Text
                  style={[
                    styles.actionBtnText,
                    device.action === 'Disconnect'
                      ? { color: '#fff' }
                      : { color: '#3578E5' },
                  ]}
                >
                  {device.action}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  scanSection: {
    backgroundColor: '#F2F7FC',
    borderRadius: 16,
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 18,
    alignItems: 'center',
    paddingVertical: 32,
  },
  bluetoothCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E6F0FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  scanBtn: {
    backgroundColor: '#3578E5',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  scanBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  availableLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginLeft: 24,
    marginBottom: 8,
  },
  deviceCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  deviceCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceInfo: {
    flex: 1,
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusText: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionBtn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    borderWidth: 1,
  },
  connectBtn: {
    backgroundColor: '#fff',
    borderColor: '#3578E5',
  },
  disconnectBtn: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  errorBtn: {
    borderColor: '#FF3B30',
  },
  actionBtnText: {
    fontWeight: '600',
    fontSize: 14,
  },
});