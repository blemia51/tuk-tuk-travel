
export const dynamicClassName = (e) => {
  let classNames = [...e.split(' ')] || e.split(' ');

  return {
    add: (cn) => classNames.push(cn),
    remove: (cn) => {
      classNames = classNames.filter((className) => (className !== cn));
    },
    build: () => classNames.join(' ')
  };
};
