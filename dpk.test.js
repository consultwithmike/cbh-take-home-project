import { deterministicPartitionKey } from "./dpk";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("Returns a key when given string input", () => {
    const key = deterministicPartitionKey('test');

    expect(key).not.toBe("0");
    expect(key).toHaveLength(128);
  });

  it("Returns a key when given a string partition key", () => {
    const key = deterministicPartitionKey({partitionKey: 'test'});

    expect(key).toBe("test");
  });

  it("Returns a key when given a numeric partition key", () => {
    const key = deterministicPartitionKey({partitionKey: 10});

    expect(key).toBe("10");
  });

  it("Returns a key when given a string partition key longer than the max key length", () => {
    const key = deterministicPartitionKey({partitionKey: 'test'.padEnd(257)});

    expect(key).not.toBe("test");
    expect(key).toHaveLength(128);
  });

  it("Returns a key when given a string longer than the max key length", () => {
    const key = deterministicPartitionKey('test'.padEnd(257));

    expect(key).not.toBe("test");
    expect(key).toHaveLength(128);
  });
});
