import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const App: () => React$Node = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getQuote = () => {
    setLoading(true);

    console.log('page load');

    fetch('http://192.168.100.5:3000/api/quote')
      .then(res => res.json())
      .then(json => setData(json.quote))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <TouchableOpacity onPress={getQuote} style={styles.touchScreen}>
            <Text style={styles.quote}>{data.quote}</Text>
            <Text style={styles.author}>"{data.author}"</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
    padding: 11,
  },
  touchScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  quote: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  author: {
    paddingTop: 21,
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
});

export default App;
