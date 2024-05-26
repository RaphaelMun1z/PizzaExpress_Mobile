import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Feather } from '@expo/vector-icons'

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

import { api } from '../../services/api'

type RouteDetailParams = {
    FinishOrder: {
        number: string | number,
        order_id: string
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

const FinishOrder = () => {
    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const handleFinish = async () => {
        try {
            await api.put("/order/send", {
                order_id: route.params?.order_id
            })

            navigation.popToTop()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather name='shopping-cart' size={20} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    )
}

export default FinishOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2e37',
        paddingVertical: "5%",
        paddingHorizontal: "4%",
        justifyContent: "center",
        alignItems: "center"
    },
    alert: {
        fontSize: 20,
        color: "#f5f5f5",
        fontWeight: "bold",
        marginBottom: 12
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#f5f5f5",
        marginBottom: 12
    },
    button: {
        backgroundColor: "#ECA442",
        flexDirection: "row",
        width: "65%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: "bold",
        color: '#2b2e37',
    }
})