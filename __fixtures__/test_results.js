export const resultPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

export const resultStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

export const resultJSON = JSON.stringify({
  key: null,
  value: null,
  state: 'stayed',
  children: [
    {
      key: 'common',
      value: null,
      state: 'stayed',
      children: [
        {
          key: 'follow',
          value: false,
          state: 'added',
          children: null,
        },
        {
          key: 'setting1',
          value: 'Value 1',
          state: 'stayed',
          children: null,
        },
        {
          key: 'setting2',
          value: 200,
          state: 'removed',
          children: null,
        },
        {
          key: 'setting3',
          value: true,
          state: 'removed',
          children: null,
        },
        {
          key: 'setting3',
          value: null,
          state: 'added',
          children: null,
        },
        {
          key: 'setting4',
          value: 'blah blah',
          state: 'added',
          children: null,
        },
        {
          key: 'setting5',
          value: {
            key5: 'value5',
          },
          state: 'added',
          children: null,
        },
        {
          key: 'setting6',
          value: null,
          state: 'stayed',
          children: [
            {
              key: 'doge',
              value: null,
              state: 'stayed',
              children: [
                {
                  key: 'wow',
                  value: '',
                  state: 'removed',
                  children: null,
                },
                {
                  key: 'wow',
                  value: 'so much',
                  state: 'added',
                  children: null,
                },
              ],
            },
            {
              key: 'key',
              value: 'value',
              state: 'stayed',
              children: null,
            },
            {
              key: 'ops',
              value: 'vops',
              state: 'added',
              children: null,
            },
          ],
        },
      ],
    },
    {
      key: 'group1',
      value: null,
      state: 'stayed',
      children: [
        {
          key: 'baz',
          value: 'bas',
          state: 'removed',
          children: null,
        },
        {
          key: 'baz',
          value: 'bars',
          state: 'added',
          children: null,
        },
        {
          key: 'foo',
          value: 'bar',
          state: 'stayed',
          children: null,
        },
        {
          key: 'nest',
          value: {
            key: 'value',
          },
          state: 'removed',
          children: null,
        },
        {
          key: 'nest',
          value: 'str',
          state: 'added',
          children: null,
        },
      ],
    },
    {
      key: 'group2',
      value: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
      state: 'removed',
      children: null,
    },
    {
      key: 'group3',
      value: {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
      state: 'added',
      children: null,
    },
  ],
});
