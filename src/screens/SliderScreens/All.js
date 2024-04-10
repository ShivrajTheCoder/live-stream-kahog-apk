import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ThemeContext from '../../contexts/ThemeProvider';
import Banner from '../../components/HomeComponents/Banner';
import LiveContainer from '../../components/HomeComponents/LiveContainer';

import HomeHaatContainer from '../../components/HomeComponents/HomeHaatContainer';
import PodcastContainer from '../../components/HomeComponents/PoadcastContainer';
import OriginalsContainer from '../../components/HomeComponents/OriginalsContiner';
import RecentReplays from '../../components/HomeComponents/RecentReplays';
import SearchOptions from '../../components/HomeComponents/SearchOptions';
import UpcomingLiveContainer from '../../components/HomeComponents/UpcomingLiveContainer';
import ListenWithContainer from '../../components/HomeComponents/ListenWithContainer';


export default function All({navigation,setShowComp}) {
    const {theme}=useContext(ThemeContext);
    return (
        <View>
             <Banner />
             <LiveContainer />
             <UpcomingLiveContainer />
             <ListenWithContainer />
             <HomeHaatContainer/>
             <PodcastContainer/>
             <OriginalsContainer setShowComp={setShowComp}/>
             {/* <RecentReplays /> */}
             <SearchOptions navigation={navigation} />
        </View>
    )
}
