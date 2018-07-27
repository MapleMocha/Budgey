import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand">Budgey -- Welcome to your Budgeting App!</a>
        <form class="form-inline">
          <button class="btn btn-outline-success my-2 mr-3 my-sm-0" type="submit">Message Centre</button>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
        </form>
      </nav>
    )
  }
}

export default Navbar;