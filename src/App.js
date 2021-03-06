import React, {Component} from 'react';
//import logo from './logo.svg';
//import './App.css';
import {Paper, 
   withStyles,
   Typography,
   Select,
   Input,
   InputLabel,
   MenuItem,
   Checkbox,
   TextField,
   AppBar,
   Toolbar, 
   Grid,
   Button,
   Modal,
   Divider,
   List, ListItem, ListItemText} from '@material-ui/core'

  import jszip from 'jszip'
  import {saveAs} from 'file-saver'

const styles = (theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    textAlign: "center",
    color: "#1a2"
  },
  modal: {
    position: 'absolute',
    top: "45%",
    left: "45%",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  container: {
    margin: "0% 10%",
    paddingTop: "3%"
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
    marginTop: theme.spacing(2),
    width: 350,
  },
  button:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: 350,
  },
  select:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: 350,
  },
  selectLabel:{
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(1),
    width: 350,
    textAlign: "center"
  },
  listLicense:{
    maxHeight: 340, 
    overflow: 'auto',
  }
}))



class App extends Component{
  constructor(props){
    super(props)

    this.state={
      Clients: [
        {name: 'Client 1'},
        {name: 'Client 2'},
        {name: 'Client 3'},
        {name: 'Client 4'},
        {name: 'Client 5'},
        {name: 'Client 6'},
        {name: 'Client 7'},
        {name: 'Client 8'},
        {name: 'Client 1'},
        {name: 'Client 2'},
        {name: 'Client 3'},
        {name: 'Client 4'},
        {name: 'Client 5'},
      ],
      searchClients: [],
      packages: [
        {name: 'basic education'},
        {name: 'middle school'},
        {name: 'high school'},
        {name: 'tertiary'},
        {name: 'banking'},
        {name: 'tickets'},
        {name: 'exports'},
        {name: 'credits'},
      ],
      selectedPackages: [],
      open: false,
      selectedClient: ''
    }
    
  }

  filterClient = (change)=>{
    let info = change.currentTarget.value.toLowerCase()
    
    let searchClients = this.state.Clients.filter((client)=>{
        return (client.name.toLowerCase().match(info))
    })
    this.setState({searchClients: searchClients})
    //console.log(searchClients)
  }

  // setClient = (client)=>{
  //   console.log(client.currentTarget.dataset.list_item)
  // }

  handleOpen =(client)=>{
    let selectedClient = client.currentTarget.dataset.list_item
    this.setState({open: true, selectedClient})
  }
  
  handleClose =()=>{
    this.setState({open: false})
  }

  componentWillMount(){
    this.setState({searchClients: this.state.Clients})
    //licfile()
    
  }

  generateLicense =(e) =>{
    e.preventDefault()
    let lic = {
      company: e.target.company.value,
      start: e.target.start.value,
      end: e.target.end.value,
      modules: this.state.selectedPackages
    }
    //console.log('License', lic)

    let zip = new jszip()
    zip.folder('license').file(lic.company+'.lic', JSON.stringify(lic))
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, './'+lic.company+".zip")
    }).catch(e => console.log('Error: ',e))

    this.setState({selectedPackages: []})
    e.target.company.value = ''
    e.target.start.value = ''
    e.target.end.value = ''
    e.target.packages.values = ''
  }

  handleSelect = (e) =>{
    this.setState({selectedPackages: e.target.value})
    //console.log(e.target.value)
  }

  render(){
    
    const {classes} = this.props
   
    return (
      <div className={classes.root}>      
        <div className={classes.container}>
          <Paper className={classes.paper}>        
            <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  RTK SoftLabs | Digital Technology Center
                </Typography>
              </Toolbar>
            </AppBar>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                <TextField
                      label="Search License by Company"
                      value={this.state.name}
                      onChange={this.filterClient}
                      fullWidth
                    />
                  <List className={classes.listLicense}>
                      {
                        this.state.searchClients.map((client, index)=>{
                            return (<ListItem button key={index} onClick={this.handleOpen} data-list_item={client.name}>
                                <ListItemText>{client.name}</ListItemText>
                            </ListItem>)
                        })
                      }
                  </List>
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                  >
                    <div  className={classes.modal}>
                      <Typography variant="h6" id="modal-title">
                        {this.state.selectedClient} License
                      </Typography>
                      <Typography variant="subtitle1" id="simple-modal-description">
                        License details here.... Including modules, start and date of expiration!
                      </Typography>
                    </div>
                  </Modal>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper className={classes.paper}>
                  <form onSubmit={this.generateLicense}>
                    <TextField
                      label="Company Name"
                      className={classes.textField}
                      name='company'
                      required
                    />
                    <TextField
                      label="Start Date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      type='date'
                      name='start'
                      required
                    />
                    <TextField
                      label="Expiration Date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      type='date'
                      name='end'
                      required
                    />
                    <InputLabel htmlFor="select-multiple-checkbox" className={classes.selectLabel}>
                      Select Modules
                    </InputLabel>
                    <Select 
                        className={classes.select}
                        multiple
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        onChange={this.handleSelect}
                        name='packages'
                        value={this.state.selectedPackages}
                        required>
                            {this.state.packages.map((item, index)=>{
                                return <MenuItem value={item.name} key={index}>
                                    <Checkbox checked={this.state.selectedPackages.indexOf(item.name) > -1} />
                                    {item.name}
                                </MenuItem>
                            })}
                    </Select>
                    <Button 
                        className={classes.button}
                        type='submit' 
                        variant='contained'
                        fullWidth 
                        color='primary'>
                            Generate License
                    </Button>
                  </form>
                  <br />
                  <Divider />
                  <Grid container spacing={3}>
                    
                    <Grid item xs={6}>Project Manager: <strong>Shokhista</strong></Grid>
                    <Grid item xs={6}> Analyst and designer: <strong>Liya</strong></Grid>
                    <Grid item xs={6}> Backend Engineer: <strong>Mikhail</strong></Grid> 
                    <Grid item xs={6}>Frontend Engineers: <strong>Manuel & Joseph</strong></Grid>
                  </Grid>                
                </Paper>
                
              </Grid>
            </Grid>          
          </Paper>  
        </div> 
      </div>
    );
  }
}
export default withStyles(styles)(App);
