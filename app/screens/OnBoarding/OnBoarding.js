import React from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Animated,
    TouchableOpacity,
} from 'react-native';

import { images, theme } from '../../constants';

const { onboarding1, onboarding2, onboarding3 } = images;
const { COLORS, FONTS, SIZES } = theme;

const onBoardings = [
    {
        title: "Let's Travelling...",
        description:
            'elements as its children to define the configuration for routes children to define the',
        img: onboarding1,
    },
    {
        title: 'Packing Your Bags',
        description:
            'elements as its children to define the configuration for routes children to define the',
        img: onboarding2,
    },
    {
        title: 'Go to Home',
        description:
            'elements as its children to define the configuration for routes children to define the',
        img: onboarding3,
    },
];

const OnBoarding = () => {

    const [completed,setCompleted] = React.useState(false);

    const scrollX = new Animated.Value(0);

    React.useEffect(() =>{
        scrollX.addListener(({value}) => {
            if(Math.floor(value / SIZES.width) === onBoardings.length - 1){
                setCompleted(true)
            }
        });

        return () => scrollX.removeListener();
    }, [])

    // RenderContent
    function renderContent() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >

                {onBoardings.map((item, index) => (
                    <View key={index} style={{ width: SIZES.width }}>

                        {/* images set */}
                        <View
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={item.img}
                                resizeMode="cover"
                                style={styles.splashScreen}
                            />
                        </View>

                        {/* Text Here */}
                        <View
                            style={
                                styles.textSetter
                            }>
                            <Text style={{
                                ...FONTS.h3,
                                color: COLORS.gray,
                                textAlign: 'center'
                            }}>{item.title}</Text>

                            <Text style={{
                                ...FONTS.body4,
                                textAlign: 'center',
                                marginTop: SIZES.base,
                                color: COLORS.gray
                            }}>{item.description}</Text>

                        </View>

                        {/* Button Here */}
                        <TouchableOpacity
                            style={{
                                position:'absolute',
                                top:10,
                                right:0,
                                width:70,
                                height:30,
                                justifyContent:'center',
                                backgroundColor:COLORS.blue,
                                alignItems:'center',
                                borderTopLeftRadius:SIZES.radius,
                                borderBottomLeftRadius:SIZES.radius,
                            }}
                            onPress={()=>{
                                console.warn('Click Here')
                            }}
                        >

                            <Text style={{color:COLORS.white}}>{completed ? "Go" : "Skip"}</Text>

                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.ScrollView>
        );
    }

    // RenderDotted
    function renderDotted() {
        const dotPosition = Animated.divide(scrollX,SIZES.width);

        return (
            <View style={styles.dotContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[0.3,1,0.3],
                        extrapolate:'clamp'
                    });

                    const dotSize = dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[SIZES.base,17,SIZES.base],
                        extrapolate:'clamp'
                    })

                    return(
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: dotSize, height: dotSize }]}>

                        </Animated.View>
                    )})}
            </View>
        )

    }

    // This is Main Function
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>

            <View style={styles.dotRootContainer}>
                {renderDotted()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    splashScreen: {
        width: '100%',
        height: '100%',
    },
    textSetter: {
        position: 'absolute',
        bottom: "5%",
        alignItems: 'center',
        left: 30,
        right: 30
    },
    dotRootContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700 ? '16%' : '24%'
    },
    dotContainer: {
        flexDirection: 'row',
        height: SIZES.padding,
        alignContent:'center',
        alignItems:'center'
    },
    dot: {
        backgroundColor: COLORS.blue,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.radius / 2
    },
});

export default OnBoarding;
