import test from 'ava';
import { Either, isLeft } from 'fp-ts/lib/Either';

import {
  getAngle,
  getAngleSafe,
  GetAngleSafeError,
  getDotProduct,
  getMagnitude,
  initVectorPoints,
  initVectorTuple,
  Vector,
  VectorTuple,
} from './Vector';

function equalFloat(maxDifference: number, f1: number, f2: number) {
  return Math.abs(f2 - f1) <= maxDifference;
}

const equalFloatEnough = (f1: number, f2: number) =>
  equalFloat(0.0000001, f1, f2);

function createTestVectorToNumber(processor: (vector: Vector) => number) {
  return test.macro((t, input: VectorTuple, expected: number) => {
    const result = processor(initVectorTuple(input));

    t.true(equalFloatEnough(result, expected));
  });
}

function createTestVectorVectorToNumber(
  processor: (vector1: Vector, vector2: Vector) => number
) {
  return test.macro(
    (t, [vector1, vector2]: [VectorTuple, VectorTuple], expected: number) => {
      const result = processor(
        initVectorTuple(vector1),
        initVectorTuple(vector2)
      );

      t.true(equalFloatEnough(result, expected));
    }
  );
}

function createTestVectorVectorToNumberEither<E extends string>(
  processor: (vector1: Vector, vector2: Vector) => Either<E, number>
) {
  return test.macro(
    (
      t,
      [vector1, vector2]: [VectorTuple, VectorTuple],
      expected: E | number
    ) => {
      const result = processor(
        initVectorTuple(vector1),
        initVectorTuple(vector2)
      );

      if (isLeft(result)) {
        if (typeof expected === 'number') {
          t.fail('Expected an error but got a number');
        } else {
          t.is(result.left, expected);
        }
      } else {
        if (typeof expected !== 'number') {
          t.fail('Expected a number but got an error');
        } else {
          t.true(equalFloatEnough(result.right, expected));
        }
      }
    }
  );
}

test('equal float', (t) => {
  t.true(equalFloatEnough(10, 10));
  t.true(equalFloatEnough(10.000000000001, 10));
  t.true(equalFloatEnough(10, 10.000000000001));
  t.false(equalFloatEnough(10.00001, 10));
  t.false(equalFloatEnough(10, 10.00001));
});

test('init', (t) => {
  const vector = initVectorPoints({ x: 1, y: 2 }, { x: 5, y: -5 });

  t.deepEqual(vector, {
    x: 1,
    y: 2,
    dx: 4,
    dy: -7,
  });
});

const testMagnitude = createTestVectorToNumber(getMagnitude);

test('magnitude 1', testMagnitude, [4, 10], 2 * Math.sqrt(29));

test('magnitude 2', testMagnitude, [-3, 88], Math.sqrt(7753));

const testDotProduct = createTestVectorVectorToNumber(getDotProduct);

test(
  'dot product 1',
  testDotProduct,
  [
    [9, 10],
    [33, -6],
  ],
  237
);

test(
  'dot product 2',
  testDotProduct,
  [
    [-4, 33.33],
    [33.33, 33],
  ],
  966.57
);

const testAngle = createTestVectorVectorToNumber(getAngle);
const testAngleSafe = createTestVectorVectorToNumberEither(getAngleSafe);

const angleTestCasesCorrect: [VectorTuple, VectorTuple, number][] = [
  [[1, 0], [1, 0], 0],
  [[0, 1], [0, 1], 0],
  [[1, 0], [0, 1], Math.PI / 2],
  [[1, 0.5], [0, 1], 1.1071487177940904],
  [[1, -0.5], [2, -5], 0.7266423406817257],
];

const angleTestCasesError: [VectorTuple, VectorTuple, GetAngleSafeError][] = [
  [[0, 0], [1, 0], GetAngleSafeError.MAGNITUDE_EQUALS_ZERO],
  [[0, 23], [0, 0], GetAngleSafeError.MAGNITUDE_EQUALS_ZERO],
  [[0, 0], [0, 0], GetAngleSafeError.MAGNITUDE_EQUALS_ZERO],
];

angleTestCasesCorrect.forEach(([v1, v2, expected], i) =>
  test(`angle ${i + 1}`, testAngle, [v1, v2], expected)
);

angleTestCasesCorrect.forEach(([v1, v2, expected], i) =>
  test(`angle safe ${i + 1}`, testAngleSafe, [v1, v2], expected)
);

angleTestCasesError.forEach(([v1, v2, expected], i) =>
  test(`angle safe invalid ${i + 1}`, testAngleSafe, [v1, v2], expected)
);
