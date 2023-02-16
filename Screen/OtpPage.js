import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View, Button} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

const OtpScreen = () =>{
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const navigation = useNavigation()
    const onSubmit = () =>{
        console.log(value)
        if(value == 123456){
            navigation.navigate('HomeScreen')
        }
    }

    return(
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Verification</Text>
            <View style={{alignContent:'center',justifyContent:'center'}}>
                <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                    )}
                />
            </View>
            <View style = {{marginTop:50}}>
                <Button title='Proceed' style = {{marginTop:20,color:'#12F000'}} onPress ={onSubmit} />
            </View>
        </SafeAreaView>

    )
    

}

export default OtpScreen;

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 50,color:"black"},
    codeFieldRoot: {marginTop: 50},
    cell: {
      width: 50,
      height: 50,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderRadius:30,
      borderColor: '#00000030',
      textAlign: 'center',
      color:'black'
    },
    focusCell: {
      borderColor: '#000',
    },
  });