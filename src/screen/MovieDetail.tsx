import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { useQuery } from 'react-query';
import Header from '../components/layout/Header';
import Config from 'react-native-config';
import { IMovie } from '../model/movie';
import { RouteProp, useRoute } from '@react-navigation/native';
import { INavigationRootList } from '../model/navigation';
import FastImage from 'react-native-fast-image';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { getDeviceWidth } from '../helper/size';
import Icon from '../components/Icon';

const MovieDetail: React.FC = () => {
    const styles = useStyles();
    const route = useRoute<RouteProp<Record<string, INavigationRootList['MovieDetail']>, string>>();

    const {
        data,
    } = useQuery([`MovieItem_${route.params?.movieId}`, Config.BASE_URL, Config.API_KEY, route.params?.movieId], async () => {
        const searchString = new URLSearchParams({
            i: route.params?.movieId || '',
            apikey: Config.API_KEY,
        })

        const response = await fetch(`${Config.BASE_URL}?${searchString}`, {
            method: "GET",
        })

        const responseData: IMovie = await response.json();
        return responseData;
    })

    return (
        <View style={styles.container}>
            <Header title={data?.Title || ""} />
            <FastImage style={styles.posterImage} source={{ uri: data?.Poster }} />
            <View style={styles.detailContainer}>
                <Text style={styles.movieTitle}>{data?.Title}</Text>
                <View style={styles.metaDataContainer}>
                    <Text style={styles.metaText}>{data?.Year} . {data?.Rated} . {data?.Runtime}</Text>
                    <View style={styles.imdbRatingWrapper}>
                        <Icon name="star" style={styles.starIcon}/>
                        <Text style={styles.metaText}>{data?.imdbRating} / 10</Text>
                    </View>
                </View>
                <View style={styles.genreWrapper}>
                    {data?.Genre?.split(",")?.map((genre) => (
                        <Text key={genre} style={styles.genreBadge}>
                            {genre}
                        </Text>
                    ))}
                </View>
                <Text style={styles.moviePlot}>{data?.Plot}</Text>
                <View style={styles.recordDetail}>
                        <Text style={styles.recordTitle}>Director</Text>
                        <Text style={styles.recordValue}>{data?.Director}</Text>
                </View>
                <View style={styles.recordDetail}>
                        <Text style={styles.recordTitle}>Writers</Text>
                        <Text style={styles.recordValue}>{data?.Writer}</Text>
                </View>
                <View style={styles.recordDetail}>
                        <Text style={styles.recordTitle}>Stars</Text>
                        <Text style={styles.recordValue}>{data?.Actors}</Text>
                </View>
            </View>
        </View>
    )
}

const useStyles = () => {
    return useMemo(() => StyleSheet.create({
        container: {
            backgroundColor: "#141A31",
            flex: 1,
        },
        posterImage: {
            width: getDeviceWidth(),
            height: moderateVerticalScale(180),
        },
        detailContainer: {
            margin: moderateScale(12),
        },
        movieTitle: {
            fontSize: moderateScale(26),
            color: "#f5f5f5",
        },
        metaDataContainer: {
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
        },
        moviePlot: {
            fontSize: moderateScale(14),
            color: "#f5f5f5",
        },
        genreWrapper: {
            flexDirection: "row",
        },
        metaText: {
            color: "#f5f5f5",
        },
        imdbRatingWrapper: {
            flexDirection:'row',
            alignItems:'center',
        },
        starIcon: {
            color: "#C9A62C",
            fontSize: moderateScale(24),
        },
        genreBadge: {
            borderRadius: moderateScale(20),
            borderWidth: moderateScale(2),
            borderColor: "#f5f5f5",
            color: "#f5f5f5",
            marginVertical: moderateScale(4),
            marginHorizontal: moderateScale(2),
            paddingHorizontal: moderateScale(8),
            fontSize: moderateScale(16),
            textAlign: 'center',
        },
        recordDetail: {
            flexDirection: 'row',
            padding: moderateScale(4),
            borderColor: "#f5f5f5",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: moderateScale(4),
        },
        recordTitle: {
            flex:0.3,
            color: "#f5f5f5",
            fontSize: moderateScale(14),
            fontWeight: "600",
        },
        recordValue: {
            flex:0.7,
            color: "#f5f5f5",
            fontSize: moderateScale(14),
        },
    }), [])
}


export default MovieDetail
