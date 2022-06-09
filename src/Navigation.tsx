// import AnimatedTabBar, { setTabState } from './CustomTabBar';
import React, { ComponentType } from 'react';
import { navigationRef } from './helper/navigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Movie from './screen/Movie';
import MovieDetail from './screen/MovieDetail';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const routes: { [key in string]: ComponentType<any> } = {
    "Movie": Movie,
    "MovieDetail": MovieDetail,
}

const AppNavigator = () => {

    return (
        <MainStack.Navigator
            initialRouteName="Home"
            detachInactiveScreens={true}
            screenOptions={{
                detachPreviousScreen: false,
                gestureEnabled: true,
                headerShown: false,
                // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            {Object.keys(routes).map(key => (
                <MainStack.Screen
                    key={key}
                    name={key}
                    component={routes[key]}
                />
            ))}
        </MainStack.Navigator>
    );
};

export default () => {

    return (
        <NavigationContainer
            ref={navigationRef}
        >
            <RootStack.Navigator
                // initialRouteName="ActivationSuccess"
                detachInactiveScreens={true}
                screenOptions={{
                    gestureEnabled: true,
                    detachPreviousScreen: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <RootStack.Screen
                    name="Main"
                    component={AppNavigator}
                    options={{ headerShown: false }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
