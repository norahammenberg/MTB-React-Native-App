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

function Addridersbike ( { navigation }) {
    //set the variables state on the different parts that will be added to the DB. 
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [colour, setColour] = useState('');
    const [fork, setFork] = useState('');
    const [shock, setShock] = useState('');
    const [mtb, setMtb] = useState([]);

    //the images picked from the moblies local storage saves to this variable
    const [selectedImage, setSelectedImage] = useState(null);
    //variabel som sparar stadiet bilden efter den blivit konverterad till binData
    const [photo64, setPhoto64] = useState('');
    const [fileSize, setFileSize] = useState(null);

    //function that checks the files size
    //:https://stackoverflow.com/questions/41372152/react-native-how-to-get-file-size-mime-type-and-extension
    //expo FileSystem docs:
    //https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemgetinfoasyncfileuri-options
    getFileSize = async () => {
        let fileInfo = await FileSystem.getInfoAsync(selectedImage);
        setFileSize(fileInfo.size); 
    };
    
    //function that deals with the result from the choosen images
    //https://docs.expo.dev/tutorial/image-picker/
    const pickImageAsync = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.1
            });

            //the images uri saves in selectedImage variable.
            setSelectedImage(result.assets[0].uri);
            
            //the images uri transforms to base64 to be sent to the API and saved in the DB, saves in this variable.
            //https://stackoverflow.com/questions/34908009/react-native-convert-image-url-to-base64-string/57454653#57454653?newreg=6e1e63e1bc9f40aaafbb5b231b611bc9
            //https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemreadasstringasyncfileuri-options
            const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
            
            //base64 saves to  photo64 including text that needs to show the images.
            setPhoto64('data:image/jpeg;base64,' + base64);
            getFileSize(fileSize);
        }
        //catches error:
        catch(error){
          console.log(`my Error : ${error}`);
        }
    };
    

    //function that executes when the user adds a rider:
    const sendData = async () => {
        //if statement that check image size: 
        //if images is 55000 or smaller it can be used.:
        if(fileSize <= 55000) {
           
            console.log('Correct size is choosen')

            //function that sends the data to the API:
            postNewRiderToAPI();

            //user navigates back to admin:
            navigation.navigate('Admin');
        }
       
        else if(fileSize >= 55000) {
            console.log(fileSize)
            //if the images is to large:
            Alert.alert('Your image is to large, \nPlease choose a smaller images')
        }
        else{
            console.log('Will not work' + fileSize)
        }
    };

    //https://www.geeksforgeeks.org/how-to-make-a-post-request-from-frontend-in-react-native/
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
            img: photo64
        }),
    }
   
    //Function that executes when user cliks on "Add Rider". 
    const postNewRiderToAPI = async () => { 
        fetch ('https://......cyclic.app/mtb/CREATE', postOption ) 
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
                                            
                        {/*all changes saves to the variable with help of onChangeText and useState: */}
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
                                sendData();
                                
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Addridersbike; 