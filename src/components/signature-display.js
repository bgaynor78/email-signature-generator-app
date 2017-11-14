import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignatureDisplay extends Component {
  constructor(props) {
    super(props);

    this.handleCopy = this.handleCopy.bind(this);
  }
  handleCopy() {
    window.getSelection().selectAllChildren(this.signatureText);
    document.execCommand('copy');
  }

  render() {

    if (!this.props.content) {
      return (
        <div className="signature-display-component">
          <div className="instructions">
            <h2>How to use:</h2>
            <p className="descriptive-text">This utility app provides self-service email signature generation. Simply enter the values in the form below,
            hit submit and you will be returned the markup you can copy paste into your Outlook preferences.</p>
          </div>
        </div>
      );
    }

    const { nameField, titleField, generalPhoneNumberField, directPhoneNumberField, mobilePhoneNumberField, emailField } = this.props.content;

    return (
      <div className="signature-display-component">
        <p>Copy and paste the below template into your email signature preference in Outlook and
          viola, you have a signature worthy of royalty.</p>
        <button className="button button-primary" onClick={ this.handleCopy }>Copy signature</button>
        <table cellPadding="0" cellSpacing="0" style={{borderCollapse: 'separate !important', tableLayout: 'fixed', marginTop: '3px'}} width="270" ref={(text) => { this.signatureText = text; }}>
          <tbody>
            <tr>
              <td className="content-td" width="270">
                <div className="content-pod">
                  <div style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '12px', lineHeight: '16px', color: 'rgb(109, 110, 113)', marginRight: '10px'}}>
                    <span style={{fontSize: '16px', color: '#408bca', display: 'inline'}} className="txt signature_name-target sig-hide">{nameField}</span>
                    <span className="email-sep break" style={{display: 'inline'}}><br/></span><span style={{color: 'rgb(109, 110, 113)', display: 'inline'}} className="txt signature_jobtitle-target sig-hide">{titleField}</span>
                    <span className="email-sep break" style={{display: 'inline'}}><br/></span><span className="signature_email-sep sep" style={{display: 'inline', fontWeight: 'bold'}}>p: </span><span style={{color: 'rgb(109, 110, 113)',display: 'inline'}} className="txt signature_generalphone-target sig-hide"><a href="tel:9134863877" style={{color: 'rgb(109, 110, 113)', textDecoration: 'none', display: 'inline'}}>{generalPhoneNumberField}</a></span>
                    <span className="email-sep break" style={{display: 'inline'}}><br/></span><span className="signature_email-sep sep" style={{display: 'inline', fontWeight: 'bold'}}>d: </span><span style={{color: 'rgb(109, 110, 113)', display: 'inline'}} className="txt signature_directphone-target sig-hide"><a href="tel:9132179638" style={{color: 'rgb(109, 110, 113)', textDecoration: 'none', display: 'inline'}}>{directPhoneNumberField}</a></span>
                    {mobilePhoneNumberField &&
                      <span><span className="email-sep break" style={{display: 'inline'}}><br/></span><span className="signature_email-sep sep" style={{display: 'inline', fontWeight: 'bold'}}>m: </span><span style={{color: 'rgb(109, 110, 113)', display: 'inline'}} className="txt signature_cellphone-target sig-hide"><a href="tel:9132179638" style={{color: 'rgb(109, 110, 113)', textDecoration: 'none', display: 'inline'}}>{mobilePhoneNumberField}</a></span></span>
                    }
                    <span className="email-sep break" style={{display: 'inline'}}><br/></span><a className="link email signature_email-target sig-hide" href={`mailto:${emailField}`} style={{color: '#408bca', textDecoration: 'none', display: 'inline'}}>{emailField}</a>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="logo-td" width="185">
                <div style={{fontFamily: 'Helvetica, Arial, san-serif', fontSize: '14px', lineHeight: '16px', marginRight: '10px', color: 'rgb(109, 110, 113)'}}>
                  <span className="email-sep break" style={{display: 'inline'}}><br/></span>
                  <a style={{textDecoration: 'none'}} href="http://www.adaptiverx.com" className="clink logo-container">
                    <img src="http://rdmlive.adaptiverx.com/images/drg_adaptiverx.png" alt="Adaptive Software" className="sig-logo" width="89" height="50"/>
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className="address-td" width="270">
                <div style={{fontFamily: 'Helvetica, Arial, san-serif', fontSize: '12px', lineHeight: '16px', color: 'rgb(109, 110, 113)'}}>
                  <span className="email-sep break" style={{display: 'inline'}}><br/></span>
                  <span>7311 W 130th St #130 | Overland Park, KS 66213</span><span className="email-sep break" style={{display: 'inline'}}><br/></span>
                  <span><a href="http://www.adaptiverx.com" style={{color: '#408bca', display: 'inline', textDecoration: 'none'}}>www.adaptiverx.com</a></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


function mapStateToProps(state) {

  return {
    content: state.response.formElements
  }
}

export default connect(mapStateToProps)(SignatureDisplay);