import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { common, red } from '@material-ui/core/colors';
import { appColors } from '../common/variables';

export const inputTheme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: common.white,
  //   },
  //   secondary: {
  //     main: green[500],
  //   },
  // },
});

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: appColors.secondary,
    },
    secondary: {
      main: red[800],
    },
  },
});

