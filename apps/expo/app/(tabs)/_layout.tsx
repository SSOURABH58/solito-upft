import { View } from 'app/design/view'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#7149C6',
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          padding: 10,
          paddingBottom: 10,
          height: 70,
          marginHorizontal: 25,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          textTransform: 'capitalize',
          color: '#fff',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ffffff33',
        headerBackground: () => (
          <View
            style={{
              backgroundColor: '#7149C6',
              height: 80,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          />
        ),
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={focused ? 35 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="staro" size={focused ? 35 : 24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
