import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import {
  Text,
  SwipeableXContainer,
  BACKGROUND_COLOR,
  ACTIVE_BACKGROUND_COLOR,
} from '@actualwave/react-native-kingnare-style';
import { FileRow } from '@actualwave/react-native-file-tree';

import Container from './Container';

const styles = StyleSheet.create({
  paddingLeft5: {
    paddingLeft: 5,
  },
});

/*
  Make file expandable too to display its versions, topmost newest.
 */
class File extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    item: PropTypes.shape({}).isRequired,
    parent: PropTypes.shape({}),
    project: PropTypes.shape({}),
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
  };

  static defaultProps = {
    parent: undefined,
    project: undefined,
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
  };

  handlePress = () => {
    const { onPress, item, parent, project } = this.props;

    return onPress({ item, parent, project });
  };

  renderSwipeLeftPanel = (swipable) => {
    const { swipeLeftPanelRenderer } = this.props;

    return swipeLeftPanelRenderer(this.props, swipable);
  };

  renderSwipeRightPanel = (swipable) => {
    const { swipeRightPanelRenderer } = this.props;

    return swipeRightPanelRenderer(this.props, swipable);
  };

  render() {
    const { swipeLeftPanelRenderer, swipeRightPanelRenderer, onPress } = this.props;
    const leftRenderer = swipeLeftPanelRenderer ? this.renderSwipeLeftPanel : undefined;
    const rightRenderer = swipeRightPanelRenderer ? this.renderSwipeRightPanel : undefined;

    return (
      <Container swipeLeftPanelRenderer={leftRenderer} swipeRightPanelRenderer={rightRenderer}>
        <FileRow
          {...this.props}
          onPress={this.handlePress}
          style={styles.paddingLeft5}
          touchable={!!onPress}
        />
      </Container>
    );
  }
}

export default File;
