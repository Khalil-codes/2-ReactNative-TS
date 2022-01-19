import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
  Modal,
} from 'react-native';

import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';

const FormScreen = ({route, navigation}) => {
  // Error States
  const [imageError, setImageError] = useState('');
  const [nameError, setNameError] = useState('');
  const [contactError, setContactError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genderbtnError, setGenderbtnError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');

  // Data/Input States
  const [uri, setUri] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [imageOptions, setImageOptions] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isImageUploaded, setImageState] = useState('No Image is Uploaded');
  const [isSubmitted, setSubmitted] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateSelected, setDate] = useState('Select your Birth Date');

  const optionGender = [
    {
      label: 'Male',
    },
    {
      label: 'Female',
    },
  ];
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    const tempD = new Date(date);
    var date = tempD.getDate();
    var month = tempD.getMonth() + 1;
    var year = tempD.getFullYear();
    setDate(date + '/' + month + '/' + year);
    setBirthDate(date + '/' + month + '/' + year);
    setBirthDateError('');
    hideDatePicker();
  };
  const submit = () => {
    name == '' ? setNameError('Name is required') : null;
    contact == '' ? setContactError('Contact is required') : null;
    email == '' ? setEmailError('Email is required') : null;
    gender == '' ? setGenderbtnError('Gender is required') : null;
    birthDate == '' ? setBirthDateError('BirthDate is required') : null;
    uri == '' ? setImageError('Image is required') : null;
    if (
      name != '' &&
      email != '' &&
      uri != '' &&
      birthDate != '' &&
      gender != '' &&
      contact != ''
    ) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        setSubmitted(true);
      }, 3000);
    }
  };
  const validateEmail = e => {
    setEmail(e);
    const emailRegex = /\S+@\S+\.\S+/;
    emailRegex.test(e)
      ? setEmailError('')
      : setEmailError('Please enter valid email id');
  };
  const validateName = e => {
    setName(e);
    e == '' ? setNameError('Name is required') : setNameError('');
  };

  const validateContact = e => {
    setContact(e);
    const contactregex = /^[0-9]{10}$/;
    contactregex.test(e)
      ? setContactError('')
      : setContactError('Contact number must be of 10 digits');
  };

  const takePhotoFromCamera = () => {
    setImageOptions(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setUri(image.path);
      setImageError('');
      setImageState('');
    });
  };

  const selectFromGallery = () => {
    setImageOptions(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setUri(image.path);
      setImageError('');
      setImageState('');
    });
  };
  const errorField = inputField =>
    inputField != '' ? <Text style={styles.error}>{inputField}</Text> : null;

  const ImageOptionModal = () => (
    <Modal transparent={true} visible={imageOptions}>
      <View style={styles.imageOptionsbg}>
        <View style={styles.imageOptions}>
          <Pressable
            style={styles.imageOptionsBtn}
            onPress={takePhotoFromCamera}>
            <Text style={styles.imageOptionsTxt}>Open Camera</Text>
          </Pressable>
          <Pressable style={styles.imageOptionsBtn} onPress={selectFromGallery}>
            <Text style={styles.imageOptionsTxt}>Open Gallery</Text>
          </Pressable>
          <Pressable
            style={styles.imageOptionsBtn}
            onPress={() => setImageOptions(false)}>
            <Text style={styles.imageOptionsTxt}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  const SubmitModal = () => (
    <Modal transparent={true} visible={isSubmitted}>
      <View style={styles.imageOptionsbg}>
        <View style={styles.submitMessage}>
          <Text style={styles.submitMessageTxt}>
            Thank you for doing Business with Us
          </Text>
          <Button
            title="Okay"
            onPress={() => {
              setSubmitted(false);
              navigation.navigate('HomeScreen');
            }}
          />
        </View>
      </View>
    </Modal>
  );
  const SubmitButton = ({loader, submitfn}) => (
    <View style={styles.btn}>
      <Pressable style={styles.submitbtn}>
        {loader == true ? (
          <ActivityIndicator size={20} color="white" animating={loader} />
        ) : (
          <Text style={styles.submitTxt} onPress={submitfn}>
            Submit
          </Text>
        )}
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Join Business with {route.params.name}:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => setImageOptions(true)}>
          {isImageUploaded == '' ? (
            <Image source={{uri: uri}} style={styles.userImg} />
          ) : (
            <Image
              source={require('../assets/default.png')}
              style={styles.userImg}
            />
          )}
          <Text style={styles.imgText}>{isImageUploaded}</Text>
          {errorField(imageError)}
        </Pressable>
        <ImageOptionModal />

        <Text style={styles.label}>Name: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter your name:"
          onChangeText={validateName}
          autoCapitalize="words"
        />
        {errorField(nameError)}

        <Text style={styles.label}>Phone Number: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Cell Number"
          keyboardType="numeric"
          onChangeText={validateContact}
          maxLength={10}
        />
        {errorField(contactError)}

        <Text style={styles.label}>Email: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={validateEmail}
          autoCapitalize="none"
        />
        {errorField(emailError)}
        <Text style={styles.label}>Gender: </Text>
        <RadioButtonRN
          style={{margin: 10}}
          data={optionGender}
          textStyle={styles.rbtn}
          box={false}
          activeColor="#333"
          textColor="#333"
          circleSize={14}
          selectedBtn={g => {
            setGender(g['label']);
            setGenderbtnError('');
          }}
        />
        {errorField(genderbtnError)}
        <Text style={styles.label}>Birth Date: </Text>
        <View>
          <Pressable onPress={showDatePicker}>
            <Text style={styles.datePicker}>{isDateSelected}</Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </Pressable>
          {errorField(birthDateError)}
        </View>
        <SubmitButton loader={loader} submitfn={submit} />
        <SubmitModal />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  form: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 30,
  },
  formInput: {
    padding: 4,
    marginBottom: 4,
    marginHorizontal: 10,
    height: 40,
    fontFamily: 'RobotoMono-Medium',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  text: {
    fontFamily: 'RobotoMono-Bold',
    padding: 6,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  rbtn: {
    fontFamily: 'RobotoMono-Medium',
    fontSize: 18,
    color: 'grey',
  },
  btn: {
    margin: 10,
    alignSelf: 'center',
    width: '30%',
  },
  checkbox: {
    marginLeft: 5,
  },
  input: {
    marginTop: 4,
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'RobotoMono-medium',
  },
  datePicker: {
    flex: 1,
    height: 40,
    marginBottom: 10,
    marginHorizontal: 10,
    width: '95%',
    fontSize: 18,
    fontFamily: 'RobotoMono-Medium',
    borderBottomWidth: 1,
    borderColor: '#333',
    padding: 8,
  },
  error: {
    color: 'red',
    marginLeft: 14,
  },
  userImg: {
    marginTop: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  imgText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  imageOptionsbg: {backgroundColor: '#000000aa', flex: 1},
  imageOptions: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    marginVertical: 200,
    marginHorizontal: 60,
    padding: 30,
    flex: 1,
    borderRadius: 10,
  },
  imageOptionsBtn: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 4,
    width: '90%',
  },
  imageOptionsTxt: {
    fontSize: 16,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '500',
    textAlign: 'center',
  },
  submitbtn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  submitTxt: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
  },
  submitMessage: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    marginVertical: 260,
    marginHorizontal: 60,
    padding: 30,
    flex: 1,
    borderRadius: 10,
  },
  submitMessageTxt: {color: 'black', fontSize: 18},
  label: {marginLeft: 10, marginTop: 4, fontSize: 18},
});

export default FormScreen;
