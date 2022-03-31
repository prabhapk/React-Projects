import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet, FlatList, ScrollView
} from 'react-native';
import React , {useState}from 'react';

const App = () => {
  const [number, setNumber]=useState('')
  const [carRegNo, setCarRegNo]=useState()
  const [display, setDisplay] = useState(false)
  const [data, setData]= useState([])
  const [data1, setData1]= useState([])

  const initialState=()=>{
    setNumber('')
    setData([])
    setCarRegNo()
  
  }
  const createLots = () => {
    
      var test= []
      for (let i = 1; i <= number; i++) {
        test.push({ id: i, isCheck: false, regnumber: carRegNo})
      }
      
      setData(test)
    }
const renderId=({item})=>{
  return(
    <View style={{flex:1, alignItems:'center',margin:10}}> 
    <View>
      <TouchableOpacity style={{borderWidth:1, padding:15, backgroundColor:'green', borderColor:'white'}} 
      onPress={()=>Billing(item.regnumber)}>
      <Text style={{color:'white'}}>Lot Number : <Text>{item.id}</Text> </Text>
     {console.log(item.regnumber)}
      {(item.regnumber!= undefined &&display) && <Text style={{color:'white'}}>Car Number : <Text>{item.regnumber}</Text> </Text>}
      </TouchableOpacity>
      </View>
    </View>
  )
}
const submit=()=>{
  
    var filterState = data.filter((e) => e.isCheck == false)
    if (filterState.length != 0) {
      item = filterState[Math.floor(Math.random() * filterState.length)]
      item.isCheck = true
      item.regnumber = carRegNo
      var filterItem = data.filter((e) => e.id != item.id)
      var newFinal = [...filterItem, item]
      setData1(newFinal)
      alert(`Parking Lot No. ${item.id} alloted successfully.`)
    } else {
      alert("Sorry, Parking is full.")
    }
  
    setDisplay(true);
}
const Billing=(carRegNo)=>{
  carRegNo!= undefined && alert(carRegNo)
}
  return (
    <SafeAreaView>
      <View style={style.container}>
        <Text style={style.heading}>
          Parking Management
        </Text>
      </View>
      <View>
        <ImageBackground
          source={require('./assets/park.png')}
          style={{width: 400, height: 750}}>
          <View style={{marginTop: 20, marginHorizontal: 20}}>
            <TextInput
              style={style.input}
              placeholder="Enter the number of lots"
              onChangeText={(text)=>setNumber(text)}
              keyboardType='numeric'
            />
          </View>
          <View style={style.buttons}>
            <TouchableOpacity
              style={style.button1}
              disabled={!number}
              onPress={createLots}>
              <Text style={{textAlign: 'center', fontWeight:'bold',color:'white'}}>CREATE PARKING</Text>
            
            </TouchableOpacity>
            <View style={{marginLeft: 30}}>
              <TouchableOpacity
                style={style.button1}
                onPress={initialState}>
                <Text style={{fontWeight:'bold',color:'white'}}>RESET</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 40, marginHorizontal: 20}}>
            <TextInput
              style={style.input}
              placeholder="Enter car registration number"
              onChangeText={(text)=>setCarRegNo(text)}
            />
          </View>
          <View style={style.button2}>
            <Button 
            color='#FF8C33' 
            title='submit'
            disabled={!carRegNo}
            onPress={submit}/>
          </View>

        <View style={style.lots}>
         <View>
            <FlatList
            data={data}
            renderItem={renderId}
            numColumns={2}
            keyExtractor={(item)=>item.id}
            />
          </View>
              
              <Text style={{textAlign:'center',fontWeight:'bold',color:'white'}}>Click on the alloted parking lot to exit vehicle</Text>
           
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};
const style=StyleSheet.create({
  container:
  {alignItems: 'center', marginBottom: 10}, 
  heading:
  {fontWeight: 'bold', fontSize: 22, color: 'black'},
  input:{
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 5,
    fontSize: 15,
  }, 
  buttons:
  {flexDirection: 'row', marginTop: 30, paddingLeft: 20},
  button1:
  {         
    backgroundColor: '#FF8C33',
    padding: 10,
    borderRadius: 5,
    paddingRight: 55,
    paddingLeft: 30,
  }, 
  button2:
  {marginTop:30, marginHorizontal:120}, 
  lots:
  {
    borderWidth: 1,
    backgroundColor: '#FF8C33',
    padding: 10,
    marginTop:30
    
    }
})
export default App;
