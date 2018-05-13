import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RaisedButton from 'material-ui/RaisedButton';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render the component.
   */
  render() {

    const onSubmit = (this.props.signingUp) ? this.props.signup : this.props.login;

    const headerText = (this.props.signingUp) ? "Sign Up" : "Log In";
    const toggleText = (!this.props.signingUp) ? "Switch to Sign Up" : "Switch to Log In";

    return (
      <div className="container">
        <h1> {headerText} </h1>
        <LoginForm
          onSubmit={onSubmit}
          onChange={this.props.onChange}
          errors={this.props.errors}
          user={this.props.user}
        />
        <br></br>
        <br></br>
        <RaisedButton label={toggleText}
          onClick={this.props.toggleLogin}
        />
      </div>
    );
  }

}

export default LoginPage;
