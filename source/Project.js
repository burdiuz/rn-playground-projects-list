import React from 'react';
import PropTypes from 'prop-types';

import Folder from './Folder';
import ProjectRow from './ProjectRow';

/*
Project is probably just customized Folder component, so I can wrap Folder
and add custom icon, actions and stuff.
 */
class Project extends Folder {
  static propTypes = {
    onAction: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    item: PropTypes.shape({}),
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
