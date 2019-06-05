import React from 'react';
import stripIndent from 'common-tags/lib/stripIndent';
import styles from './styles';
import SyntaxHighlighter from 'react-syntax-highlighter';

const Code = ({ children, language, className }) => {
  if (typeof children !== 'string') {
    throw new Error('Children must be a string.');
  }
  let languageToHighlight = language;

  if (!language && className.startsWith('language-')) {
    languageToHighlight = className.replace('language-', '');
  }

  return (
    <SyntaxHighlighter language={ languageToHighlight } style={ styles }>{ stripIndent(children) }</SyntaxHighlighter>
  );
};

export default Code;
