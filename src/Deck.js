import React , {Component} from 'react';
import {
    View,
    Animated,
    PanResponder
} from 'react-native';

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
    renderCards(){
        return this.props.data.map(item => {
            return this.props.renderCard(item);
        });
    }
    render(){
        return(
            <Animated.View 
            style={this.state.position.getLayout()}
            {...this.state.panResponse.panHandlers}
            >
                {this.renderCards()}
            </Animated.View>
        );
    }
}
export default Deck;