import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="nav nav-pills navbar-expand navbar-dark bg-dark">
            <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/users">Users</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Data Entry</a>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="/campaigns">Campaigns</a>
                    <a className="dropdown-item" href="/events">Events</a>
                    <a className="dropdown-item" href="/povs">POVs</a>
                    <a className="dropdown-item" href="/learning">Learning</a>
                    <a className="dropdown-item" href="/hypothesis">Hypothesis</a>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Maintenance Scripts</a>
            </li>
      </nav>
    );
}

<script>
    (function($){
      $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show");
        });

        return false;
      })
    })(jQuery)
  </script>

export { Nav };