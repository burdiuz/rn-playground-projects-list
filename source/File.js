import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  Text,
  SwipeableXContainer,
  BACKGROUND_COLOR,
  ACTIVE_BACKGROUND_COLOR,
} from '@actualwave/react-native-kingnare-style';
import { FileRow } from '@actualwave/react-native-file-tree';

import Container from './Container';

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

  renderSwipeLeftPanel = () => {
    const { swipeLeftPanelRenderer } = this.props;

    return swipeLeftPanelRenderer(this.props);
  };

  renderSwipeRightPanel = () => {
    const { swipeRightPanelRenderer } = this.props;

    return swipeRightPanelRenderer(this.props);
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
          style={{
            padding: 5,
          }}
          touchable={!!onPress}
        />
      </Container>
    );
  }
}

export default File;
