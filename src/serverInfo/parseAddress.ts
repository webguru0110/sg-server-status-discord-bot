import generateErrorMessage from '../utils/generateError';

const parseAddress = (address: string): ServerAddress => {
  const [host, portString] = address.split(':');

  const port = parseInt(portString, 10);

  if (portString === undefined) {
    throw new Error(generateErrorMessage(`Invalid address format \`${address}\``));
  }

  if (Number.isNaN(port) || portString.length === 0) {
    throw new Error(generateErrorMessage(`Invalid port \`${portString}\``));
  }

  return {
    host,
    port,
  };
};

export default parseAddress;
