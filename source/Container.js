import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  SWIPE_CENTER,
  SwipeableXContainer,
  BACKGROUND_COLOR,
} from '@actualwave/react-native-kingnare-style';

const Dim = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 0xffffff66,
    }}
  />
);

class Container extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
  };

  static defaultProps = {
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
  };

  state = { dimmed: false };

  onSwipeConfirm = () => {
    this.setState({ dimmed: true });
  };

  handleSwipeFinish = (_, position) => {
    if (position === SWIPE_CENTER) {
      this.setState({ dimmed: false });
    }
  };

  renderDim() {
    return this.state.dimmed ? <Dim /> : null;
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <SwipeableXContainer
        onSwipeConfirm={this.onSwipeConfirm}
        onSwipeFinish={this.handleSwipeFinish}
        style={{ height: 42 }}
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
