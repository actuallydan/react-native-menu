<div align="center">
	<img src="assets/menu.gif" alt="Item" height="450px">
</div>

# react-native-side-drawer

[![Package version](https://img.shields.io/npm/v/react-native-side-drawer.svg?style=flat-square)](https://npmjs.org/package/react-native-side-drawer)
[![Make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License](https://img.shields.io/npm/l/react-native-side-drawer.svg?style=flat-square)](https://github.com/pedreviljoen/react-native-menu/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/react-native-side-drawer.svg?style=flat-square)](https://npmjs.org/package/react-native-side-drawer)

> Simple & lightweight side menu drawer

## Contents

  - [Contents](#contents)
  - [Install](#install)
  - [Usage](#usage)
  - [Props](#props)
  - [Contribute](#contribute)
  - [License](#license)

## Install

```sh
yarn add react-native-side-drawer
```

OR

```sh
npm install react-native-side-drawer
```

## Usage

```javascript
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MenuDrawer from 'react-native-side-drawer'

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
        >
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text>Open</Text>
          </TouchableOpacity>
        </MenuDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
```

## Props

<table width="80%">
    <tr>
        <th>Property</th>
        <th>Description</th> 
        <th>Default Value</th>
    </tr>
    <tr>
        <td><code>containerStyle</code></td>
        <td>Styles of item container</td> 
        <td><code>{}</code></td>
    </tr>
    <tr>
        <td><code>open</code></td>
        <td>Boolean value toggling open and close of drawer</td> 
        <td><code>false (closed)</code></td>
    </tr>
    <tr>
        <td><code>drawerPercentage</code></td>
        <td>Integer value between 0 - 100, depicting the percentage of the screen the drawer will open</td> 
        <td><code>45</code></td>
    </tr>
    <tr>
        <td><code>animationTime</code></td>
        <td>Integer value, depicting the time (in ms) the menu will slide open & close</td> 
        <td><code>200</code></td>
    </tr>
</table>

## Contribute

Contributions are welcome!

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Or open up [a issue](https://github.com/pedreviljoen/react-native-menu/issues).

## Coming soon

- [x] iOS SafeArea support
- [x] Custom width of drawer and sliding time
- [ ] Opacity fade of background screen

## License

MIT