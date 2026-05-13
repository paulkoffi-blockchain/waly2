const http = require('http');

const orderData = {
  buyerAddress: "0x2345678901234567890123456789012345678901",
  sellerAddress: "0x1234567890123456789012345678901234567890",
  productId: 1778063227027,
  itemPriceFcfa: 10000,
  deliveryAddress: "Dakar Plateau",
  deliveryPhone: "+221771234567",
  buyerName: "Acheteur Test"
};

const postData = JSON.stringify(orderData);

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/database/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
