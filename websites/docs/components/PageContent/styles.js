import color from 'color';

const tableCellPadding = '8px 8px 10px 8px';

const styles = theme => ({
  PageContent: {
    flex: theme.contentFlex,
    width: theme.contentWidth,
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    transition: 'width 800ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    willChange: 'width',
    background: theme.color.content.background,

    '& > *': {
      width: theme.contentWidth
    }
  },

  IsCollapsed: {
    flex: '0 0 auto',
    width: 0
  },

  Article: {
    padding: [ 0, theme.space(6) ],
    fontSize: theme.font.size.lg,

    '& a': {
      fontWeight: 400
    },

    '& h1, h2, h3, h4, h5': {
      margin: '1em 0 0.5em 0',
      lineHeight: '1.1',
      position: 'relative',
      fontFamily: theme.font.family.headline,
      marginTop: theme.space(6),
      fontWeight: 500
    },

    '& h1': {
      fontSize: '40px'
    },

    '& h2': {
      fontSize: '25px'
    },

    '& h3': {
      fontSize: '20px'
    },

    '& h4': {
      fontSize: theme.font.family.copytext,
      fontFamily: theme.font.family.default,
      fontWeight: 600
    },

    '& h5': {
      fontSize: theme.font.family.copytext,
      fontFamily: theme.font.family.default,
      fontWeight: 600
    },

    '& .header-anchor': {
      position: 'absolute',
      display: 'block',
      left: '-22px',
      top: '50%',
      marginTop: '-0.55em',
      paddingRight: '10px',
      fontSize: '25px',
      color: theme.color.content.background,
      fontWeight: 'normal'
    },

    '& h1:hover .header-anchor, h2:hover .header-anchor, h3:hover .header-anchor, h4:hover .header-anchor, h5:hover .header-anchor': {
      color: theme.color.brand.highlight
    },

    '& p, ul, ol': {
      maxWidth: theme.pageContent.maxWidth,
      fontWeight: 300,
      color: theme.color.copyText
    },

    '& p': {
      margin: [ theme.space(2), 0 ]
    },

    '& img': {
      marginTop: theme.space(4),
      width: '100%'
    },

    '& pre, code': {
      fontFamily: theme.font.family.code
    },

    '& p code, & ul li code, & table code': {
      padding: '0.25em 0.3em',
      backgroundColor: color(theme.color.brand.highlight).
        fade(0.9).
        rgb().
        string(),
      borderRadius: 0,
      fontSize: theme.font.size.md
    },

    '& ul': {
      margin: '0.5em 0 1em 0em',
      padding: 0,
      paddingLeft: '1em',
      'text-indent': '-0.85em',

      '& ul': {
        marginLeft: '1.5em'
      },

      '& li': {
        margin: 0,
        padding: 0,
        paddingBottom: '0.25em',
        'list-style-type': 'none'
      },

      '& li:before': {
        marginRight: '0.5em',
        content: '"\\2022"'
      }
    },

    '& table': {
      width: '100%',
      maxWidth: theme.pageContent.maxWidth,
      marginBottom: theme.space(3),
      borderBottom: `1px solid ${theme.color.content.border}`,
      fontWeight: 300,

      '& th:first-child, & td:first-child': {
        paddingLeft: theme.space(2)
      },

      '& th:last-child, & td:last-child': {
        paddingRight: theme.space(2)
      },

      '& thead': {
        '& th': {
          padding: tableCellPadding,
          verticalAlign: 'top',
          background: theme.color.panel.light
        },

        '& th:last-child': {
          borderRight: `1px solid ${theme.color.content.border}`
        }
      },

      '& tbody': {
        '& td': {
          padding: tableCellPadding,
          verticalAlign: 'top',
          borderTop: `1px solid ${theme.color.content.border}`
        },

        '& tr:first-child td': {
          borderTop: 'none'
        },

        '& td:first-child': {
          borderLeft: `1px solid ${theme.color.content.border}`
        },

        '& td:last-child': {
          borderRight: `1px solid ${theme.color.content.border}`
        }
      }
    },

    '& .read-model, .write-model, .flows': {
      paddingLeft: theme.space(4),
      marginBottom: theme.space(10),
      marginLeft: 115,
      borderLeft: '1px solid #eeeeee',
      position: 'relative',

      '& p': {
        maxWidth: theme.pageContent.maxWidth - 3 * theme.space(1) - 115
      },

      '&::after': {
        position: 'absolute',
        width: 80,
        height: 80,
        left: -115,
        top: 0,
        content: '""',
        backgroundRepeat: 'no-repeat'
      }
    },

    '& .read-model::after': {
      backgroundImage: `url(/data-flow/read-model.svg)`
    },

    '& .write-model::after': {
      backgroundImage: `url(/data-flow/write-model.svg)`
    },

    '& .flows::after': {
      backgroundImage: `url(/data-flow/flows.svg)`
    }
  },

  [theme.breakpoints.down('sm')]: {
    PageContent: {
      flex: '3 3 100vw',
      width: '100vw',

      '& > *': {
        width: '100vw'
      }
    },

    IsCollapsed: {
      flex: '0 0 auto',
      width: 0
    },

    Article: {
      paddingRight: theme.space(2),

      '& .header-anchor': {
        color: theme.color.brand.highlight
      },

      '& h1, h2, h3, h4, h5': {
        margin: [ theme.space(3), 0, 0, 0 ]
      },

      '& h1': {
        fontSize: 26
      },

      '& h2': {
        fontSize: 20
      },

      '& h3': {
        fontSize: 18
      },

      '& h4': {
        fontSize: 18
      },

      '& h5': {
        margin: 0,
        fontSize: 18
      },

      '& ul ul': {
        marginLeft: '0em'
      },

      '& .read-model, .write-model, .flows': {
        paddingLeft: 0,
        marginTop: 115 + theme.space(8),
        marginBottom: theme.space(10),
        marginLeft: 0,
        borderLeft: 'none',

        '&::after': {
          top: -115,
          left: 0
        }
      }
    }
  }
});

export default styles;
