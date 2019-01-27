import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '@actualwave/react-native-kingnare-style';
import { readDirectory } from '@actualwave/rn-playground-projects';

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

// FIXME Provide API to recursively read and update project contents

// FIXME react-native-file-tree API chnaged significantly, verify for compliance

class Projects extends Component {
  static propTypes = {
    parent: PropTypes.shape({}).isRequired,
    additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
    // use item prop to get parent item and place it into
    // this.state.project if its type is project
    project: PropTypes.shape({}),
    children: PropTypes.node,
    itemRenderer: PropTypes.func,
    emptyRenderer: PropTypes.func,
    onRead: PropTypes.func,
  };

  static defaultProps = {
    project: undefined,
    children: undefined,
    itemRenderer: undefined,
    emptyRenderer: undefined,
    additionalItems: [],
  };

  state = { items: null };

  componentDidMount() {
    this.readContents();
  }

  async readContents() {
    const { parent, project, additionalItems } = this.props;
    /*
    await createProject(parent, 'First project');
    await createProject(parent, 'Second project');
    await createProject(parent, 'My project');
    //*/

    /*
    const data = await createProject(parent, 'Something Important');
    console.log('Success:', data);
    //*/

    const items = await readDirectory(parent, project);

    this.setState({ items: [...items, ...additionalItems] }, () => {
      const { onRead } = this.props;
      if (onRead) {
        onRead(items);
      }
    });
  }

  updateItems(items) {
    console.log(items);
    /*
    Projects does not have internal state, it must be stored elsewhere.
    It receives state from props and on mount it syncs state with real FS data.
    New folders and files are being added, non existent removed and existing updated.
    then onUpdate() is called.

    Every time Project calls onUpdate() or onDelete(), Projects applies changes and calls onUpdate().

    -------------------

    This is not proficient because, since using redux-persistent or AsyncStorage will trigger I/O
    on fyle system, so there are not much difference if we store project/directory state in .project
    file or AsyncStorage. So, let's keep it simple and sync current state with .project file.
    */

    this.setState({ items });
  }

  render() {
    const { additionalItems, ...props } = this.props;
    const { items } = this.state;

    if (!items) {
      return <Text style={{ alignSelf: 'center' }}>Loading, please wait...</Text>;
    }

    // FIXME every item in the list must implement onShouldUpdate() prop which will be called every time item has changed -- renamed or deleted.
    // FIXME this class must implement method update() which can be called by Parent item like Folder or Project to re-read contents after adding an item.
    // FIXME how onShouldUpdate() can be connected to Actions?
    return <ProjectsView {...props} items={items} />;
  }
}

export default Projects;
