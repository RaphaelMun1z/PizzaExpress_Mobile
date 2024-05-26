import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

import { api } from '../../services/api'

const Dashboard = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [number, setNumber] = useState("")

    const openOrder = async () => {
        if (!number || number === "") {
            return
        }

        const response = await api.post("/order", {
            table: Number(number)
        })

        navigation.navigate('Order', { number: number, order_id: response.data.id })

        setNumber("")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>
            <TextInput
                placeholder='Número da mesa'
                placeholderTextColor="#f5f5f5"
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />
            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: '#2b2e37'
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#f5f5f5",
        marginBottom: 24
    },
    input: {
        width: "90%",
        height: 60,
        backgroundColor: "#17181d",
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 22,
        color: "#f5f5f5"
    },
    button: {
        width: "90%",
        height: 40,
        backgroundColor: "#ECA442",
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#2b2e37",
        fontWeight: "bold"
    }
})