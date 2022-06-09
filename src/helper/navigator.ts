import React from 'react';
import { NavigationContainerRef, NavigationState, ParamListBase, StackActions } from '@react-navigation/native';
import { INavigationRootList } from '../model/navigation';

export const navigationRef = React.createRef<NavigationContainerRef<INavigationRootList>>();

export const getActiveRouteName = (navState: NavigationState, type = ""): string => {
    if (navigationRef.current) {
        const state: NavigationState = navState || navigationRef.current.getRootState();
        const route = state.routes[state.index];
        if (route.state && route.state.type === type) {
            return getActiveRouteName(route.state as NavigationState);
        }
        return route.name;
    }
    return '';
};

export const navigate = (name: keyof INavigationRootList, params?: INavigationRootList[keyof INavigationRootList]) => {
    if (navigationRef.current) {
        navigationRef.current.navigate(name, params);
    }
};

export const replaceNavigate = (name: string, params: ParamListBase) => {
    if (navigationRef.current) {
        navigationRef.current.dispatch(StackActions.replace(name, params));
    }
};

export const goBack = () => {
    if (navigationRef.current) {
        navigationRef.current.goBack();
    }
};
