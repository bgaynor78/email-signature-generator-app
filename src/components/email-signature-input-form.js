import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

import { generateSignature } from '../actions';
import SignatureDisplay from "./signature-display";

class App extends Component {

  renderInput(field) {
    const { meta: { touched, error } } = field;
    const errorClass = touched && error ? 'has-error' : '';

    return (
      <div className={`form-group ${errorClass}`}>
        <input className="form-group-input" placeholder={field.placeholder} type={field.type} id={field.name} name={field.name} disabled={field.disabled} autoComplete="off" {...field.input}/>
        {touched && error &&
          <div className="help-text">{error}</div>
        }
      </div>
    )
  }

  normalizePhone(value) {
    if(!value) {
      return value;
    }

    const onlyNumbers = value.replace(/[^\d]/g, '');
    if(onlyNumbers.length <= 3) {
      return onlyNumbers;
    }

    if(onlyNumbers.length <= 7) {
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    }
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 6)}-${onlyNumbers.slice(6, 10)}`;
  }

  onSubmit(values) {
    this.props.generateSignature(values);
  }

  render() {
    const { handleSubmit, reset, pristine, submitting } = this.props;

    return (
      <main className="main">
        <div className="container">
          <h1>Email signature generator</h1>
          <div className="row">
            <div className="col-6">
              <form className="email-sig-input-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <Field label="Name" placeholder="Name" name="nameField" type="text" component={ this.renderInput }/>
                <Field label="Title" placeholder="Title" name="titleField" type="text" component={ this.renderInput }/>
                <Field label="General Phone" placeholder="General Phone" name="generalPhoneNumberField" type="tel" component={ this.renderInput } normalize={ this.normalizePhone } disabled/>
                <Field label="Direct Phone" placeholder="Direct Phone" name="directPhoneNumberField" type="tel" component={ this.renderInput } normalize={ this.normalizePhone }/>
                <Field label="Mobile Phone" placeholder="Mobile Phone" name="mobilePhoneNumberField" type="tel" component={ this.renderInput } normalize={ this.normalizePhone }/>
                <Field label="Email" placeholder="Email" name="emailField" type="text" component={ this.renderInput }/>
                <div className="form-group buttons">
                  <button type="submit" className="button button-primary" disabled={ submitting }>Generate</button>
                  <button className="button clear" disabled={ pristine || submitting } onClick={ reset }>Clear</button>
                </div>
              </form>
            </div>
            <div className="col-6">
              <SignatureDisplay/>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.nameField) {
    errors.nameField = 'Enter your first and last name';
  }
  if(!values.titleField) {
    errors.titleField = 'Enter your job title';
  }
  if(!values.directPhoneNumberField) {
    errors.directPhoneNumberField = 'Enter direct phone extension';
  }
  if(!values.emailField) {
    errors.emailField = 'Enter email address'
  }
  if(values.emailField && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailField)) {
    errors.emailField = 'Please enter a valid email address'
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'GenerateSignatureForm',
  initialValues: {
    generalPhoneNumberField: '913-217-9660'
  }
})(
  connect(null, { generateSignature })(App)
);