import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import reactTestRenderer from 'react-test-renderer';
import render from './renderer';

const styles = StyleSheet.create({
  text: { fontSize: 14 },
});

const rawStyle: StyleProp<TextStyle> = [
  {
    padding: 42,
  },
  {
    padding: 1,
  },
  [
    {
      marginTop: 1,
    },
    {
      marginBottom: 1,
    },
  ],
  styles.text,
  undefined,
  null,
  false,
  {},
];

function MyText() {
  return <Text style={rawStyle}>Hi</Text>;
}

it('raw', () => {
  const tree = reactTestRenderer.create(<MyText />);

  expect(tree).toMatchInlineSnapshot(`
    <Text
      style={
        [
          {
            "padding": 42,
          },
          {
            "padding": 1,
          },
          [
            {
              "marginTop": 1,
            },
            {
              "marginBottom": 1,
            },
          ],
          {
            "fontSize": 14,
          },
          undefined,
          null,
          false,
          {},
        ]
      }
    >
      Hi
    </Text>
  `);
});

it('parsed', () => {
  const tree = render(<MyText />);

  expect(tree).toMatchInlineSnapshot(`
    <Text
      style={
        {
          "fontSize": 14,
          "marginBottom": 1,
          "marginTop": 1,
          "padding": 1,
        }
      }
    >
      Hi
    </Text>
  `);
});
