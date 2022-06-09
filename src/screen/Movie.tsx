import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text, RefreshControl } from "react-native";
import { useInfiniteQuery } from 'react-query';
import Header from '../components/layout/Header';
import Config from 'react-native-config';
import { IMovieListItem } from '../model/movie';
import MovieListItem from '../components/Movie/MovieListItem';
import { moderateScale } from 'react-native-size-matters';
import { RouteProp, useRoute } from '@react-navigation/native';
import { INavigationRootList } from '../model/navigation';

const Movie: React.FC = () => {
    const [meta, setMeta] = useState<{ total: number, page: number }>({
        total: 0,
        page: 0,
    })
    const styles = useStyles();
    const route = useRoute<RouteProp<Record<string, INavigationRootList['Movie']>, string>>();

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        refetch,
        isFetching,
    } = useInfiniteQuery([`MovieList`, Config.BASE_URL, Config.API_KEY, route.params?.search], async ({ pageParam }) => {
        const searchString = new URLSearchParams({
            s: route.params?.search || '',
            type: "movie",
            apikey: Config.API_KEY,
            page: pageParam || 1,
        })

        const response = await fetch(`${Config.BASE_URL}?${searchString}`, {
            method: "GET",
        })
        const responseData: {Search: Array<IMovieListItem>, totalResults: string} = await response.json();
        setMeta({
            page: parseInt(pageParam, 10) + 1,
            total: parseInt(responseData.totalResults, 10),
        })
        return responseData.Search;
    }, {
        getNextPageParam: () => {
            if (meta?.page < meta?.total) return meta?.page + 1
            return false;
        },
    })

    const renderItem = useCallback(({ item }: { item: IMovieListItem }) => (
        <MovieListItem movie={item} key={item?.imdbID} />
    ), [])

    const ListEmptyComponent = useMemo(() => {
        if (isLoading)
            return (
                <ActivityIndicator />
            )
        else
            return (
                <Text>
                    Search
                </Text>
            )
    }, [isLoading]);

    const onEndReached = async () => {
        if (!isFetching && hasNextPage) {
            fetchNextPage();
        }
    }

    return (
        <View style={styles.container}>
            <Header title="Movie" showBack={false} />
            <FlatList
                ListEmptyComponent={ListEmptyComponent}
                data={data?.pages?.flat() || []}
                renderItem={renderItem}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => `${item?.imdbID || index}`}
                ListFooterComponent={
                    <View style={{ paddingVertical: moderateScale(24) }}>
                        {isFetching ? <ActivityIndicator size="small" /> : null}
                    </View>
                }
                onEndReached={onEndReached}
                onEndReachedThreshold={0.7}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                    />
                }
            />
        </View>
    )
}

const useStyles = () => {
    return useMemo(() => StyleSheet.create({
        container: {
            backgroundColor: "#141A31",
            flex: 1,
        },
    }), [])
}

export default Movie;
