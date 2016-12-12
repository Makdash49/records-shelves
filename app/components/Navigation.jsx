var React = require('react');
var {Link, IndexLink} = require('react-router');

var Navigation = () => {
  return (
    <div className ="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">
            The Product Vote App
          </li>
          <li>
            <IndexLink to="/" activeClassName="active-link">Amazon</IndexLink>
          </li>
          <li>
            <Link to="todos" activeClassName="active-link">Todos</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li className="menu-text">
            Created by <a href="http://www.linkedin.com/in/markmcquillen" target="_blank">Mark McQuillen</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

module.exports = Navigation;
