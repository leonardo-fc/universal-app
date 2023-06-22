import os from 'os';

const lanIP = os
  .networkInterfaces()
  .en0?.find((v) => v.family === 'IPv4')?.address;

// If process don't have access to LAN (it's inside the dev container), tunnel the expo connection
process.stdout.write(lanIP ? '' : '--tunnel');
