import React from 'react';
import { Text, View, Button, Alert, TextInput, SafeAreaView, ScrollView, } from 'react-native';
import styles from '../assets/styles/style';
import { useState } from 'react';

function Updateordelete  ( { route, navigation }) {
        
    //useState to update new data fetched from the API
    const [mtb, setMtb] = useState([]);

    //variable to save params :
    const {id} = route.params;
    const {ridersBrand} = route.params;
    const {ridersModel} = route.params;
    const {ridersColour} = route.params;
    const {ridersFork} = route.params;
    const {ridersShock} = route.params;
  
    //sset variables with strings from params 
    const [name, setName] = useState(ridersName);
    const [brand, setBrand] = useState(ridersBrand);
    const [model, setModel] = useState(ridersModel);
    const [colour, setColour] = useState(ridersColour);
    const [fork, setFork] = useState(ridersFork);
    const [shock, setShock] = useState(ridersShock);
    
    //POST to the API:
    const postOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            name: name,
            brand: brand,
            model: model,
            colour: colour,
            fork: fork,
            shock: shock,  
        }),
    }

    //Function that executes when user cliks on "Add Edit". 
    const editRiderToAPI = async () => {

        fetch (`https://......cyclic.app/mtb/UPDATE/${id}`, postOption ) 
        .then (response => {
            response.json()
            .then (mtb => {
                setMtb(mtb)
                //an Alert for changes made:
                Alert.alert("You edit:\n" + name + " " + brand + " " + model + " " + colour + " " + fork + " " + shock );
                
            })
        })
        .catch(error => {
            console.error(error);
        });
    }

    //DELETE
    const deleteOption = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            name: name,
            brand: brand,
            model: model,
            colour: colour,
            fork: fork,
            shock: shock,  
        }),
    }

    //DELETE 
    const deleteRiderFromAPI = async () => {
        fetch (`https://.....cyclic.app/mtb/DELETE/${id}`, deleteOption ) 
            .then (response => {
                response.json()
                .then (mtb => {
                    setMtb(mtb)
                    Alert.alert("Rider is deleted");
                })
            })
            .catch(error => {
                console.error(error);
            });
        }

    return (
        <SafeAreaView style={styles.containerourriderssafe}>
            <ScrollView>
                <View style={styles.containeruppdatedelete}>

                        <Text style={styles.hridertext}>Edit {ridersName} Bike:</Text>
                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratext}>Name:</Text>
                        </View>
                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                maxLength={40}
                                onChangeText={name => setName(name)}
                                value={name}
                                style={styles.input}
                                placeholder='Write here:'
                                
                            />
                        </View>

                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratext}>Bikes Brand:</Text>
                        </View>

                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                
                                maxLength={40}
                                onChangeText={brand => setBrand(brand)}
                                value={brand}
                                style={styles.input}  
                                placeholder='Write here:' 
                            />
                        </View>

                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratext}>Model:</Text>
                        </View>

                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                
                                maxLength={40}
                                onChangeText={model => setModel(model)}
                                value={model}
                                style={styles.input} 
                                placeholder='Write here:' 
                            />
                        </View>
                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratext}>Colour:</Text>
                        </View>
                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                
                                maxLength={40}
                                onChangeText={colour => setColour(colour)}
                                value={colour}
                                style={styles.input}
                                placeholder='Write here:' 
                            />
                        </View>
                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratext}>Fork:</Text>
                        </View>
                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                
                                maxLength={40}
                                onChangeText={fork => setFork(fork)}
                                value={fork}
                                style={styles.input}
                                placeholder='Write here:' 
                            />
                        </View>
                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratext}>Shock:</Text>
                        </View>
                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                editable
                                maxLength={40}
                                onChangeText={shock => setShock(shock)}
                                value={shock}
                                style={styles.input}
                                placeholder='Write here:'   
                            />
                        </View>
                        
                    {/**The function editRiderToAPI is called When user clicks on Add edist*/}
                    <View style={styles.buttonwrapperupdatedelete}>
                        <Button 
                            color={'#4E6448'}
                            title='Save Changes' 
                            onPress={()=> {
                                editRiderToAPI();
                                navigation.navigate('Admin');
                            }}  
                        />
                    </View>

                    {/**The function deleteRiderFromAPI is called When user clicks on Delete*/}
                    <View style={styles.buttonwrapperupdatedelete}>
                        <Button 
                            color={'red'}
                            title='delete this rider' 
                            onPress={()=> {
                                deleteRiderFromAPI();
                                navigation.navigate('Admin');
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Updateordelete; 