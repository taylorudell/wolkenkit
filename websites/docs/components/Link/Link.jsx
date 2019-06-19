import Link from 'next/link';
import path from 'path';
import React from 'react';
import { Link as StyledLink } from 'thenativeweb-ux';
import { usePageContext } from '..';

const CustomLink = ({ as, href, children, className }) => {
  if (!href.startsWith('http') && !href.startsWith('https')) {
    let absolutePath = href;

    if (!href.startsWith('/')) {
      const { activePage } = usePageContext();
      const { language, version, section, chapter, page } = activePage;
      const pagePath = `/${language}/${version}/${section}/${chapter}/${page}/`;

      absolutePath = path.resolve(pagePath, href);
    }

    return (
      <Link href={ absolutePath } as={ as }><a className={ className }>{ children }</a></Link>
    );
  }

  return (
    <StyledLink href={ href } className={ className } isExternal={ true }>{ children }</StyledLink>
  );
};

export default CustomLink;
