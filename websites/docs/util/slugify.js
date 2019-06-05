const slugify = function (text) {
  if (typeof text === 'string') {
    return text.toLowerCase().replace(/ /gu, '-').
      replace(/[^A-Za-z0-9-]/gu, '');
  }

  if (Array.isArray(text)) {
    const items = text;

    return items.map(item => {
      if (item.children) {
        return { ...item, slug: slugify(item.title), children: slugify(item.children) };
      }

      return { ...item, slug: slugify(item.title) };
    });
  }

  throw new Error('Invalid operation.');
};
