import React from 'react';
import Folder from './Folder';
import ProjectRow from './ProjectRow';

import styles from './styles';

/*
Project is probably just customized Folder component, so I can wrap Folder
and add custom icon, actions and stuff.
 */
class Project extends Folder {
  static propTypes = {
    ...Folder.propTypes,
  };

  static defaultProps = {
    ...Folder.defaultProps,
  };

  getStyle() {
    const { item, selectedItem, isSelectedItem, isSelectedItemParent } = this.props;

    let style = styles.project;

    if (isSelectedItem(item, selectedItem)) {
      style = styles.projectSelected;
    } else if (isSelectedItemParent(item, selectedItem)) {
      style = styles.projectSelectedParent;
    }

    return style;
  }

  render() {
    const { expanded, childrenCount } = this.state;

    return (
      <ProjectRow
        {...this.props}
        style={this.getStyle()}
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
