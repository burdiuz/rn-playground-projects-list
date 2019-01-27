import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Text,
  SwipeableXContainer,
  BACKGROUND_COLOR,
  ACTIVE_BACKGROUND_COLOR,
} from '@actualwave/react-native-kingnare-style';
import { FileRow } from '@actualwave/react-native-file-tree';

/*
  Make file expandable too to display its versions, topmost newest.
 */
class File extends Component {
  onShouldUpdateParent = () => {
    const { onShouldUpdateParent, item } = this.props;

    onShouldUpdateParent(item);
  };

  handlePress = (event) => {
    const { onShouldUpdateChildren, onPress, onSelect, item } = this.props;

    console.log('Click on FileRow');

    onPress && onPress(event);
    onSelect && onSelect(item);
  };

  renderSwipeLeftPanel = () => {
    return (
      <View
        style={{
          height: 32,
          paddingHorizontal: 5,
          width: '100%',
          backgroundColor: ACTIVE_BACKGROUND_COLOR,
        }}
      >
        <Text>Swipe File Left Panel</Text>
      </View>
    );
  };

  renderSwipeRightPanel = () => {
    return (
      <View
        style={{
          height: 32,
          paddingHorizontal: 5,
          width: '100%',
          backgroundColor: ACTIVE_BACKGROUND_COLOR,
        }}
      >
        <Text>Swipe File Right Panel</Text>
      </View>
    );
  };

  render() {
    return (
      <SwipeableXContainer
        swipeLeftPanelRenderer={this.renderSwipeLeftPanel}
        swipeRightPanelRenderer={this.renderSwipeRightPanel}
        style={{ height: 32 }}
        contentContainerStyle={{ backgroundColor: BACKGROUND_COLOR }}
      >
        <FileRow
          {...this.props}
          onShouldUpdateParent={this.onShouldUpdateParent}
          onPress={this.handlePress}
          style={{
            paddingHorizontal: 5,
          }}
        />
      </SwipeableXContainer>
    );
  }
}

export default File;
