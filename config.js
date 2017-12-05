import * as dotenv from 'dotenv';

dotenv.load();
console.log('dotenv.load(): ', dotenv.load());
console.log('process', process.env.BASE_URL)

export const config = {
  baseUrl: process.env.BASE_URL
}
