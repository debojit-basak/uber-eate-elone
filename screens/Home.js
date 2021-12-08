import React,{useState, useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import Categories from '../components/Categories'
import HeaderTabs from '../components/HeaderTabs'
import RestaurantItems, {localRestaurants} from '../components/RestaurantItems'
import SearchBar from '../components/SearchBar'

const YELP_API_KEY = "fEGEXf5aRgEifD0ARaSjnoIG6R1ZXditU-EuUmjnI3u003SlT5oRIR5qvKOtQINM8Foxi7C_XXumrR4qYt-_Yg2Ye9T3gMvdxXiTbDFx9iQjjdl9pKJ660XmyeiwYXYx"

export default function Home() {
    const[restaurantData, setRestaurantData] = useState(localRestaurants)
    // const getRestaurantsFromYelp = () =>{
    //     const yelpUrl = "https://api.yelp.com/v3/businesses/search?term=restaurants&location=SanDiago";
    
    // const apiOptions = {
    //     headers: {
    //         Authorization: `Bearer ${YELP_API_KEY}`,
    //     },
    // };
    //     return fetch(yelpUrl, apiOptions)
    //     .then((res)=>res.json())
    //     .then((json)=>setRestaurantData(json.businesses));
    // };
    // useEffect(() =>{
    //     getRestaurantsFromYelp();
    // }, []);
    const getRestaurantsFromYelp = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=SanDiago`;
    
        const apiOptions = {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        };
    
        return fetch(yelpUrl, apiOptions)
          .then((res) => res.json())
          .then((json) =>
            setRestaurantData(
              json.businesses.filter((business) =>
                business.transactions.includes(activeTab.toLowerCase())
              )
            )
          );
      };
    
      useEffect(() => {
        getRestaurantsFromYelp();
      }, []);
    
    return (
        <SafeAreaView style={{backgroundColor: '#eee', flex:1}}>
            <View style={{backgroundColor: 'white', padding: 15}}>
            <HeaderTabs />
            <SearchBar />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Categories />
            <RestaurantItems restaurantData={restaurantData}/>
            </ScrollView>
        </SafeAreaView>
    )
}
