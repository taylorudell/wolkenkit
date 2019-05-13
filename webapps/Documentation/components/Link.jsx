'use strict';

const Link = require('next/link').default,
      React = require('react');

const MyLink = ({ href, children, className }) => (
  <Link href={ href }><a className={ className }>{ children }</a></Link>
);

module.exports = MyLink;
