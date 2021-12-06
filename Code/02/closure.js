function createSigner(secret) {
  const keypair = {
    publicKey: secret.toLowerCase(),
    privateKey: secret.toUpperCase(),
  };

  return function (content) {
    return {
      signed: content
        .split("")
        .map(
          (char, idx) =>
            `${char}${keypair.privateKey[idx % keypair.privateKey.length]}`
        )
        .join(""),
      publicKey: keypair.publicKey,
    };
  };
}

const kevinsSigner = createSigner("tHIsisAsecret12");

console.log(kevinsSigner("Hi kevin, can we hire you for some crypto?"));
