import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Animated,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Clock, Users, Zap } from 'lucide-react-native';
import { BusCard } from '@/components/BusCard';
import { CrowdIndicator } from '@/components/CrowdIndicator';
import { mockBusData, mockBusStops } from '@/data/mockData';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedStop, setSelectedStop] = useState('Central Bus Station');
  const [searchQuery, setSearchQuery] = useState('');
  const [busData, setBusData] = useState(mockBusData);
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const styles = createStyles(isDark);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBusData(prevData =>
        prevData.map(bus => ({
          ...bus,
          eta: Math.max(1, bus.eta - Math.floor(Math.random() * 2)),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setBusData(mockBusData);
      setRefreshing(false);
    }, 1000);
  };

  const filteredStops = mockBusStops.filter(stop =>
    stop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.title}>SmartTransit+</Text>
          </View>
          <ThemeToggle />
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search bus stops..."
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {searchQuery && (
            <ScrollView style={styles.searchResults}>
              {filteredStops.map((stop, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.searchResultItem}
                  onPress={() => {
                    setSelectedStop(stop);
                    setSearchQuery('');
                  }}
                >
                  <MapPin size={16} color="#2563EB" />
                  <Text style={styles.searchResultText}>{stop}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Selected Stop */}
        <View style={styles.selectedStop}>
          <MapPin size={20} color="#2563EB" />
          <Text style={styles.selectedStopText}>{selectedStop}</Text>
        </View>

        {/* Live Status Indicator */}
        <View style={styles.liveStatus}>
          <View style={styles.liveIndicator}>
            <Zap size={16} color="#059669" />
            <Text style={styles.liveText}>Live Updates</Text>
          </View>
          <Text style={styles.lastUpdated}>Updated 2 sec ago</Text>
        </View>

        {/* Bus List */}
        <ScrollView
          style={styles.busList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.sectionTitle}>Upcoming Buses</Text>
          {busData.map((bus) => (
            <BusCard key={bus.id} bus={bus} />
          ))}
        </ScrollView>
      </Animated.View>
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 24,
    },
    greeting: {
      fontSize: 16,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 4,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
    },
    searchSection: {
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#111827',
    },
    searchResults: {
      maxHeight: 150,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 8,
      marginTop: 8,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    searchResultItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#E5E7EB',
    },
    searchResultText: {
      marginLeft: 8,
      fontSize: 14,
      color: isDark ? '#FFFFFF' : '#111827',
    },
    selectedStop: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    selectedStopText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#93C5FD' : '#1E40AF',
    },
    liveStatus: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    liveIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    liveText: {
      marginLeft: 6,
      fontSize: 14,
      fontWeight: '500',
      color: '#059669',
    },
    lastUpdated: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 16,
    },
    busList: {
      flex: 1,
    },
  });