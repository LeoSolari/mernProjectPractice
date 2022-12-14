import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    display: "flex",
    padding: "16px",
    marginBottom: "1em",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));
