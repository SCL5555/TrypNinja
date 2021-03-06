import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import TitleBar from "../../components/TitleBar";
import axios from 'axios'
const styles = theme => ({
  root: {
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
    maxHeight: '100%',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 'auto',
    width: 'auto',
    overflow: 'hidden',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  viewsContainer:{
    maxHeight: "100%",
    maxWidth: '100%',
    marginBottom: 50
  }
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
    swipePix:[],
    render:false
  };
  componentDidMount(){
    console.log("logging params");
    console.log(this.props.match.params);
    let id = this.props.match.params.id;
    console.log("id: " + id);
    axios.get('/api/moment/moment/' + id)
      .then((result)=> {
        console.log(result.data);
        this.setState({swipePix:result.data, render:true});
      });
  }
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = this.state.swipePix.length;

    return (this.state.render ? 
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography variant="headline" component="h3">{this.state.swipePix[activeStep].caption}</Typography>
        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          className={classes.viewsContainer}
        >
          {this.state.swipePix.map(step => (
            <img key={step.moment} className={classes.img} src={"https://res.cloudinary.com/tryp-ninja/image/upload/"+step.moment} alt={step.label} />
          ))}
        </SwipeableViews>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="bottom"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div> 
      : null
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);