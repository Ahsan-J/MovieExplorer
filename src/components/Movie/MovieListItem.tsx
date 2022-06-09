import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale } from 'react-native-size-matters';
import { navigate } from '../../helper/navigator';
import type { IMovieListItem } from '../../model/movie';

interface propTypes {
    movie?: IMovieListItem;
}

const MovieListItem = React.memo<React.PropsWithChildren<propTypes>>((props) => {
    const styles = useStyles();
    const onItemPress = () => {
        if (props.movie) {
            navigate("MovieDetail", {movieId: props.movie.imdbID})
        }
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={onItemPress}>
            <FastImage source={{uri: props.movie?.Poster}} style={styles.posterImage}/>
            <View style={styles.detailContainer}>
                <Text style={styles.movieTitle}>{props.movie?.Title}</Text>
                <Text style={styles.movieYear}>{props.movie?.Year}</Text>
            </View>
        </TouchableOpacity>
    )
});

const useStyles = () => {
    return useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'row',
            padding: moderateScale(4),
            margin: moderateScale(4),
        },
        detailContainer: {
            flex:1,
        },
        posterImage: {
            width: moderateScale(100),
            height: moderateScale(160),
            marginRight: moderateScale(8),
        },
        movieTitle: {
            color: "#f5f5f5",
            fontWeight: "700",
            fontSize: moderateScale(16),
        },
        movieYear: {
            color: "#f5f5f5",
            fontSize: moderateScale(12),
        },
    }), [])
}

export default MovieListItem;
