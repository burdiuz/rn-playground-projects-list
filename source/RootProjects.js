import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '@actualwave/react-native-kingnare-style';
import {
  getRootDirectories as getDefaultRootDirectories,
  readDirectory as readProjectsDirectory,
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
    onPress: PropTypes.func.isRequired,
    readDirectory: PropTypes.func,
    getRootDirectories: PropTypes.func,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
  };

  static defaultProps = {
    readDirectory: readProjectsDirectory,
    getRootDirectories: getDefaultRootDirectories,
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.read();
  }

  componentWillUnmount() {
    const { projects } = this.state;

    if(projects) {
      projects.removeUpdatedListener(this.readContents);
    }

    this.removeContentListeners();
  }

  async read() {
    const { getRootDirectories } = this.props;

    try {
      const { projects, containers, templates, snippets, tools } = await getRootDirectories();

      projects.addUpdatedListener(this.readContents);

      this.setState(
        { projects, directories: [snippets, tools, containers, templates] },
        this.readContents,
      );
    } catch (error) {
      console.error(error);
    }
  }

  readContents = async () => {
    const { readDirectory } = this.props;
    const { projects } = this.state;

    try {
      const contents = await readDirectory(projects);

      this.updateItems(contents);
    } catch (error) {
      console.error(error);
    }
  };

  removeContentListeners() {
    const { contents } = this.state;

    if (!contents) {
      return;
    }

    contents.forEach((contentItem) => {
      contentItem.removeParentUpdatedListener(this.readContents);
    });
  }

  updateItems(contents) {
    this.setState(
      () => {
        this.removeContentListeners();

        return { contents };
      },
      () => {
        contents.forEach((contentItem) => {
          contentItem.addParentUpdatedListener(this.readContents);
        });
      },
    );
  }

  render() {
    const { contents, projects, directories } = this.state;

    if (!projects) {
      return null;
    }

    return (
      <Projects
        {...this.props}
        parent={projects}
        project={null}
        items={contents}
        additionalItems={directories}
        emptyRenderer={renderEmpty}
      />
    );
  }
}

export default RootProjects;
