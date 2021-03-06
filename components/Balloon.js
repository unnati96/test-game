import React, { PureComponent } from 'react';
import { Animated, TouchableWithoutFeedback, Dimensions, View } from 'react-native';

const windowHeight = Dimensions.get('window').height; // can be used to find coordinates

export default class Balloon extends PureComponent {
  constructor(props) {
    super(props)

    console.log('there')
    this.state = {
      visible: true,
      bursted: false
    }

    this.moveAnimation = new Animated.ValueXY({ x: props.x, y: windowHeight + 100 * Math.random() })
    Animated.sequence([
      Animated.timing(this.moveAnimation, {
        toValue: {x: props.x, y: 0},
        duration: props.duration
      })
    ]).start(({ finished }) => {
      if( finished ) {
        this.props.onFinish( this.props.id );
        this.setState( {visible: false} );
      }
    });

    this.onClick = this.onClick.bind( this );
  }

  onClick() {
      this.setState({
        bursted: true,
        visible: false
      }, () => {
          this.props.onBurst( this.props.id );
          Animated.timing(
            this.moveAnimation
          ).stop();
      });
  }

  render() {
    return (
        this.state.visible ?
          (
            <View style = { {position: 'absolute'} } >
              <TouchableWithoutFeedback onPress={this.onClick}>
                <Animated.Image source={this.props.source} style={[{width: 50,  height: 50}, this.moveAnimation.getLayout()]}/>
              </TouchableWithoutFeedback>
            </View>
          )
        : null
    );
  }
}
Balloon.defaultProps = {
    id: 1,
    x: 10,
    onFinish: (e) => { console.log('finished', e) },
    source: '',
    duration: 5000,
    onBurst: (e) => { console.log('Bursted', e) },
};

