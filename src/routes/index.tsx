import React, { useContext } from 'react'

import { View, ActivityIndicator } from 'react-native'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

import { AuthContext } from '../contexts/AuthContext'

const Routes = () => {
    const { isAuthenticated, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#30475e",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator size={60} color="#f5f5f5" />
            </View>
        )
    }

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes