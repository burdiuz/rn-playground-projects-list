import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  Text,
  SwipeableXContainer,
  BACKGROUND_COLOR,
  ACTIVE_BACKGROUND_COLOR,
} from '@actualwave/react-native-kingnare-style';
import { DirectoryRow } from '@actualwave/react-native-file-tree';

import Projects from './Projects';

class Folder extends Component {
  static propTypes = {
    onAction: PropTypes.func.isRequired,
    item: PropTypes.shape({}).isRequired,
    parent: PropTypes.shape({}).isRequired,
    project: PropTypes.shape({}).isRequired,
    readDirectory: PropTypes.func.isRequired,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
    onRead: PropTypes.func,
  };

  static defaultProps = {
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
    onRead: undefined,
  };

  state = { items: null, expanded: false, childrenCount: 0 };

  componentDidMount() {
    this.readContents();
  }

  async readContents() {
    const { parent, project, readDirectory } = this.props;

    // FIXME move this to Folder
    const items = await readDirectory(parent, project);

    this.updateItems(items);
  }

  updateItems(items) {
    const { additionalItems } = this.props;

    this.setState({ items: [...items, ...additionalItems] }, () => {
      const { onRead } = this.props;
      if (onRead) {
        onRead(items);
      }
    });
  }

  async updateChildrenCount() {
    const {
      item: { directory },
      countDirectoryChildren,
    } = this.props;

    let childrenCount;

    if (countDirectoryChildren) {
      childrenCount = await countDirectoryChildren(directory);
    }

    this.setState({ childrenCount });
  }

  onAction = () => {};

  /*
FIXME
  These renderers and event handlers must be propagated through container
  like Projects which could be used as root and in Project/Directory display
 */
  handlePress = () => {
    this.setState(
      () => {
        const { expanded } = this.state;

        return { expanded: !expanded };
      },
    );
  };

  handleChildrenRead = (items) => {
    this.setState({ childrenCount: items.length });
  };

  renderContents = (props) => {
    const {
      item: { directory },
    } = this.props;

    // FIXME it needs more props, all the renderers
    return (
      <Projects
        ref={this.children}
        parent={directory}
        onRead={this.handleChildrenRead}
        style={{ paddingLeft: 15 }}
      />
    );
  };

  renderSwipeLeftPanel = () => {
    const { swipeLeftPanelRenderer } = this.props;

    return swipeLeftPanelRenderer(this.props);
  };

  renderSwipeRightPanel = () => {
    const { swipeRightPanelRenderer } = this.props;

    return swipeRightPanelRenderer(this.props);
  };

  renderSwipeableContainer = (row) => {
    const { swipeLeftPanelRenderer, swipeRightPanelRenderer } = this.props;
    const leftRenderer = swipeLeftPanelRenderer ? this.renderSwipeLeftPanel : undefined;
    const rightRenderer = swipeRightPanelRenderer ? this.renderSwipeRightPanel : undefined;

    return (
      <SwipeableXContainer
        swipeLeftPanelRenderer={leftRenderer}
        swipeRightPanelRenderer={rightRenderer}
        style={{ height: 32 }}
        contentContainerStyle={{ backgroundColor: BACKGROUND_COLOR }}
      >
        {row}
      </SwipeableXContainer>
    );
  };

  render() {
    const { expanded, childrenCount } = this.state;

    return (
      <DirectoryRow
        {...this.props}
        expanded={expanded}
        onPress={this.handlePress}
        containerRenderer={this.renderSwipeableContainer}
        contentRenderer={this.renderContents}
        contentLength={childrenCount}
      />
    );
  }
}

export default Folder;
