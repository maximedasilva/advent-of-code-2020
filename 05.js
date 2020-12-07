const fs = require('fs');


readData = () => {
  return fs.readFileSync('./05.txt',{encoding: 'utf8'});
} 

const getRaw = (seats) => {
  const raws = {begin: 0, end: 128};
  seats.forEach(seat => {
    if(seat === 'B') {
      raws.begin += Math.floor((raws.end-raws.begin)/2);
    } else {
      raws.end -= Math.floor((raws.end-raws.begin)/2);
    }
  });
  return raws.begin;
};

const getPlace = (seats) => {
  const raws = {begin: 0, end: 8};
  seats.forEach(seat => {
    if(seat === 'R') {
      raws.begin += Math.floor((raws.end-raws.begin)/2);
    } else {
      raws.end -= Math.floor((raws.end-raws.begin)/2);
    }
  });
  return raws.begin;
};

const main = () => {
  const file = readData();
  const seats = file.split('\n');
  let max = -1;
  seats.forEach(seat => {
    const rawNumber = getRaw(seat.split('').slice(0,7));
    const placeNumber = getPlace(seat.split('').slice(7,10));
    const number = rawNumber *8 +placeNumber;
    number > max && (max = number);
  });
  return max
}

console.log(main());