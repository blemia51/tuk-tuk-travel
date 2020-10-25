/// @flow
import React, { PureComponent } from 'react';
import { dynamicClassName } from 'utils/dynamicClassName';

class ErrorMessage extends PureComponent {
  static defaultProps = {
    message: 'Adresse email invalide'
  };

  render() {
    const { forceDisplay, message } = this.props;
    const classNames = dynamicClassName('input__error');

    return (
      <span 
        //style={forceDisplay ? { display: 'block' } : {}} 
        className={classNames.build()}>{message}</span>
    );
  }
}

export default ErrorMessage;
