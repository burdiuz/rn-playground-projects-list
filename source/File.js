import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FileRow } from '@actualwave/react-native-file-tree';

import { defaultIsSelectedItem } from './utils';
import Container from './Container';

import styles from './styles';

/*
  Make file expandable too to display its versions, topmost newest.
 */
class File extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    item: PropTypes.shape({}).isRequired,
    parent: PropTypes.shape({}),
    project: PropTypes.shape({}),
    swipeLeftPanelRenderer: PropTypes.func,
    swipeRightPanelRenderer: PropTypes.func,
    isSelectedItem: PropTypes.func,
  };

  static defaultProps = {
    parent: undefined,
    project: undefined,
    swipeLeftPanelRenderer: undefined,
    swipeRightPanelRenderer: undefined,
    isSelectedItem: defaultIsSelectedItem,
  };

  handlePress = () => {
    const { onPress, item, parent, project } = this.props;

    return onPress({ item, parent, project });
  };

  getStyle() {
    const { item, selectedItem, isSelectedItem } = this.props;

    let style = styles.file;

    if (isSelectedItem(item, selectedItem)) {
      style = styles.fileSelected;
    }

    return style;
  }

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

  render() {
    const {
      swipeLeftPanelRenderer,
      swipeRightPanelRenderer,
      isLeftSwipeable,
      isRightSwipeable,
      onPress,
    } = this.props;
    
    const leftRenderer = swipeLeftPanelRenderer ? this.renderSwipeLeftPanel : undefined;
    const rightRenderer = swipeRightPanelRenderer ? this.renderSwipeRightPanel : undefined;
    const leftSwipeable = isLeftSwipeable ? this.isLeftSwipeable : undefined;
    const rightSwipeable = isRightSwipeable ? this.isRightSwipeable : undefined;

    return (
      <Container
        swipeLeftPanelRenderer={leftRenderer}
        swipeRightPanelRenderer={rightRenderer}
        isLeftSwipeable={leftSwipeable}
        isRightSwipeable={rightSwipeable}
      >
        <FileRow
          {...this.props}
          onPress={this.handlePress}
          style={this.getStyle()}
          touchable={!!onPress}
        />
      </Container>
    );
  }
}

export default File;
