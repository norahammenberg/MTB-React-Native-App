import React from 'react';
import { 
    Text, 
    View, 
    Button, 
    Image,
    SafeAreaView, 
    ScrollView
} from 'react-native';
import styles from '../assets/styles/style';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native'

function Admin ( { navigation }) {
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
            fetch ('https://.......cyclic.app/mtb/')
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
                <View style={styles.containerridersbikes}>
                    <View style={styles.imageswrap}>
                        <Image 
                            style={styles.image}
                            source={require('../assets/Images/mvmtb.png')} 
                        />
                    </View>
                    
                    <Text style={styles.hridertext}>Welcome to Meanwood Valley MTB's Admin Page</Text> 
                   
                    <View style={styles.wrapperadminpage}>
                        <View>
                            <Text style={styles.paratext}>Would you like to </Text>
                        </View>
                        <View style={styles.adminadd}>
                            <Button 
                                color={'#4E6448'}
                                title='Add Rider' 
                                onPress={()=> {
                                        navigation.navigate('Addridersbike');
                                    }
                                }
                            />
                        </View>
                        <View style={styles.adminadd}>
                            <Text style={styles.paratext}>or would</Text>
                        </View>
                    </View>
                    <View style={styles.adminaddlast}>
                        <Text style={styles.paratext}>you like to edit ot delete a rider: </Text>
                    </View>

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
                        
                            <View>

                                {/** when user click on a rider all the info is sent as params.*/}
                                <Button 
                                    color={'#4E6448'}
                                    title='Edit or delete' 
                                    onPress={()=> {navigation.navigate('Updateordelete',  {
                                                ridersName: mtb.name,
                                                id: mtb._id,
                                                ridersBrand: mtb.brand,
                                                ridersModel: mtb.model,
                                                ridersColour: mtb.colour,
                                                ridersFork: mtb.fork,
                                                ridersShock: mtb.shock
                                            });
                                        }
                                    }
                                />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Admin; 