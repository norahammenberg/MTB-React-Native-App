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

    //Två variabler för email och lösenord skapas för att sätta deras olika stadier
    //, här kommer en sträng spars:
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Jag har valt att skapa ett enkelt log in system för att demostrerat att jag vill att det är enbart admin som ska kunna ändra i API/databasen.
    // detta är inte ett optimalt inloggning för emailen och lösenordet är hårdkodat och inte kopplat till en databas där lösen ordet är hashat. 
    
    //funktion onSubmit som kollar om lösenord och email stämmer stämmer det skickas användaren till Admin sidan. 
    //funtionen onSubmit kallas på när användaren trycker på knappen Countinue:
    const onSubmit = () => {
        if (email == "admin@meanwoodmtb.com" && password == "123") {
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

                        //när en förändring sker sparas förändringen i password:
                        onChangeText={(password) => setPassword(password)}
                    />

                    {/**Nät knappen trycks på körs functionen onSubmit */}
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