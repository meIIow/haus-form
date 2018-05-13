import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginPage from './LoginPage.jsx'
import Dashboard from './Dashboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      user: {
        user_id: '',
        username: '',
        password: '',
      },
      signingUp: false,
      signedIn: false,
      showHistory: false,
      feedback: {
        comments: '',
        rating: undefined,
        recommend: undefined
      },
      history: [],
      loginErrors: {},
      feedbackErrors: {}
    }

    this.changeUser = this.changeUser.bind(this);
    this.changeFeedback = this.changeFeedback.bind(this);
    this.processSignupForm = this.processSignupForm.bind(this);
    this.processLoginForm = this.processLoginForm.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getFeedbackHistory = this.getFeedbackHistory.bind(this);
    this.processFeedbackForm = this.processFeedbackForm.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleHistory = this.toggleHistory.bind(this);
    this.sendToSlack = this.sendToSlack.bind(this);

  }


  /**
   * Change the user object on each keypress
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  changeFeedback(event) {
    console.log(event)
    const field = event.target.name;
    const feedback = this.state.feedback;
    feedback[field] = event.target.value;
    this.setState({
      feedback
    });
  }

  /**
   * Process the Signup form.
   *
   * @param {object} event - the JavaScript event object
   */
  processSignupForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const formData = {
      username : this.state.user.username,
      password : this.state.user.password,
    };

    fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => {
        if (res.status === 200) return res.json().then((res) => {
          this.setState({signedIn: true, loginErrors: {}})
        })
        if (res.status === 400) return res.json().then((res) => {
          this.setState({loginErrors: res})
        })
      })
      .catch(err => {
        console.log(err);
      });
  }


  /**
   * Process the Login form.
   *
   * @param {object} event - the JavaScript event object
   */
  processLoginForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // create a string for an HTTP body message
    const formData = {
      username : this.state.user.username,
      password : this.state.user.password,
    };

    // create an AJAX request
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include' // COOKIES
      })
        .then(res => {
          if (res.status === 200) return res.json().then((res) => {
            this.setState({signedIn: true, loginErrors: {}})
          })
          if (res.status === 400) return res.json().then((res) => {
            this.setState({loginErrors: res})
          })
          reject()
        })
        .catch((err) => {
          console.log(err);
        });
  }

  /**
   * Process the Login form.
   *
   * @param {object} event - the JavaScript event object
   */
  processFeedbackForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // create a string for an HTTP body message

    const formData = {
      rating : this.state.feedback.rating,
      comments : this.state.feedback.comments,
      recommend: this.state.feedback.recommend,
    };

    const feedbackErrors = {};
    if (formData.rating === undefined) feedbackErrors.rating = 'must rate experience';
    if (formData.comments === '') feedbackErrors.comments = 'comment field is required';
    if (formData.recommend === undefined) feedbackErrors.recommend = 'recommendation field is required';

    if (Object.keys(feedbackErrors).length) return this.setState({feedbackErrors})
    this.resetErrors();

    // create an AJAX request
    fetch('/feedback/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include' // COOKIES
      })
      .then(res => {
        if (res.status === 200) return res.json().then((res) => {
          console.log("success!")
          this.sendToSlack(formData);
          this.setState({feedback: {
            comments: '',
            rating: undefined,
            recommend: undefined
          }})
        })
        console.log('xxx')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  logOut() {
    this.setState({user:{}, history: [], loggedIn: false});

    // Call an endpoint that will remove cookie and redirect user to '/'.
    fetch('/auth/logout', {
      method: 'GET',
      credentials: 'include'
    })
  }

  toggleLogin() {
    this.setState({signingUp: !this.state.signingUp});
  }

  toggleHistory() {
    console.log(this.state.showHistory)
    if (this.state.showHistory) {
      this.setState({showHistory: false})
    } else {
      this.getFeedbackHistory();
    }
  }

  getFeedbackHistory() {
    console.log('xx')
    fetch('/feedback/history', {
      method: 'GET',
      credentials: 'include'
    }).then(res => {
      if (res.status === 200) return res.json().then(res => {
        this.setState({ history: res.feedback, showHistory: true })
      })
      console.log('failure');
    })
    .catch(err => console.log(err))
  }

  sendToSlack(formData) {

    const feedbackMessage = `
      Feedback from user ${this.state.user.username}:
      They give us ${formData.rating} Stars and ${(formData.recommend) ? 'Would': 'Would Not'} Recommend.
      And they say: ${formData.comments}
      `
      // console.log(feedbackMessage);

    fetch('https://hooks.slack.com/services/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', {
      method: 'POST',
      body: JSON.stringify({text: feedbackMessage}),
      // headers: {'Content-type': 'application/json'},
    }).then(res => {
      if (res.status === 200) return res.json().then(res => {
        console.log(res);
      })
    })
    .catch(err => console.log(err))
  }

  resetErrors() {
    this.setState({ loginErrors:{}, feedbackErrors: {}});
  }



  render() {

    console.log(this.state)

    const loginPage = () => {
      return <LoginPage user={this.state.user} errors={this.state.loginErrors} signingUp={this.state.signingUp} toggleLogin={this.toggleLogin} login={this.processLoginForm} onChange={this.changeUser} signup={this.processSignupForm} resetErrors={this.resetErrors}/>
    }
    const feedbackPage = () => {
      return <Dashboard onSubmit={this.processFeedbackForm} onChange={this.changeFeedback} showHistory={this.state.showHistory} history={this.state.history} feedback={this.state.feedback} toggleHistory={this.toggleHistory} logOut={this.logOut} errors={this.state.feedbackErrors} resetErrors={this.resetErrors}/>
    }

    return (
      <div>
        <h1>Hello!</h1>
        {!this.state.signedIn && loginPage()}
        {this.state.signedIn && feedbackPage()}
      </div>
    )
  }
}

export default App
