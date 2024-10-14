import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerLayout from '@/components/CustomDrawerLayout';
import * as FileSystem from "expo-file-system";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { SplashScreen } from 'expo-router';
import { Asset } from 'expo-asset';
import { ActivityIndicator, View } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite/next';

const loadDatabase = async () => {
  const dbName = "moneyZDB.db";
  const dbAsset = require("../assets/moneyZDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
  useEffect(() => {
    loadDatabase()
    .then(() => setDbLoaded(true))
    .catch((e) => console.error(e));
  }, []);
  
  if (!loaded) {
    return null;
  }
  if (!dbLoaded)
    return (
      <View style={{ flex: 1 , backgroundColor: 'red'}}>
        <ActivityIndicator size={"large"} />
      </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="moneyZDB.db" useSuspense>
        <Drawer drawerContent={CustomDrawerLayout} 
        screenOptions={{ 
        drawerActiveTintColor: '#004c3f',
        headerStyle: {backgroundColor : '#fffde8'},
        headerShadowVisible: true
        }}>
          <Drawer.Screen
              name="index" // This is the name of the page and must match the url from root
              options={{
                  drawerLabel: 'Home',
                  title: 'MoneyMadness',
                  headerTransparent: true,
              }}
          />
          <Drawer.Screen
               name="personalExpense" // This is the name of the page and must match the url from root
               options={{
                   drawerLabel: 'Personal Expenses',
                   title: 'Personal Expenses',
                   headerShadowVisible: true
                }}
            />
            <Drawer.Screen
               name="lendingScreens/ledger" // This is the name of the page and must match the url from root
               options={{
                   drawerLabel: 'Ledger',
                   title: 'Ledger',
                }}
            />
            <Drawer.Screen
                name="goalScreens/goals" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Goals',
                    title: 'Your Goals',
                }}
            />
            <Drawer.Screen 
                name='+not-found'
                options={{
                    
                }}
            />
        </Drawer>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
