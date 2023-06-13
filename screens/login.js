import React, { useState } from 'react';
import { 
    Text, 
    View,  
    Image, 
    Alert,
    Pressable,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button
     } from 'react-native';
import styles from '../assets/styles/style';

function Login ( { navigation }) {

    //save the state of the email and password variable:
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //very simple login system
    const onSubmit = () => {
        if (email == "!!" && password == "!!") {
            navigation.navigate('Admin')
        }
        else {
            return Alert.alert("Access denied...\nPlease enter Admins Login")
        }
    }

    return (
        <SafeAreaView style={styles.containerourriderssafe}>
            <ScrollView>
                <View style={styles.containerridersbikes}>
                    <View style={styles.imageswrap}>
                        <Image 
                            style={styles.image}
                            source={require('../assets/Images/mvmtb.png')} 
                        />
                    </View>
                    
                    <Text style={styles.hridertext}>Welcome</Text> 
                    <Text style={styles.paratext}>Meanwood Valley MTB's Admin please </Text>
                    <Text style={styles.paratext}>log in to continue: </Text>

                    
                    <Text style={styles.paratextlogin}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"

                        //när en förändring sker sparas förändringen i email
                        onChangeText={(email) => setEmail(email)}
                    />

                    <Text style={styles.paratextlogin}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}

                        //changes saves to password:
                        onChangeText={(password) => setPassword(password)}
                    />

                    {/**executing onSubmit */}
                    <View style={styles.buttonwrapperupdatedelete}>
                        <Button 
                            color={'#4E6448'}
                            title='Login' 
                            onPress={onSubmit}
                        />
                    </View>  
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login; 