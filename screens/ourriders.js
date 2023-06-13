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
    
    //useIsFocused is used to reload the page everytime that user visit the page to be able to show changes in the API.
    const isFocused = useIsFocused();

     //usestate is used to show "Loading..." while result is being fetched.
    const [isLoading, setLoading] = useState(true);

    //useState to update new data fetched from the API
    const [mtb, setMtb] = useState([]);

        //function that fetching data from the API
 
    const reload = () => {

        if (isLoading == true || isFocused == true) {

            //fetching data from the API
            fetch ('https://......cyclic.app/mtb/')
            .then (response => response.json())
            //datan from the API saves to the variable mtb.
            .then (mtb => {
                setMtb(mtb);
                setLoading('false');
            })
            //catching errors
            .catch(error => {
                console.error(error);
            });
        }
    };
    
    //executing the function reload everytime isfocused have changed. 
    useEffect(() => {
        reload();
    },[isFocused])
    
    
    return (
        <SafeAreaView style={styles.containerourriderssafe}>
            <ScrollView>
                <View style={styles.containerourriders}>
                    <Text style={styles.htext}>Meet our Riders:</Text>

                    {isLoading == true && <Text style={styles.htext}>Loading...</Text>}

                    {/** map through the mtb variable and render info:*/}
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
                                {/** when user click on a rider all the info is sent as params.*/}
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