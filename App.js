import React, { useState, memo } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native';
import Balloon from './components/Balloon';
const windowWidth = Dimensions.get('window').width; // can be used to find coordinates
const windowHeight = Dimensions.get('window').height; // can be used to find coordinates

const BalloonsWrapper = memo( ( props ) => {
  return (
    [3,8,7,5,6,4].map( ( key, index ) => {
      return (
        <Balloon
          key = { key }
          id = { key }
          x = { ( windowWidth / 10 ) * ( index + 1 ) }
          source={require('./assets/favicon.png')}
          onFinish = { props.onFinish }
          onBurst = { props.onBurst }
          duration = { 2000 * key }
        />
      );
    } )
  );
} );

const App  = () => {
  const [ finishedCount, updateFinishedCount ] = useState( 0 );
  const [ burstCount, updateBurstCount ] = useState( 0 );

  const onFinish = (e) => {
    updateFinishedCount( finishedCount + 1 )
  }

  const onBurst = (e) => {
    updateBurstCount( burstCount + 1 )
  };

  if( 3 < finishedCount ) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style = {styles.textView}>Better Luck next time</Text>
      </SafeAreaView>
    );
  } else if ( burstCount + finishedCount === 6 ) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style = {styles.textView} >Well done total score is {burstCount} out of { burstCount + finishedCount }</Text>
      </SafeAreaView>
    );
  }
    return (
      <SafeAreaView style={styles.container}>
        <BalloonsWrapper
          onFinish = { onFinish }
          onBurst = { onBurst }
        />
      </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    height: '100%',
    overflow: 'hidden'
  },
  textView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center'
  }
});

