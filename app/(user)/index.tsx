import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth-context';
import { UserNavigation } from '@/components/navigation/user-navigation';

interface HomeScreenProps {
  userName: string;
  onPickupLocations?: () => void;
  // onRecycle?: () => void;
  onLearn?: () => void;
  onNews?: () => void;
  onSendEmail?: () => void;
  onCallNow?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  // userName,
  onPickupLocations,
  // onRecycle,
  onLearn,
  onNews,
  onSendEmail,
  onCallNow,
}) => {

    const router = useRouter();
    const { user, role } = useAuth();
    const [hasMounted, setHasMounted] = useState(false);
  
    useEffect(() => {
      setHasMounted(true);
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userName}>{user?.email?.split("@")[0] ?? ""}</Text>
          </View>
          <TouchableOpacity>
            <Feather name="bell" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroSubtitle}>Don't throw away,</Text>
            <Text style={styles.heroSubtitle}>recycle for another day</Text>
            <Text style={styles.heroTitle}>Recycle with us</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Let's start</Text>
            </TouchableOpacity>
          </View>
          <Image
            //source={require('favicon.png')}
            style={styles.heroImage}
          />
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuItem} onPress={onPickupLocations}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="map-marker-outline" size={35} color="#4CAF50" />
            </View>
            <Text style={styles.menuText}>Pickup Locations</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(user)/recycle")}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="recycle" size={35} color="#4CAF50" />
            </View>
            <Text style={styles.menuText}>Recycle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onLearn}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="book-open-variant" size={35} color="#4CAF50" />
            </View>
            <Text style={styles.menuText}>Learn</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onNews}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="newspaper" size={35} color="#4CAF50" />
            </View>
            <Text style={styles.menuText}>News</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Us</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.emailButton} onPress={onSendEmail}>
              <MaterialCommunityIcons name="email-outline" size={20} color="black" />
              <Text style={styles.contactButtonText}>Send Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.callButton} onPress={onCallNow}>
              <MaterialCommunityIcons name="phone" size={20} color="black" />
              <Text style={styles.contactButtonText}>Call Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <UserNavigation 
        currentScreen="home"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingTop: 28,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  heroCard: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
  heroImage: {
    width: 120,
    height: 120,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  menuItem: {
    width: '50%',
    padding: 8,
  },
  menuIconContainer: {
    backgroundColor: '#FFF',
    height: 100,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#000',
  },
  contactSection: {
    padding: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  emailButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    color: '#000',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#4CAF50',
  },
  navTextInactive: {
    color: '#999',
  },
});

export default HomeScreen;