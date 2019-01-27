import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Text,
  SWIPE_CENTER,
  SwipeableXContainer,
  BACKGROUND_COLOR,
  ACTIVE_BACKGROUND_COLOR,
} from '@actualwave/react-native-kingnare-style';
import { FileRow } from '@actualwave/react-native-file-tree';

const Dim = () => <View style={{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 0xffffff66,
}} />;

class Container extends Component {
  state = {dimmed: false};

  handleSwipeStart = () => {
    console.log('STARTED');
    this.setState({dimmed: true});
  };

  handleSwipeFinish = (_, position) => {
    if(position === SWIPE_CENTER) {
      this.setState({dimmed: false});
    }
  };

  renderDim(){
    return this.state.dimmed ? <Dim /> : null;
  }

  render() {
    const {children, ...props} = this.props;

    return (
      <SwipeableXContainer
        onSwipeStart={this.handleSwipeStart}
        onSwipeFinish={this.handleSwipeFinish}
        style={{ height: 32 }}
        contentContainerStyle={{
          backgroundColor: BACKGROUND_COLOR,
        }}
        {...props}
      >
        {children}
        {this.renderDim()}
      </SwipeableXContainer>
    );
  }
}

export default Container;
