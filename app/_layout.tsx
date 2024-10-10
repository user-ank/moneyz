import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerLayout from '@/components/CustomDrawerLayout';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={CustomDrawerLayout} 
        screenOptions={{ 
        drawerActiveTintColor: '#004c3f',
        headerStyle: {backgroundColor : '#fffde8'}
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
    </GestureHandlerRootView>
  );
}
