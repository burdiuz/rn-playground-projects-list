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
    onAction: PropTypes.func.isRequired,
    item: PropTypes.shape({}).isRequired,
    parent: PropTypes.shape({}).isRequired,
    project: PropTypes.shape({}).isRequired,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
  };

  static defaultProps = {
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
  };

  handlePress = () => {
    // handleAction(action)
    console.log('Click on FileRow');
  };

  handleAction = () => {
    const { onAction, item, parent, project } = this.props;

    // onAction(action, item, parent, project)
    console.log('Click on FileRow');
  }

  renderSwipeLeftPanel = () => {
    const { swipeLeftPanelRenderer } = this.props;

    return swipeLeftPanelRenderer(this.props);
  };

  renderSwipeRightPanel = () => {
    const { swipeRightPanelRenderer } = this.props;

    return swipeRightPanelRenderer(this.props);
  };

  render() {
    const { swipeLeftPanelRenderer, swipeRightPanelRenderer } = this.props;
    const leftRenderer = swipeLeftPanelRenderer ? this.renderSwipeLeftPanel : undefined;
    const rightRenderer = swipeRightPanelRenderer ? this.renderSwipeRightPanel : undefined;

    return (
      <Container swipeLeftPanelRenderer={leftRenderer} swipeRightPanelRenderer={rightRenderer}>
        <FileRow
          {...this.props}
          onPress={this.handlePress}
          onAction={this.handleAction}
          style={{
            paddingHorizontal: 5,
          }}
        />
      </Container>
    );
  }
}

export default File;
