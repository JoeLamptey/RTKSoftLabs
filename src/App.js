import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import {Paper, makeStyles, Typography, Divider, TextField, Grid} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    textAlign: "center",
    color: "#1a2"
  },
  container: {
    margin: "0% 15%",
    paddingTop: "5%"
  },
  root:{
    backgroundColor: "#282c34",
    minHeight: "100vh",
    color: "#fff",
    padding: "0 0"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
}))

function App() {
  const classes = useStyles()
  let state = {}
  let handleChange = (change)=>{
    change.preventDefault()
    console.log(change.target)
  }

  return (
    <div className={classes.root}>      
      <div className={classes.container}>
        <Paper className={classes.paper}>        
          <Typography variant="h5" component="h3">
            RTK SoftLabs - License Generation & Validation
          </Typography>
          {/* <Divider variant='inset'/> */}
          <br /><br />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
              <TextField
                    label="Search Company License"
                    className={classes.textField}
                    value={state.name}
                    onChange={handleChange}
                  />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <form>
                  <TextField
                    label="Company Name"
                    className={classes.textField}
                    value={state.name}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Company Name"
                    className={classes.textField}
                    value={state.name}
                    onChange={handleChange}
                  />
                </form>
              </Paper>
            </Grid>
          </Grid>          
        </Paper>  
      </div> 
    </div>
  );
}

export default App;
