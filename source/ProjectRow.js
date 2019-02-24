import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FontFamily from 'react-native-vector-icons/FontAwesome';

import { Text } from '@actualwave/react-native-kingnare-style';

import { DirectoryRow, renderers, styles } from '@actualwave/react-native-file-tree';

import { PROJECT_TYPE } from './constants';

const { directoryIconRenderer, directoryTitleRenderer } = renderers;

const { folderRowStyles } = styles;

const projectStyles = StyleSheet.create({
  iconExpanded: StyleSheet.flatten([
    folderRowStyles.icon,
    {
      padding: 2,
      paddingTop: 6,
      paddingLeft: 4,
    },
  ]),
  iconCollapsed: StyleSheet.flatten([
    folderRowStyles.icon,
    {
      padding: 2,
      paddingTop: 7,
      paddingLeft: 8,
    },
  ]),
  title: StyleSheet.flatten([folderRowStyles.title, { fontWeight: '600' }]),
  container: StyleSheet.flatten([
    folderRowStyles.container,
    {
      borderBottomWidth: 1,
      borderBottomColor: '#404040',
    },
  ]),
});

export const projectIconRenderer = (item, props) => {
  const { expanded } = props;
  const { type } = item;

  if (type === PROJECT_TYPE) {
    return (
      <FontFamily
        name={expanded ? 'chevron-down' : 'chevron-right'}
        size={14}
        color="#ccc"
        style={expanded ? projectStyles.iconExpanded : projectStyles.iconCollapsed}
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
      <Text style={projectStyles.title}>
        {name}
        <Text style={{ color: 0x505050ff, fontWeight: '400' }}> ({length || '0'})</Text>
      </Text>
    );
  }

  return directoryTitleRenderer(item, props);
};

export const projectButtonsRenderer = () => null;

const ProjectRow = (props) => {
  const { style, children } = props;

  return (
    <DirectoryRow {...props} style={style || projectStyles.container} touchable>
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
