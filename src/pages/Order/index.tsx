import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,
} from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import ModalPicker from '../../components/ModalPicker'
import ListItem from '../../components/ListItem'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

type RouteDetailParams = {
    Order: {
        number: string | number
        order_id: string
    }
}

export type CategoryProps = {
    id: string
    name: string
}

type ProductProps = {
    id: string
    name: string
}

type ItemProps = {
    id: string
    product_id: string
    name: string
    amount: string | number
}

type OrderRouteProp = RouteProp<RouteDetailParams, "Order">

const Order = () => {
    const route = useRoute<OrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [products, setProducts] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [amount, setAmount] = useState("1")
    const [items, setItems] = useState<ItemProps[]>([])

    useEffect(() => {
        const loadInfo = async () => {
            const response = await api.get("/category")

            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo()
    }, [])

    useEffect(() => {
        const loadProducts = async () => {
            const response = await api.get("/product/category", {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        loadProducts()
    }, [categorySelected])

    const handleCloseOrder = async () => {
        try {
            await api.delete("/order", {
                params: {
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeCategory = (item: CategoryProps) => {
        setCategorySelected(item)
    }

    const handleChangeProduct = (item: ProductProps) => {
        setProductSelected(item)
    }

    const handleAdd = async () => {
        const response = await api.post("/order/add", {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])
    }

    const handleDeleteItem = async (item_id: string) => {
        await api.delete("/order/remove", {
            params: {
                item_id: item_id
            }
        })

        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })

        setItems(removeItem)
    }

    const handleFinishOrder = () => {
        navigation.navigate("FinishOrder", {
            number: route.params?.number,
            order_id: route.params?.order_id
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name='trash-2' size={28} color="#ff3f4b" />
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: "#f5f5f5" }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: "#f5f5f5" }}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor="#f5f5f5"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { opacity: items.length === 0 ? .3 : 1 }]}
                    disabled={items.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>
        </View>
    )
}

export default Order

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: "5%",
        paddingEnd: "4%",
        paddingStart: "4%",
        backgroundColor: '#2b2e37'
    },
    header: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
        marginTop: 24
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#f5f5f5",
        marginRight: 14
    },
    input: {
        width: "100%",
        backgroundColor: "#17181d",
        borderRadius: 4,
        height: 40,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 8,
        color: "#f5f5f5",
        fontSize: 20
    },
    qtdContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    qtdText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#f5f5f5"
    },
    actions: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    buttonAdd: {
        width: "20%",
        backgroundColor: "#3fd1ff",
        borderRadius: 4,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#2b2e37",
        fontWeight: "bold",
        fontSize: 18
    },
    button: {
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        height: 40,
        width: "75%",
        justifyContent: "center",
        alignItems: "center"
    }
})