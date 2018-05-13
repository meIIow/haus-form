import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const LoginForm = (props) => (
  <Card className="container">
    <form action="/" onSubmit={props.onSubmit}>

      <div className="field-line">
        <TextField
          floatingLabelText="Username"
          name="username"
          errorText={props.errors.username}
          onChange={props.onChange}
          value={props.user.username}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={props.onChange}
          errorText={props.errors.password}
          value={props.user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Submit" primary />
      </div>
    </form>


  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
