// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 1, 1, 1];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 1,
        next: {
          value: 1,
          next: {
            value: 1,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };

    const generatedLinkedList = generateLinkedList(elements);

    expect(generatedLinkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [2, 1];
    const generatedLinkedList = generateLinkedList(elements);

  // Use Jest's toMatchSnapshot() function to compare with snapshot
    expect(generatedLinkedList).toMatchSnapshot();
  });
});
