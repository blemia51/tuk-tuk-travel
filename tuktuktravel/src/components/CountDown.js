import PropTypes from "prop-types";
import React, { Component } from "react";

class CountDown extends Component {
  state = {
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
    timeUp: false,
  };

  updateClock = () => {
    const { date } = this.props;
    const eventDate = Date.parse(date);
    let difference = eventDate - new Date();
  
    if (difference < 1) {
      this.setState({ timeUp: true });
    } else {
      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((difference / (1000 * 60)) % 60);
      let seconds = Math.floor((difference / 1000) % 60);
      this.setState({
        hours: hours > 9 ? hours : `0${hours}`,
        minutes: minutes > 9 ? minutes : `0${minutes}`,
        seconds: seconds > 9 ? seconds : `0${seconds}`,
        days,
      });
    }
  };

  componentDidMount() {
    this.updateClock();
    let intervalId = setInterval(this.updateClock, 1000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { days, hours, minutes, seconds, timeUp } = this.state;
    
    return timeUp ? (
      <p>Tuk-Tuk en cours</p>
    ) : (
      <>
      <p>Départ dans:</p>
      <div style={{display:'flex', justifyContent:'space-around', position:'relative', left:'-30px'}}>
      <div style={{padding:'5px', background:'#fa8c17', color:'white'}}>{`${days}j`}</div>
      <div style={{padding:'5px', background:'#fa8c17', color:'white'}}>{`${hours}h`}</div>
      <div style={{padding:'5px', background:'#fa8c17', color:'white'}}>{`${minutes}m`}</div>
      <div style={{padding:'5px', background:'#fa8c17', color:'white'}}>{`${seconds}s`}</div>
      </div>
      {/* <p>{`${days} ${dayString} ${hours} hours ${minutes}  minutes ${seconds} seconds`}</p> */}
      </>
    );
  }
}

CountDown.propTypes = {
  date: PropTypes.string,
}

export default CountDown;
