import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '@actualwave/react-native-kingnare-style';
import { Directory } from '@actualwave/react-native-files';
import { getRootDirectories } from '@actualwave/rn-playground-projects';

import Projects from './Projects';
import { styles } from './ProjectsView';

const renderEmpty = () => {
  return (
    <Text style={styles.emptyText}>
      No projects created yet. Start with creating a Project, Folder or a single File.
    </Text>
  );
};

class RootProjects extends Component {
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

    this.setState({ projects, containers, templates, snippets, tools });
  }

  render() {
    const { projects, containers, templates, snippets, tools } = this.state;

    if (!projects) {
      return null;
    }

    return (
      <Projects
        {...this.props}
        parent={projects}
        additionalItems={[templates, containers, snippets, tools]}
        emptyRenderer={renderEmpty}
        project={null}
      />
    );
  }
}

export default RootProjects;
