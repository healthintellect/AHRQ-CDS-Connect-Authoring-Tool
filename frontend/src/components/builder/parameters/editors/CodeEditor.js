import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CodeSelectModal from '../../CodeSelectModal';
import VSACAuthenticationModal from '../../VSACAuthenticationModal';

export default class CodeEditor extends Component {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      hasSelectedCode: value,
      system: value ? value.system : '',
      uri: value ? value.uri : '',
      code: value ? value.code : '',
      display: value ? value.display : '',
      str: value ? value.str : ''
    };
  }

  handleCodeAdded = ({ system, uri, code, display }) => {
    let str;
    if (this.props.isConcept) {
      str = `Concept { Code '${code}' from "${system}" } display '${display}'`;
    } else {
      str = `Code '${code}' from "${system}" display '${display}'`;
    }

    this.setState({
      hasSelectedCode: true,
      system,
      uri,
      code,
      display,
      str
    });

    this.props.updateInstance({ value: { system, uri, code, display, str } });
  }

  renderCodePicker() {
    if ((this.props.timeLastAuthenticated < new Date() - 27000000 || this.props.vsacFHIRCredentials.username == null)
         && !this.state.hasSelectedCode) {
      return (
        <div id="vsac-controls">
          <VSACAuthenticationModal
            loginVSACUser={this.props.loginVSACUser}
            setVSACAuthStatus={this.props.setVSACAuthStatus}
            vsacStatus={this.props.vsacStatus}
            vsacStatusText={this.props.vsacStatusText}
          />
        </div>
      );
    }

    return (
      <CodeSelectModal
        className="element-select__modal"
        addToParameter={this.handleCodeAdded}
        vsacFHIRCredentials={this.props.vsacFHIRCredentials}
      />
    );
  }

  render() {
    const formId = _.uniqueId('parameter-');

    return (
      <div className="code-editor">
        {this.state.hasSelectedCode ?
          <div className="code-editor__show">
            <div className="parameter__item row">
              <div className="col-3 bold align-right">
                <label htmlFor={formId}>System:</label>
              </div>

              <div className="col-9">
                {this.state.system}
              </div>
            </div>

            <div className="parameter__item row">
              <div className="col-3 bold align-right">
                <label htmlFor={formId}>System URI:</label>
              </div>

              <div className="col-9">
                {this.state.uri}
              </div>
            </div>

            <div className="parameter__item row">
              <div className="col-3 bold align-right">
                <label htmlFor={formId}>Code:</label>
              </div>

              <div className="col-9">
                {this.state.code}
              </div>
            </div>

            <div className="parameter__item row">
              <div className="col-3 bold align-right">
                <label htmlFor={formId}>Display:</label>
              </div>

              <div className="col-9">
                {this.state.display}
              </div>
            </div>
          </div>
        :
          <div className="parameter__item row">
            <div className="col-3 bold align-right">
              Select code:
            </div>

            <div className="col-9">
              {this.renderCodePicker()}
            </div>
          </div>
        }
      </div>
    );
  }
}

CodeEditor.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
  isConcept: PropTypes.bool,
  updateInstance: PropTypes.func.isRequired,
  timeLastAuthenticated: PropTypes.instanceOf(Date),
  vsacFHIRCredentials: PropTypes.object,
  loginVSACUser: PropTypes.func.isRequired,
  setVSACAuthStatus: PropTypes.func.isRequired,
  vsacStatus: PropTypes.string,
  vsacStatusText: PropTypes.string
};
