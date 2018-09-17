import React , {Component} from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width; // retrieve the width of the screen
class Deck extends Component{
    constructor(props){
        super(props);
        const position = new Animated.ValueXY();
        const panResponse = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            // when the user presses on the screen
            onPanResponderMove: (event,gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy })
                
                
            }, // when the user drags anthing on the screen
            onPanResponderRelease: () => {}
            // when the user presses down and remove the finger ro the screen
        });
        
        this.state = { panResponse , position };
    }
    getCardStyle(){
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2,0,SCREEN_WIDTH * 2],
            outputRange: ['-120deg','0deg','120deg']
        });
        return {
            ...position.getLayout(),
            transform: [{rotate}]

        };
    }
    renderCards(){
        return this.props.data.map((item, index) => {
            if(index === 0){
                return (
                    <Animated.View
                    key={item.id}
                    style={this.getCardStyle()}
            {...this.state.panResponse.panHandlers}
                    >
                        {
                            this.props.renderCard(item)
                        }
                    </Animated.View>
                )
            }
            return this.props.renderCard(item);
        });
    }
    render(){
        return(
            <View 
            
            >
                {this.renderCards()}
            </View>
        );
    }
}
export default Deck;