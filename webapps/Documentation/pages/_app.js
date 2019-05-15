import App from 'next/app';

class CustomApp extends App {
  componentDidMount () {
    const style = document.getElementById('server-side-styles')

    if (style) {
      style.parentNode.removeChild(style)
    }
  }
}

export default CustomApp;
