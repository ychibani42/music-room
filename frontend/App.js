/**
 * Music Room - Main Application Component
 * 
 * This is the root component of the Music Room mobile application.
 * It manages the app's navigation, state, and connects to the backend API.
 * 
 * Features:
 * - Displays list of available music rooms
 * - Tests backend connectivity with /ping endpoint
 * - Provides navigation to room details
 * - Handles error states and loading
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import axios from 'axios';

// API Configuration
// Update this URL based on your environment
const API_BASE_URL = 'http://localhost:8000';

export default function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Test backend connectivity using the /ping endpoint
   */
  const checkBackendHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ping`);
      setBackendStatus(response.data);
      return true;
    } catch (err) {
      console.error('Backend health check failed:', err);
      setBackendStatus({ message: 'Offline', status: 'error' });
      return false;
    }
  };

  /**
   * Fetch list of available music rooms from the backend
   */
  const fetchRooms = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/api/rooms/`);
      setRooms(response.data);
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
      setError('Could not connect to the backend. Make sure the API is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await checkBackendHealth();
    await fetchRooms();
  };

  /**
   * Initialize app - check backend and load rooms
   */
  useEffect(() => {
    const initializeApp = async () => {
      await checkBackendHealth();
      await fetchRooms();
    };

    initializeApp();
  }, []);

  /**
   * Render a single room card
   */
  const renderRoomCard = (room) => (
    <TouchableOpacity
      key={room.id}
      style={styles.roomCard}
      onPress={() => alert(`Room: ${room.name}\n\nFeature coming soon!`)}
    >
      <View style={styles.roomHeader}>
        <Text style={styles.roomName}>{room.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{room.member_count} members</Text>
        </View>
      </View>
      
      {room.description && (
        <Text style={styles.roomDescription}>{room.description}</Text>
      )}
      
      <View style={styles.roomFooter}>
        {room.genre && (
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>🎵 {room.genre}</Text>
          </View>
        )}
        {room.is_public && (
          <Text style={styles.publicLabel}>Public</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ExpoStatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎵 Music Room</Text>
        <Text style={styles.headerSubtitle}>Discover & Share Music Together</Text>
        
        {/* Backend Status Indicator */}
        {backendStatus && (
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              { backgroundColor: backendStatus.status === 'healthy' ? '#4CAF50' : '#F44336' }
            ]} />
            <Text style={styles.statusText}>
              Backend: {backendStatus.message}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Loading rooms...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorHint}>
              Make sure to run: docker-compose up
            </Text>
          </View>
        ) : rooms.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎼</Text>
            <Text style={styles.emptyText}>No rooms available</Text>
            <Text style={styles.emptyHint}>Pull down to refresh</Text>
          </View>
        ) : (
          <View style={styles.roomsList}>
            <Text style={styles.sectionTitle}>
              Available Rooms ({rooms.length})
            </Text>
            {rooms.map(renderRoomCard)}
          </View>
        )}
      </ScrollView>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Pull down to refresh • Tap a room to join
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: '#1e293b',
    padding: 20,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 12,
    color: '#94a3b8',
    fontSize: 14,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    color: '#f87171',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorHint: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 18,
    marginBottom: 8,
  },
  emptyHint: {
    color: '#64748b',
    fontSize: 14,
  },
  roomsList: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  roomCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  badge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  roomDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 12,
    lineHeight: 20,
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genreTag: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  genreText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  publicLabel: {
    color: '#4ade80',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#1e293b',
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  footerText: {
    color: '#64748b',
    fontSize: 12,
  },
});
