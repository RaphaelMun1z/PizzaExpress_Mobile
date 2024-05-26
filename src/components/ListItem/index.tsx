import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Feather } from "@expo/vector-icons"

interface ItemProps {
    data: {
        id: string
        product_id: string
        name: string
        amount: string | number
    }
}

const ListItem = ({ data }: ItemProps) => {
    const handleDeleteItem = () => {

    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name='trash-2' size={25} color="#FF3F4B" />
            </TouchableOpacity>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#101026",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: .3,
        borderColor: "#8a8a8a"
    },
    item: {
        color: "#f5f5f5"
    }
})