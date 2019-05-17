'use strict';

const Link = require('next/link').default,
      React = require('react');

const MyLink = ({ as, href, children, className }) => (
  <Link href={ href } as={ as }><a className={ className }>{ children }</a></Link>
);

module.exports = MyLink;
