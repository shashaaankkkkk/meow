import React from 'react';
import { TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';

export function ThemeToggle() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = createStyles(isDark);

  return (
    <TouchableOpacity style={styles.container}>
      {isDark ? (
        <Sun size={24} color="#F59E0B" />
      ) : (
        <Moon size={24} color="#6366F1" />
      )}
    </TouchableOpacity>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
  });