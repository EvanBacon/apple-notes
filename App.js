import '@expo/match-media';

import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import * as Font from 'expo-font';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context';
import { useMediaQuery } from 'react-responsive';

const data = [
  { title: 'All iCloud', count: '1,462' },
  { title: 'Notes', count: '1,340' },
  { title: '🥓 Expo', count: '52' },
  { title: '🏆 Podcasts', count: '6' },
  { title: '🔒 Relations', count: '5' },
  { title: '💋 Side Projects', count: '20' },
  { title: '💚 Speaking', count: '34' },
  { title: '🚘 Travel', count: '82' },
  { title: '🤳 Videos', count: '139' },
  { title: '🛠 Workshops', count: '49' },
  { title: '🐸 zzz Frog Design', count: '12' },
];

// TODO: Lock body scrolling

function App() {
  const [text, setText] = React.useState(
    'Change code in the editor and watch it change on your phone! Save to get a shareable url.'
  );
  const realColorScheme = useColorScheme();
  const [show, setShow] = React.useState(true);
  const [colorScheme, setScheme] = React.useState(realColorScheme);
  const {
    top: paddingTop,
    bottom: paddingBottom,
    left,
    right: paddingRight,
  } = useSafeArea();

  const paddingLeft = left || 12;

  const isDark = colorScheme === 'dark';

  const textColor = isDark ? 'white' : 'black';
  const borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
  const backgroundColor = isDark ? '#000' : '#ecf0f1';

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(orientation: landscape)',
  });

  const drawerWidth =
    Dimensions.get('window').width * (isTabletOrMobileDevice ? 0.45 : 1);
  const drawerRight = show ? drawerWidth : 0;

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      // Set overscroll color
      document.getElementsByTagName(
        'body'
      )[0].style.backgroundColor = backgroundColor;
    }
  }, [colorScheme]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // ;)
      alert(
        'Your iCloud storage is full.\n\nYou can remove files from iCloud, or purchase additional space.'
      );
    }, 1000 * 60 * 4.45);
    return () => clearInterval(interval);
  }, []);

  const drawerItemLeft = drawerRight + (show ? 8 : paddingLeft);

  return (
    <View
      style={[
        styles.container,
        StyleSheet.absoluteFill,
        {
          backgroundColor: backgroundColor,
          paddingRight,
          top: paddingTop,
          overflow: 'scroll',
          transitionDuration: '0.5s',
          transitionProperty: 'all',
        },
      ]}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          zIndex: 10,
          maxWidth: drawerWidth,
          borderRightWidth: StyleSheet.absoluteFill,
          borderRightColor: borderColor,
          backgroundColor,
          minWidth: drawerWidth,
          left: show ? 0 : -drawerWidth,
          transitionDuration: '0.5s',
          transitionProperty: 'all',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: textColor,
              textAlign: 'center',
              paddingVertical: 12,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Notes
          </Text>
          <Text
            onPress={() => setScheme(colorScheme === 'dark' ? 'light' : 'dark')}
            style={{
              color: textColor,
              textAlign: 'center',
              paddingVertical: 12,
              position: 'absolute',
              right: 8,
              top: 0,
              bottom: 0,
              fontSize: 16,
            }}>
            Toggle
          </Text>
        </View>
        <FlatList
          initialNumToRender={data.length}
          contentContainerStyle={{
            marginTop: 36,
            borderBottomColor: borderColor,
            borderTopColor: borderColor,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: paddingBottom,
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginLeft: paddingLeft,
                flex: 1,
                maxHeight: 0,
                borderTopColor: borderColor,
                borderTopWidth: StyleSheet.hairlineWidth,
              }}
            />
          )}
          style={{ flex: 1 }}
          data={data}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                setShow(!show);
              }}
              underlayColor={'rgba(255, 165, 0, 0.5)'}>
              <View
                style={{
                  paddingLeft,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 8,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Ionicons
                    name="md-folder-open"
                    size={24}
                    color={'orange'}
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      paddingVertical: 10,
                      color: textColor,
                      fontSize: 16,
                    }}>
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: textColor,
                      opacity: 0.6,
                      marginRight: 10,
                    }}>
                    {item.count}
                  </Text>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={20}
                    color={textColor}
                    style={{ opacity: 0.6 }}
                  />
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          transitionDuration: '0.5s',
          transitionProperty: 'all',
          paddingLeft,
          paddingBottom,
        }}>
        <Ionicons
          name="ios-expand"
          size={24}
          color={'orange'}
          style={{
            transitionDuration: '0.5s',
            position: 'absolute',
            left: drawerItemLeft,
            top: 8,
          }}
          onPress={() => setShow(!show)}
        />

        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 8,
            right: 8,
          }}>
          <TouchableOpacity>
            <Ionicons
              name="ios-contact"
              size={32}
              color={'orange'}
              style={{ marginLeft: 32 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="ios-trash"
              size={32}
              color={'orange'}
              style={{ marginLeft: 32 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="ios-share"
              size={32}
              color={'orange'}
              style={{ marginLeft: 32 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="ios-create"
              size={32}
              color={'orange'}
              style={{ marginLeft: 32 }}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          multiline
          value={text}
          onFocus={() => setShow(false)}
          onChangeText={text => setText(text)}
          style={[
            styles.paragraph,
            {
              marginLeft: drawerItemLeft,
              transitionDuration: '0.5s',
              transitionProperty: 'all',
              marginTop: 56 + paddingTop,
              flex: 1,
              color: textColor,
              outlineStyle: 'none',
            },
          ]}
        />

        <View
          style={{
            transitionDuration: '0.5s',
            transitionProperty: 'all',
            marginLeft: drawerItemLeft,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 8,
          }}>
          <TouchableOpacity>
            <Ionicons name="ios-undo" size={32} color={'orange'} style={{}} />
          </TouchableOpacity>
          <TouchableOpacity disabled>
            <Ionicons
              name="ios-redo"
              size={32}
              color={'orange'}
              style={{ marginLeft: 32 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 8,
            right: 8,
          }}>
          <TouchableOpacity>
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={32}
              color={'orange'}
              style={{ marginLeft: 32 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="ios-camera"
              size={32}
              color={'orange'}
              style={{ marginLeft: 32 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="md-create"
              size={32}
              color={'orange'}
              style={{ marginLeft: 32 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function AssetWrap() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          Font.loadAsync(Ionicons.font),
        ]);
      } catch (e) {
        console.log({ e });
      } finally {
        setLoaded(true);
      }
    })()
  });

  if (!loaded) return <View />
  return <App />
}

export default () => (
  <AppearanceProvider>
    <SafeAreaProvider>
      <AssetWrap />
    </SafeAreaProvider>
  </AppearanceProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
