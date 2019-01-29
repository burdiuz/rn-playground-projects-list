import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '@actualwave/react-native-kingnare-style';
import { Directory } from '@actualwave/react-native-files';
import {
  getRootDirectories,
  readDirectory,
  countDirectoryChildren,
} from '@actualwave/rn-playground-projects';

import Projects from './Projects';
import { styles } from './ProjectsView';

const renderEmpty = () => (
  <Text style={styles.emptyText}>
    No projects created yet. Start with creating a Project, Folder or a single File.
  </Text>
);

class RootProjects extends Component {
  static propTypes = {
    onAction: PropTypes.func.isRequired,
    readDirectory: PropTypes.func,
    countDirectoryChildren: PropTypes.func,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
  };

  static defaultProps = {
    readDirectory,
    countDirectoryChildren,
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.getDirectories();
  }

  getDirectories() {
    return getRootDirectories();
  }

  componentDidMount() {
    this.readRootDirectory();
  }

  async readRootDirectory() {
    const { projects, containers, templates, snippets, tools } = await this.getDirectories();

    this.setState({ projects, directories: [snippets, tools, containers, templates] });
  }

  render() {
    const { projects, directories } = this.state;

    if (!projects) {
      return null;
    }

    return (
      <Projects
        {...this.props}
        parent={null}
        project={null}
        readDirectory={readDirectory}
        additionalItems={directories}
        emptyRenderer={renderEmpty}
      />
    );
  }
}

export default RootProjects;
