import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, View, Text, TouchableOpacity, FlatList } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();

    function navigateToDetail(){
        navigation.navigate('Detail');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Seja bem-vinde!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e ajude a salvar o dia</Text>

            <FlatList
                data={[1, 2, 3, 4, 5]}
                style={styles.incidentList}
                keyExtractor={incident => String(incident)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG</Text>
                        <Text style={styles.incidentValue}>APAD</Text>

                        <Text style={styles.incidentProperty}>caso:</Text>
                        <Text style={styles.incidentValue}>Ajude a Perneta</Text>

                        <Text style={styles.incidentProperty}>valor</Text>
                        <Text style={styles.incidentValue}>R$120,00</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={navigateToDetail}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}