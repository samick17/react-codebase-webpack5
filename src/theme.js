import { createTheme } from '@material-ui/core/styles';
import {
	indigo as primaryColor,
	pink as secondaryColor,
	red as errorColor,
	orange as warningColor,
	blue as infoColor,
	teal as successColor,
} from '@material-ui/core/colors';

const mainTheme = createTheme({
	spacing: 12,
	palette: {
		type: 'light',
		primary: {
			main: primaryColor['900'],
		},
		secondary: {
			main: secondaryColor['900'],
		},
		error: {
			main: errorColor['900'],
		},
		warning: {
			main: warningColor['900'],
		},
		info: {
			main: infoColor['900'],
		},
		success: {
			main: successColor['900'],
		},
		background: {
			default: '#fafafa',
			paper: '#ffffff',
		},
		text: {
			active: primaryColor['900'],
			secondary: 'rgba(0, 0, 0, .7)',
			disabled: 'rgba(0, 0, 0, .5)',
		},
		action: {
			active: primaryColor['900'],
			hover: 'rgba(0, 0, 0, .08)',
			selected: 'rgba(0, 0, 0, .16)',
			disabled: 'rgba(0, 0, 0, .3)',
			disabledBackground: 'rgba(0, 0, 0, .12)',
		},
		divider: 'rgba(0, 0, 0, .12)',
	},
	status: {
		danger: 'orange',
	},
	typography: {
		h1: {
			fontSize: '6rem',
			fontWeight: 300
		},
		h2: {
			fontSize: '3.75rem',
			fontWeight: 300
		},
		h3: {
			fontSize: '3rem',
			fontWeight: 300
		},
		h4: {
			fontSize: '2.125rem',
			fontWeight: 300
		},
		h5: {
			fontSize: '1.5rem',
			fontWeight: 300
		},
		h6: {
			fontSize: '1.25rem',
			fontWeight: 300
		},
		subtitle1: {
			fontSize: '1rem',
			fontWeight: 400
		},
		subtitle2: {
			fontSize: '.875rem',
			fontWeight: 500
		},
		body1: {
			fontSize: '1rem',
			fontWeight: 400,
		},
		body2: {
			fontSize: '.875rem',
			fontWeight: 400
		},
		button: {
			fontSize: '.875rem',
			fontWeight: 500,
			textTransform: 'none',
		},
		caption: {
			fontSize: '.75rem'
		},
		overline: {
			fontSize: '.75rem'
		}
	}
});
// console.log(mainTheme);
export default mainTheme;
