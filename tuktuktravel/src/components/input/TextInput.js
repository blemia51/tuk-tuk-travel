
import PropTypes from "prop-types";
import React, { Fragment, PureComponent } from 'react';
import { dynamicClassName } from "utils/dynamicClassName"
import ErrorMessage from '../ErrorMessage';

class TextInputMaterial extends PureComponent {

  static defaultProps = {
    type: 'text',
    disable: false,
    onFocus: () => {},
    onBlur: () => {},
  };

  _handleInputChanged = (e) => {
    if (this.props.onChange) this.props.onChange(e.target.value);
  };

  _onInputStatusChange = (event, isFocus) => {
    const { target } = event;
    const { placeholder } = this.props;

    if (target instanceof HTMLInputElement) {
      if (isFocus || target.value !== '') {
        target.classList.remove('is-empty');
      } else if (!placeholder) {
        target.classList.add('is-empty');
      }
    }
  }

  render() {
    const {
      type,
      isDark,
      isLight,
      hasError,
      className,
      id,
      label,
      defaultValue,
      errorMessage,
      placeholder,
      disable,
      onFocus,
      onBlur,
      noEdit,
      name,
    } = this.props;
    const classNames = dynamicClassName('input');
    classNames.add('input--material');
    className && classNames.add(className);
    isDark && classNames.add('is-dark');
    isLight && classNames.add('input--light');
    hasError && classNames.add('has-error');
    noEdit && classNames.add('input--no-edit');

    return (
      <Fragment>
        <div className={classNames.build()}>
          <input
            defaultValue={defaultValue && defaultValue}
            type={type}
            id={id}
            disabled={disable}
            className={!defaultValue && !placeholder ? 'is-empty' : ''}
            onChange={this._handleInputChanged}
            onFocus={(event) => {
              this._onInputStatusChange(event, true);
              onFocus && onFocus();
            }}
            onBlur={(event) => {
              this._onInputStatusChange(event, false);
              onBlur && onBlur();
            }}
            placeholder={placeholder}
            name={name}
          />
          <label htmlFor={id} data-label={label}>
            {label}
          </label>
          {hasError && <i className="icon icon-info fas fa-info-circle " />}
        </div>
        {hasError && errorMessage && <ErrorMessage message={errorMessage} />}
      </Fragment>
    );
  }
}

TextInputMaterial.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disable: PropTypes.bool,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string,
  isDark: PropTypes.bool,
  isLight: PropTypes.bool,
  label: PropTypes.string,
  noEdit: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string
}

export default TextInputMaterial;
