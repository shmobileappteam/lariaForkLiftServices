import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BackHeader } from "../../src/components/common/Header";
import { Colors } from "../../src/theme/colors";
import { Spacing } from "../../src/theme/spacing";

const { width } = Dimensions.get("window");

const STEPS = [
  { id: "1", label: "Order Processed", sub: "Your fleet parts are ready", time: "10:30 AM", status: "done" },
  { id: "2", label: "Dispatched from Warehouse", sub: "North Dallas Dispatch Center", time: "11:45 AM", status: "done" },
  { id: "3", label: "In Transit", sub: "On the way to Central Logistics", time: "12:15 PM", status: "active" },
  { id: "4", label: "Out for Delivery", sub: "Peak performance incoming", time: "Pending", status: "pending" },
  { id: "5", label: "Arrival", sub: "Destination reached", time: "Pending", status: "pending" },
];

export default function TrackOrderScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Texture Background */}
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: "-45deg" }] }]} />
        ))}
      </View>

      <BackHeader title="Live Dispatch Tracker" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stylized Map View */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapGrid}>
              {Array.from({ length: 80 }).map((_, i) => (
                <View key={i} style={styles.gridSquare} />
              ))}
            </View>
            <View style={styles.routeContainer}>
              <View style={styles.routeLine} />
              <View style={[styles.marker, styles.markerStart]}>
                <MaterialCommunityIcons name="warehouse" size={16} color="#FFF" />
              </View>
              <AnimatedMarker />
              <View style={[styles.marker, styles.markerEnd]}>
                <MaterialCommunityIcons name="map-marker" size={16} color={Colors.primary} />
              </View>
            </View>
          </View>
          <View style={styles.dispatchCard}>
            <View style={styles.dispatchInfo}>
              <Text style={styles.dispatchLabel}>Estimated Arrival</Text>
              <Text style={styles.dispatchTime}>Today, 02:30 PM</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.statusText}>LIVE</Text>
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Dispatch Progress</Text>
          <View style={styles.timeline}>
            {STEPS.map((step, i) => (
              <View key={step.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[
                    styles.dot, 
                    step.status === 'done' && styles.dotDone,
                    step.status === 'active' && styles.dotActive,
                    step.status === 'pending' && styles.dotPending,
                  ]}>
                    {step.status === 'done' && <MaterialCommunityIcons name="check" size={12} color="#FFF" />}
                    {step.status === 'active' && <View style={styles.activeInnerDot} />}
                  </View>
                  {i < STEPS.length - 1 && (
                    <View style={[
                      styles.line, 
                      (step.status === 'done' || step.status === 'active') && styles.lineActive
                    ]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.stepHeader}>
                    <Text style={[
                      styles.stepLabel, 
                      step.status !== 'pending' && styles.stepLabelActive
                    ]}>{step.label}</Text>
                    <Text style={styles.stepTime}>{step.time}</Text>
                  </View>
                  <Text style={styles.stepSub}>{step.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Support Section */}
        <TouchableOpacity style={styles.supportBtn}>
          <MaterialCommunityIcons name="headset" size={22} color={Colors.primary} />
          <Text style={styles.supportText}>Contact Dispatch Center</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Simple internal component for the moving truck marker
const AnimatedMarker = () => {
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(moveAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateX = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120]
  });
  const translateY = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40]
  });

  return (
    <Animated.View style={[styles.movingMarker, { transform: [{ translateX }, { translateY }] }]}>
      <MaterialCommunityIcons name="truck-fast" size={24} color={Colors.primary} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.05 },
  stripe: { position: 'absolute', width: 1000, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { padding: 20, paddingBottom: 60 },
  mapContainer: { marginBottom: 32 },
  mapPlaceholder: {
    height: 220,
    backgroundColor: '#0A0C0E',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.1,
  },
  gridSquare: { width: width / 10, height: width / 10, borderWidth: 0.5, borderColor: '#555' },
  routeContainer: { width: 200, height: 80, position: 'relative' },
  routeLine: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderStyle: 'dashed',
    transform: [{ rotate: '-18deg' }]
  },
  marker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  markerStart: { bottom: 0, left: 0, backgroundColor: Colors.surface, borderColor: Colors.border },
  markerEnd: { top: 0, right: 0, backgroundColor: 'rgba(34,197,94,0.1)', borderColor: Colors.primary },
  movingMarker: { position: 'absolute', left: 20, bottom: 0, zIndex: 5 },
  dispatchCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    marginTop: -30,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  dispatchInfo: { flex: 1 },
  dispatchLabel: { color: Colors.textMuted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
  dispatchTime: { color: Colors.text, fontSize: 18, fontWeight: '800' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(34,197,94,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary },
  statusText: { color: Colors.primary, fontSize: 10, fontWeight: '900' },
  timelineSection: { marginTop: 20 },
  sectionTitle: { color: Colors.text, fontSize: 18, fontWeight: '800', marginBottom: 24 },
  timeline: { paddingLeft: 8 },
  timelineItem: { flexDirection: 'row', minHeight: 80 },
  timelineLeft: { alignItems: 'center', width: 24, marginRight: 20 },
  dot: { 
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 1,
    borderWidth: 2,
  },
  dotDone: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dotActive: { backgroundColor: Colors.background, borderColor: Colors.primary },
  activeInnerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  dotPending: { backgroundColor: Colors.background, borderColor: Colors.border },
  line: { width: 2, flex: 1, backgroundColor: Colors.border, marginVertical: 4 },
  lineActive: { backgroundColor: Colors.primary },
  timelineContent: { flex: 1, paddingBottom: 32 },
  stepHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  stepLabel: { fontSize: 15, fontWeight: '600', color: Colors.textMuted },
  stepLabelActive: { color: Colors.text },
  stepTime: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' },
  stepSub: { fontSize: 13, color: Colors.textMuted, lineHeight: 18 },
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  supportText: { color: Colors.text, fontSize: 15, fontWeight: '700' },
});
