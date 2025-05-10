import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Animated, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Polyline, Text as SvgText } from 'react-native-svg';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function EMGMonitor() {
  const router = useRouter();
  const [fullscreen, setFullscreen] = useState(false);

  // Animation for the graph
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [points, setPoints] = useState("0,80 20,60 40,90 60,40 80,100 100,30 120,90 140,60 160,110 180,50 200,100 220,40 240,90 260,60 280,110 300,50 320,80");

  useEffect(() => {
    // Simulate moving EMG data
    let frame = 0;
    const interval = setInterval(() => {
      // Generate new random points for animation
      // Ensure the first x is 40 (Y axis), last x is 320 (right axis)
      const totalPoints = 17;
      const xStart = 40;
      const xEnd = 320;
      const xStep = (xEnd - xStart) / (totalPoints - 1);
      const newPoints = Array.from({ length: totalPoints }, (_, i) => {
        const x = xStart + i * xStep;
        const y = 60 + Math.round(Math.sin((frame + i) / 2) * 40 + Math.random() * 10);
        return `${x},${y}`;
      }).join(' ');
      setPoints(newPoints);
      frame++;
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={[styles.container, fullscreen && styles.fullscreenContainer]}>
      {/* Header */}
      {!fullscreen && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => router.push('/(tabs)/PatientDashboard')}>
            <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
            <Text style={styles.headerBtnText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>EMG Monitor</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="search-outline" size={22} color="#222" style={{ marginRight: 12 }} />
            <Ionicons name="person-circle-outline" size={22} color="#222" />
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}>
        {/* Device & Controls */}
        {!fullscreen && (
          <View style={styles.deviceRow}>
            <TouchableOpacity style={styles.deviceBtn}>
              <Ionicons name="play" size={18} color="#5CA6E8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deviceBtn}>
              <Ionicons name="hardware-chip-outline" size={18} color="#5CA6E8" />
              <Text style={styles.deviceBtnText}>Devices</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deviceBtn}>
              <Ionicons name="settings-outline" size={18} color="#5CA6E8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deviceBtn}>
              <Ionicons name="options-outline" size={18} color="#5CA6E8" />
            </TouchableOpacity>
          </View>
        )}

        {/* EMG Graph with Fullscreen Button */}
        <View style={[styles.graphCard, fullscreen && styles.fullscreenGraphCard, { backgroundColor: '#232733' }]}>
          {/* Fullscreen Back Button */}
          {fullscreen && (
            <TouchableOpacity
              style={styles.fullscreenBackBtn}
              onPress={() => setFullscreen(false)}
            >
              <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
              <Text style={styles.headerBtnText}>Back</Text>
            </TouchableOpacity>
          )}
          <Svg
            height={fullscreen ? screenHeight : 200}
            width={fullscreen ? screenWidth : "100%"}
            viewBox={`0 0 340 200`}
            style={fullscreen ? { backgroundColor: "#232733" } : { backgroundColor: "#232733", borderRadius: 12 }}
          >
            {/* Grid Lines */}
            {[...Array(5)].map((_, i) => (
              <Polyline
                key={`hgrid-${i}`}
                points={`40,${30 + i * 40} 320,${30 + i * 40}`}
                fill="none"
                stroke="#44495a"
                strokeWidth="1"
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <Polyline
                key={`vgrid-${i}`}
                points={`${40 + i * 56},10 ${40 + i * 56},190`}
                fill="none"
                stroke="#44495a"
                strokeWidth="1"
              />
            ))}
            {/* Y Axis */}
            <Polyline
              points="40,10 40,190"
              fill="none"
              stroke="#888"
              strokeWidth="1.5"
            />
            {/* X Axis */}
            <Polyline
              points="40,190 320,190"
              fill="none"
              stroke="#888"
              strokeWidth="1.5"
            />

            {/* Y Axis Numbers */}
            <SvgText x={2} y={25} fontSize="12" fill="#bfc7d5">1.35</SvgText>
            <SvgText x={2} y={65} fontSize="12" fill="#bfc7d5">0.9</SvgText>
            <SvgText x={2} y={105} fontSize="12" fill="#bfc7d5">0.45</SvgText>
            <SvgText x={10} y={145} fontSize="12" fill="#bfc7d5">0</SvgText>
            <SvgText x={2} y={185} fontSize="12" fill="#bfc7d5">-0.45</SvgText>
            <SvgText x={60} y={205} fontSize="12" fill="#bfc7d5">0</SvgText>
            <SvgText x={120} y={205} fontSize="12" fill="#bfc7d5">100</SvgText>
            <SvgText x={180} y={205} fontSize="12" fill="#bfc7d5">220</SvgText>
            <SvgText x={240} y={205} fontSize="12" fill="#bfc7d5">340</SvgText>
            <SvgText x={300} y={205} fontSize="12" fill="#bfc7d5">460</SvgText>
            <SvgText x={320} y={205} fontSize="12" fill="#bfc7d5">580</SvgText>
            {/* Y Axis Label */}
            <SvgText x={-30} y={100} fontSize="12" fill="#bfc7d5" rotation="-90" textAnchor="middle">Amplitude (mV)</SvgText>
            {/* X Axis Label */}
            <SvgText x={180} y={225} fontSize="12" fill="#bfc7d5" textAnchor="middle">Time (ms)</SvgText>

            {/* EMG waveform */}
            <Polyline
              points={points}
              fill="none"
              stroke="#3fa6ff"
              strokeWidth="2"
            />
          </Svg>
          <TouchableOpacity
            style={styles.fullscreenBtn}
            onPress={() => setFullscreen(!fullscreen)}
          >
            <Ionicons name={fullscreen ? "contract-outline" : "expand-outline"} size={24} color="#bfc7d5" />
          </TouchableOpacity>
        </View>

        {/* Hide other content in fullscreen */}
        {!fullscreen && (
          <>
            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Peak Amplitude</Text>
                <Text style={styles.statValue}>2.4 mV</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Average</Text>
                <Text style={styles.statValue}>1.2 mV</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Frequency</Text>
                <Text style={styles.statValue}>120 Hz</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>00:02:45</Text>
              </View>
            </View>

            {/* Session Controls */}
            <View style={styles.sessionRow}>
              <TouchableOpacity style={styles.saveBtn}>
                <Ionicons name="save-outline" size={18} color="#5CA6E8" />
                <Text style={styles.saveBtnText}>Save Session</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.clearBtn}>
                <Ionicons name="trash-outline" size={18} color="#5CA6E8" />
                <Text style={styles.clearBtnText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.recordBtn}>
                <MaterialCommunityIcons name="record-circle" size={32} color="#F44336" />
              </TouchableOpacity>
            </View>

            {/* Patient & Session Info */}
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Patient Name</Text>
              <Text style={styles.infoValue}>John Smith</Text>
              <Text style={styles.infoLabel}>Session ID</Text>
              <Text style={styles.infoValue}>#EMG-2024-001</Text>
              <Text style={styles.infoLabel}>Date & Time</Text>
              <Text style={styles.infoValue}>January 15, 2024 - 10:30 AM</Text>
            </View>

            {/* Export/Print */}
            <View style={styles.exportRow}>
              <TouchableOpacity style={styles.exportBtn}>
                <Ionicons name="download-outline" size={18} color="#5CA6E8" />
                <Text style={styles.exportBtnText}>Export</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exportBtn}>
                <Ionicons name="print-outline" size={18} color="#5CA6E8" />
                <Text style={styles.exportBtnText}>Print</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      {/* Bottom Navigation */}
      {!fullscreen && (
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/PatientDashboard')}>
            <Ionicons name="grid-outline" size={22} color="#A0A0A0" />
            <Text style={styles.navLabelInactive}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="pulse-outline" size={22} color="#5CA6E8" />
            <Text style={styles.navLabel}>EMG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="fitness-outline" size={22} color="#A0A0A0" />
            <Text style={styles.navLabelInactive}>COMBO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/DevicesPage')}>
            <Ionicons name="laptop-outline" size={22} color="#A0A0A0" />
            <Text style={styles.navLabelInactive}>Devices</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  fullscreenContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    width: screenWidth,
    height: screenHeight,
    zIndex: 100,
  },
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
  },
  headerBtnText: {
    color: '#5CA6E8',
    fontSize: 15,
    marginLeft: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 10,
    marginBottom: 8,
  },
  deviceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  deviceBtnText: {
    marginLeft: 4,
    color: '#5CA6E8',
    fontSize: 13,
    fontWeight: '500',
  },
  graphCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 18,
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    position: 'relative',
    minHeight: 120,
    justifyContent: 'center',
  },
  fullscreenGraphCard: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight,
    borderRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    padding: 0,
    borderWidth: 0,
    zIndex: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    zIndex: 10,
  },
  fullscreenBackBtn: {
    position: 'absolute',
    top: 24,
    left: 16,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 12,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  saveBtnText: {
    color: '#5CA6E8',
    fontWeight: '600',
    marginLeft: 6,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  clearBtnText: {
    color: '#5CA6E8',
    fontWeight: '600',
    marginLeft: 6,
  },
  recordBtn: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 2,
    borderWidth: 2,
    borderColor: '#F44336',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 18,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  exportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 12,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  exportBtnText: {
    color: '#5CA6E8',
    fontWeight: '600',
    marginLeft: 6,
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