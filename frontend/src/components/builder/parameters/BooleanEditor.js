import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _ from 'lodash';

export default class BooleanEditor extends Component {
  render() {
    const { id, name, type, label, value, updateInstance } = this.props;
    const formId = _.uniqueId('parameter-');

    return (
      <div className="boolean-editor">
        <div className="parameter__item row">
          <div className="col-3 bold align-right">
            <label htmlFor={formId}>{label}</label>
          </div>

          <div className="col-9">
            <Select
              id={id}
              aria-label={'Select True or False'}
              inputProps={{ title: 'Select True or False', id: formId }}
              options={[{ value: 'true', label: 'True' }, { value: 'false', label: 'False' }]}
              value={value}
              onChange={ (e) => { updateInstance({ name, type, label, value: _.get(e, 'value', null) }); }}
            />
          </div>
        </div>
      </div>
    );
  }
}

BooleanEditor.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  updateInstance: PropTypes.func.isRequired
};