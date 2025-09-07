import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart, TrendingUp, Users, Bus, Leaf, Clock, MapPin, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { DashboardChart } from '@/components/DashboardChart';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [animatedValue] = useState(new Animated.Value(0));

  const styles = createStyles(isDark);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const periods = ['Today', 'Week', 'Month'];

  const stats = {
    Today: {
      totalRides: 2840,
      avgWaitTime: 8,
      co2Saved: 45,
      satisfaction: 92,
    },
    Week: {
      totalRides: 18650,
      avgWaitTime: 12,
      co2Saved: 312,
      satisfaction: 89,
    },
    Month: {
      totalRides: 76420,
      avgWaitTime: 15,
      co2Saved: 1248,
      satisfaction: 87,
    },
  };

  const currentStats = stats[selectedPeriod as keyof typeof stats];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Authority Dashboard</Text>
            <Text style={styles.subtitle}>SmartTransit+ Analytics</Text>
          </View>
          
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.selectedPeriodButton,
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === period && styles.selectedPeriodButtonText,
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Key Metrics */}
        <Animated.View
          style={[
            styles.metricsGrid,
            {
              opacity: animatedValue,
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Users size={24} color="#2563EB" />
            </View>
            <Text style={styles.metricValue}>{currentStats.totalRides.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Total Rides</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#059669" />
              <Text style={styles.changeText}>+12%</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#FEF3C7' }]}>
              <Clock size={24} color="#D97706" />
            </View>
            <Text style={styles.metricValue}>{currentStats.avgWaitTime} min</Text>
            <Text style={styles.metricLabel}>Avg Wait Time</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#DC2626" />
              <Text style={[styles.changeText, { color: '#DC2626' }]}>+2 min</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#D1FAE5' }]}>
              <Leaf size={24} color="#059669" />
            </View>
            <Text style={styles.metricValue}>{currentStats.co2Saved} kg</Text>
            <Text style={styles.metricLabel}>CO₂ Saved</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#059669" />
              <Text style={styles.changeText}>+18%</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#FDE2E7' }]}>
              <BarChart size={24} color="#EC4899" />
            </View>
            <Text style={styles.metricValue}>{currentStats.satisfaction}%</Text>
            <Text style={styles.metricLabel}>Satisfaction</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#059669" />
              <Text style={styles.changeText}>+3%</Text>
            </View>
          </View>
        </Animated.View>

        {/* Charts Section */}
        <View style={styles.chartsSection}>
          <Text style={styles.sectionTitle}>Usage Analytics</Text>
          
          <DashboardChart
            title="Ridership Trends"
            type="line"
            period={selectedPeriod}
            isDark={isDark}
          />
          
          <DashboardChart
            title="Route Performance"
            type="bar"
            period={selectedPeriod}
            isDark={isDark}
          />
          
          <DashboardChart
            title="Crowd Distribution"
            type="doughnut"
            period={selectedPeriod}
            isDark={isDark}
          />
        </View>

        {/* Route Status */}
        <View style={styles.routeSection}>
          <Text style={styles.sectionTitle}>Route Status</Text>
          
          <View style={styles.routeList}>
            <View style={styles.routeItem}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeNumber}>B-142</Text>
                <Text style={styles.routeDestination}>Downtown Express</Text>
              </View>
              <View style={styles.routeStatus}>
                <View style={[styles.statusDot, { backgroundColor: '#059669' }]} />
                <Text style={styles.statusText}>On Time</Text>
              </View>
            </View>

            <View style={styles.routeItem}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeNumber}>B-205</Text>
                <Text style={styles.routeDestination}>City Center</Text>
              </View>
              <View style={styles.routeStatus}>
                <View style={[styles.statusDot, { backgroundColor: '#D97706' }]} />
                <Text style={styles.statusText}>5 min delay</Text>
              </View>
            </View>

            <View style={styles.routeItem}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeNumber}>B-318</Text>
                <Text style={styles.routeDestination}>University Route</Text>
              </View>
              <View style={styles.routeStatus}>
                <View style={[styles.statusDot, { backgroundColor: '#DC2626' }]} />
                <Text style={styles.statusText}>Major delay</Text>
              </View>
            </View>

            <View style={styles.routeItem}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeNumber}>B-451</Text>
                <Text style={styles.routeDestination}>Hospital Route</Text>
              </View>
              <View style={styles.routeStatus}>
                <View style={[styles.statusDot, { backgroundColor: '#059669' }]} />
                <Text style={styles.statusText}>On Time</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
          
          <View style={styles.alertCard}>
            <AlertTriangle size={20} color="#D97706" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>High Traffic Alert</Text>
              <Text style={styles.alertText}>
                Route B-205 experiencing heavy congestion near City Center
              </Text>
              <Text style={styles.alertTime}>2 minutes ago</Text>
            </View>
          </View>

          <View style={styles.alertCard}>
            <MapPin size={20} color="#2563EB" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>New Bus Stop Added</Text>
              <Text style={styles.alertText}>
                Tech Park North stop now operational with code TPK06
              </Text>
              <Text style={styles.alertTime}>1 hour ago</Text>
            </View>
          </View>
        </View>

        {/* Environmental Impact */}
        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>
          
          <View style={styles.impactGrid}>
            <View style={styles.impactCard}>
              <Leaf size={32} color="#059669" />
              <Text style={styles.impactValue}>1,248 kg</Text>
              <Text style={styles.impactLabel}>CO₂ Reduced</Text>
            </View>
            
            <View style={styles.impactCard}>
              <Bus size={32} color="#2563EB" />
              <Text style={styles.impactValue}>156</Text>
              <Text style={styles.impactLabel}>Cars Replaced</Text>
            </View>
          </View>
          
          <Text style={styles.impactDescription}>
            SmartTransit+ has helped reduce carbon emissions equivalent to planting 52 trees this month
          </Text>
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
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 16,
    },
    periodSelector: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 8,
      padding: 4,
    },
    periodButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
      alignItems: 'center',
    },
    selectedPeriodButton: {
      backgroundColor: '#2563EB',
    },
    periodButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    selectedPeriodButtonText: {
      color: '#FFFFFF',
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 32,
    },
    metricCard: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      width: (width - 52) / 2,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    metricIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#DBEAFE',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    metricValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    metricLabel: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
    },
    metricChange: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    changeText: {
      fontSize: 12,
      fontWeight: '500',
      color: '#059669',
    },
    chartsSection: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 16,
    },
    routeSection: {
      marginBottom: 32,
    },
    routeList: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
      overflow: 'hidden',
    },
    routeItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#E5E7EB',
    },
    routeInfo: {
      flex: 1,
    },
    routeNumber: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 2,
    },
    routeDestination: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    routeStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    statusText: {
      fontSize: 12,
      color: isDark ? '#D1D5DB' : '#4B5563',
    },
    alertsSection: {
      marginBottom: 32,
    },
    alertCard: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    alertContent: {
      flex: 1,
    },
    alertTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    alertText: {
      fontSize: 12,
      color: isDark ? '#D1D5DB' : '#4B5563',
      lineHeight: 16,
      marginBottom: 4,
    },
    alertTime: {
      fontSize: 10,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    impactSection: {
      marginBottom: 32,
    },
    impactGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    impactCard: {
      flex: 1,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    impactValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
      marginTop: 8,
      marginBottom: 4,
    },
    impactLabel: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
    },
    impactDescription: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 16,
      fontStyle: 'italic',
    },
  });