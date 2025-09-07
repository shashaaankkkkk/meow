import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface DashboardChartProps {
  title: string;
  type: 'line' | 'bar' | 'doughnut';
  period: string;
  isDark: boolean;
}

export function DashboardChart({ title, type, period, isDark }: DashboardChartProps) {
  const styles = createStyles(isDark);

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <View style={styles.lineChart}>
            <View style={styles.chartAxis}>
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <View key={day} style={styles.linePoint}>
                  <View style={[
                    styles.point,
                    { height: Math.random() * 60 + 20 }
                  ]} />
                </View>
              ))}
            </View>
            <View style={styles.chartLabels}>
              {period === 'Today' 
                ? ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'].map((time, index) => (
                    <Text key={index} style={styles.labelText}>{time}</Text>
                  ))
                : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <Text key={index} style={styles.labelText}>{day}</Text>
                  ))
              }
            </View>
          </View>
        );
      
      case 'bar':
        return (
          <View style={styles.barChart}>
            <View style={styles.barsContainer}>
              {[0, 1, 2, 3, 4].map((bar) => (
                <View key={bar} style={styles.barWrapper}>
                  <View style={[
                    styles.bar,
                    { 
                      height: Math.random() * 80 + 20,
                      backgroundColor: ['#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED'][bar]
                    }
                  ]} />
                </View>
              ))}
            </View>
            <View style={styles.barLabels}>
              {['B-142', 'B-205', 'B-318', 'B-451', 'B-528'].map((route, index) => (
                <Text key={index} style={styles.labelText}>{route}</Text>
              ))}
            </View>
          </View>
        );
      
      case 'doughnut':
        return (
          <View style={styles.doughnutChart}>
            <View style={styles.doughnutContainer}>
              <View style={[styles.doughnutSegment, styles.lowCrowd]} />
              <View style={[styles.doughnutSegment, styles.mediumCrowd]} />
              <View style={[styles.doughnutSegment, styles.highCrowd]} />
              <View style={styles.doughnutCenter}>
                <Text style={styles.centerText}>Crowd</Text>
                <Text style={styles.centerSubtext}>Distribution</Text>
              </View>
            </View>
            <View style={styles.doughnutLegend}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#059669' }]} />
                <Text style={styles.legendLabel}>Low (45%)</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#D97706' }]} />
                <Text style={styles.legendLabel}>Medium (35%)</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
                <Text style={styles.legendLabel}>High (20%)</Text>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {renderChart()}
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 16,
    },
    lineChart: {
      height: 120,
    },
    chartAxis: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    linePoint: {
      alignItems: 'center',
    },
    point: {
      width: 4,
      backgroundColor: '#2563EB',
      borderRadius: 2,
    },
    chartLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingHorizontal: 10,
    },
    labelText: {
      fontSize: 10,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    barChart: {
      height: 120,
    },
    barsContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    barWrapper: {
      alignItems: 'center',
      flex: 1,
    },
    bar: {
      width: 20,
      borderRadius: 10,
    },
    barLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingHorizontal: 10,
    },
    doughnutChart: {
      alignItems: 'center',
    },
    doughnutContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 20,
      borderColor: '#059669',
      position: 'relative',
      marginBottom: 16,
      transform: [{ rotate: '45deg' }],
    },
    doughnutSegment: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 20,
    },
    lowCrowd: {
      borderColor: '#059669',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
    },
    mediumCrowd: {
      borderColor: '#D97706',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      transform: [{ rotate: '162deg' }],
    },
    highCrowd: {
      borderColor: '#DC2626',
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      transform: [{ rotate: '234deg' }],
    },
    doughnutCenter: {
      position: 'absolute',
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
      borderRadius: 40,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotate: '-45deg' }],
    },
    centerText: {
      fontSize: 12,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
    },
    centerSubtext: {
      fontSize: 9,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    doughnutLegend: {
      gap: 8,
    },
    legendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    legendLabel: {
      fontSize: 12,
      color: isDark ? '#D1D5DB' : '#4B5563',
    },
  });