import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { DirectoryRow } from '@actualwave/react-native-file-tree';

import { defaultIsSelectedItem, defaultIsSelectedItemParent } from './utils';
import Container from './Container';
import Projects from './Projects';

import styles from './styles';

class Folder extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    item: PropTypes.shape({}).isRequired,
    parent: PropTypes.shape({}),
    project: PropTypes.shape({}),
    readDirectory: PropTypes.func.isRequired,
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
    isLeftSwipeable: PropTypes.func,
    isRightSwipeable: PropTypes.func,
    folderAdditionalContentRenderer: PropTypes.func,
    listItemFilter: PropTypes.func,
    isSelectedItem: PropTypes.func,
    isSelectedItemParent: PropTypes.func,
    onRead: PropTypes.func,
  };

  static defaultProps = {
    parent: undefined,
    project: undefined,
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
    isLeftSwipeable: undefined,
    isRightSwipeable: undefined,
    folderAdditionalContentRenderer: undefined,
    listItemFilter: undefined,
    isSelectedItem: defaultIsSelectedItem,
    isSelectedItemParent: defaultIsSelectedItemParent,
    onRead: undefined,
  };

  static getDerivedStateFromProps({ selectedItem, item, isSelectedItem, isSelectedItemParent }, { expanded }) {
    if (!selectedItem) {
      return null;
    }

    return {
      expanded: isSelectedItem(item, selectedItem) || isSelectedItemParent(item, selectedItem) || expanded,
    };
  }

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
    const { listItemFilter } = this.props;

    this.setState(
      () => {
        this.removeContentListeners();
        return {
          contents,
          childrenCount: listItemFilter ? contents.filter(listItemFilter).length : contents.length,
        };
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

  getStyle() {
    const { item, selectedItem, isSelectedItem, isSelectedItemParent } = this.props;

    let style = styles.folder;

    if (isSelectedItem(item, selectedItem)) {
      style = styles.folderSelected;
    } else if (isSelectedItemParent(item, selectedItem)) {
      style = styles.folderSelectedParent;
    }

    return style;
  }

  renderContents = () => {
    const { item, parent, ...props } = this.props;
    const { contents } = this.state;

    return <Projects {...props} items={contents} parent={item} style={styles.nestedProjects} />;
  };

  isLeftSwipeable = () => {
    const { isLeftSwipeable } = this.props;

    return isLeftSwipeable(this.props);
  };

  renderSwipeLeftPanel = (swipeContainer) => {
    const { swipeLeftPanelRenderer } = this.props;

    return swipeLeftPanelRenderer(this.props, swipeContainer);
  };

  isRightSwipeable = () => {
    const { isRightSwipeable } = this.props;

    return isRightSwipeable(this.props);
  };

  renderSwipeRightPanel = (swipeContainer) => {
    const { swipeRightPanelRenderer } = this.props;

    return swipeRightPanelRenderer(this.props, swipeContainer);
  };

  renderSwipeableContainer = (row) => {
    const { swipeLeftPanelRenderer, swipeRightPanelRenderer, isLeftSwipeable, isRightSwipeable } = this.props;

    const leftRenderer = swipeLeftPanelRenderer ? this.renderSwipeLeftPanel : undefined;
    const rightRenderer = swipeRightPanelRenderer ? this.renderSwipeRightPanel : undefined;
    const leftSwipeable = isLeftSwipeable ? this.isLeftSwipeable : undefined;
    const rightSwipeable = isRightSwipeable ? this.isRightSwipeable : undefined;

    return (
      <Container
        swipeLeftPanelRenderer={leftRenderer}
        swipeRightPanelRenderer={rightRenderer}
        isLeftSwipeable={leftSwipeable}
        isRightSwipeable={rightSwipeable}>
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
    const { listItemFilter } = this.props;
    const { expanded, childrenCount } = this.state;

    return (
      <DirectoryRow
        {...this.props}
        style={this.getStyle()}
        expanded={expanded}
        onPress={this.handlePress}
        containerRenderer={this.renderSwipeableContainer}
        contentRenderer={this.renderContents}
        contentLength={childrenCount}
        listItemFilter={listItemFilter}>
        {this.renderFolderChildren()}
      </DirectoryRow>
    );
  }
}

export default Folder;
