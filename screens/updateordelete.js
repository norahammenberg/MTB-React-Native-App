import React from 'react';
import { Text, View, Button, Alert, TextInput, SafeAreaView, ScrollView, } from 'react-native';
import styles from '../assets/styles/style';
import { useState } from 'react';

function Updateordelete  ( { route, navigation }) {
        
    //useState används för att uppdatera variablen mtb efter att data har hämtas in API:et.
    const [mtb, setMtb] = useState([]);

    //alla params som skickades med från förgående sidan (admin) sparas i vars sin variabel:
    const {ridersName} = route.params;
    const {id} = route.params;
    const {ridersBrand} = route.params;
    const {ridersModel} = route.params;
    const {ridersColour} = route.params;
    const {ridersFork} = route.params;
    const {ridersShock} = route.params;
  
    //sätter variblers stadie: de börjar med de namn, brand, model mm som skicaks med från förgående sida (admin).
    //detta gör att om en del inte ändras av användaren kommer de fortfarande ha sitt orginal värde. 
    const [name, setName] = useState(ridersName);
    const [brand, setBrand] = useState(ridersBrand);
    const [model, setModel] = useState(ridersModel);
    const [colour, setColour] = useState(ridersColour);
    const [fork, setFork] = useState(ridersFork);
    const [shock, setShock] = useState(ridersShock);
    
    // jag har sökt hjälp från https://www.geeksforgeeks.org/how-to-make-a-post-request-from-frontend-in-react-native/
    //för att genomföra en POST till mitt API:
    //jag gör ändringar i det jag lärt mig för att passa mitt projekt och min POST:
    //skapar en variabel där jag använder POST metoden och gör informationen i bodyn till en sträng så att det kan föras in i Databasen: 
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

    //En funktion för att EDIT en cyklist information skapas, denna funktion kallas på när användaren klickar på "Add edit" knappen. 
    const editRiderToAPI = async () => {
        //en fetch görs till den URL som används när ett objekt ska ändras, med rätt id från vald cyklist. 
        // till denna fetchen läggs variablen: postOption till så att denna information läggs in i databasen:
        fetch (`https://attractive-slug-gear.cyclic.app/mtb/UPDATE/${id}`, postOption ) 
        .then (response => {
            response.json()
            .then (mtb => {
                setMtb(mtb)
                //en Alert ruta medelar att användaren har ändrat ett okjekt.
                Alert.alert("You edit:\n" + name + " " + brand + " " + model + " " + colour + " " + fork + " " + shock );
                
            })
        })
        .catch(error => {
            console.error(error);
        });
    }

    //samma teknik som ovan används för att genomföra en DELETE men jag byter till DELETE istället för POST och använde rätt URL för DELETE:
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
        fetch (`https://attractive-slug-gear.cyclic.app/mtb/DELETE/${id}`, deleteOption ) 
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
                        {/**För varje förändring användaren gör i de olike inpit fälten sparas det nya stadiet med hjälp av onCHangeTaxt och useState: */}
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
                        
                    {/**När användaren klickar på knappen Add edist trigags editRiderToAPI funtionen: */}
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

                    {/**När användaren klickar på knappen Delete trigags eleteRiderFromAPI funtionen: */}
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