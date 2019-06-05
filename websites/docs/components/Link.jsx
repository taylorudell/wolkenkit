import Link from 'next/link';
import React from 'react';

const CustomLink = ({ as, href, children, className }) => (
  <Link href={ href } as={ as }><a className={ className }>{ children }</a></Link>
);

export default CustomLink;
