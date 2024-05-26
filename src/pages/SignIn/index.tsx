import React, { useState, useContext } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import { AuthContext } from '../../contexts/AuthContext'

const SignIn = () => {
    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        if (!email || email.trim() === "") {
            return
        }

        if (!password || password.trim() === "") {
            return
        }

        await signIn({ email, password })
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../../assets/logo.png")}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Digite seu e-mail'
                    style={styles.input}
                    placeholderTextColor="#f5f5f5"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />

                <TextInput
                    placeholder='Digite sua senha'
                    style={styles.input}
                    placeholderTextColor="#f5f5f5"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color="#f5f5f5" />
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2e37"
    },
    logo: {
        width: "50%",
        objectFit: "contain",
    },
    inputContainer: {
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 14
    },
    input: {
        width: "95%",
        height: 40,
        backgroundColor: "#17181d",
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#fff"
    },
    button: {
        width: "95%",
        height: 40,
        backgroundColor: "#ECA442",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2b2e37"
    }
})