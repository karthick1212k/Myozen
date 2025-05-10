import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Switch, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Svg, { Polyline, Text as SvgText } from 'react-native-svg';
import { useRouter } from 'expo-router';
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';
import { Animated as RNAnimated } from 'react-native';

let SliderComponent;
if (Platform.OS === 'web') {
  SliderComponent = (props) => (
    <input
      type="range"
      min={props.minimumValue}
      max={props.maximumValue}
      step={props.step}
      value={props.value}
      onChange={e => props.onValueChange(Number(e.target.value))}
      style={{ width: '100%', height: 40 }}
    />
  );
} else {
  SliderComponent = require('@react-native-community/slider').default;
}

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

export default function GraphSettingsPage() {
  const router = useRouter();
  const [showGrid, setShowGrid] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState(0);
  const [lineThickness, setLineThickness] = useState(2);

  const graphTypes = [
    'Time-Domain Plot (Raw EMG Signal)',
    'Rectified EMG Plot',
    'EMG Envelope',
    'Integrated EMG (iEMG)',
  ];

  // Animation setup
  const animatedPoints = useSharedValue("0,60");

  useEffect(() => {
    // Animate the line drawing
    const pointsArray = [
      "0,60", "30,40", "60,70", "90,30", "120,60", "150,40", "180,70", "210,50"
    ];
    let i = 1;
    const interval = setInterval(() => {
      if (i <= pointsArray.length) {
        animatedPoints.value = pointsArray.slice(0, i).join(" ");
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    points: animatedPoints.value,
  }));

  // Simulated EMG data
  const [data, setData] = useState([30, 40, 60, 35, 55, 45, 60, 50, 40, 30]);
  const animationRef = useRef(null);

  // Animate the graph to move left and add new random data
  useEffect(() => {
    animationRef.current = setInterval(() => {
      setData(prev => {
        const next = prev.slice(1).concat([30 + Math.round(Math.random() * 30)]);
        return next;
      });
    }, 300);
    return () => clearInterval(animationRef.current);
  }, []);

  // Convert data to SVG points
  const getPoints = () => {
    return data.map((y, i) => {
      // 10 points, width 220, height 120, y max 60
      // X axis starts at 30 (Y axis), ends at 210
      const x = 30 + (i * 180) / (data.length - 1);
      const yCoord = 120 - (y * 100) / 60; // invert y axis
      return `${x},${yCoord}`;
    }).join(' ');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.replace('/(tabs)/SettingsPage')}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Graph Settings</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Graph Preview */}
      <View style={styles.previewBox}>
        <Text style={styles.previewLabel}>Graph Preview</Text>
        <Svg width={220} height={120} style={styles.previewSvg}>
          {/* Y Axis */}
          <Polyline points="30,10 30,110" stroke="#bbb" strokeWidth="2" />
          {/* X Axis */}
          <Polyline points="30,110 210,110" stroke="#bbb" strokeWidth="2" />
          {/* Y Axis Ticks and Labels */}
          {[30, 60, 90].map((val, idx) => {
            // Map 30, 60, 90 to y positions (higher value = higher up)
            const y = 110 - ((val - 30) * 100) / 60;
            return (
              <React.Fragment key={val}>
                <Polyline points={`25,${y} 30,${y}`} stroke="#bbb" strokeWidth="2" />
                <SvgText
                  x={10}
                  y={y + 4}
                  fontSize="10"
                  fill="#888"
                >{val}</SvgText>
              </React.Fragment>
            );
          })}
          {/* X Axis Ticks and Labels */}
          {[1,2,3,4,5,6,7,8,9,10].map((val, idx) => {
            const x = 30 + (idx * 180) / 9;
            return (
              <React.Fragment key={val}>
                <Polyline points={`${x},110 ${x},115`} stroke="#bbb" strokeWidth="2" />
                <SvgText
                  x={x - 4}
                  y={120}
                  fontSize="10"
                  fill="#888"
                >{val}</SvgText>
              </React.Fragment>
            );
          })}
          {/* Animated Line */}
          <Polyline
            points={getPoints()}
            fill="none"
            stroke="#3fa6ff"
            strokeWidth={lineThickness}
          />
        </Svg>
      </View>

      {/* Visual Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visual Settings</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Show Gridlines</Text>
            <Text style={styles.subText}>Display background grid for better readability</Text>
          </View>
          <Switch value={showGrid} onValueChange={setShowGrid} />
        </View>
      </View>

      {/* Select Graph */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Graph</Text>
        {graphTypes.map((type, idx) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.graphBtn,
              selectedGraph === idx && styles.graphBtnActive,
            ]}
            onPress={() => setSelectedGraph(idx)}
          >
            <Text style={selectedGraph === idx ? styles.graphBtnTextActive : styles.graphBtnText}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Line Thickness */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Line Thickness</Text>
        {Platform.OS === 'web' ? (
          <SliderComponent
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={6}
            step={1}
            value={lineThickness}
            onValueChange={setLineThickness}
          />
        ) : (
          <SliderComponent
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={6}
            step={1}
            value={lineThickness}
            onValueChange={setLineThickness}
            minimumTrackTintColor="#5CA6E8"
            maximumTrackTintColor="#e0e0e0"
          />
        )}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
        <Text style={styles.saveBtnText}>Save Settings</Text>
      </TouchableOpacity>
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
  headerBtnText: {
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
  previewBox: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    margin: 18,
    padding: 14,
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    fontWeight: '500',
  },
  previewSvg: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  section: {
    marginHorizontal: 18,
    marginTop: 10,
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
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    color: '#888',
  },
  graphBtn: {
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  graphBtnActive: {
    backgroundColor: '#5CA6E8',
    borderColor: '#5CA6E8',
  },
  graphBtnText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 15,
  },
  graphBtnTextActive: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: '#5CA6E8',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 18,
    marginTop: 24,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});