const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const deterministicPartitionKey = (event) => {
  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    candidate = event.partitionKey;

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH ?
    crypto.createHash("sha3-512").update(candidate).digest("hex") :
    candidate;
};

export {deterministicPartitionKey};
