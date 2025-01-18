import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { UserNavigation } from '@/components/navigation/user-navigation';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CompanyType } from '../data/companyData';
import { bankData, BankType } from '../data/bankData';
import { requestService } from '@/services/requestService';
import { useAuth } from '@/context/auth-context';

// Get screen dimensions
const { width } = Dimensions.get('window');
const PADDING = 16;
const CARD_WIDTH = width - (PADDING * 2);

interface RequestItemProps {
}

const RequestItem: React.FC<RequestItemProps> = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [locationID, setLocationID] = useState<string | null>(null);
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(5);
  const [formData, setFormData] = useState({
    companyName: 'Cleantech (Pvt) Ltd',
    companyAddress: ' ',
    beneficiaryName: '',
    bank: '',
    accountNo: '',
    type: params.name,
  });

  const PRICE_PER_KG = 250.00;

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => increment ? prev + 1 : Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };


  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectCompany = (company: CompanyType) => {
    setSelectedCompany(company);
    setIsModalVisible(false);
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Company Name</Text>
          <TouchableOpacity style={styles.select}>
            <Text style={styles.selectText}>Cleantech (Pvt) Ltd</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          <Text style={styles.label}>Company Address</Text>
          <TouchableOpacity style={styles.select}  
            // onPress={() =>  // go to maps to select address
          >
            <Text style={styles.selectText}>Select Company address</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          <Text style={styles.label}>Garbage Special type</Text>
          <View style={styles.disabledInput}>
            <Text>{params.name}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const [selectedBank, setSelectedBank] = useState<BankType | null>(null);
  const [isBankModalVisible, setBankIsModalVisible] = useState(false);

  const handleSelectBank = (Bank: BankType) => {
    setSelectedBank(Bank);
    setBankIsModalVisible(false);
  };

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Beneficiary Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={formData.beneficiaryName}
            onChangeText={(text) => setFormData({ ...formData, beneficiaryName: text })}
          />
          <View>
            <Text style={styles.label}>Bank Name</Text>
            <TouchableOpacity style={styles.select} onPress={() => setBankIsModalVisible(true)}>
              <Text style={styles.selectText}>
                {selectedBank ? selectedBank.name : "Select a Bank"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            <Modal
              transparent={true}
              visible={isBankModalVisible}
              animationType="fade"
              onRequestClose={() => setBankIsModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={bankData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => handleSelectBank(item)}
                      >
                        <Text style={styles.modalItemText}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setBankIsModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <Text style={styles.label}>Account No.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter account no."
            value={formData.accountNo}
            onChangeText={(text) => setFormData({ ...formData, accountNo: text })}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


    // Function to validate the form data
  const validateForm = () => {
    const { companyName, beneficiaryName, bank, accountNo } = formData;

    // Check for empty fields
    if (!companyName || !beneficiaryName || !bank || !accountNo) {
      return false;
    }


    // Additional validations (e.g., account number format, etc.) can go here
    // Example: Check if the account number is valid (e.g., a number)
    if (!/^\d+$/.test(accountNo)) {
      return false; // Invalid account number
    }

    return true; // All fields are valid
  };

  const handleSubmit = async () => {
    try {

      const type = Array.isArray(params.name) ? params.name[0] : params.name;
      console.log('Type:', type); 

      // Create the request
      await requestService.createRequest(
        user?.email ?? '',
        locationID ?? '',
        quantity,
        quantity * PRICE_PER_KG,
        formData.bank,
        formData.accountNo,
        formData.beneficiaryName,
        type
      );

      // Move to success step
      router.push('/(user)/requests')
    } catch (error) {
      console.error('Error submitting request:', error);
      // Handle error appropriately
      alert('Failed to submit request. Please try again.');
    }
  }

  const renderStep3 = () => {
    // Validate form before showing the success message
    if (validateForm()) {
      return (
        <View style={styles.successContainer}>
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Click Submit to Submit Request</Text>
          </View>
          <TouchableOpacity style={styles.okButton} onPress={handleSubmit}>
            <Text style={styles.okButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // If form is not valid, show an error message (optional)
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Please fill in all the required fields correctly.</Text>
          <TouchableOpacity style={styles.okButton} onPress={() => setStep(1)}>
            <Text style={styles.okButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  useEffect(() => {
      // Set default values
      setFormData({
        ...formData,
        companyName: selectedCompany?.name ?? '',
        companyAddress: selectedCompany?.address ?? '',
      });      
  }, [selectedCompany]);

  useEffect(() => {
      // Set default values
      setFormData({
        ...formData,
       bank: selectedBank?.name ?? '',
      });      
  }, [selectedBank]);

  console.log('formData:', formData);

  useEffect(() => {
    if (step === 3) {
      // Submit data to server
      console.log('Form data:', formData);
    }
  }, [step]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Request Item</Text>
        </View>

        {/* Item Details Card */}
        <View style={styles.itemCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={Array.isArray(params.icon) ? params.icon[0] as any : params.icon as any} size={32} color="black" />
            <Text style={styles.itemName}>{params?.name ?? ""}</Text>
          </View>
          <View style={styles.itemDetails}>
            <View style={styles.priceRow}>
              <Text style={styles.labelText}>Sell Price</Text>
              <Text style={styles.priceText}>1 kg - LKR {PRICE_PER_KG.toFixed(2)}</Text>
            </View>
            
            <View style={styles.quantityRow}>
              <Text style={styles.labelText}>Quantity (kg)</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity 
                  style={styles.quantityButton} 
                  onPress={() => handleQuantityChange(false)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton} 
                  onPress={() => handleQuantityChange(true)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.labelText}>Total Sell Price</Text>
              <Text style={styles.totalPrice}>LKR {(quantity * PRICE_PER_KG).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLine} />
          {[1, 2, 3].map((num) => (
            <View
              key={num}
              style={[
                styles.progressDot,
                step >= num && styles.progressDotActive,
                { zIndex: 1 }
              ]}
            >
              <Text style={[
                styles.progressText,
                step >= num && styles.progressTextActive
              ]}>
                {String(num).padStart(2, '0')}
              </Text>
            </View>
          ))}
        </View>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* Bottom Navigation */}
        <UserNavigation 
            currentScreen="home"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingTop: 28,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    marginRight: PADDING,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemCard: {
    backgroundColor: '#F0FFF0',
    padding: PADDING,
    margin: PADDING,
    borderRadius: 12,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  itemDetails: {
    width: '100%',
  },
  labelText: {
    fontSize: 14,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceText: {
    color: '#FF6B00',
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#4CAF50',
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    color: '#FF6B00',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: PADDING,
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    top: '50%',
    left: 60,
    right: 60,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  progressText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  progressTextActive: {
    color: '#FFF',
  },
  stepContainer: {
    flex: 1,
    marginBottom: 70, // Space for bottom navigation
  },
  formContainer: {
    padding: PADDING,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  select: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  selectText: {
    color: '#666',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  buttonContainer: {
    padding: PADDING,
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
  },
  nextButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  nextButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
  successContainer: {
    flex: 1,
    padding: PADDING,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70, // Space for bottom navigation
  },
  successMessage: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
  },
  successText: {
    color: '#4CAF50',
    textAlign: 'center',
  },

  errorContainer: {
    padding: 20,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    marginTop: 20,
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
    paddingBottom: 20,
  },

  okButton: {
    backgroundColor: '#000',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  okButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
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


  // 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
  },
  modalItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RequestItem;