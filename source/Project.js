import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  Text,
  SwipeableXContainer,
  BACKGROUND_COLOR,
  ACTIVE_BACKGROUND_COLOR,
} from '@actualwave/react-native-kingnare-style';

import Folder from './Folder';
import ProjectRow from './ProjectRow';
import Projects from './Projects';

/*
Project is probably just customized Folder component, so I can wrap Folder
and add custom icon, actions and stuff.
 */
class Project extends Folder {
  static propTypes = {
    onAction: PropTypes.func.isRequired,
    item: PropTypes.shape({}),
  };

  renderSwipeLeftPanel = () => {
    return (
      <View style={{ height: 32, width: '100%', backgroundColor: ACTIVE_BACKGROUND_COLOR }}>
        <Text>Swipe Project Left Panel</Text>
      </View>
    );
  };

  renderSwipeRightPanel = () => {
    return (
      <View style={{ height: 32, width: '100%', backgroundColor: ACTIVE_BACKGROUND_COLOR }}>
        <Text>Swipe Project Right Panel</Text>
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
      <ProjectRow
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

export default Project;
