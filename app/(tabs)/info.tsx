import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, MessageCircle, Users, Info, ExternalLink } from 'lucide-react-native';

export default function InfoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = createStyles(isDark);

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleSMS = (number: string) => {
    Linking.openURL(`sms:${number}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SMS & IVR Info</Text>
          <Text style={styles.subtitle}>
            Access bus information without a smartphone
          </Text>
        </View>

        {/* SMS Service */}
        <View style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            <MessageCircle size={24} color="#2563EB" />
            <Text style={styles.serviceTitle}>SMS Service</Text>
          </View>
          
          <Text style={styles.serviceDescription}>
            Send an SMS to get real-time bus information directly to your phone
          </Text>
          
          <View style={styles.instructionBlock}>
            <Text style={styles.instructionTitle}>How to use:</Text>
            <Text style={styles.instructionText}>
              1. Send SMS to: <Text style={styles.highlight}>9876543210</Text>
            </Text>
            <Text style={styles.instructionText}>
              2. Format: <Text style={styles.highlight}>BUS [STOP CODE]</Text>
            </Text>
            <Text style={styles.instructionText}>
              3. Example: <Text style={styles.highlight}>BUS CBS01</Text>
            </Text>
          </View>

          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Sample Response:</Text>
            <Text style={styles.exampleText}>
              "Central Bus Station: B-142 arrives in 5 min (Low crowd), B-205 arrives in 12 min (Medium crowd)"
            </Text>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSMS('9876543210')}
          >
            <MessageCircle size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Send SMS</Text>
          </TouchableOpacity>
        </View>

        {/* IVR Service */}
        <View style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            <Phone size={24} color="#059669" />
            <Text style={styles.serviceTitle}>IVR Service</Text>
          </View>
          
          <Text style={styles.serviceDescription}>
            Call our automated system to hear bus timings and updates
          </Text>
          
          <View style={styles.instructionBlock}>
            <Text style={styles.instructionTitle}>How to use:</Text>
            <Text style={styles.instructionText}>
              1. Dial: <Text style={styles.highlight}>1800-BUS-INFO</Text>
            </Text>
            <Text style={styles.instructionText}>
              2. Follow voice prompts
            </Text>
            <Text style={styles.instructionText}>
              3. Enter your bus stop code when asked
            </Text>
          </View>

          <View style={styles.menuBox}>
            <Text style={styles.menuTitle}>IVR Menu Options:</Text>
            <Text style={styles.menuItem}>Press 1 - Bus timings</Text>
            <Text style={styles.menuItem}>Press 2 - Route information</Text>
            <Text style={styles.menuItem}>Press 3 - Service updates</Text>
            <Text style={styles.menuItem}>Press 9 - Repeat menu</Text>
            <Text style={styles.menuItem}>Press 0 - Speak to operator</Text>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#059669' }]}
            onPress={() => handleCall('18002874636')}
          >
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Call IVR</Text>
          </TouchableOpacity>
        </View>

        {/* Stop Codes */}
        <View style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            <Info size={24} color="#D97706" />
            <Text style={styles.serviceTitle}>Bus Stop Codes</Text>
          </View>
          
          <Text style={styles.serviceDescription}>
            Use these codes when sending SMS or calling IVR
          </Text>
          
          <View style={styles.codeList}>
            <View style={styles.codeItem}>
              <Text style={styles.stopName}>Central Bus Station</Text>
              <Text style={styles.stopCode}>CBS01</Text>
            </View>
            <View style={styles.codeItem}>
              <Text style={styles.stopName}>Railway Station</Text>
              <Text style={styles.stopCode}>RWS02</Text>
            </View>
            <View style={styles.codeItem}>
              <Text style={styles.stopName}>City Hospital</Text>
              <Text style={styles.stopCode}>CHO03</Text>
            </View>
            <View style={styles.codeItem}>
              <Text style={styles.stopName}>Government College</Text>
              <Text style={styles.stopCode}>GCL04</Text>
            </View>
            <View style={styles.codeItem}>
              <Text style={styles.stopName}>Market Square</Text>
              <Text style={styles.stopCode}>MSQ05</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#D97706' }]}
          >
            <ExternalLink size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>View All Codes</Text>
          </TouchableOpacity>
        </View>

        {/* Accessibility Info */}
        <View style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            <Users size={24} color="#7C3AED" />
            <Text style={styles.serviceTitle}>Accessibility Features</Text>
          </View>
          
          <Text style={styles.serviceDescription}>
            SmartTransit+ is designed to be inclusive for all users
          </Text>
          
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>
              • Voice-guided IVR system in local languages
            </Text>
            <Text style={styles.featureItem}>
              • Large text SMS responses for easy reading
            </Text>
            <Text style={styles.featureItem}>
              • Simple, memorable stop codes
            </Text>
            <Text style={styles.featureItem}>
              • 24/7 operator assistance available
            </Text>
            <Text style={styles.featureItem}>
              • Free service for all users
            </Text>
          </View>
        </View>

        {/* Support */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportText}>
            Contact our support team for assistance with SMS or IVR services
          </Text>
          
          <View style={styles.supportButtons}>
            <TouchableOpacity
              style={styles.supportButton}
              onPress={() => handleCall('18001234567')}
            >
              <Phone size={18} color="#2563EB" />
              <Text style={styles.supportButtonText}>Call Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.supportButton}
              onPress={() => handleSMS('9876543211')}
            >
              <MessageCircle size={18} color="#2563EB" />
              <Text style={styles.supportButtonText}>SMS Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#111827' : '#F9FAFB',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 24,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 20,
    },
    serviceCard: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    serviceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    serviceTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginLeft: 12,
    },
    serviceDescription: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 16,
      lineHeight: 20,
    },
    instructionBlock: {
      backgroundColor: isDark ? '#374151' : '#F3F4F6',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    instructionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 8,
    },
    instructionText: {
      fontSize: 14,
      color: isDark ? '#D1D5DB' : '#4B5563',
      marginBottom: 4,
      lineHeight: 20,
    },
    highlight: {
      fontWeight: '600',
      color: '#2563EB',
    },
    exampleBox: {
      backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    exampleTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: isDark ? '#93C5FD' : '#1E40AF',
      marginBottom: 8,
    },
    exampleText: {
      fontSize: 13,
      color: isDark ? '#DBEAFE' : '#1E40AF',
      lineHeight: 18,
      fontStyle: 'italic',
    },
    menuBox: {
      backgroundColor: isDark ? '#065F46' : '#D1FAE5',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    menuTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#6EE7B7' : '#047857',
      marginBottom: 8,
    },
    menuItem: {
      fontSize: 13,
      color: isDark ? '#A7F3D0' : '#047857',
      marginBottom: 4,
      lineHeight: 18,
    },
    actionButton: {
      backgroundColor: '#2563EB',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      gap: 8,
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    codeList: {
      gap: 12,
      marginBottom: 16,
    },
    codeItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: isDark ? '#374151' : '#F9FAFB',
      borderRadius: 6,
    },
    stopName: {
      fontSize: 14,
      color: isDark ? '#FFFFFF' : '#111827',
    },
    stopCode: {
      fontSize: 14,
      fontWeight: '600',
      color: '#D97706',
    },
    featureList: {
      gap: 8,
    },
    featureItem: {
      fontSize: 14,
      color: isDark ? '#D1D5DB' : '#4B5563',
      lineHeight: 20,
    },
    supportSection: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
      alignItems: 'center',
    },
    supportTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 8,
    },
    supportText: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 20,
    },
    supportButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    supportButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#2563EB',
      gap: 6,
    },
    supportButtonText: {
      color: '#2563EB',
      fontSize: 14,
      fontWeight: '500',
    },
  });