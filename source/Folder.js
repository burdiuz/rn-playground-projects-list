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
import { countDirectoryChildren } from '@actualwave/rn-playground-projects';

import Projects from './Projects';

class Folder extends Component {
  static propTypes = {
    item: PropTypes.shape({}),
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
  };

  state = { expanded: false, childrenCount: 0 };
  children = createRef();

  componentDidMount() {
    this.updateChildrenCount();
  }

  async updateChildrenCount() {
    const {
      item: { directory },
    } = this.props;

    const childrenCount = await countDirectoryChildren(directory);

    this.setState({ childrenCount });
  }

  // When this item should update
  onShouldUpdate = (item) => {};

  // When this item's parent should update
  onShouldUpdateParent = (item) => {};

  // When children should be re-read
  onShouldUpdateChildren = (action) => {
    // FIXME have to reload its internals and reload parent if changes apply
    const { current } = this.children;

    if (current) current.update();
  };

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
      () => {
        const { onExpand, onCollapse } = this.props;
        const { expanded } = this.state;

        if (expanded) {
          onExpand && onExpand();
        } else {
          onCollapse && onCollapse();
        }
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
        onShouldUpdateParent={this.onShouldUpdate}
        onShouldUpdateChildren={this.onShouldUpdateChildren}
        style={{ paddingLeft: 15 }}
      />
    );
  };

  renderSwipeLeftPanel = () => {
    return (
      <View style={{ height: 32, width: '100%', backgroundColor: ACTIVE_BACKGROUND_COLOR }}>
        <Text>Swipe Folder Left Panel</Text>
      </View>
    );
  };

  renderSwipeRightPanel = () => {
    return (
      <View style={{ height: 32, width: '100%', backgroundColor: ACTIVE_BACKGROUND_COLOR }}>
        <Text>Swipe Folder Right Panel</Text>
      </View>
    );
  };

  renderSwipeableContainer = (row) => {
    return (
      <SwipeableXContainer
        swipeLeftPanelRenderer={this.renderSwipeLeftPanel}
        swipeRightPanelRenderer={this.renderSwipeRightPanel}
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
        onShouldUpdateParent={this.onShouldUpdateParent}
        onShouldUpdateChildren={this.onShouldUpdateChildren}
        containerRenderer={this.renderSwipeableContainer}
        contentRenderer={this.renderContents}
        contentLength={childrenCount}
      />
    );
  }
}

export default Folder;
