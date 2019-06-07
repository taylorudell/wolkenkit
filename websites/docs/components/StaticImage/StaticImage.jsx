import PropTypes from 'prop-types';
import React from 'react';
import { usePageContext } from '..';
import { withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  StaticImage: {
    marginTop: theme.space(4),
    maxWidth: `${theme.pageContent.maxWidth}px`
  }
});

const StaticImage = React.memo(({ classes, alt, src } = {}) => {
  const { activePage } = usePageContext();
  const { language, version, section, chapter, page } = activePage;

  const completeSrc = `/static/${language}/${version}/${section}/${chapter}/${page}/${src}`;

  return <img className={ classes.StaticImage } alt={ alt } src={ completeSrc } />;
});

StaticImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

export default withStyles(styles)(StaticImage);
