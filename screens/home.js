import React from 'react';
import {  View, Button, Image } from 'react-native';
import styles from '../assets/styles/style';

function Home ( { navigation }) {
    return (
        <View style={styles.containerhome}>
            <View style={styles.imageswrap}>
                <Image 
                    style={styles.imagehome}
                    source={require('../assets/Images/mvmtb.png')} 
                />
            </View>
            
            <View style={styles.buttonwrapperhome}>
                <Button 
                    color={'#4E6448'}
                    title='Meet Our Riders' 
                    onPress={()=> navigation.navigate('Ourriders')}
                />
            </View>            
            <View style={styles.buttonwrapperhome}>
                <Button 
                    color={'#4E6448'}
                    title="About Meanwood Valley's MTB" 
                    onPress={()=> navigation.navigate('About')}
                /> 
            </View>
        </View>
    )
}

export default Home; 