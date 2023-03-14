
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
    //variabler skapas för den params som skicakdes med från ourriders sidan:
    const {ridersName} = route.params;
    const {id} = route.params;
   
    //usestate för att se om API anroppet laddas eller ej. är isLAoding True visas Loading... på sidan. 
    const [isLoading, setLoading] = useState(true);

    //useState används för att uppdatera variablen mtb efter att data har hämtas in API:et.
    const [mtb, setMtb] = useState([]);

    //om isLoadig är sant så Fetching data från API:ET för det spesefika ID nummersom den valde cyklisten har:
    if (isLoading == true) {
        //feth körs direkt. om det ska köras vid ett särskilt tillfälle lägg den i en funkyion och körden. 
        fetch (`https://attractive-slug-gear.cyclic.app/mtb/getOne/${id}`)
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

                        {/**bilden från API visas*/}
                        <Image 
                            style={styles.image}
                            source={{uri: mtb.img,
                            }} 
                        />
                    </View>     
              
                    {/** Om API anroppet laddas skrivs Loading.. ut:*/}
                    {isLoading == true && <Text style={styles.htext}>Loading...</Text>}
                    
                    {/**All information från databasen för vald cyklist skrivs ut: */}
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