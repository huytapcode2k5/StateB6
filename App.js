import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const phoneRegex = /^0[0-9]{9}$/;

  // 🔥 Format số: 090 123 4567
  const formatPhone = (number) => {
    if (number.length <= 3) return number;
    if (number.length <= 6)
      return number.slice(0, 3) + ' ' + number.slice(3);
    return number.slice(0, 3) + ' ' + number.slice(3, 6) + ' ' + number.slice(6);
  };

  const handlePhoneChange = (text) => {
    const onlyNumber = text.replace(/[^0-9]/g, '');

    if (onlyNumber.length <= 10) {

      const formatted = formatPhone(onlyNumber);

      // ✅ Update ngược lại vào TextInput
      setPhone(formatted);

      // Validate realtime
      if (onlyNumber.length === 0) {
        setError('');
      } else if (!phoneRegex.test(onlyNumber)) {
        setError('Số điện thoại không đúng định dạng');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = () => {
    const rawPhone = phone.replace(/\s/g, '');

    if (phoneRegex.test(rawPhone)) {
      Alert.alert('Thông báo', 'Đăng nhập thành công');
    } else {
      setError('Số điện thoại không đúng định dạng');
      Alert.alert('Thông báo', 'Số điện thoại không đúng định dạng');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <Text style={styles.heading}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null
        ]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={handlePhoneChange}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.buttonActive}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonTextActive}>
          Tiếp tục
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  heading: {
    marginTop: 60,
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 24,
    fontSize: 16,
    paddingVertical: 8,
  },

  inputError: {
    borderBottomColor: 'red',
  },

  errorText: {
    color: 'red',
    marginTop: 6,
    fontSize: 13,
  },

  buttonActive: {
    backgroundColor: 'green',
    marginTop: 32,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },

  buttonTextActive: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}
);