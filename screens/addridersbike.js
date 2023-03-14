import React from 'react';
import { 
    Text, 
    View, 
    Button, 
    Alert, 
    TextInput, 
    SafeAreaView, 
    ScrollView,
    Image
} from 'react-native';

import styles from '../assets/styles/style';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, resize, SaveFormat } from 'expo-image-manipulator';



function Addridersbike ( { navigation }) {
    //sätter variblers stadie på de olika delar som ska läggas till i databasen: 
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [colour, setColour] = useState('');
    const [fork, setFork] = useState('');
    const [shock, setShock] = useState('');
    const [mtb, setMtb] = useState([]);
    //variabel som spara den valda bilden från mobilens lokala biblitotek. 
    const [selectedImage, setSelectedImage] = useState(null);
    //variabel som sparar bilden efter den blivit konverterad till binData
    const [photo64, setPhoto64] = useState('');
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    //funktion som tar hand om resultatet från den valde bilden.
    //https://docs.expo.dev/tutorial/image-picker/
    const pickImageAsync = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.1
            });
            //bildens uri sparas i selectedImage variablen
            setSelectedImage(result.assets[0].uri);
            setWidth(result.width);
            setHeight(result.height);
            
            //SKRIV REF
            //en variabel skapas där bildens uri från mobilens lokala bibliotek görs om till base64 så att den kan skicaks till API och sparas i databasen. 
            const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
            
            //base64 sparas tillphoto64 inkluderad text som behövs för att kunna visa upp bilden. 
            //dena variabel skickas sedan med i POST till API:et
            setPhoto64('data:image/jpeg;base64,' + base64);
            //expo-image-manipulator documentetion
            const newSize = await manipulateAsync(photo64, [
                {resize: {width: 200, height: 200}},
                ],
                {base64: true, compress: 1, format: SaveFormat.PNG}
            );
            //sätter nytt stadie på selected image
            setSelectedImage(newSize);
            //sätter nytt stadie med den nya filens base64
            setPhoto64('data:image/jpeg;base64,' + newSize.base64);
        }
        catch(error){
          console.log(`my Error : ${error}`);
          
        }
    };

    /*const reSize = async () => {
        else
        {
            Alert.alert('Your Images is to big please pick one that is 1500 pixels or smaller' );
            console.log('To big');
        }
    }*/

    // jag har sökt hjälp från https://www.geeksforgeeks.org/how-to-make-a-post-request-from-frontend-in-react-native/
    //för att genomföra en POST till mitt API:
    //jag gör ändringar i det jag lärt mig för att passa mitt projekt och min POST:
    //skapar en variabel där jag använder POST metoden och gör informationen i bodyn till en sträng så att det kan föras in i Databasen: 
    //I bodyn hårdkodar jag in en binarydata för en bild som kommer läggas till i varje nytt objekt:
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
            img: photo64
        }),
    }
    //console.log('postOption' + postOption.body);
    //En funktion för att lägag till en  ny cyklist information skapas, denna funktion kallas på när användaren klickar på "Add Rider" knappen. 

    const postNewRiderToAPI = async () => {
    fetch ('https://attractive-slug-gear.cyclic.app/mtb/CREATE', postOption ) 
        .then (response => {
            response.json()
            .then (mtb => {
                setMtb(mtb)
                Alert.alert("Rider Added:\n" + name + " " + brand + " " + model + " " + colour + " " + fork + " " + shock );
                console.log(mtb);
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

                    <View style={styles.inputfilled}>
                        <Text style={styles.hridertext}>Add a New Rider and Their Bike:</Text>
                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratextlogin}>Name:</Text>
                        </View>
                                            
                        {/*För varje förändring användaren gör i de olike inpit fälten sparas det nya stadiet med hjälp av onCHangeTaxt och useState: */}
                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                editable
                                maxLength={40}
                                onChangeText={name => setName(name)}
                                value={name}
                                style={styles.input}
                                placeholder='Write here:' 
                            />
                        </View>

                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratextlogin}>Bikes Brand:</Text>
                        </View>

                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                editable
                                maxLength={40}
                                onChangeText={brand => setBrand(brand)}
                                value={brand}
                                style={styles.input}  
                                placeholder='Write here:' 
                            />
                        </View>

                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratextlogin}>Model:</Text>
                        </View>

                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                editable
                                maxLength={40}
                                onChangeText={model => setModel(model)}
                                value={model}
                                style={styles.input} 
                                placeholder='Write here:' 
                            />
                        </View>
                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratextlogin}>Colour:</Text>
                        </View>
                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                editable
                                maxLength={40}
                                onChangeText={colour => setColour(colour)}
                                value={colour}
                                style={styles.input}
                                placeholder='Write here:' 
                            />
                        </View>
                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratextlogin}>Fork:</Text>
                        </View>
                        <View style={styles.inputfilleditem}>
                            <TextInput 
                                editable
                                maxLength={40}
                                onChangeText={fork => setFork(fork)}
                                value={fork}
                                style={styles.input}
                                placeholder='Write here:' 
                            />
                        </View>
                        <View style={styles.inputfilleditem}>
                            <Text style={styles.paratextlogin}>Shock:</Text>
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
                        <View style={styles.buttonwrapperchoosephoto}>
                            <Button 
                                color={'#4E6448'}
                                title='Choose a Photo' 
                                onPress={pickImageAsync}
                            /> 
                        </View>
                        
                        <View style={styles.imageswrap}>
                            <Image 
                                style={styles.image}
                                source={{uri: selectedImage,
                                }} 
                                
                            />
                        </View>
                        
                    </View>
                    <View style={styles.buttonwrapperapdatedelete}>
                        <Button 
                            color={'#4E6448'}
                            title='Add Rider' 
                            onPress={()=> {
                                postNewRiderToAPI();
                                navigation.navigate('Admin');
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Addridersbike; 