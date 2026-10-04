// Problem 1- Deep Equal
function deepEqual(objA, objB) {
  if (objA === objB) return true;

  if (
    typeof objA !== 'object' || typeof objB !== 'object' ||
    objA === null || objB === null
  ) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.hasOwn(objB, key) || !deepEqual(objA[key], objB[key])) {
      return false;
    }
  }
  return true;
}


// Problem 2 - Object Diff
function diffObjects(oldObj, newObj) {
  const result = { added: {}, removed: {}, changed: {} };
  const oldKeys = new Set(Object.keys(oldObj));
  const newKeys = new Set(Object.keys(newObj));

  for (const key of newKeys) {
    if (!oldKeys.has(key)) {
      result.added[key] = newObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      result.changed[key] = { from: oldObj[key], to: newObj[key] };
    }
  }

  for (const key of oldKeys) {
    if (!newKeys.has(key)) {
      result.removed[key] = oldObj[key];
    }
  }

  return result;
}

// Problem 3-  Deep Freeze
function deepFreeze(obj) {
  Object.values(obj).forEach(value => {
    if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

// Problem 4- Private Counter Factory
function createCounter() {
  let count = 0;

  return {
    increment() { count++; },
    decrement() { count--; },
    get value() { return count; }
  };
}

// Problem 5- Schema Validator
function validateSchema(obj, schema) {
  const errors = [];

  for (const [key, expectedType] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) {
      errors.push(`${key}: missing property`);
    } else if (typeof obj[key] !== expectedType) {
      errors.push(`${key}: expected ${expectedType}, got ${typeof obj[key]}`);
    }
  }

  return errors;
}
