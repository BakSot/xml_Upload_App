const parseXmlToTreeData = (node: Element): any => {
  const parseAttributes = (attributes: NamedNodeMap) => {
    const attrs: { [key: string]: string } = {};

    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes.item(i);
      if (attr) attrs[attr.name] = attr.value;
    }

    return attrs;
  };

  const parseNode = (node: Element): any => {
    const children = Array.from(node.children).map(parseNode);
    const attributes = parseAttributes(node.attributes);

    return {
      name: node.nodeName,
      attributes: Object.keys(attributes).length ? attributes : undefined,
      children: children.length ? children : undefined,
      value:
        node.childNodes.length === 1 &&
        node.firstChild?.nodeType === Node.TEXT_NODE
          ? node.textContent
          : undefined,
    };
  };

  return parseNode(node);
};

export default parseXmlToTreeData;
