import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Alert} from 'react-native';

import tw from 'tailwind-react-native-classnames';
import {useEffect, useState} from "react";
import {Icon, Input} from "@ui-kitten/components";
import {TouchableWithoutFeedback} from "@ui-kitten/components/devsupport";
import {TouchableOpacity} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createAccount} from '../utils/requests';

export default function SignUp({navigation}) {

    const [values, setValues] = useState({});
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [errors, setErrors] = useState({});

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const submit = async () => {
        if (Object.entries(values).length !== 7) {
            Alert.alert('Please fill the form');
            return;
        }
        if (!(values.password && values.password === values.confirmPassword)) {
            Alert.alert("Passwords doesn't match");
            return;
        }
        const location = JSON.parse(await AsyncStorage.getItem('location'));
        if (!location) {
            Alert.alert('location not setted!');
            return;
        }
        try {
            const data = {
                ...values,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
            console.log(data)
            const res = await createAccount(data);
            console.log(res);
        } catch (e) {
            console.log('Create account error', e);
        }
    }

    const handleInputChange = (input, value) => {
        setValues({
            ...values,
            [input]: value
        })
        setErrors({
            ...errors,
            [input]: (!value || value.trim() === '')
        });
        if (input === 'confirmPassword') {
            setErrors({
                ...errors,
                [input]: !((value && value.trim() !== '') && value === values.password)
            });
        }
    }

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <Text style={tw`p-5 ios:pt-2 android:pt-10 bg-white text-2xl`}>Create New
                Account</Text>
            <View style={tw`m-5`}>

                <Input autoCapitalize={'none'}
                       size={'large'}
                       status={errors.name ? 'danger' : 'basic'}
                       style={styles.input}
                       placeholder={'Name'}
                       onChangeText={value => handleInputChange('name', value)}/>
                <Input autoCapitalize={'none'}
                       size={'large'}
                       status={errors.email ? 'danger' : 'basic'}
                       style={styles.input}
                       placeholder={'Email'}
                       onChangeText={value => handleInputChange('email', value)}/>
                <Input autoCapitalize={'none'}
                       size={'large'}
                       status={errors.email ? 'danger' : 'basic'}
                       style={styles.input}
                       placeholder={'Mobile'}
                       onChangeText={value => handleInputChange('mobile', value)}/>
                <Input size={'large'}
                       status={errors.password ? 'danger' : 'basic'}
                       style={styles.input}
                       placeholder={'Password'}
                       onChangeText={value => handleInputChange('password', value)}
                       accessoryRight={renderIcon}
                       secureTextEntry={secureTextEntry}/>
                <Input size={'large'}
                       status={errors.confirmPassword ? 'danger' : 'basic'}
                       style={styles.input}
                       placeholder={'Confirm Password'}
                       onChangeText={value => handleInputChange('confirmPassword', value)}
                       accessoryRight={renderIcon}
                       secureTextEntry={secureTextEntry}/>
                <Input autoCapitalize={'none'}
                       size={'large'}
                       status={errors.nicNo ? 'danger' : 'basic'}
                       style={styles.input}
                       placeholder={'NIC No'}
                       onChangeText={value => handleInputChange('nicNo', value)}/>
                <Input autoCapitalize={'none'}
                       size={'large'}
                       status={errors.address ? 'danger' : 'basic'}
                       style={styles.input}
                       placeholder={'Address'}
                       onChangeText={value => handleInputChange('address', value)}/>

                <TouchableOpacity style={styles.locationBtn}
                                  onPress={() => navigation.push('SetLocation')}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Set Location</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => submit()}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        borderRadius: 5,
    },
    btn: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'black',
        padding: 20,
        height: 60,
    },
    locationBtn: {
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FDCD03',
        padding: 20,
        height: 60,
    }
});
