import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import styles from '../assets/styles/style';

function About ( { navigation }) {
    return (
        <View style={styles.containerhome}>
            <View style={styles.imageswrap}>
                <Image 
                    source={require('../assets/Images/night.png')} 
                />
            </View>
            <Text style={styles.htext}>Hi!</Text>
            <Text style={styles.paratextabout}>We are a happy group of mountain bikers that love riding our bikes. We often meet for a night ride once a week. Our favorite riding place is MeanwoodValley Trail!</Text>
            <View style={styles.buttonwrapperhome}>
                <Button 
                    color={'#4E6448'}
                    title='Back' 
                    onPress={()=> navigation.navigate('Home')}
                />
            </View>
            
        </View>
    )
}

export default About; 