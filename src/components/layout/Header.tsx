import React, { useMemo, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Keyboard, Platform, TextInput, TextStyle } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { getDeviceHeight, getDeviceWidth } from '../../helper/size';
import { goBack, navigate } from '../../helper/navigator';
import Icon from '../Icon';

interface propTypes {
    showBack?: boolean;
    style?: TextStyle;
    titleStyle?: TextStyle;
    title: string;
}

const Header: React.FC<propTypes> = React.memo((props: propTypes) => {
    const styles = useStyles(props);
    const inputRef = useRef<TextInput>();
    const timeoutSearch = useRef<NodeJS.Timeout>();
    const textInputValue = useRef<string>("");

    useEffect(() => {
        const keyboardSub = Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup functionS
        return () => {
            keyboardSub.remove();
        }
    }, []);

    const _keyboardDidHide = () => {
        if (inputRef.current) inputRef.current.blur()
    };

    const searchMovie = () => {
        navigate("Movie", { search: textInputValue.current })
    }

    const onChangeText = (text: string) => {
        textInputValue.current = text;
        clearTimeout(timeoutSearch.current);
        timeoutSearch.current = setTimeout(searchMovie, 1000)
    }

    return (
        <Animated.View style={[styles.container, props.style]}>

            {/* Back Button and user profile */}
            <View style={styles.leftActionContainer}>
                {props.showBack ? (
                    <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
                        <Icon name="arrow-left" style={styles.iconStyle} />
                    </TouchableOpacity>
                ) : null}
            </View>

            <View style={styles.titleWrapper}>
                <Animated.Text numberOfLines={1} style={[styles.headerTitle, props.titleStyle]}>
                    {props.title}
                </Animated.Text>
            </View>
            <TextInput
                placeholder='Search Movie'
                style={styles.searchText}
                onChangeText={onChangeText}
                onSubmitEditing={searchMovie}
                placeholderTextColor="#f5f5f5"
            />
        </Animated.View>
    );
});

const useStyles = (props: propTypes) => {
    return useMemo(() => StyleSheet.create({
        container: {
            height: Platform.OS == 'ios' ? getDeviceHeight() * 0.07 : getDeviceHeight() * 0.1,
            width: getDeviceWidth(),
            flexDirection: "row",
            zIndex: 1,
            borderBottomWidth: moderateScale(1),
            justifyContent: 'space-between',
            alignItems:'center',
            backgroundColor: "#141A31",
        },
        leftActionContainer: {
            alignItems: 'center',
            flexDirection: 'row',
        },
        headerTitle: {
            color: props.style?.color || "#f5f5f5",
            textAlign: props.style?.textAlign || "left",
            fontFamily: props.style?.fontFamily,
            fontSize: props.style?.fontSize || moderateScale(20),
            flex: 1,
        },
        titleWrapper: {
            flexDirection: "row",
            flex: 1,
            // justifyContent: 'flex-end',
            position: 'relative',
            alignItems: 'center',
        },
        iconStyle: {
            fontSize: moderateScale(28),
            color: props.style?.color || "#f5f5f5",
            padding: moderateScale(10),
        },
        searchText: {
            color: "#f5f5f5",
            // borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: "#f5f5f5",
            width: "40%",
            height: "60%",
            fontSize: moderateScale(16),
            backgroundColor: '#081029',
            paddingHorizontal: moderateScale(12),
        },
    }), [props])

};

Header.defaultProps = {
    showBack: true,
}

export default Header;
