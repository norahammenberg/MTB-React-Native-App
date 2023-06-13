
import React from 'react';
import { useState } from 'react';
import { Text, 
    View, 
    Image, 
    SafeAreaView, 
    ScrollView,
} from 'react-native';
import styles from '../assets/styles/style';

function Ridersbikes ( { route, navigation }) {
    //variable to save params :
    const {ridersName} = route.params;
    const {id} = route.params;
   
    //usestate is used to show "Loading..." while result is being fetched.
    const [isLoading, setLoading] = useState(true);

    //useState to update new data fetched from the API
    const [mtb, setMtb] = useState([]);

    //if isLoadig is true: Fetching data from the APIfor the picked rider by inserting the ID :
    if (isLoading == true) {
       
        fetch (`https://.....cyclic.app/mtb/getOne/${id}`)
        .then (response => response.json())
        .then (mtb => {
            setLoading('false');
            setMtb(mtb);
            console.log(mtb);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <SafeAreaView style={styles.containerourriderssafe}>
            <ScrollView>
                <View style={styles.containerridersbikes}>
                    <View style={styles.imageswrap}>

                        <Image 
                            style={styles.image}
                            source={{uri: mtb.img,
                            }} 
                        />
                    </View>     

                    {isLoading == true && <Text style={styles.htext}>Loading...</Text>}
                    
                    {/**All info from the DB renders*/}
                    <Text style={styles.hridertext}>{ridersName} rides:</Text> 
                    <Text style={styles.hbrandtext}>{mtb.brand}</Text> 
                    <Text style={styles.paratext}>Model: {mtb.model}</Text> 
                    <Text style={styles.paratext}>Colour: {mtb.colour}</Text> 
                    <Text style={styles.paratext}>Fork: {mtb.fork}</Text> 
                    <Text style={styles.paratextlast}>Shock: {mtb.shock}</Text> 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Ridersbikes; 