import React, { PureComponent } from 'react';
import { dynamicClassName } from '../utils/dynamicClassName';


class Favorites extends PureComponent {

  static defaultProps = {
    className: '',
    title: '',
    url: '',
    isFull: false,
    isDisabled: false,
    isSecondary: false,
    isFavorites: false,
    onClick: () => {},
  };

  state = {
    favorites: [],
    isFavorites: false,
  }

  render() {
    const { className, isDisabled, onClick } = this.props;
    const classNames = dynamicClassName('favorites');
    isDisabled && classNames.add('is-favorites')
    className && classNames.add(className);

    return (
      <div className="add--favorites">
        <i
          className={classNames.build()}
          onClick={onClick}
        />
      </div>
    )
  }
}

export default Favorites;
