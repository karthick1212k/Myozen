import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

export default function PatientDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerBackBtn} onPress={() => router.push('/(tabs)/DoctorAccessPortal')}>
              <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Text style={styles.patientName}>Sarah Johnson</Text>
              <Text style={styles.patientId}>ID: #PT-2024-0123</Text>
              <Text style={styles.patientAge}>32 years</Text>
            </TouchableOpacity>
            <View style={{ width: 32, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => router.push('/(tabs)/SettingsPage')}>
                <Ionicons name="settings-outline" size={22} color="#5CA6E8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Analytics */}
          <View style={styles.analyticsSection}>
            <Text style={styles.sectionTitle}>Analytics</Text>
            <View style={styles.analyticsRow}>
              {/* Pie Chart */}
              <View style={styles.analyticsCard}>
                <Text style={styles.analyticsLabel}>Session Distribution</Text>
                <Svg width={70} height={70} viewBox="0 0 32 32">
                  <G>
                    {/* Blue slice */}
                    <Path
                      d="M16 2
                        A 14 14 0 0 1 29.8 13.2
                        L 16 16
                        Z"
                      fill="#5CA6E8"
                    />
                    {/* Green slice */}
                    <Path
                      d="M29.8 13.2
                        A 14 14 0 1 1 16 2
                        L 16 16
                        Z"
                      fill="#4CAF50"
                    />
                    {/* Purple slice */}
                    <Path
                      d="M16 2
                        A 14 14 0 0 1 16 30
                        L 16 16
                        Z"
                      fill="#A259FF"
                    />
                  </G>
                </Svg>
              </View>
              {/* Bar Chart */}
              <View style={styles.analyticsCard}>
                <Text style={styles.analyticsLabel}>Weekly Progress</Text>
                <Svg width={70} height={70}>
                  <Rect x="5" y="40" width="6" height="20" fill="#5CA6E8" rx="2"/>
                  <Rect x="15" y="30" width="6" height="30" fill="#5CA6E8" rx="2"/>
                  <Rect x="25" y="20" width="6" height="40" fill="#5CA6E8" rx="2"/>
                  <Rect x="35" y="35" width="6" height="25" fill="#5CA6E8" rx="2"/>
                  <Rect x="45" y="25" width="6" height="35" fill="#5CA6E8" rx="2"/>
                </Svg>
              </View>
            </View>
          </View>

          {/* Previous Visits */}
          <View style={styles.visitsSection}>
            <View style={styles.visitsHeader}>
              <Text style={styles.sectionTitle}>Previous Visits</Text>
              <Ionicons name="chevron-down" size={18} color="#A0A0A0" />
            </View>
            <View style={styles.visitCard}>
              <View style={styles.visitRow}>
                <Text style={styles.visitDate}>Jan 15, 2024</Text>
                <Text style={styles.visitDuration}>45 min</Text>
              </View>
              <Text style={styles.visitType}>Physical Therapy</Text>
              <Text style={styles.visitDesc}>Exercises | Progress: Good</Text>
            </View>
            <View style={styles.visitCard}>
              <View style={styles.visitRow}>
                <Text style={styles.visitDate}>Jan 12, 2024</Text>
                <Text style={styles.visitDuration}>30 min</Text>
              </View>
              <Text style={styles.visitType}>Occupational Therapy</Text>
              <Text style={styles.visitDesc}>Exercises | Progress: Excellent</Text>
            </View>
            <View style={styles.visitCard}>
              <View style={styles.visitRow}>
                <Text style={styles.visitDate}>Jan 6, 2024</Text>
                <Text style={styles.visitDuration}>40 min</Text>
              </View>
              <Text style={styles.visitType}>Physical Therapy</Text>
              <Text style={styles.visitDesc}>Exercises | Progress: Fair</Text>
            </View>
          </View>
        </ScrollView>
        {/* Bottom Navigation (Updated) */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="grid-outline" size={22} color="#5CA6E8" />
            <Text style={styles.navLabel}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/(tabs)/EMGMonitor')}
          >
            <Ionicons name="pulse-outline" size={22} color="#A0A0A0" />
            <Text style={styles.navLabelInactive}>EMG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="fitness-outline" size={22} color="#A0A0A0" />
            <Text style={styles.navLabelInactive}>COMBO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/(tabs)/DevicesPage')}
          >
            <Ionicons name="laptop-outline" size={22} color="#A0A0A0" />
            <Text style={styles.navLabelInactive}>Devices</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 24,
    marginBottom: 10,
  },
  headerBackBtn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
    width: 60,
    height: 32,
  },
  backBtnText: {
    color: '#5CA6E8',
    fontSize: 15,
    marginLeft: 2,
    fontWeight: '500',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  patientId: {
    fontSize: 13,
    color: '#A0A0A0',
    marginTop: 2,
    textAlign: 'center',
  },
  patientAge: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  analyticsSection: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  visitsSection: {
    marginTop: 18,
    paddingHorizontal: 20,
  },
  visitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  visitCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  visitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visitDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  visitDuration: {
    fontSize: 13,
    color: '#666',
  },
  visitType: {
    fontSize: 13,
    color: '#5CA6E8',
    marginTop: 2,
  },
  visitDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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
  },
  navLabel: {
    fontSize: 12,
    color: '#5CA6E8',
    marginTop: 2,
  },
  navLabelInactive: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
});