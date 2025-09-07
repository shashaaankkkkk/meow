import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QrCode, Camera, Flashlight, RotateCcw, CircleCheck as CheckCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function ScannerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);

  const styles = createStyles(isDark);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setScannedData({
        busNumber: 'B-142',
        route: 'Downtown Express',
        eta: 7,
        crowdLevel: 'Medium',
        nextStop: 'Central Bus Station',
      });
    }, 2000);
  };

  const handleReset = () => {
    setScannedData(null);
    setIsScanning(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>QR Scanner</Text>
        <Text style={styles.subtitle}>Scan bus QR code for instant info</Text>
      </View>

      {/* Scanner Area */}
      <View style={styles.scannerContainer}>
        {!scannedData ? (
          <>
            <View style={styles.scannerFrame}>
              <View style={styles.scannerOverlay}>
                <View style={styles.scannerSquare}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                  
                  {isScanning && (
                    <View style={styles.scanningLine}>
                      <Animated.View style={styles.scanLine} />
                    </View>
                  )}
                  
                  <View style={styles.scannerIcon}>
                    <QrCode size={48} color={isDark ? '#FFFFFF' : '#111827'} />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.scannerControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => setFlashEnabled(!flashEnabled)}
              >
                <Flashlight 
                  size={24} 
                  color={flashEnabled ? '#F59E0B' : (isDark ? '#9CA3AF' : '#6B7280')} 
                />
                <Text style={[
                  styles.controlText,
                  flashEnabled && { color: '#F59E0B' }
                ]}>
                  Flash
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.scanButton, isScanning && styles.scanningButton]}
                onPress={handleStartScan}
                disabled={isScanning}
              >
                <Camera size={24} color="#FFFFFF" />
                <Text style={styles.scanButtonText}>
                  {isScanning ? 'Scanning...' : 'Scan QR Code'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleReset}
              >
                <RotateCcw size={24} color={isDark ? '#9CA3AF' : '#6B7280'} />
                <Text style={styles.controlText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.resultContainer}>
            <View style={styles.successIcon}>
              <CheckCircle size={48} color="#059669" />
            </View>
            <Text style={styles.successText}>QR Code Scanned Successfully!</Text>
            
            <View style={styles.busInfoCard}>
              <View style={styles.busHeader}>
                <Text style={styles.busNumber}>{scannedData.busNumber}</Text>
                <View style={styles.etaBadge}>
                  <Text style={styles.etaText}>{scannedData.eta} min</Text>
                </View>
              </View>
              
              <Text style={styles.routeName}>{scannedData.route}</Text>
              <Text style={styles.nextStop}>Next: {scannedData.nextStop}</Text>
              
              <View style={styles.crowdSection}>
                <Text style={styles.crowdLabel}>Crowd Level:</Text>
                <View style={styles.crowdIndicator}>
                  <View style={[
                    styles.crowdDot,
                    { backgroundColor: scannedData.crowdLevel === 'Medium' ? '#D97706' : '#059669' }
                  ]} />
                  <Text style={[
                    styles.crowdText,
                    { color: scannedData.crowdLevel === 'Medium' ? '#D97706' : '#059669' }
                  ]}>
                    {scannedData.crowdLevel}
                  </Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.scanAgainButton} onPress={handleReset}>
              <Text style={styles.scanAgainText}>Scan Another Code</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>How to scan:</Text>
        <Text style={styles.instructionText}>
          1. Point your camera at the QR code on the bus
        </Text>
        <Text style={styles.instructionText}>
          2. Make sure the QR code fits within the frame
        </Text>
        <Text style={styles.instructionText}>
          3. Tap 'Scan QR Code' to get instant bus information
        </Text>
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
      padding: 20,
      alignItems: 'center',
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
      textAlign: 'center',
    },
    scannerContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    scannerFrame: {
      flex: 1,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 20,
    },
    scannerOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scannerSquare: {
      width: 250,
      height: 250,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    corner: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderColor: '#2563EB',
      borderWidth: 3,
    },
    topLeft: {
      top: 0,
      left: 0,
      borderBottomWidth: 0,
      borderRightWidth: 0,
    },
    topRight: {
      top: 0,
      right: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
    },
    bottomLeft: {
      bottom: 0,
      left: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
    },
    bottomRight: {
      bottom: 0,
      right: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
    },
    scanningLine: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    scanLine: {
      width: '100%',
      height: 2,
      backgroundColor: '#2563EB',
      position: 'absolute',
      top: '50%',
    },
    scannerIcon: {
      opacity: 0.3,
    },
    scannerControls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    controlButton: {
      alignItems: 'center',
      padding: 12,
    },
    controlText: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginTop: 4,
    },
    scanButton: {
      backgroundColor: '#2563EB',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 12,
      gap: 8,
    },
    scanningButton: {
      opacity: 0.7,
    },
    scanButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    resultContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    successIcon: {
      marginBottom: 16,
    },
    successText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#059669',
      marginBottom: 24,
      textAlign: 'center',
    },
    busInfoCard: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      width: '100%',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    busHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    busNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#111827',
    },
    etaBadge: {
      backgroundColor: '#2563EB',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    etaText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    routeName: {
      fontSize: 16,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
    },
    nextStop: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 16,
    },
    crowdSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: isDark ? '#374151' : '#E5E7EB',
      paddingTop: 16,
    },
    crowdLabel: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
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
      fontSize: 14,
      fontWeight: '600',
    },
    scanAgainButton: {
      borderWidth: 2,
      borderColor: '#2563EB',
      borderRadius: 12,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    scanAgainText: {
      color: '#2563EB',
      fontSize: 16,
      fontWeight: '600',
    },
    instructions: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      margin: 20,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    instructionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#111827',
      marginBottom: 12,
    },
    instructionText: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
      paddingLeft: 8,
    },
  });