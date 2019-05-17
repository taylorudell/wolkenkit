'use strict';

const Head = require('next/head').default,
      React = require('react');

const MyHead = ({ children }) => (
  <Head>{ children }</Head>
);

module.exports = MyHead;
