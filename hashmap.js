export class HashMap {
  constructor() {
    this.buckets = new Array(16);
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    let primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    if (this.size + 1 > this.capacity * this.loadFactor) {
      this.resize();
    }
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Tentando acessar um índice fora dos limites");
    }

    const item = this.buckets[index];
    const node = new Node(key, value);

    if (item === undefined) {
      this.buckets[index] = node;
      this.size++;
      return;
    }

    let current = this.buckets[index];

    while (current !== null) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      if (current.nextNode === null) {
        break;
      }
      current = current.nextNode;
    }

    current.nextNode = node;
    this.size++;
  }
  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Tentando acessar um índice fora dos limites");
    }

    let current = this.buckets[index];

    if (current === undefined) {
      return null;
    }
    while (current !== null) {
      if (current.key === key) {
        return current.value;
      }
      current = current.nextNode;
    }
    return null;
  }
  resize() {
    const oldBuckets = this.buckets;
    this.capacity = this.capacity * 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (let i = 0; i < oldBuckets.length; i++) {
      let current = oldBuckets[i];

      while (current) {
        this.set(current.key, current.value);
        current = current.nextNode;
      }
    }
  }
  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Tentando acessar um índice fora dos limites");
    }
    let current = this.buckets[index];
    if (current === undefined) {
      return false;
    }
    while (current !== null) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  }
  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Tentando acessar um índice fora dos limites");
    }
    let current = this.buckets[index];
    if (current === undefined) {
      return false;
    }

    let previousNode;

    while (current !== null) {
      if (current.key === key) {
        if (previousNode === undefined) {
          this.buckets[index] = current.nextNode;
          this.size--;
          return true;
        }
        if (previousNode !== undefined) {
          previousNode.nextNode = current.nextNode;
          this.size--;
          return true;
        }
      }
      previousNode = current;
      current = current.nextNode;
    }

    return false;
  }
  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(16);
    this.size = 0;
    this.capacity = 16;
  }
  keys() {
    let myArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let current = this.buckets[i];
        while (current !== null) {
          myArray.push(this.buckets[i].key);
          current = current.nextNode;
        }
      }
    }
    return myArray;
  }
  values() {
    let myArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let current = this.buckets[i];
        while (current !== null) {
          myArray.push(current.value);
          current = current.nextNode;
        }
      }
    }
    return myArray;
  }
  entries() {
    let myArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let current = this.buckets[i];
        while (current !== null) {
          let newPair = [current.key, current.value];
          myArray.push(newPair);
          current = current.nextNode;
        }
      }
    }
    return myArray;
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
