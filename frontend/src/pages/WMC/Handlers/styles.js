import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
	card: {
		minHeight: "100%",
		display: "flex",
		flexDirection: "column",
	},
	centeredContainer: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	paper: {
		// flexGrow: 1,
		padding: theme.spacing(3),
	}
}));
