import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { Text } from '@actualwave/react-native-kingnare-style';
import {
  FILE_TYPE,
  DIRECTORY_TYPE,
  PROJECT_TYPE,
} from '@actualwave/rn-playground-projects';
import { Files } from '@actualwave/react-native-file-tree';

import File from './File';
import Folder from './Folder';
import Project from './Project';

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  projects: {},
  emptyText: {
    padding: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  spacing: {
    height: 15,
  },
});

const SPACING = <View style={styles.spacing} />;

export const projectsItemRenderer = (item, index, props = {}) => {
  const { type, name, directoryName } = item;
  let Component;

  switch (type) {
    case FILE_TYPE:
      Component = File;
      break;
    case DIRECTORY_TYPE:
      Component = Folder;
      break;
    case PROJECT_TYPE:
      Component = Project;
      break;
    default:
      throw new Error(`Item of unknown type "${type}"`);
  }

  return <Component key={directoryName || name} item={item} {...props} />;
};

const projectsEmptyRenderer = () => {
  return (
    <Text style={styles.emptyText}>
      The folder is empty, no files added yet.
    </Text>
  );
};

const projectsContentRenderer = (props) => {
  return <ProjectsView {...props} />;
};

// FIXME react-native-file-tree API chnaged significantly, verify for compliance

const ProjectsView = (props) => <Files {...props}>{SPACING}</Files>;

ProjectsView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  parent: PropTypes.shape({}),
  project: PropTypes.shape({}),
  children: PropTypes.node,
  itemRenderer: PropTypes.func,
  emptyRenderer: PropTypes.func,
};

ProjectsView.defaultProps = {
  parent: undefined,
  project: undefined,
  children: undefined,
  itemRenderer: projectsItemRenderer,
  emptyRenderer: projectsEmptyRenderer,
  contentRenderer: projectsContentRenderer,
};

export default ProjectsView;
