import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

interface CrowdIndicatorProps {
  level: 'Low' | 'Medium' | 'High';
}

export function CrowdIndicator({ level }: CrowdIndicatorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getColor = () => {
    switch (level) {
      case 'Low':
        return '#059669';
      case 'Medium':
        return '#D97706';
      case 'High':
        return '#DC2626';
    }
  };

  const styles = createStyles(isDark, getColor());

  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>{level}</Text>
    </View>
  );
}

const createStyles = (isDark: boolean, color: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: color,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
      color: color,
    },
  });