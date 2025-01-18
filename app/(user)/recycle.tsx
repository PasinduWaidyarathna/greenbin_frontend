import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { UserNavigation } from '@/components/navigation/user-navigation';
import { useRouter } from 'expo-router';
import { recycleItems } from '../data/recycleItems';

interface RecycleScreenProps {
}

const RecycleScreen: React.FC<RecycleScreenProps> = ({

}) => {

    const router = useRouter(); 

    

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recycle</Text>
      </View>

      {/* Question */}
      <Text style={styles.question}>What do you want to collect ?</Text>

      {/* Grid */}
      <View style={styles.grid}>
        {recycleItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridItem}
            onPress={() => router.push({
                pathname: '/(user)/request-item',
                params: {
                    id: item.id,
                    name: item.name,
                    icon: item.icon,
                },
            })}
          >
            <View style={styles.itemContainer}>
              <MaterialCommunityIcons name={item.icon as any} size={32} color="black" />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Navigation */}
      <UserNavigation currentScreen="home" />
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  gridItem: {
    width: '33.33%',
    padding: 8,
  },
  itemContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  itemText: {
    marginTop: 8,
    fontSize: 14,
    color: '#000000',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

export default RecycleScreen;