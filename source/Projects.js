import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '@actualwave/react-native-kingnare-style';

import ProjectsView from './ProjectsView';

import styles from './styles';

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

export const defaultLoadingRenderer = () => (
  <Text style={{ alignSelf: 'center' }}>Loading, please wait...</Text>
);

export const defaultEmptyRenderer = () => <Text style={{ alignSelf: 'center' }}>Folder is empty...</Text>;

class Projects extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})),
    additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
    children: PropTypes.node,
    itemRenderer: PropTypes.func,
    emptyRenderer: PropTypes.func,
    renderListLoading: PropTypes.func,
    renderListEmpty: PropTypes.func,
  };

  static defaultProps = {
    items: undefined,
    children: undefined,
    itemRenderer: undefined,
    emptyRenderer: undefined,
    additionalItems: [],
    renderListLoading: defaultLoadingRenderer,
    renderListEmpty: defaultEmptyRenderer,
  };

  state = { contents: [] };

  constructor(props) {
    super(props);

    this.state = Projects.getDerivedStateFromProps(props);
  }

  static getDerivedStateFromProps({ items, additionalItems }) {
    return {
      contents: [...(items || []), ...additionalItems].sort(({ pinned: a }, { pinned: b }) => {
        if (a && b) return 0;
        else if (a) return -1;

        return 1;
      }),
    };
  }

  render() {
    const {
      renderListLoading,
      renderListEmpty,
      items,
      additionalItems,
      renderLoading,
      ...props
    } = this.props;
    const { contents } = this.state;

    if (!items) {
      return renderListLoading();
    }

    if (!contents.length) {
      return renderListEmpty();
    }

    return <ProjectsView {...props} items={contents} />;
  }
}

export default Projects;
