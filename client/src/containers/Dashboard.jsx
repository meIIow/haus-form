import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FeedbackForm from '../components/FeedbackForm.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showHide = (this.props.showHistory) ? 'Hide History' : 'Show History';

    const feedbackHistory = this.props.history.map((fb, i) => {
      return (<FeedbackForm
                key= {i}
                readOnly= {true}
                onSubmit= {this.props.onSubmit}
                onChange= {this.props.onChange}
                errors= {this.props.errors}
                feedback= {fb}
              />)
    })
    return (
      <div id="dashboard-container">
        <h1>Feedback</h1>
        <FeedbackForm
          readOnly= {false}
          onSubmit= {this.props.onSubmit}
          onChange= {this.props.onChange}
          errors= {this.props.errors}
          feedback= {this.props.feedback}
        />
        <br></br>
        <br></br>
        <RaisedButton label={showHide}
          onClick={this.props.toggleHistory}
        />
        {this.props.showHistory && feedbackHistory}
      </div>
    )
  }
}

export default Dashboard;
