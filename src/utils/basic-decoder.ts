export const basicDecoder = (encodedString: string) => {
  return Buffer.from(encodedString, "base64").toString().split(":");
};
