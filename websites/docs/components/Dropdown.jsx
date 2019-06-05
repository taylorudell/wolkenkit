import PropTypes from 'prop-types';
import React from 'react';
import { classNames, Icon, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Dropdown: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    'min-height': theme.space(4),
    alignItems: 'center'
  },

  IsOpen: {
    '& $Value': {
      cursor: 'pointer'
    },

    '& $ExpandIcon': {
      fill: theme.color.brand.highlight,
      transform: 'rotate(270deg)'
    },

    '& $Options': {
      display: 'flex'
    }
  },

  Value: {
    cursor: 'pointer',
    '&:hover $ExpandIcon': {
      fill: theme.color.brand.highlight
    }
  },

  ExpandIcon: {
    width: 11,
    height: 11,
    transform: 'rotate(90deg)',
    marginLeft: 5,
    fill: 'rgba(255, 255, 255, 0.65)'
  },

  Options: {
    position: 'absolute',
    background: theme.color.brand.white,
    top: theme.space(4),
    left: 0,
    marginLeft: -5,
    padding: '3px 11px 2px 10px',
    display: 'none',
    flexDirection: 'column',
    zIndex: theme.zIndices.overlay,

    '& a, & a:visited': {
      lineHeight: `${theme.space(4)}px`,
      fontSize: theme.font.size.md,
      color: theme.color.brand.dark,
      background: 'transparent',
      display: 'block'
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  Option: {

  }
});

class Dropdown extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.storeContainerRef = this.storeContainerRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleValueClicked = this.handleValueClicked.bind(this);
    this.handleOptionClicked = this.handleOptionClicked.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  componentDidMount () {
    global.document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount () {
    global.document.removeEventListener('click', this.handleClickOutside, true);
  }

  storeContainerRef (ref) {
    this.containerRef = ref;
  }

  handleClickOutside (event) {
    if (this.containerRef && !this.containerRef.contains(event.target)) {
      this.setState({
        isOpen: false
      });
    }
  }

  handleValueClicked (event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleOptionClicked (event) {
    const { onChange } = this.props;

    event.preventDefault();
    event.stopPropagation();

    const newOption = event.target.getAttribute('data-option');

    onChange(newOption);

    this.setState({
      isOpen: false
    });
  }

  renderOption (option) {
    const { classes } = this.props;

    return (
      <a
        key={ option }
        data-option={ option }
        href={ `/${option}/` }
        className={ classes.Option }
      >
        { option }
      </a>
    );
  }

  render () {
    const { classes, selected, options } = this.props;
    const { isOpen } = this.state;

    const componentClasses = classNames(classes.Dropdown, {
      [classes.IsOpen]: isOpen
    });

    return (
      <div className={ componentClasses } ref={ this.storeContainerRef }>
        <a href='#open' className={ classes.Value } onClick={ this.handleValueClicked }>
          <span>{selected}</span>
          <Icon className={ classes.ExpandIcon } name='expand' />
        </a>
        <div className={ classes.Options } onClick={ this.handleOptionClicked }>
          { options.map(this.renderOption) }
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Dropdown);
