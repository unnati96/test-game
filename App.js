import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, Text, View, StyleSheet, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width; // can be used to find coordinates
const windowHeight = Dimensions.get('window').height; // can be used to find coordinates

export default class App extends Component {
  constructor(props) {
    super(props)

    console.log(require('./assets/testing-image.webp'))
    this.state = {
      x: 1,
      y: 1
    }

    this.moveAnimation2 = new Animated.ValueXY({ x: 100, y: 45 })
    Animated.sequence([
      Animated.timing(this.moveAnimation2, {
        toValue: {x: 250, y: 10},
        duration: 10000
      }),
      Animated.timing(this.moveAnimation2, {
        toValue: {x: 300, y: 450},
        duration: 10000
      })
    ]).start(({ finished }) => {
      this.setState(prevState => {
        return {y: prevState.y + 1}
      });
    });

    this.moveAnimation = new Animated.ValueXY({ x: 10, y: 450 })
    Animated.sequence([
      Animated.timing(this.moveAnimation, {
        toValue: {x: 250, y: 10},
        duration: 5000
      }),
      Animated.timing(this.moveAnimation, {
        toValue: {x: 300, y: 450},
        duration: 5000
      })
    ]).start(({ finished }) => {
      this.setState(prevState => {
        return {x: prevState.x + 1}
      });
    });
  }

  _moveBall = (a) => {
    console.log(this.state.x, 'x')
    console.log(this.moveAnimation.x._value, 'panx')
    console.log(this.moveAnimation.y._value, 'pany')
      if (a ===2){
        Animated.timing(
          this.moveAnimation2
        ).stop();
        this.setState(prevState => {
          return {y: prevState.y + 1}
        });
        return 
      }

      Animated.timing(
        this.moveAnimation
      ).stop();
      this.setState(prevState => {
        return {x: prevState.x + 1}
      });
  }

  render() {
    return (
      <View style={styles.container}> 
      {
        this.state.x < 2 ?  
          (<TouchableWithoutFeedback onPress={() => this._moveBall(1)}>
            <Animated.Image source={require('./assets/favicon.png')} style={[{width: 50,  height: 50}, this.moveAnimation.getLayout()]}/>
          </TouchableWithoutFeedback>) 
        : null
      }
      {
        this.state.y < 2 ?  
          (<TouchableWithoutFeedback onPress={() => this._moveBall(2)}>
            <Animated.Image source={require('./assets/favicon.png')} style={[{width: 50,  height: 50}, this.moveAnimation2.getLayout()]}/>
          </TouchableWithoutFeedback>) 
        : null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});

