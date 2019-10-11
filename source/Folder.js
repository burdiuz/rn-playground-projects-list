import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { DirectoryRow } from '@actualwave/react-native-file-tree';

import Container from './Container';
import Projects from './Projects';

const styles = StyleSheet.create({
  paddingLeft5: {
    paddingLeft: 5,
  },
  paddingLeft15: {
    paddingLeft: 15,
  },
});

class Folder extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    item: PropTypes.shape({}).isRequired,
    parent: PropTypes.shape({}),
    project: PropTypes.shape({}),
    readDirectory: PropTypes.func.isRequired,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
    folderAdditionalContentRenderer: PropTypes.func,
    onRead: PropTypes.func,
  };

  static defaultProps = {
    parent: undefined,
    project: undefined,
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
    folderAdditionalContentRenderer: undefined,
    onRead: undefined,
  };

  state = { contents: null, expanded: false, childrenCount: 0 };

  componentDidMount() {
    const { item } = this.props;

    this.read();
    item.addUpdatedListener(this.handleContentUpdated);
  }

  async read() {
    const { item, project, readDirectory, onError } = this.props;

    try {
      const contents = await readDirectory(item, project);

      this.updateItems(contents);
    } catch (error) {
      if (onError) {
        onError(error, item);
      }
    }
  }

  handleContentUpdated = () => {
    this.read();
  };

  removeContentListeners() {
    const { contents } = this.state;

    if (!contents) {
      return;
    }

    contents.forEach((contentItem) => {
      contentItem.removeParentUpdatedListener(this.handleContentUpdated);
    });
  }

  componentWillUnmount() {
    this.removeContentListeners();
  }

  updateItems(contents) {
    this.setState(
      () => {
        this.removeContentListeners();
        return { contents, childrenCount: contents.length };
      },
      () => {
        const { onRead, item, project } = this.props;

        contents.forEach((contentItem) => {
          contentItem.addParentUpdatedListener(this.handleContentUpdated);
        });

        if (onRead) {
          onRead(contents, item, project);
        }
      },
    );
  }

  handlePress = () => {
    const { onPress, item, parent, project } = this.props;

    this.setState(() => {
      const { expanded } = this.state;

      return { expanded: !expanded };
    });

    return onPress({ item, parent, project });
  };

  renderContents = () => {
    const { item, parent, ...props } = this.props;
    const { contents } = this.state;

    return (
      <Projects
        {...props}
        items={contents}
        parent={item}
        style={styles.paddingLeft15}
      />
    );
  };

  renderSwipeLeftPanel = (swipable) => {
    const { swipeLeftPanelRenderer } = this.props;

    return swipeLeftPanelRenderer(this.props, swipable);
  };

  renderSwipeRightPanel = (swipable) => {
    const { swipeRightPanelRenderer } = this.props;

    return swipeRightPanelRenderer(this.props, swipable);
  };

  renderSwipeableContainer = (row) => {
    const { swipeLeftPanelRenderer, swipeRightPanelRenderer } = this.props;
    const leftRenderer = swipeLeftPanelRenderer
      ? this.renderSwipeLeftPanel
      : undefined;
    const rightRenderer = swipeRightPanelRenderer
      ? this.renderSwipeRightPanel
      : undefined;

    return (
      <Container
        swipeLeftPanelRenderer={leftRenderer}
        swipeRightPanelRenderer={rightRenderer}>
        {row}
      </Container>
    );
  };

  renderFolderChildren = (row) => {
    const { folderAdditionalContentRenderer } = this.props;
    const { expanded } = this.state;

    if (folderAdditionalContentRenderer && expanded) {
      return folderAdditionalContentRenderer(this.props);
    }

    return null;
  };

  render() {
    const { expanded, childrenCount } = this.state;

    return (
      <DirectoryRow
        {...this.props}
        style={styles.paddingLeft5}
        expanded={expanded}
        onPress={this.handlePress}
        containerRenderer={this.renderSwipeableContainer}
        contentRenderer={this.renderContents}
        contentLength={childrenCount}>
        {this.renderFolderChildren()}
      </DirectoryRow>
    );
  }
}

export default Folder;
