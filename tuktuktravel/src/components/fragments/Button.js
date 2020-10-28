import PropTypes from "prop-types";
import React, { PureComponent } from 'react';
import { dynamicClassName } from 'utils/dynamicClassName';
import { Link } from 'react-router-dom';

class Button extends PureComponent {
  static defaultProps = {
    className: '',
    title: '',
    url: '',
    isFull: false,
    isDisabled: false,
    isSecondary: false,
    onClick: () => {},
  };

  render() {
    const { isDisabled, isFull, isSecondary, onClick, url, label, title, className } = this.props;

    const classNames = dynamicClassName('btn');
    !isSecondary && classNames.add('btn--primary');
    isDisabled && classNames.add('is-disabled');
    isFull && classNames.add('btn--full');
    className && classNames.add(className);

    if (url) {
      return (
        <Link
          title={title}
          onClick={onClick}
          to={url}
          className={classNames.build()}>
          {label}
        </Link>
      );
    }
    return (
      <button
        type='button'
        title={title}
        onClick={onClick}
        className={classNames.build()}>
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFull: PropTypes.bool,
  isSecondary: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  url: PropTypes.string
}

export default Button;
