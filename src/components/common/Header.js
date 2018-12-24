//import libs for component
import React from 'react';
import { Text, View } from 'react-native';

//component to display a header at the top of the app
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center', //flex-start for top, flex-end for bottom
        alignItems: 'center', //horizontal
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        elevation: 5,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
};
//make the component availbable to other parts of the app
export { Header };
