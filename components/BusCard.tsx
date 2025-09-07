import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Clock, MapPin, Users } from 'lucide-react-native';
import { CrowdIndicator } from './CrowdIndicator';

interface BusCardProps {
  bus: {
    id: string;
    routeNumber: string;
    destination: string;
    eta: number;
    crowdLevel: 'Low' | 'Medium' | 'High';
  };
}

export function BusCard({ bus }: BusCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = createStyles(isDark);

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <View style={styles.routeInfo}>
          <Text style={styles.routeNumber}>{bus.routeNumber}</Text>
          <View style={styles.destinationContainer}>
            <MapPin size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text style={styles.destination}>{bus.destination}</Text>
          </View>
        </View>
        
        <View style={styles.etaContainer}>
          <Text style={styles.etaNumber}>{bus.eta}</Text>
          <Text style={styles.etaText}>min</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.crowdSection}>
          <Users size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
          <CrowdIndicator level={bus.crowdLevel} />
        </View>
        
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    routeInfo: {
      flex: 1,
    },
    routeNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 6,
    },
    destinationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    destination: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    etaContainer: {
      backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: 'center',
      minWidth: 70,
    },
    etaNumber: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#93C5FD' : '#1E40AF',
    },
    etaText: {
      fontSize: 12,
      color: isDark ? '#93C5FD' : '#1E40AF',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    crowdSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    liveIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    liveDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#059669',
    },
    liveText: {
      fontSize: 12,
      color: '#059669',
      fontWeight: '500',
    },
  });