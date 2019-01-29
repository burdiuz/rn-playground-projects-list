import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '@actualwave/react-native-kingnare-style';

import ProjectsView from './ProjectsView';

/*
 * Projects should always have undeletable folders with files that
 can be changed but first version in history is protected from removal.
 1. Application templates -- user may create new  or edit existing.
 Templates always have first version protected.
 When user selects template, he may also select version.

 2. Test/Demo containers, the wrapper component that displays running application.

 3. Widgets, are small tools that present in toolbar and user may click them. Possible widgets are
    a. Modal for imports listing all possible imports.
    b. Color picker
    c. Icon picker
    d. Code formatter with Prettier

 Purpose of the projects is that project may be configured differently,
 like selected Test container.
 */

/*
 Each Project, Folder or File on UI has properties item, onUpdate and onDelete,
  - item is UI representation of entity
  - onUpdate is a callback that is called every time entity state is being updated(rename, folder opened etc).
    onUpdate also called for directories and projects when they get new files or their child files are removed.
  - onDelete is a callback that is called when entity is destroyed
*/

class Projects extends Component {
  static propTypes = {
    onAction: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({})),
    additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
    children: PropTypes.node,
    itemRenderer: PropTypes.func,
    emptyRenderer: PropTypes.func,
  };

  static defaultProps = {
    items: undefined,
    children: undefined,
    itemRenderer: undefined,
    emptyRenderer: undefined,
    additionalItems: [],
  };

  state = { items: [] };

  static getDerivedStateFromProps({ items, additionalItems }) {
    return {
      items: [...(items || []), ...additionalItems],
    };
  }

  render() {
    const { items, additionalItems, ...props } = this.props;

    if (!items) {
      return <Text style={{ alignSelf: 'center' }}>Loading, please wait...</Text>;
    }

    return <ProjectsView {...props} items={this.state.items} />;
  }
}

export default Projects;
