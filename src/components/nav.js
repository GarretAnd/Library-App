import React from 'react';
import {
  NavLink, withRouter,
} from 'react-router-dom';

const Nav = (props) => { // Nav Bar with some style
  return ( // Has home bar
    <nav>
      <ul className="book-nav">
        <li>
          <NavLink to="/" exact>Welcome</NavLink>
        </li>
        {props.autho ? (
          <li onClick={() => {
            props.signo(props.history);
          }}
          >
            <NavLink to="/" exact> Sign Out </NavLink>
          </li>
        ) : ( // Fragment for multiple components in conditional rendering
          <>
            <li>
              <NavLink to="/signin" exact> Sign In </NavLink>
            </li>
            <li>
              <NavLink to="/signup" exact> Sign Up </NavLink>
            </li>
          </>
        )}
        {props.booksList.slice(0).reverse().map((data, id) => { // Maps the links that exist to their proper route
          return (
            <li key={`key_${data.id}`}
              onClick={() => {
                props.selected(data.id);
              }}
            >
              <NavLink
                to={`/book/${id}`} // Passes in the address for the link, a unique key, and the id
                id={data.id}
              >
                {data.title}
              </NavLink>
            </li>
          );
        }) }
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
