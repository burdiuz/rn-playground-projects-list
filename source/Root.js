import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '@actualwave/react-native-kingnare-style';
import {
  getRoot as getRootDefault,
  readDirectory as readDirectoryDefault,
} from '@actualwave/rn-playground-projects';

import Projects from './Projects';
import { styles } from './styles';

const renderEmpty = () => (
  <Text style={styles.projectsEmptyText}>
    Nothing found here. Try reinstalling the app.
  </Text>
);

class Root extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    listItemFilter: PropTypes.func,
    getRoot: PropTypes.func,
    readDirectory: PropTypes.func,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
  };

  static defaultProps = {
    getRoot: getRootDefault,
    readDirectory: readDirectoryDefault,
    listItemFilter: undefined,
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
    const { root } = this.state;

    if (root) {
      root.removeUpdatedListener(this.readContents);
    }

    this.removeContentListeners();
  }

  async read() {
    const { getRoot } = this.props;

    try {
      const root = await getRoot();

      root.addUpdatedListener(this.readContents);

      this.setState({ root }, this.readContents);
    } catch (error) {
      console.error(error);
    }
  }

  readContents = async () => {
    const { readDirectory } = this.props;
    const { root } = this.state;

    try {
      const contents = await readDirectory(root);

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
    const { contents, root } = this.state;

    if (!root) {
      return null;
    }

    return (
      <Projects
        {...this.props}
        parent={root}
        project={null}
        items={contents}
        emptyRenderer={renderEmpty}
      />
    );
  }
}

export default Root;
