
import React, { PureComponent } from 'react';
import { dynamicClassName } from 'utils/dynamicClassName';
import ErrorMessage from '../ErrorMessage';

class SearchInput extends PureComponent {

  static defaultProps = {
    id: 'abc123',
    placeholder: '',
    errorMessage: '',
    name: '',
  };

  // handleValueChanged = (e) => {
  //   const value = e.target.value;
  //   if (this.props.onChange) this.props.onChange(value);
  // };

  render() {
    const { isDark, hasError, className } = this.props;
    const classNames = dynamicClassName('input input--search');
    className && classNames.add(className);
    isDark && classNames.add('is-dark');
    hasError && classNames.add('has-error');
    return (
      <div>
        <div className={classNames.build()}>
          <input
            type="search"
            id={this.props.id}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
          />
          <label htmlFor={this.props.id}>{this.props.name}</label>
          {hasError && <i className="icon icon-info fas fa-info-circle" />}
        </div>
        {hasError && <ErrorMessage message={this.props.errorMessage} />}
      </div>
    );
  }
}

export default SearchInput;
