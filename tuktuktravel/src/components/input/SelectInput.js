
import React, { Fragment, PureComponent } from 'react';
import { dynamicClassName } from 'utils/dynamicClassName';
import ErrorMessage from '../ErrorMessage';

// type Props = {
//   placeholder: string,
//   options: Array<{ label: string, value: string }>,
//   className?: string,
//   isDark?: boolean,
//   isLight?: boolean,
//   onChange?: (value: string) => void,
//   hasError?: boolean,
//   errorMessage?: string,
//   defaultValue?: string | null,
//   id?: string,
//   label?: string,
//   hasLicence?: boolean,
// };

// type State = {
//   isTouched: boolean
// };

class SelectInput extends PureComponent {
  
  state = {
    isTouched: false
  };

  static defaultProps = {
    placeholder: 'placeholder',
    options: [
      {
        value: 'option1',
        label: 'option1'
      }
    ],
    defaultValue: 'default',
  };

  handleValueChanged = (e) => {
    const value = e.target.value;
    if (!this.state.isTouched) this.setState({ isTouched: true });
    if (this.props.onChange) this.props.onChange(value);
  };

  render() {
    const {
      isDark,
      hasError,
      isLight,
      defaultValue,
      options,
      placeholder,
      errorMessage,
      className,
      id,
      label,
      hasLicence,
    } = this.props;
    const classNames = dynamicClassName('select');
    className && classNames.add(className);
    isDark && classNames.add('is-dark');
    isLight && classNames.add('select--light');
    hasError && classNames.add('has-error');

    const defaultVal = defaultValue ? defaultValue : 'default';
    (this.state.isTouched || defaultVal !== 'default') && classNames.add('is-selected');

    return (
      <Fragment>
        <div className={classNames.build()}>
          <select id={id && id} defaultValue={defaultVal} disabled={id === 'genre' && hasLicence} onChange={this.handleValueChanged}>
            <option disabled value={'default'}>
              {placeholder}
            </option>
            {this.renderOptions(options)}
          </select>
          {id && (
            <label htmlFor={id} data-label={label}>
              {label}
            </label>
          )}
        </div>
        {hasError && errorMessage && <ErrorMessage forceDisplay message={errorMessage} />}
      </Fragment>
    );
  }

  renderOptions = (options) => {
    return options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ));
  };
}

export default SelectInput;
