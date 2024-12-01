interface TreeNode {
  name: string;
  attributes?: { [key: string]: string }; // Optional attributes object
  children?: TreeNode[]; // Optional children array
  value?: string; // Optional text content
}

const parseXmlToTreeData = (node: Element): TreeNode => {
  // Function to parse attributes from NamedNodeMap to a plain object
  const parseAttributes = (
    attributes: NamedNodeMap
  ): { [key: string]: string } => {
    const attrs: { [key: string]: string } = {};

    // Loop through the attributes and convert them to a plain object
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes.item(i); // Get the attribute item
      if (attr) {
        attrs[attr.name] = attr.value; // Add the attribute name-value pair to the attrs object
      }
    }

    return attrs; // Return the attributes object
  };

  // parseNode function parses an XML node into a TreeNode structure
  const parseNode = (node: Element): TreeNode => {
    // Parse the children of the node, converting each child node into a TreeNode
    const children = Array.from(node.children).map(parseNode); // Convert child elements to TreeNode[]
    // Parse the attributes of the current node (if any)
    const attributes = parseAttributes(node.attributes);

    // Return the node as a TreeNode object with necessary properties
    return {
      name: node.nodeName,
      attributes: Object.keys(attributes).length ? attributes : undefined, // If the node has attributes, add them
      children: children.length ? children : undefined, // If the node has children, add them as well
      value:
        node.childNodes.length === 1 && // Check if the node has only one child
        node.firstChild?.nodeType === Node.TEXT_NODE
          ? node.textContent || undefined // If it's a text node, extract its content
          : undefined, // Otherwise, the value is undefined
    };
  };

  return parseNode(node);
};

export default parseXmlToTreeData;
