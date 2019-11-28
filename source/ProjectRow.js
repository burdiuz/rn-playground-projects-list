import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import FontFamily from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text } from '@actualwave/react-native-kingnare-style';

import { DirectoryRow, renderers } from '@actualwave/react-native-file-tree';

import { PROJECT_TYPE } from './constants';

import styles from './styles';

const { directoryIconRenderer, directoryTitleRenderer } = renderers;

export const projectIconRenderer = (item, props) => {
  const { expanded } = props;
  const { type } = item;

  if (type === PROJECT_TYPE) {
    return (
      <FontFamily
        name={expanded ? 'folder-open-outline' : 'folder-text-outline'}
        size={24}
        color="#ccc"
        style={expanded ? styles.projectIconExpanded : styles.projectIconCollapsed}
      />
    );
  }

  return directoryIconRenderer(item, props);
};

export const projectTitleRenderer = (item, props) => {
  const { content, contentLength } = props;
  const { name, type } = item;
  let length = contentLength;

  if (Number.isNaN(length) && content) {
    ({ length } = content);
  }

  if (type === PROJECT_TYPE) {
    return (
      <Text style={styles.projectTitle}>
        {name}
        <Text style={styles.childrenCount}> ({length || '0'})</Text>
      </Text>
    );
  }

  return directoryTitleRenderer(item, props);
};

export const projectButtonsRenderer = () => null;

const ProjectRow = (props) => {
  const { style, children } = props;

  return (
    <DirectoryRow {...props} style={style || styles.project} touchable>
      {children}
    </DirectoryRow>
  );
};

ProjectRow.propTypes = {
  item: PropTypes.shape({}).isRequired,
  iconRenderer: PropTypes.func,
  titleRenderer: PropTypes.func,
  buttonsRenderer: PropTypes.func,
};

DirectoryRow.defaultProps = {
  iconRenderer: projectIconRenderer,
  titleRenderer: projectTitleRenderer,
  buttonsRenderer: projectButtonsRenderer,
};

ProjectRow.defaultProps = {};

export default ProjectRow;
