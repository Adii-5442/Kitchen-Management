import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Animated, Easing, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CountDown from 'react-native-countdown-component';
const orders = [
    {
        "id": "1",
        "name": "Burger and fries",
        "time": "0.2",
        "status": "New"
      },
      {
        "id": "2",
        "name": "Pizza",
        "time": "0.3",
        "status": "Urgent"
      },
      {
        "id": "3",
        "name": "Grilled chicken salad",
        "time": "5.5",
        "status": "New"
      },
      {
        "id": "4",
        "name": "Fish and chips",
        "time": "20",
        "status": "Urgent"
      },
      {
        "id": "5",
        "name": "Beef stir-fry",
        "time": "8",
        "status": "New"
      },
      {
        "id": "6",
        "name": "Pasta carbonara",
        "time": "15",
        "status": "New"
      },
      {
        "id": "7",
        "name": "Chicken burger",
        "time": "5",
        "status": "New"
      },
      {
        "id": "8",
        "name": "Steak and mashed potatoes",
        "time": "25",
        "status": "New"
      },
      {
        "id": "9",
        "name": "Shrimp scampi",
        "time": "18",
        "status": "New"
      },
      {
        "id": "10",
        "name": "Veggie pizza",
        "time": "10",
        "status": "New"
      }
  ];
  
const HomeScreen = () => {
    const [order, setOrder] = useState(orders);
    const [triggerChange, setTriggerChange] = useState('')
    const [elapsedTime, setElapsedTime] = useState(0);

    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    

    const [animationTrigger, setanimationTrigger] = useState(false)



    useEffect(() => {
      const interval =setInterval(() => {
          setElapsedTime(elapsedTime => elapsedTime+1);
          }, 1000);
      return () => clearInterval(interval);
  }, []);
    const renderOrder = ({ item , index }) => {
        let cardColor;
        let statusColor;
        switch (item.status) {
            case 'New':
              item.statusColor = 'blue';
              break;
            case 'Urgent':
              item.statusColor = 'orange';
              break;
            case 'ready':
              item.statusColor = 'green';
              break;
            case 'Time Over':
                item.statusColor = 'black';
            default:
              statusColor = 'black';
          }
        
        const handleTimerFinish = () => {
          if(item.status != 'Ready For Pickup'){
            item.status = '⚠️ Time Over';
            item.statusColor = 'white'
            item.color = '#fa5050'
            setTriggerChange(Math.random()*10)
          }
            
        };
        const handleCompleted = (itemId,index) =>{
            const updatedOrder = order.filter((item) => item.id !== itemId);
            setOrder(updatedOrder)
        }
        const handleReadyToPick = (itemId,index) =>{
          item.showDelivery = true
         
          item.color = '#33cc5c'
          item.status = "Ready For Pickup"
          setTriggerChange(Math.random()*100)
        }
        
        return (
            <TouchableOpacity style={{backgroundColor: item.color? item.color :'white',padding: 10,marginBottom: 10,borderRadius:20,height:170}}>
              <View style={{flexDirection:'row',marginBottom:10}}>
                    <Text style={{color:'#0b2447',fontWeight:'bold'}}>Item Name :</Text>
                    <Text style={styles.orderName}>{item.name}</Text>
                    {item.showDelivery ? 
                      <Image
                        style={{ height:40,width:40,left:'20%' }}
                        source={require('../assets/delivery-bike.png')}
                      /> :null}
              </View>
              <View style={{alignContent:'flex-end'}}>
              </View>
              
               <View style={{flexDirection:'row'}}>
                <Text style={{color:'black',marginRight:10,fontWeight:'bold'}}>Time Left : </Text>
                <View>
                    <CountDown
                        until={item.time * 60}
                        onFinish={handleTimerFinish}
                        digitStyle={{backgroundColor: '#FAB913', borderWidth: 2, borderColor: '#000000'}}
                        digitTxtStyle={{color: 'black'}}
                        onPress={() => item.status = 'finished'}
                        onChange = { ()=> {
                          if(item.status != '❗Expiring Soon' && item.status != 'Ready For Pickup' && (item.time*60 - elapsedTime)<=300 && (item.time*60 - elapsedTime)>100){
                            console.log(item.name)
                            item.status = '❗Expiring Soon'
                            item.statusColor = 'white'
                            item.color = '#db934f'
                            setTriggerChange(Math.random()*10)
                          }
                        }}
                        size={15}
                        timeToShow={['H', 'M', 'S']}
                        showSeparator
                    />
                </View>
              </View> 

              <View >
                    <Text style={{color:item.statusColor? item.statusColor : 'black',alignItems:'flex-start',fontWeight:'900'}}>Status : {item.status}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{width:120,height:65,marginTop:10,borderRadius:20}}>
                  <TouchableOpacity onPress={() => handleReadyToPick(item.id,index)} style={{backgroundColor:'green',borderRadius:20,borderColor:'black',borderWidth:1}}><Text style={{color:'white',marginLeft:5}}>Ready For Pickup</Text></TouchableOpacity>
                </View>
                <View style={{width:80,height:65,marginTop:10,borderRadius:20,marginLeft:100}}>
                  <TouchableOpacity onPress={() => handleCompleted(item.id,index)} style={{backgroundColor:'#37cc3c',borderRadius:20,borderColor:'black',borderWidth:1}}><Text style={{color:'black',marginLeft:5}}>Completed</Text></TouchableOpacity>
                </View>

              </View>
              
            </TouchableOpacity>
          );

        
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={{alignSelf:'center',fontSize:30,fontWeight:'bold',margin:20,marginBottom:50,color:'white'}}> WELCOME CHEF !</Text>
          <FlatList
            data={order}
            keyExtractor={(item,index) => item.id}
            renderItem={renderOrder}
          />
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 10,
      },
      orderContainer: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginBottom: 10,
        borderRadius:20,
        height:170
      },
      orderName: {
        fontWeight: 'bold',
        fontSize: 18,
        color:'#000000',
        marginBottom: 5,
        marginLeft:15
      },
      orderTime: {
        fontSize: 14,
        marginBottom: 5,
        color:'#001123'
      },
      orderStatus: {
        fontSize: 14,
        color:'green'
      }
    });
    
export default HomeScreen