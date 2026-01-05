// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   SafeAreaView
// } from 'react-native';
// import { fontFamily, hp, wp } from '../../utils/helpers';
// import arrow_back from '../../assets/images/arrow_back.png';
// import GradientButton from '../../components/gradientButton';
// import { useNavigation } from '@react-navigation/native';

// const GenderButton = ({ label, isActive, onPress, style }) => {
//   return (
//     <TouchableOpacity
//       style={[styles.genderBtn, style, isActive && styles.genderBtnActive]}
//       onPress={onPress}
//     >
//       <Text style={[styles.genderText, isActive && styles.genderTextActive]}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const BasicInfoScreen = () => {
//   const navigation = useNavigation();
//   const [gender, setGender] = useState('Male');
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');

//   const validate = () => {
//     if (!name.trim()) {
//       Alert.alert('Validation Error', 'Please enter your name.');
//       return false;
//     }
//     if (!/^\d{10}$/.test(mobile)) {
//       Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number.');
//       return false;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       Alert.alert('Validation Error', 'Please enter a valid email.');
//       return false;
//     }
//     return true;
//   };

//   const handleSave = () => {
//     if (validate()) {
//       Alert.alert('Success', 'Your basic info has been saved.');

//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Image source={arrow_back} style={styles.arrowIcon} />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Basic Info</Text>
//       </View>

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <ScrollView
//           style={styles.scrollArea}
//           contentContainerStyle={{ paddingBottom: 40 }}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.profileCircle}>
//             <Text style={styles.profileInitials}>RS</Text>
//           </View>

//           <Text style={styles.label}>Name</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your name"
//             placeholderTextColor={"grey"}
//             value={name}
//             onChangeText={setName}
//             keyboardType="default"
//           />

//           <Text style={styles.label}>Gender</Text>
//           <View style={styles.rectangle}>
//             <View style={styles.genderOuterBox}>
//               <GenderButton
//                 label="Male"
//                 isActive={gender === 'Male'}
//                 onPress={() => setGender('Male')}
//                 style={{
//                   borderTopRightRadius: wp(10),
//                   borderBottomRightRadius: wp(10),
//                 }}
//               />
//               <View style={styles.divider} />
//               <GenderButton
//                 label="Female"
//                 isActive={gender === 'Female'}
//                 onPress={() => setGender('Female')}
//                 style={{
//                   borderTopLeftRadius: wp(10),
//                   borderBottomLeftRadius: wp(10),
//                 }}
//               />
//             </View>
//           </View>

//           <Text style={styles.label}>Date of Birth</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="DD/MM/YYYY"
//             value={dob}
//             placeholderTextColor={"grey"}
//             onChangeText={setDob}
//             keyboardType="numbers-and-punctuation"
//           />

//           <Text style={styles.label}>Mobile Number</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter mobile number"
//             keyboardType="number-pad"
//             value={mobile}
//             placeholderTextColor={"grey"}
//             onChangeText={setMobile}
//             maxLength={10}
//           />

//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, { marginBottom: 30 }]}
//             placeholder="Enter email"
//             keyboardType="email-address"
//             placeholderTextColor={"grey"}
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//           />

//           <GradientButton title="Save Changes" onPress={handleSave} buttonStyle={{height:hp(45)}}/>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: hp(15),
//     borderBottomWidth: 1,
//     borderBottomColor: '#E2E2E2',
//     width: '100%',
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     paddingRight: 10,
//   },
//   headerText: {
//     flex: 1,
//     textAlign: 'center',
//     fontFamily: fontFamily.poppins500,
//     fontSize: wp(18),
//     color: '#000',
//     marginRight: 30,
//   },
//   arrowIcon: {
//     width: wp(20),
//     height: hp(18),
//     resizeMode: 'contain',
//   },
//   scrollArea: {
//     paddingHorizontal: 20,
//   },
//   profileCircle: {
//     alignSelf: 'center',
//     backgroundColor: '#F7E7FF',
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   profileInitials: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginTop: 15,
//     marginBottom: 5,
//     fontFamily: fontFamily.poppins500,
//     color: '#000000',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: wp(10),
//     paddingHorizontal: 12,
//     height: 48,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     color:"#000000"
//   },
//   rectangle: {
//     width: '100%',
//     height: hp(48),
//     backgroundColor: '#fff',
//     marginVertical: 10,
//     borderRadius: wp(10),
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#E2E2E2',
//     paddingHorizontal: 5,
//     paddingVertical: 5,
//   },
//   genderOuterBox: {
//     flexDirection: 'row',
//     borderColor: '#E2E2E2',
//     borderRadius: wp(10),
//     height: hp(40),
//     overflow: 'hidden',

//   },
//   genderBtn: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   genderBtnActive: {
//     backgroundColor: '#8225AF',
//   },
//   genderText: {
//     fontSize: 15,
//     fontFamily: fontFamily.poppins500,
//     color: '#000000',
//   },
//   genderTextActive: {
//     color: '#fff',
//   },
//   // divider: {
//   //   width: 1,
//   //   backgroundColor: '#9c2929ff',
//   // },
// });

// export default BasicInfoScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';
// import {fontFamily, hp, wp} from '../../utils/helpers';
// import arrow_back from '../../assets/images/arrow_back.png';
// import GradientButton from '../../components/gradientButton';
// import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import axios from 'axios';

// const API_BASE = 'https://64ca274afc17.ngrok-free.app/v1/user/auth';

// const GenderButton = ({label, isActive, onPress, style}) => {
//   return (
//     <TouchableOpacity
//       style={[styles.genderBtn, style, isActive && styles.genderBtnActive]}
//       onPress={onPress}>
//       <Text style={[styles.genderText, isActive && styles.genderTextActive]}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const BasicInfoScreen = () => {
//   const navigation = useNavigation();
//   const [gender, setGender] = useState('Male');
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     if (!name.trim()) {
//       Alert.alert('Validation Error', 'Please enter your name.');
//       return false;
//     }
//     if (!/^\d{10}$/.test(mobile)) {
//       Alert.alert(
//         'Validation Error',
//         'Please enter a valid 10-digit mobile number.',
//       );
//       return false;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       Alert.alert('Validation Error', 'Please enter a valid email.');
//       return false;
//     }
//     return true;
//   };

//   //   const handleSave = async () => {
//   //   if (!validate()) return;

//   //   setLoading(true);
//   //   try {
//   //     const token = await AsyncStorage.getItem('token');

//   //     if (!token) {
//   //       Alert.alert('Error', 'User token missing. Please login again.');
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     const payload = {
//   //       name,
//   //       gender,
//   //       dob,
//   //       phone: mobile,
//   //       email,
//   //     };

//   //     console.log('Sending update payload:', payload);

//   //     const res = await axios.put(
//   //       `${API_BASE}/update-user`,
//   //       payload,
//   //       {
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           Authorization: `Bearer ${token}`,   // <-- MUST SEND TOKEN
//   //         },
//   //       }
//   //     );

//   //     console.log('Response:', res.data);

//   //     if (res.status === 200 && res.data.status === 'Success') {
//   //       Alert.alert('Success', 'Your info has been updated successfully!', [
//   //         { text: 'OK', onPress: () => navigation.goBack() },
//   //       ]);
//   //     } else {
//   //       Alert.alert('Error', res.data.message || 'Failed to update user.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Update Error:', error.response || error.message || error);
//   //     Alert.alert('Error', error?.response?.data?.message || 'Something went wrong.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleSave = async () => {
//   //   if (!validate()) return;
//   //   setLoading(true);

//   //   try {
//   //     const token = await AsyncStorage.getItem("authToken");
//   //     console.log("TOKEN:", token);

//   //     if (!token) {
//   //       Alert.alert("Error", "User token missing. Please login again.");
//   //       return;
//   //     }

//   //     const payload = {
//   //       name,
//   //       // gender,
//   //       // dateOfBirth: dob,   // must be full date
//   //       // phone: mobile,
//   //       // email,
//   //     };

//   //     console.log("Sending payload:", payload);

//   //     const res = await axios.put(
//   //       `${API_BASE}/update-user`,

//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //         body: payload,
//   //       }
//   //     );

//   //     console.log("Response:", res.data);

//   //     if (res.data.status === "Success") {
//   //       Alert.alert("Success", "User updated successfully!");
//   //       navigation.goBack();
//   //     } else {
//   //       Alert.alert("Error", res.data.message || "Failed to update user.");
//   //     }

//   //   } catch (error) {
//   //     console.log("Update Error:", error.response?.data || error);
//   //     Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleSave = async () => {
//   //   if (!validate()) return;
//   //   setLoading(true);

//   //   try {
//   //   const token = await AsyncStorage.getItem("authToken");  // make sure this matches login!
//   // console.log("TOKEN:", token);
//   //     if (!token) {
//   //       Alert.alert("Error", "User token missing. Please login again.");
//   //       return;
//   //     }

//   //     const payload = {
//   //       name,
//   //       // gender,
//   //       // dateOfBirth: dob,
//   //       // phone: mobile,
//   //       // email,
//   //     };

//   //     console.log("Sending payload:", payload);

//   //     // const res = await axios.put(
//   //     //   `${API_BASE}/update-user`,
//   //     //   payload,
//   //     //   {
//   //     //     headers: {
//   //     //       "Content-Type": "application/json",
//   //     //       Authorization: `Bearer ${token}`,
//   //     //     },
//   //     //   }
//   //     // );

//   // const res = await axios.put(
//   //   `${API_BASE}/update-user`,
//   //   payload,
//   //   {
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       Authorization: `Bearer ${token}`,
//   //     }
//   //   }
//   // );

//   //     console.log("Response:", res.data);

//   //     if (res.data.status === "Success") {
//   //       Alert.alert("Success", "User updated successfully!");
//   //       navigation.goBack();
//   //     } else {
//   //       Alert.alert("Error", res.data.message || "Failed to update user.");
//   //     }

//   //   } catch (error) {
//   //     console.log("Update Error:", error.response?.data || error);
//   //     Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSave = async () => {
//     if (!validate()) return;
//     setLoading(true);

//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       console.log('TOKEN:', token);

//       if (!token) {
//         Alert.alert('Error', 'User token missing. Please login again.');
//         return;
//       }
//       const payload = {
//         name,
//         gender,
//         dateOfBirth: dob,
//         phone: mobile,
//         email,
//       };
//       console.log('Sending payload:', payload);

//       const res = await axios.put(`${API_BASE}/update-user`, payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Response:', res.data);

//       if (res.data.userData) {
//         Alert.alert('Success', 'User updated successfully!');
//         navigation.goBack();
//       } else {
//         Alert.alert('Error', res.data.message || 'Failed to update user.');
//       }
//     } catch (error) {
//       console.log('Update Error:', error.response?.data || error);
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Something went wrong.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Image source={arrow_back} style={styles.arrowIcon} />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Basic Info</Text>
//       </View>

//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <ScrollView
//           style={styles.scrollArea}
//           contentContainerStyle={{paddingBottom: 40}}
//           showsVerticalScrollIndicator={false}>
//           <View style={styles.profileCircle}>
//             <Text style={styles.profileInitials}>
//               {name ? name.charAt(0).toUpperCase() : 'U'}
//             </Text>
//           </View>

//           <Text style={styles.label}>Name</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your name"
//             placeholderTextColor={'grey'}
//             value={name}
//             onChangeText={setName}
//           />

//           <Text style={styles.label}>Gender</Text>
//           <View style={styles.rectangle}>
//             <View style={styles.genderOuterBox}>
//               <GenderButton
//                 label="Male"
//                 isActive={gender === 'Male'}
//                 onPress={() => setGender('Male')}
//               />
//               <View style={styles.divider} />
//               <GenderButton
//                 label="Female"
//                 isActive={gender === 'Female'}
//                 onPress={() => setGender('Female')}
//               />
//             </View>
//           </View>

//           <Text style={styles.label}>Date of Birth</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="DD/MM/YYYY"
//             value={dob}
//             placeholderTextColor={'grey'}
//             onChangeText={setDob}
//             keyboardType="numbers-and-punctuation"
//           />

//           <Text style={styles.label}>Mobile Number</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter mobile number"
//             keyboardType="number-pad"
//             value={mobile}
//             placeholderTextColor={'grey'}
//             onChangeText={setMobile}
//             maxLength={10}
//           />

//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, {marginBottom: 30}]}
//             placeholder="Enter email"
//             keyboardType="email-address"
//             placeholderTextColor={'grey'}
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//           />

//           <GradientButton
//             title={loading ? 'Saving...' : 'Save Changes'}
//             onPress={handleSave}
//             disabled={loading}
//             buttonStyle={{height: hp(45)}}
//           />
//           {loading && (
//             <ActivityIndicator style={{marginTop: 10}} color="#8225AF" />
//           )}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// // ✅ Styles same as before
// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#ffffff'},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: hp(15),
//     borderBottomWidth: 1,
//     borderBottomColor: '#E2E2E2',
//     width: '100%',
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   backButton: {paddingRight: 10},
//   headerText: {
//     flex: 1,
//     textAlign: 'center',
//     fontFamily: fontFamily.poppins500,
//     fontSize: wp(18),
//     color: '#000',
//     marginRight: 30,
//   },
//   arrowIcon: {width: wp(20), height: hp(18), resizeMode: 'contain'},
//   scrollArea: {paddingHorizontal: 20},
//   profileCircle: {
//     alignSelf: 'center',
//     backgroundColor: '#F7E7FF',
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   profileInitials: {fontSize: 22, fontWeight: 'bold', color: '#333'},
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginTop: 15,
//     marginBottom: 5,
//     fontFamily: fontFamily.poppins500,
//     color: '#000000',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: wp(10),
//     paddingHorizontal: 12,
//     height: 48,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     color: '#000000',
//   },
//   rectangle: {
//     width: '100%',
//     height: hp(48),
//     backgroundColor: '#fff',
//     marginVertical: 10,
//     borderRadius: wp(10),
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#E2E2E2',
//     paddingHorizontal: 5,
//     paddingVertical: 5,
//   },
//   genderOuterBox: {
//     flexDirection: 'row',
//     borderColor: '#E2E2E2',
//     borderRadius: wp(10),
//     height: hp(40),
//     overflow: 'hidden',
//   },
//   genderBtn: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   genderBtnActive: {backgroundColor: '#8225AF'},
//   genderText: {
//     fontSize: 15,
//     fontFamily: fontFamily.poppins500,
//     color: '#000000',
//   },
//   genderTextActive: {color: '#fff'},
//   divider: {width: 1, backgroundColor: '#E2E2E2'},
// });

// export default BasicInfoScreen;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   SafeAreaView,
//   Modal,
//   ActivityIndicator,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import {launchImageLibrary} from 'react-native-image-picker';

// import {fontFamily, hp, wp} from '../../utils/helpers';
// import arrow_back from '../../assets/images/arrow_back.png';
// import GradientButton from '../../components/gradientButton';
// // import {updateUserRequest} from '../../redux/actions/userActions';
// import {uploadProfilePicRequest} from '../../redux/actions/profileImageActions';

// import {
//   resetUpdateUser,
//   updateUserRequest,
// } from '../../redux/actions/updateUserActions';
// import {colors} from '../../utils/colors';
// import {images} from '../../assets';
// import {fetchUserRequest} from '../../redux/actions/userActions';
// const GenderButton = ({label, isActive, onPress, style}) => (
//   <TouchableOpacity
//     style={[styles.genderBtn, style, isActive && styles.genderBtnActive]}
//     onPress={onPress}>
//     <Text style={[styles.genderText, isActive && styles.genderTextActive]}>
//       {label}
//     </Text>
//   </TouchableOpacity>
// );

// const BasicInfoScreen = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user.user);
//   const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg'];
//   const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
//   const token = useSelector(state => state.auth.token);

//   const [photoModalVisible, setPhotoModalVisible] = useState(false); // ✔ Move here
//   const [profileImage, setProfileImage] = useState(null);

//   const openGallery = async () => {
//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//     });

//     if (result.didCancel || !result.assets?.length) return;

//     const image = result.assets[0];

//     // 🔥 MIME TYPE VALIDATION (backend rule)
//     if (!ALLOWED_MIME_TYPES.includes(image.type)) {
//       Alert.alert('Invalid Image', 'Only PNG, JPG, JPEG images are allowed');
//       return;
//     }

//     // 🔥 EXTENSION VALIDATION (extra safety)
//     const fileName = image.fileName?.toLowerCase() || '';
//     const isValidExtension = ALLOWED_EXTENSIONS.some(ext =>
//       fileName.endsWith(ext),
//     );

//     if (!isValidExtension) {
//       Alert.alert('Invalid File', 'Please select a PNG, JPG or JPEG image');
//       return;
//     }

//     // ✅ Everything OK → dispatch
//     dispatch(uploadProfilePicRequest(image));
//   };

//   const {imageUrl} = useSelector(state => state.profileImage || {});
//   console.log('imageUrl1.............', imageUrl);

//   useEffect(() => {
//     if (imageUrl) {
//       setProfileImage(imageUrl);
//     }
//   }, [imageUrl]);
//   const profileImageState = useSelector(state => state.profileImage);

//   console.log('REDUX STATE', profileImageState);

//   const {loading, userData, error} = useSelector(state => state.updateUser);

//   const [name, setName] = useState('');
//   const [gender, setGender] = useState('Male');
//   const [dob, setDob] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [dobISO, setDobISO] = useState(''); // API value

//   // Validation
//   const validate = () => {
//     if (!name.trim()) {
//       Alert.alert('Validation Error', 'Please enter your name.');
//       return false;
//     }
//     if (!/^\d{10}$/.test(mobile)) {
//       Alert.alert(
//         'Validation Error',
//         'Please enter a valid 10-digit mobile number.',
//       );
//       return false;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       Alert.alert('Validation Error', 'Please enter a valid email.');
//       return false;
//     }
//     return true;
//   };

//   // Handle Save (dispatch redux action)
//   const convertToISO = dob => {
//     if (!dob) return '';
//     const [day, month, year] = dob.split('/');
//     return `${year}-${month}-${day}`;
//   };

//   const handleSave = () => {
//     if (!validate()) return;

//     const payload = {
//       name,
//       // gender,
//       gender: gender?.toLowerCase(), // 🔥 always small letter
//       // dateOfBirth: dob,
//       // dateOfBirth: dobISO,
//       dateOfBirth: convertToISO(dob), // 🔥 FIX
//       phone: mobile,
//       // email,
//     };

//     dispatch(updateUserRequest(payload, token));
//     console.log(payload, 'payload............');
//   };
//   console.log('DOB UI:', dob);
//   console.log('DOB API:', dobISO);

//   useEffect(() => {
//     if (userData) {
//       Alert.alert('Success', 'User updated successfully!', [
//         {
//           text: 'OK',
//           onPress: () => {
//             dispatch(resetUpdateUser()); // 👈 reset state
//             navigation.goBack();
//           },
//         },
//       ]);
//     }
//   }, [userData]);
//   useEffect(() => {
//     if (user?.email) {
//       setEmail(user.email); // 🔥 autofill email
//     }
//   }, [user]);
//   useEffect(() => {
//     if (token) {
//       dispatch(fetchUserRequest(token));
//     }
//   }, [token]);
//   // const token = useSelector(state => state.auth.token);

//   // useEffect(() => {
//   //   if (user) {
//   //     setName(user.name || '');
//   //     setGender(
//   //       user.gender
//   //         ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
//   //         : 'Male',
//   //     );
//   //     setDob(user.dateOfBirth || '');
//   //     // setDob(formatDate(user.dateOfBirth)); // 🔥 FIX
//   //     setMobile(user.phone || '');
//   //     setEmail(user.email || '');

//   //     // 🔥 PROFILE IMAGE FROM auth/me
//   //     if (user.profilePic) {
//   //       setProfileImage(user.profilePic);
//   //     }
//   //   }
//   // }, [user]);
//   // extra state (top of component)

//   useEffect(() => {
//     if (user) {
//       // BASIC INFO
//       setName(user.name || '');
//       setGender(
//         user.gender
//           ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
//           : 'Male',
//       );
//       setEmail(user.email || '');
//       setMobile(user.phone || '');

//       // 🔥 DATE OF BIRTH (UI + API)
//       if (user.dateOfBirth) {
//         const date = new Date(user.dateOfBirth);

//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();

//         setDob(`${day}/${month}/${year}`); // 👈 UI
//         setDobISO(user.dateOfBirth); // 👈 API (ISO)
//       } else {
//         setDob('');
//         setDobISO('');
//       }

//       // 🔥 PROFILE IMAGE
//       if (user.profilePic) {
//         setProfileImage(user.profilePic);
//       }
//     }
//   }, [user]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Image source={arrow_back} style={styles.arrowIcon} />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Basic Info</Text>
//       </View>

//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <ScrollView
//           style={styles.scrollArea}
//           contentContainerStyle={{paddingBottom: 40}}
//           showsVerticalScrollIndicator={false}>
//           {/* <View style={styles.profileCircle}>
//             <Text style={styles.profileInitials}>
//               {name ? name.charAt(0).toUpperCase() : 'U'}
//             </Text>
//           </View> */}
//           {/* <TouchableOpacity onPress={openGallery}>
//             <View style={styles.profileCircle}>
//               {profileImage ? (
//                 <Image
//                   source={{uri: profileImage}}
//                   style={styles.profileImage}
//                 />
//               ) : (
//                 <Text style={styles.profileInitials}>
//                   {name ? name.charAt(0).toUpperCase() : 'U'}
//                 </Text>
//               )}
//             </View>
//           </TouchableOpacity> */}
//           {/* <TouchableOpacity onPress={openGallery}>
//             <View style={styles.profileCircle}>
//               {profileImage ? (
//                 <Image
//                   source={{uri: profileImage}}
//                   style={styles.profileImage}
//                 />
//               ) : (
//                 <Text style={styles.profileInitials}>
//                   {name ? name.charAt(0).toUpperCase() : 'U'}
//                 </Text>
//               )}
//             </View>
//           </TouchableOpacity> */}
//           {/* <TouchableOpacity onPress={() => setPhotoModalVisible(true)}>
//             <View style={styles.profileCircle}>
//               {profileImage ? (
//                 <Image
//                   source={{uri: profileImage}}
//                   style={styles.profileImage}
//                 />
//               ) : (
//                 <Text style={styles.profileInitials}>
//                   {name ? name.charAt(0).toUpperCase() : 'U'}
//                 </Text>
//               )}
//             </View>
//           </TouchableOpacity> */}

//           <TouchableOpacity
//             onPress={() => {
//               if (profileImage) {
//                 setPhotoModalVisible(true);
//               } else {
//                 openGallery();
//               }
//             }}>
//             <View style={styles.profileCircle}>
//               {profileImage ? (
//                 <Image
//                   source={{uri: profileImage}}
//                   style={styles.profileImage}
//                 />
//               ) : (
//                 <Text style={styles.profileInitials}>
//                   {name ? name.charAt(0).toUpperCase() : 'U'}
//                 </Text>
//               )}
//             </View>
//           </TouchableOpacity>

//           <Modal
//             transparent={true}
//             animationType="fade"
//             visible={photoModalVisible}
//             onRequestClose={() => setPhotoModalVisible(false)}>
//             <TouchableOpacity
//               style={styles.modalOverlay}
//               activeOpacity={1}
//               onPress={() => setPhotoModalVisible(false)}>
//               {/* <View style={styles.modalBox}> */}
//               <View
//                 style={{
//                   backgroundColor: colors.white,
//                   width: wp(340),
//                   height: hp(147),
//                   borderRadius: 20,
//                 }}>
//                 <TouchableOpacity
//                   // style={styles.modalRow}
//                   style={{
//                     marginTop: hp(26),
//                     marginHorizontal: wp(31),
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   }}
//                   onPress={() => {
//                     setPhotoModalVisible(false);
//                     openGallery(); // 👈 open gallery
//                   }}>
//                   <Text style={styles.modalText}>Change Photo</Text>
//                   {/* <Text style={styles.arrow}>{'>'}</Text> */}
//                   <Image
//                     source={images.white_icon}
//                     style={{width: wp(7.78), height: hp(13.96)}}
//                   />
//                 </TouchableOpacity>

//                 {/* <View style={styles.modalLine} /> */}
//                 <View
//                   style={{
//                     marginTop: hp(24),
//                     borderColor: '#D8D8D8',
//                     borderWidth: 1,
//                     marginHorizontal: wp(31),
//                   }}
//                 />

//                 <TouchableOpacity
//                   // style={styles.modalRow}
//                   style={{
//                     marginTop: hp(21),
//                     marginHorizontal: wp(31),
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   }}
//                   onPress={() => {
//                     setProfileImage(null); // 👈 delete image
//                     setPhotoModalVisible(false);
//                   }}>
//                   <Text style={styles.modalText}>Delete Photo</Text>
//                   {/* <Text style={styles.arrow}>{'>'}</Text> */}
//                   <Image
//                     source={images.white_icon}
//                     style={{width: wp(7.78), height: hp(13.96)}}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           </Modal>

//           <Text style={styles.label}>Name</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your name"
//             placeholderTextColor={'grey'}
//             value={name}
//             onChangeText={setName}
//           />

//           <Text style={styles.label}>Gender</Text>
//           <View style={styles.rectangle}>
//             <View style={styles.genderOuterBox}>
//               <GenderButton
//                 label="Male"
//                 isActive={gender === 'Male'}
//                 onPress={() => setGender('Male')}
//               />
//               <View style={styles.divider} />
//               <GenderButton
//                 label="Female"
//                 isActive={gender === 'Female'}
//                 onPress={() => setGender('Female')}
//               />
//             </View>
//           </View>

//           <Text style={styles.label}>Date of Birth</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="DD/MM/YYYY"
//             value={dob}
//             editable={true} // if using date
//             placeholderTextColor={'grey'}
//             onChangeText={setDob}
//             keyboardType="numbers-and-punctuation"
//           />

//           <Text style={styles.label}>Mobile Number</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter mobile number"
//             keyboardType="number-pad"
//             value={mobile}
//             placeholderTextColor={'grey'}
//             onChangeText={setMobile}
//             maxLength={10}
//           />
//           {/*
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, {marginBottom: 30}]}
//             placeholder="Enter email"
//             keyboardType="email-address"
//             placeholderTextColor={'grey'}
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//           /> */}

//           <Text style={styles.label}>Email</Text>

//           <TextInput
//             style={[styles.input, {marginBottom: 30}]}
//             placeholder="Enter email"
//             keyboardType="email-address"
//             placeholderTextColor={'grey'}
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//           />

//           <GradientButton
//             title={loading ? 'Saving...' : 'Save Changes'}
//             onPress={handleSave}
//             disabled={loading}
//             // loading={loading}
//             buttonStyle={{height: hp(45)}}
//           />
//           {/* {loading && (
//             <ActivityIndicator style={{marginTop: 10}} color="#8225AF" />
//           )} */}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#ffffff'},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: hp(15),
//     borderBottomWidth: 1,
//     borderBottomColor: '#E2E2E2',
//     width: '100%',
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   backButton: {paddingRight: 10},
//   headerText: {
//     flex: 1,
//     textAlign: 'center',
//     fontFamily: fontFamily.poppins500,
//     fontSize: wp(18),
//     color: '#000',
//     marginRight: 30,
//   },
//   arrowIcon: {width: wp(20), height: hp(18), resizeMode: 'contain'},
//   scrollArea: {paddingHorizontal: 20},
//   profileCircle: {
//     alignSelf: 'center',
//     backgroundColor: '#F7E7FF',
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//     overflow: 'hidden', // REQUIRED!
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },

//   profileInitials: {fontSize: 22, fontWeight: 'bold', color: '#333'},
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginTop: 15,
//     marginBottom: 5,
//     fontFamily: fontFamily.poppins500,
//     color: '#000000',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: wp(10),
//     paddingHorizontal: 12,
//     height: 48,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     color: '#000000',
//   },
//   rectangle: {
//     width: '100%',
//     height: hp(48),
//     backgroundColor: '#fff',
//     marginVertical: 10,
//     borderRadius: wp(10),
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#E2E2E2',
//     paddingHorizontal: 5,
//     paddingVertical: 5,
//   },
//   genderOuterBox: {
//     flexDirection: 'row',
//     borderColor: '#E2E2E2',
//     borderRadius: wp(10),
//     height: hp(40),
//     overflow: 'hidden',
//   },
//   genderBtn: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   genderBtnActive: {backgroundColor: '#8225AF'},
//   genderText: {
//     fontSize: 15,
//     fontFamily: fontFamily.poppins500,
//     color: '#000000',
//   },
//   genderTextActive: {color: '#fff'},
//   divider: {width: 1, backgroundColor: '#E2E2E2'},
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },

//   modalBox: {
//     width: wp(80),
//     backgroundColor: 'white',
//     borderRadius: 12,
//     paddingVertical: 15,
//     elevation: 5,
//   },

//   modalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },

//   modalText: {
//     fontSize: 16,
//     fontFamily: fontFamily.medium,
//     color: 'black',
//   },

//   modalLine: {
//     height: 1,
//     backgroundColor: '#E5E5E5',
//     marginHorizontal: 20,
//   },

//   arrow: {
//     fontSize: 18,
//     color: '#A0A0A0',
//   },
// });

// export default BasicInfoScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import {fontFamily, hp, wp} from '../../utils/helpers';
import arrow_back from '../../assets/images/arrow_back.png';
import GradientButton from '../../components/gradientButton';
// import {updateUserRequest} from '../../redux/actions/userActions';
import {uploadProfilePicRequest} from '../../redux/actions/profileImageActions';

import {
  resetUpdateUser,
  updateUserRequest,
} from '../../redux/actions/updateUserActions';
import {colors} from '../../utils/colors';
import {images} from '../../assets';
import {fetchUserRequest} from '../../redux/actions/userActions';
const GenderButton = ({label, isActive, onPress, style}) => (
  <TouchableOpacity
    style={[styles.genderBtn, style, isActive && styles.genderBtnActive]}
    onPress={onPress}>
    <Text style={[styles.genderText, isActive && styles.genderTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const BasicInfoScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg'];
  const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
  const token = useSelector(state => state.auth.token);
  const [photoModalVisible, setPhotoModalVisible] = useState(false); // ✔ Move here
  const [profileImage, setProfileImage] = useState(null);

  // const openGallery = async () => {
  //   const result = await launchImageLibrary({
  //     mediaType: 'photo',
  //     quality: 0.8,
  //   });

  //   if (result.didCancel || !result.assets?.length) return;

  //   if (!ALLOWED_MIME_TYPES.includes(image.type)) {
  //     Alert.alert('Invalid Image', 'Only PNG, JPG, JPEG images are allowed');
  //     return;
  //   }

  //   const fileName = image.fileName?.toLowerCase() || '';
  //   const isValidExtension = ALLOWED_EXTENSIONS.some(ext =>
  //     fileName.endsWith(ext),
  //   );

  //   if (!isValidExtension) {
  //     Alert.alert('Invalid File', 'Please select a PNG, JPG or JPEG image');
  //     return;
  //   }

  //   // ✅ Everything OK → dispatch
  //   dispatch(uploadProfilePicRequest(image));
  // };

  const {imageUrl} = useSelector(state => state.profileImage || {});
  console.log('imageUrl1.............', imageUrl);

  useEffect(() => {
    if (imageUrl) {
      setProfileImage(imageUrl);
    }
  }, [imageUrl]);
  const profileImageState = useSelector(state => state.profileImage);

  console.log('REDUX STATE', profileImageState);

  const {loading, userData, error} = useSelector(state => state.updateUser);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  // Validation
  const validate = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      Alert.alert(
        'Validation Error',
        'Please enter a valid 10-digit mobile number.',
      );
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return false;
    }
    return true;
  };

  const convertToISO = dob => {
    if (!dob || dob.length !== 10) return null;
    const [day, month, year] = dob.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSave = () => {
    if (!validate()) return;

    const payload = {
      name,
      gender: gender.toLowerCase(),
      dateOfBirth: convertToISO(dob), // ✅ UI dob only
      phone: mobile,
    };
    console.log(payload, 'payload............');
    dispatch(updateUserRequest(payload, token));
  };

  useEffect(() => {
    if (userData) {
      Alert.alert('Success', 'User updated successfully!', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetUpdateUser()); // 👈 reset state
            navigation.goBack();
          },
        },
      ]);
    }
  }, [userData]);
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email); // 🔥 autofill email
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      dispatch(fetchUserRequest(token)); // 👈 ONLY ON SUCCESS
    }
  }, [userData]);

  //DOB FORMATTER LOGIC

  const handleDobChange = text => {
    // space remove
    text = text.replace(/\s/g, '');

    //  only numbers allow
    if (!/^\d*$/.test(text.replace(/\//g, ''))) {
      return;
    }

    let formatted = text.replace(/\D/g, '');

    // DAY
    if (formatted.length >= 2) {
      let day = parseInt(formatted.substring(0, 2), 10);
      if (day < 1 || day > 31) return;
      formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
    }

    // MONTH
    if (formatted.length >= 5) {
      let month = parseInt(formatted.substring(3, 5), 10);
      if (month < 1 || month > 12) return;
      formatted = formatted.substring(0, 5) + '/' + formatted.substring(5);
    }

    // YEAR
    if (formatted.length >= 10) {
      let year = parseInt(formatted.substring(6, 10), 10);
      if (year > 2026) return;
    }

    setDob(formatted);
  };
  useEffect(() => {
    if (!user) return;

    setName(user.name || '');
    setGender(
      user.gender
        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
        : 'Male',
    );
    setEmail(user.email || '');
    setMobile(user.phone || '');

    // 🔥 DOB set ONLY first time
    if (user.dateOfBirth) {
      const date = new Date(user.dateOfBirth);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      setDob(prev => (prev ? prev : `${day}/${month}/${year}`));
    }

    if (user.profilePic) {
      setProfileImage(user.profilePic);
    }
  }, [user]);
  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.didCancel || !result.assets?.length) return;

    const image = result.assets[0]; // 🔥 THIS WAS MISSING

    if (!ALLOWED_MIME_TYPES.includes(image.type)) {
      Alert.alert('Invalid Image', 'Only PNG, JPG, JPEG images are allowed');
      return;
    }

    const fileName = image.fileName?.toLowerCase() || '';
    const isValidExtension = ALLOWED_EXTENSIONS.some(ext =>
      fileName.endsWith(ext),
    );

    if (!isValidExtension) {
      Alert.alert('Invalid File', 'Please select a PNG, JPG or JPEG image');
      return;
    }

    // ✅ Dispatch correct image
    dispatch(uploadProfilePicRequest(image));
  };
  // const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!token) {
      setName('');
      setGender('Male');
      setDob('');
      setMobile('');
      setEmail('');
      setProfileImage(null);
    }
  }, [token]);
  useEffect(() => {
    if (!token) return; // 🔒 stop after logout

    if (imageUrl) {
      setProfileImage(imageUrl);
    }
  }, [imageUrl, token]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={arrow_back} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Basic Info</Text>
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={{paddingBottom: 40}}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              if (profileImage) {
                setPhotoModalVisible(true);
              } else {
                openGallery();
              }
            }}>
            <View style={styles.profileCircle}>
              {profileImage ? (
                <Image
                  source={{uri: profileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.profileInitials}>
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="fade"
            visible={photoModalVisible}
            onRequestClose={() => setPhotoModalVisible(false)}>
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setPhotoModalVisible(false)}>
              {/* <View style={styles.modalBox}> */}
              <View
                style={{
                  backgroundColor: colors.white,
                  width: wp(340),
                  height: hp(147),
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  // style={styles.modalRow}
                  style={{
                    marginTop: hp(26),
                    marginHorizontal: wp(31),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    setPhotoModalVisible(false);
                    openGallery(); // 👈 open gallery
                  }}>
                  <Text style={styles.modalText}>Change Photo</Text>
                  {/* <Text style={styles.arrow}>{'>'}</Text> */}
                  <Image
                    source={images.white_icon}
                    style={{width: wp(7.78), height: hp(13.96)}}
                  />
                </TouchableOpacity>

                {/* <View style={styles.modalLine} /> */}
                <View
                  style={{
                    marginTop: hp(24),
                    borderColor: '#D8D8D8',
                    borderWidth: 1,
                    marginHorizontal: wp(31),
                  }}
                />

                <TouchableOpacity
                  // style={styles.modalRow}
                  style={{
                    marginTop: hp(21),
                    marginHorizontal: wp(31),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    setProfileImage(null); // 👈 delete image
                    setPhotoModalVisible(false);
                  }}>
                  <Text style={styles.modalText}>Delete Photo</Text>
                  {/* <Text style={styles.arrow}>{'>'}</Text> */}
                  <Image
                    source={images.white_icon}
                    style={{width: wp(7.78), height: hp(13.96)}}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={'grey'}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.rectangle}>
            <View style={styles.genderOuterBox}>
              <GenderButton
                label="Male"
                isActive={gender === 'Male'}
                onPress={() => setGender('Male')}
              />
              <View style={styles.divider} />
              <GenderButton
                label="Female"
                isActive={gender === 'Female'}
                onPress={() => setGender('Female')}
              />
            </View>
          </View>

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={dob}
            editable={true} // if using date
            placeholderTextColor={'grey'}
            // onChangeText={setDob}
            onChangeText={handleDobChange}
            keyboardType="numbers-and-punctuation"
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            value={mobile}
            placeholderTextColor={'grey'}
            onChangeText={setMobile}
            maxLength={10}
          />
          {/* 
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, {marginBottom: 30}]}
            placeholder="Enter email"
            keyboardType="email-address"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          /> */}

          <Text style={styles.label}>Email</Text>

          <TextInput
            style={[styles.input, {marginBottom: 30}]}
            placeholder="Enter email"
            keyboardType="email-address"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <GradientButton
            title={loading ? 'Saving...' : 'Save Changes'}
            onPress={handleSave}
            disabled={loading}
            // loading={loading}
            buttonStyle={{height: hp(45)}}
          />
          {/* {loading && (
            <ActivityIndicator style={{marginTop: 10}} color="#8225AF" />
          )} */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(15),
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {paddingRight: 10},
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    color: '#000',
    marginRight: 30,
  },
  arrowIcon: {width: wp(20), height: hp(18), resizeMode: 'contain'},
  scrollArea: {paddingHorizontal: 20},
  profileCircle: {
    alignSelf: 'center',
    backgroundColor: '#F7E7FF',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    overflow: 'hidden', // REQUIRED!
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  profileInitials: {fontSize: 22, fontWeight: 'bold', color: '#333'},
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 5,
    fontFamily: fontFamily.poppins500,
    color: '#000000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: wp(10),
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000000',
  },
  rectangle: {
    width: '100%',
    height: hp(48),
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: wp(10),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  genderOuterBox: {
    flexDirection: 'row',
    borderColor: '#E2E2E2',
    borderRadius: wp(10),
    height: hp(40),
    overflow: 'hidden',
  },
  genderBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderBtnActive: {backgroundColor: '#8225AF'},
  genderText: {
    fontSize: 15,
    fontFamily: fontFamily.poppins500,
    color: '#000000',
  },
  genderTextActive: {color: '#fff'},
  divider: {width: 1, backgroundColor: '#E2E2E2'},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalBox: {
    width: wp(80),
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 15,
    elevation: 5,
  },

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  modalText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: 'black',
  },

  modalLine: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 20,
  },

  arrow: {
    fontSize: 18,
    color: '#A0A0A0',
  },
});

export default BasicInfoScreen;
