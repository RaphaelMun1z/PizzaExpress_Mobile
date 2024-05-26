import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native'

import { CategoryProps } from "../../pages/Order"

interface ModalPickerProps {
    options: CategoryProps[]
    handleCloseModal: () => void
    selectedItem: (item: CategoryProps) => void
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

const ModalPicker = ({ options, handleCloseModal, selectedItem }: ModalPickerProps) => {
    const onPressItem = (item: CategoryProps) => {
        selectedItem(item)
        handleCloseModal()
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {options.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)} >
                            <Text style={styles.item}>
                                {item?.name}
                            </Text>
                        </TouchableOpacity >
                    ))}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

export default ModalPicker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: "#8a8a8a",
        borderRadius: 4
    },
    option: {
        alignItems: "flex-start",
        borderTopWidth: .8,
        borderTopColor: "#8a8a8a"
    },
    item: {
        margin: 18,
        fontSize: 14,
        fontWeight: "bold",
        color: "#101026"
    }
})