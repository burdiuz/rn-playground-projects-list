import { StyleSheet } from 'react-native';
import { styles as fileTreeStyles } from '@actualwave/react-native-file-tree';

const { folderRowStyles } = fileTreeStyles;

const ROW_PADDING = 5;
const SELECTED_COLOR = 0xffffff33;

const styles = StyleSheet.create({
  info: {
    alignSelf: 'center',
  },
  spacing: {
    height: 15,
  },
  dim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 0xffffff66,
  },
  container: {
    height: 42,
  },
  file: {
    padding: ROW_PADDING,
  },
  fileSelected: {
    padding: ROW_PADDING,
    backgroundColor: SELECTED_COLOR,
  },
  folder: {
    padding: ROW_PADDING,
  },
  folderSelected: {
    padding: ROW_PADDING,
    backgroundColor: SELECTED_COLOR,
  },
  folderSelectedParent: {
    padding: ROW_PADDING,
    borderBottomWidth: 1,
    borderBottomColor: SELECTED_COLOR,
  },
  nestedProjects: {
    paddingLeft: 15,
  },
  childrenCount: {
    color: 0x505050ff,
    fontWeight: '400',
  },
  project: StyleSheet.flatten([
    folderRowStyles.container,
    {
      borderBottomWidth: 1,
      borderBottomColor: '#404040',
    },
  ]),
  projectSelected: StyleSheet.flatten([
    folderRowStyles.container,
    {
      borderBottomWidth: 1,
      borderBottomColor: '#404040',
      backgroundColor: SELECTED_COLOR,
    },
  ]),
  projectSelectedParent: StyleSheet.flatten([
    folderRowStyles.container,
    {
      borderBottomWidth: 1,
      borderBottomColor: SELECTED_COLOR,
    },
  ]),
  projectIconExpanded: StyleSheet.flatten([
    folderRowStyles.icon,
    {
      padding: 2,
      paddingTop: 6,
      paddingLeft: 2,
    },
  ]),
  projectIconCollapsed: StyleSheet.flatten([
    folderRowStyles.icon,
    {
      padding: 2,
      paddingTop: 7,
      paddingLeft: 2,
    },
  ]),
  projectTitle: StyleSheet.flatten([folderRowStyles.title, { fontWeight: '600' }]),
  projectsEmptyText: {
    padding: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  projectViewSpacing: {
    height: 15,
  },
});

export default styles;
