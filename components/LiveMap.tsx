import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface LiveMapProps {
  selectedBus: {
    id: string;
    routeNumber: string;
    destination: string;
    eta: number;
    crowdLevel: 'Low' | 'Medium' | 'High';
  };
  onBusSelect: (bus: any) => void;
  isDark: boolean;
}

export function LiveMap({ selectedBus, onBusSelect, isDark }: LiveMapProps) {
  const [busPosition] = useState(new Animated.Value(0));

  const styles = createStyles(isDark);

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.timing(busPosition, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        })
      ).start();
    };
    animate();
  }, []);

  const busX = busPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [50, width - 100],
  });

  const busY = busPosition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [150, 100, 200],
  });

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <View style={styles.mapBackground}>
        {/* Road Lines */}
        <View style={styles.roadHorizontal1} />
        <View style={styles.roadHorizontal2} />
        <View style={styles.roadVertical1} />
        <View style={styles.roadVertical2} />
        
        {/* Bus Stops */}
        <View style={[styles.busStop, { top: 120, left: 60 }]}>
          <View style={styles.stopDot} />
          <Text style={styles.stopLabel}>Central Station</Text>
        </View>
        
        <View style={[styles.busStop, { top: 80, right: 80 }]}>
          <View style={styles.stopDot} />
          <Text style={styles.stopLabel}>City Center</Text>
        </View>
        
        <View style={[styles.busStop, { bottom: 100, left: 80 }]}>
          <View style={styles.stopDot} />
          <Text style={styles.stopLabel}>University</Text>
        </View>
        
        {/* Animated Bus */}
        <Animated.View
          style={[
            styles.busMarker,
            {
              transform: [
                { translateX: busX },
                { translateY: busY },
              ],
            },
          ]}
        >
          <View style={styles.busIcon}>
            <Text style={styles.busText}>{selectedBus.routeNumber}</Text>
          </View>
          <View style={styles.busTooltip}>
            <Text style={styles.tooltipText}>{selectedBus.eta} min</Text>
          </View>
        </Animated.View>
        
        {/* Route Path */}
        <View style={styles.routePath} />
      </View>
      
      {/* Map Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
          <Text style={styles.legendText}>Active Bus</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#059669' }]} />
          <Text style={styles.legendText}>Bus Stop</Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1F2937' : '#F3F4F6',
    },
    mapBackground: {
      flex: 1,
      position: 'relative',
      backgroundColor: isDark ? '#374151' : '#E5E7EB',
    },
    roadHorizontal1: {
      position: 'absolute',
      top: 120,
      left: 0,
      right: 0,
      height: 4,
      backgroundColor: isDark ? '#6B7280' : '#9CA3AF',
    },
    roadHorizontal2: {
      position: 'absolute',
      bottom: 100,
      left: 0,
      right: 0,
      height: 4,
      backgroundColor: isDark ? '#6B7280' : '#9CA3AF',
    },
    roadVertical1: {
      position: 'absolute',
      left: 80,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: isDark ? '#6B7280' : '#9CA3AF',
    },
    roadVertical2: {
      position: 'absolute',
      right: 80,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: isDark ? '#6B7280' : '#9CA3AF',
    },
    busStop: {
      position: 'absolute',
      alignItems: 'center',
    },
    stopDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#059669',
      marginBottom: 4,
    },
    stopLabel: {
      fontSize: 10,
      color: isDark ? '#D1D5DB' : '#374151',
      fontWeight: '500',
      textAlign: 'center',
    },
    busMarker: {
      position: 'absolute',
      alignItems: 'center',
    },
    busIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#2563EB',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    busText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: 'bold',
    },
    busTooltip: {
      backgroundColor: isDark ? '#111827' : '#FFFFFF',
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginTop: 4,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#D1D5DB',
    },
    tooltipText: {
      fontSize: 10,
      color: isDark ? '#FFFFFF' : '#111827',
      fontWeight: '500',
    },
    routePath: {
      position: 'absolute',
      top: 122,
      left: 80,
      right: 80,
      height: 2,
      backgroundColor: '#2563EB',
      opacity: 0.6,
    },
    legend: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      gap: 24,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: isDark ? '#374151' : '#E5E7EB',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendText: {
      fontSize: 12,
      color: isDark ? '#D1D5DB' : '#4B5563',
    },
  });