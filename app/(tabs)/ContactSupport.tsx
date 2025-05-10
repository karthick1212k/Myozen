import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ContactSupport() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.replace('/(tabs)/SettingsPage')}>
          <Ionicons name="arrow-back-outline" size={22} color="#5CA6E8" />
          <Text style={{ color: "#5CA6E8", fontSize: 15, marginLeft: 2 }}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.heading}>How can we help you today?</Text>
        <Text style={styles.subheading}>Choose your preferred way to get support</Text>

        {/* Call Us Card */}
        <View style={styles.card}>
          <View style={styles.cardIconBox}>
            <Ionicons name="call-outline" size={28} color="#5CA6E8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Call Us</Text>
            <Text style={styles.cardDesc}>Talk to our support team</Text>
            <Text style={styles.cardInfo}>+1 (800) 123-4567</Text>
            <Text style={styles.cardInfoSmall}>Available Mon-Fri, 9 AM - 6 PM EST</Text>
          </View>
        </View>

        {/* Email Support Card */}
        <View style={styles.card}>
          <View style={styles.cardIconBox}>
            <MaterialIcons name="email" size={28} color="#B86AD9" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Email Support</Text>
            <Text style={styles.cardDesc}>Get help via email</Text>
            <Text style={styles.cardInfo}>support@rehabionics.in</Text>
            <Text style={styles.cardInfoSmall}>We typically respond within 24 hours</Text>
          </View>
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
    margin: 18,
    marginTop: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: '#888',
    marginBottom: 18,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
    marginBottom: 2,
  },
  cardInfoSmall: {
    fontSize: 12,
    color: '#A0A0A0',
  },
});