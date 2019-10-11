import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import {
  SWIPE_CENTER,
  SwipeableXContainer,
  BACKGROUND_COLOR,
} from '@actualwave/react-native-kingnare-style';

import styles from './styles';

const Dim = () => (
  <View
    style={styles.dim}
  />
);

class Container extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
    isLeftSwipeable: PropTypes.func,
    isRightSwipeable: PropTypes.func,
  };

  static defaultProps = {
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
  };

  state = { dimmed: false };

  onSwipeConfirm = () => {
    this.setState({ dimmed: true });
  };

  handleAnimationFinish = (_, position) => {
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
        onAnimationFinish={this.handleAnimationFinish}
        style={styles.container}
        contentContainerStyle={{
          backgroundColor: BACKGROUND_COLOR,
        }}
        {...props}>
        {children}
        {this.renderDim()}
      </SwipeableXContainer>
    );
  }
}

export default Container;
