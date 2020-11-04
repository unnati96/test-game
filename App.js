import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Balloon from './components/Balloon';
const windowWidth = Dimensions.get('window').width; // can be used to find coordinates
const windowHeight = Dimensions.get('window').height; // can be used to find coordinates

const App  = () => {
  const [ finishedCount, updateFinishedCount ] = useState( 0 );
  const [ burstCount, updateBurstCount ] = useState( 0 );

  if( 3 < finishedCount ) {
    return (
      <View style={styles.container}>
        <Text>Better Luck next time</Text>
      </View>
    );
  } else if ( burstCount + finishedCount === 6 ) {
    return (
      <View style={styles.container}>
        <Text>Well done total score is {burstCount} out of { burstCount + finishedCount }</Text>
      </View>
    );
  }
    return (
      <View style={styles.container}>
        {
          [2,3,4,5,6,7].map( index => {
            return (
              <Balloon
                key = { index }
                id = {index}
                x = { ( windowWidth / 10 ) * index }
                source={require('./assets/favicon.png')}
                onFinish = { (e) => { updateFinishedCount( finishedCount + 1 ) } }
                onBurst = { (e) => { updateBurstCount( burstCount + 1 ) } }
                duration = { 2000 * index }
              />
            );
          } )
        }
      </View>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    height: windowHeight
  },
});

