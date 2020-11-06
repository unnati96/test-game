import React, { useState, memo } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native';
import Balloon from './components/Balloon';
const windowWidth = Dimensions.get('window').width; // can be used to find coordinates
const windowHeight = Dimensions.get('window').height; // can be used to find coordinates

const BalloonsWrapper = memo( ( props ) => {
  console.log(props.values)
  return (
    props.values.map( ( key , index ) => {
      return (
        key ? <Balloon
          key = { index }
          id = { index }
          x = { Math.random() *  windowWidth }
          source={require('./assets/favicon.png')}
          onFinish = { props.onFinish }
          onBurst = { props.onBurst }
          duration = { (1500 + props.burstCount * 10 )* Math.round(Math.random() * 10) }
        /> : null
      );
    } )
  );
} );

const App  = () => {
  const arr = new Array(30).fill(1).map(() => (true))
  const [ finishedCount, updateFinishedCount ] = useState( 0 );
  const [ burstCount, updateBurstCount ] = useState( 0 );
  const [ ballonSequence, updateBallonSequence ] = useState(arr);

  const onFinish = (e) => {
    updateFinishedCount( finishedCount + 1 )
  }

  const onBurst = (e) => {
    updateBurstCount( burstCount + 1 )
    const v = ballonSequence;
    v[e] = false;
    updateBallonSequence([...v, true, true])
  };

  // setInterval(() => {
  //   updateBallonSequence([...ballonSequence, 1])
  // }, 1000)

  /* if( 3 < finishedCount ) {
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
  } */

    return (
      <SafeAreaView style={styles.container}>
        <BalloonsWrapper
          values =  { ballonSequence }
          onFinish = { onFinish }
          onBurst = { onBurst }
          burstCount= { burstCount }
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

