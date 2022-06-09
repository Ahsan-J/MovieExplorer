import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { createReduxStore } from './src/redux';

const store = createReduxStore();
const queryClient = new QueryClient()

class StoreApp extends Component {
    render() {
        return (
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <App />
                </Provider>
            </QueryClientProvider>
        )
    }
}

AppRegistry.registerComponent(appName, () => StoreApp);
