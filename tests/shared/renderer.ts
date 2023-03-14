import { Falsy, RegisteredStyle, ViewStyle, StyleProp } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
// @testing-library/react-native render handles dark and light theme correctly
// react-test-renderer invert them
import { render as _render } from '@testing-library/react-native';

declare global {
  interface ArrayConstructor {
    isArray(arg: unknown): arg is unknown[] | readonly unknown[];
  }
}

export default function render(
  ...props: Parameters<typeof ReactTestRenderer.create>
) {
  const renderer = _render(...props);
  const tree = renderer.toJSON();

  const nodes = tree && (Array.isArray(tree) ? tree : [tree]);
  if (nodes) nodes.forEach(parseNode);

  return {
    ...renderer,
    toJSON() {
      return tree;
    },
  };
}

function parseNode(node: ReactTestRenderer.ReactTestRendererNode) {
  if (typeof node === 'string') return;

  parseStyle(node);

  node.children?.forEach(parseNode);
}

function parseStyle(node: ReactTestRenderer.ReactTestRendererJSON) {
  const style: StyleProp<ViewStyle> = node.props.style;

  if (!Array.isArray(style)) return;

  node.props.style = flatArray(style);
}

type RecursiveReadonlyArray<T> = ReadonlyArray<T | RecursiveReadonlyArray<T>>;
function flatArray(
  style: RecursiveReadonlyArray<Falsy | ViewStyle | RegisteredStyle<ViewStyle>>,
): ViewStyle {
  return style.reduce((final, current) => {
    const flatCurrent = Array.isArray(current) ? flatArray(current) : current;

    return typeof flatCurrent !== 'object'
      ? final
      : { ...final, ...flatCurrent };
  }, {} as Record<string, unknown>);
}
