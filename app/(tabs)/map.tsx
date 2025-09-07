import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Zap, RefreshCw } from 'lucide-react-native';
import { LiveMap } from '@/components/LiveMap';
import { mockBusData } from '@/data/mockData';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedBus, setSelectedBus] = useState(mockBusData[0]);
  const [animatedValue] = useState(new Animated.Value(0));

  const styles = createStyles(isDark);

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  const handleBusSelect = (bus: typeof mockBusData[0]) => {
    setSelectedBus(bus);
  };

  const handleRefresh = () => {
    // Simulate refresh functionality
    console.log('Refreshing map data...');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Live Tracking</Text>
          <View style={styles.liveIndicator}>
            <Animated.View
              style={[
                styles.pulseDot,
                {
                  opacity: animatedValue,
                  transform: [
                    {
                      scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Text style={styles.liveText}>Real-time Updates</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <RefreshCw size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <LiveMap
          selectedBus={selectedBus}
          onBusSelect={handleBusSelect}
          isDark={isDark}
        />
      </View>

      {/* Bus Selection */}
      <View style={styles.busSelection}>
        <Text style={styles.selectionTitle}>Select Bus to Track</Text>
        <View style={styles.busOptions}>
          {mockBusData.slice(0, 3).map((bus) => (
            <TouchableOpacity
              key={bus.id}
              style={[
                styles.busOption,
                selectedBus.id === bus.id && styles.selectedBusOption,
              ]}
              onPress={() => handleBusSelect(bus)}
            >
              <Text
                style={[
                  styles.busOptionText,
                  selectedBus.id === bus.id && styles.selectedBusOptionText,
                ]}
              >
                {bus.routeNumber}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Selected Bus Info */}
      <View style={styles.busInfo}>
        <View style={styles.busInfoHeader}>
          <View style={styles.busRoute}>
            <Text style={styles.routeNumber}>{selectedBus.routeNumber}</Text>
            <Text style={styles.routeName}>{selectedBus.destination}</Text>
          </View>
          <View style={styles.eta}>
            <Text style={styles.etaNumber}>{selectedBus.eta}</Text>
            <Text style={styles.etaText}>min</Text>
          </View>
        </View>

        <View style={styles.busDetails}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text style={styles.detailText}>Next Stop: Central Station</Text>
          </View>
          <View style={styles.detailItem}>
            <Navigation size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text style={styles.detailText}>Distance: 1.2 km</Text>
          </View>
        </View>

        <View style={styles.crowdInfo}>
          <Text style={styles.crowdLabel}>Current Crowd Level</Text>
          <View style={styles.crowdIndicator}>
            <View
              style={[
                styles.crowdDot,
                {
                  backgroundColor:
                    selectedBus.crowdLevel === 'Low'
                      ? '#059669'
                      : selectedBus.crowdLevel === 'Medium'
                      ? '#D97706'
                      : '#DC2626',
                },
              ]}
            />
            <Text
              style={[
                styles.crowdText,
                {
                  color:
                    selectedBus.crowdLevel === 'Low'
                      ? '#059669'
                      : selectedBus.crowdLevel === 'Medium'
                      ? '#D97706'
                      : '#DC2626',
                },
              ]}
            >
              {selectedBus.crowdLevel}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#111827' : '#F9FAFB',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 20,
      paddingBottom: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    liveIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#059669',
      marginRight: 6,
    },
    liveText: {
      fontSize: 12,
      color: '#059669',
      fontWeight: '500',
    },
    refreshButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    mapContainer: {
      flex: 1,
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    busSelection: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    selectionTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
    },
    busOptions: {
      flexDirection: 'row',
      gap: 8,
    },
    busOption: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    selectedBusOption: {
      backgroundColor: '#2563EB',
      borderColor: '#2563EB',
    },
    busOptionText: {
      fontSize: 12,
      fontWeight: '500',
      color: isDark ? '#FFFFFF' : '#111827',
    },
    selectedBusOptionText: {
      color: '#FFFFFF',
    },
    busInfo: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
      borderBottomWidth: 0,
    },
    busInfoHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    busRoute: {
      flex: 1,
    },
    routeNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 2,
    },
    routeName: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    eta: {
      alignItems: 'center',
      backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
      borderRadius: 12,
      padding: 12,
      minWidth: 60,
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
    busDetails: {
      gap: 8,
      marginBottom: 16,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    detailText: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    crowdInfo: {
      borderTopWidth: 1,
      borderTopColor: isDark ? '#374151' : '#E5E7EB',
      paddingTop: 16,
    },
    crowdLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
    },
    crowdIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    crowdDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    crowdText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });