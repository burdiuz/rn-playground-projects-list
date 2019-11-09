import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '@actualwave/react-native-kingnare-style';
import {
  getRootDirectories as getRootDirectoriesDefault,
  readDirectory as readDirectoryDefault,
} from '@actualwave/rn-playground-projects';

import Projects, { defaultLoadingRenderer } from './Projects';
import { styles } from './ProjectsView';

const renderEmpty = () => (
  <Text style={styles.projectsEmptyText}>
    No projects created yet. Start with creating a Project, Folder or a single
    File.
  </Text>
);

class RootProjects extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    readDirectory: PropTypes.func,
    listItemFilter: PropTypes.func,
    getRootDirectories: PropTypes.func,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
    folderAdditionalContentRenderer: PropTypes.func,
    renderListLoading: PropTypes.func,
  };

  static defaultProps = {
    readDirectory: readDirectoryDefault,
    getRootDirectories: getRootDirectoriesDefault,
    listItemFilter: undefined,
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
    folderAdditionalContentRenderer: undefined,
    renderListLoading: defaultLoadingRenderer,
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

    if (projects) {
      projects.removeUpdatedListener(this.readContents);
    }

    this.removeContentListeners();
  }

  async read() {
    const { getRootDirectories } = this.props;

    try {
      const {
        projects,
        containers,
        templates,
        snippets,
        modules,
        tools,
        examples,
        transpilerPlugins,
      } = await getRootDirectories();

      projects.addUpdatedListener(this.readContents);

      const directories = [examples, snippets, containers, tools, templates, modules, transpilerPlugins];

      directories.forEach((item) =>
        item.addUpdatedListener(() => {
          this.setState({
            directories,
          });
        }),
      );

      this.setState(
        {
          projects,
          directories,
        },
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
    const { renderListLoading } = this.props;
    const { contents, projects, directories } = this.state;

    if (!projects) {
      return renderListLoading();
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
