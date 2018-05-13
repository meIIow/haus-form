import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import SelectField from 'material-ui/SelectField';


const SignUpForm = (props) => {
  return (
  <Card className='container'>
    <form action='/' onSubmit={props.onSubmit}>
      <h2 className="card-heading">Feedback</h2>

      <div className="field-line">
        <SelectField
            floatingLabelText="Rating"
            name="rating"
            value={props.feedback.rating}
            onChange={(event, i, val) => {
              props.onChange({target: {name: 'rating', value: val}})
            }}
            disabled= {props.readOnly}
            errorText={props.errors.rating}
          >
            <MenuItem value={1} primaryText="One Star"/>
            <MenuItem value={2} primaryText="Two Stars"/>
            <MenuItem value={3} primaryText="Three Stars"/>
            <MenuItem value={4} primaryText="Four Stars"/>
            <MenuItem value={5} primaryText="Five Stars"/>
          </SelectField>
      </div>

      <div className="field-line">
        <SelectField
          floatingLabelText="Would Recommend"
          name="recommend"
          value={props.feedback.recommend}
          onChange={(event, i, val) => {
            props.onChange({target: {name: 'recommend', value: val}})
          }}
          disabled= {props.readOnly}
          errorText={props.errors.recommend}
        >
          <MenuItem value={true} primaryText="Yes"/>
          <MenuItem value={false} primaryText="No"/>
        </SelectField>
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Comments"
          name="comments"
          errorText={props.errors.comments}
          onChange={props.onChange}
          value={props.feedback.comments}
          disabled= {props.readOnly}

        />
      </div>

      {!props.readOnly && <div className="button-line">
        <RaisedButton type="submit" label="Send Feedback" primary />
      </div>}
    </form>
  </Card>
)};

SignUpForm.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired
};

export default SignUpForm;
