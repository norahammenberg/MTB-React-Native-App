import React from 'react';
import {  
    Text, 
    View, 
    Button, 
    SafeAreaView, 
    ScrollView, 
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../assets/styles/style';
import { useIsFocused } from '@react-navigation/native'

function Ourriders ({  navigation }) {
    //variabel isFocus skapas för att använda useIsFocused för att ladda om sidan varje gång den åter besöks efter 
    //första uppladdning. detta för att kunna visa förändringar som skapas i API/databasen. 
    const isFocused = useIsFocused();

    //usestate för att se om API anroppet laddas eller ej. är isLAoding True visas Loading... på sidan. 
    const [isLoading, setLoading] = useState(true);

    //useState används för att uppdatera variablen mtb efter att data har hämtas in API:et.
    const [mtb, setMtb] = useState([]);

    //funktion som heter reload skapas med API fetch. Jag skapar en funktion så att jag lätt kan anroppa denna igen när jag
    //vill att sidan ska laddas på nytt. 
    const reload = () => {

        //af satts används för att ta reda på om isLading är true eller att isFocused är true. 
        //Är den ena eller den andra sant så körs fetchen. Jag använder mig av båda för att jag
        // vill att en ny fetch ska göras både när isLoading och isFocused är sant. Detta gör att 
        //även efter jag har laggt till en ny cyklist eller ändrt en gammal cyklist körs en fetch från API:
        if (isLoading == true || isFocused == true) {

            //fetching data från API
            fetch ('https://attractive-slug-gear.cyclic.app/mtb/')
            .then (response => response.json())
            //datan från API:et sparas i mtb så att jag kan använda informationen och rändera ut den. 
            .then (mtb => {
                setMtb(mtb);
                setLoading('false');
            })
            //fångar errors och skriver ut i console.log om error upppstår
            .catch(error => {
                console.error(error);
            });
        }
    };
    //useEffect används för att köra functionen relad när isFocused har ändrat sig från false till true. 
    //Detta blir efter varje gång användaren har tex ändrat en cyklsist information eller en ny cyklist har lagts till:
    useEffect(() => {
        reload();
    },[isFocused])
    
    
    return (
        //för att kunna scrolla användas SafeAreaView och ScrollView 
        <SafeAreaView style={styles.containerourriderssafe}>
            <ScrollView>
                <View style={styles.containerourriders}>
                    <Text style={styles.htext}>Meet our Riders:</Text>

                    {/** Om API anroppet laddas skrivs Loading.. ut:*/}
                    {isLoading == true && <Text style={styles.htext}>Loading...</Text>}

                    {/** loppar igenom mtb variablen och skriver ut alla cyklisters namn och en knapp för att kunna läsa mer:*/}
                    {mtb.map((mtb, index) => (
                        <View style={styles.adminlistwrapper}>
                            <View style={styles.ourriderstext}>
                                <Text 
                                    key={index} 
                                    style={styles.paratext}
                                >
                                {mtb.name}
                                </Text>
                            </View>
                        
                            <View style={styles.ourriderstext}>
                                {/** När användaren klickar på knappen skickas två params med: mtb.name och mtb._id till sidan 
                                 * RIdersbike så att jag kan visa just den valdes cyklist information*/}
                                <Button 
                                    color={'#4E6448'}
                                    title='My bike' 
                                    onPress={()=> {
                                            navigation.navigate('Ridersbikes',  {
                                                ridersName: mtb.name,
                                                id: mtb._id,  
                                            });
                                        }
                                    }
                                />
                            </View>
                        </View>
                    ))}
                </View>

                    <View style={styles.cointaineradmin}> 
                                   
                        <View style={styles.wrapperadmin}>
                            <View style={styles.adminwrapper}>
                                <Text style={styles.admintext}>Administration:</Text>    
                            </View>        
                            <View style={styles.adminwrapper}>
                                <Button 
                                    color={'#4E6448'}
                                    title='Login' 
                                    onPress={()=> navigation.navigate('Login')}
                                />
                            </View>
                        </View>
                    </View> 
            </ScrollView>
        </SafeAreaView>
    )
}

export default Ourriders; 