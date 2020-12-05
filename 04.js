const fs = require('fs');
const fragmentsToWatch= [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
]
hgtChecker = (hgt) => {
const unit = hgt.substring(hgt.length-2, hgt.length);
if(unit === 'cm') {
  if (hgt.length !== 5) {
    return false
  }
  const value = hgt.substring(0, 3)
  return  value>=150 && value<=193;
} else if (unit === 'in') {
  if (hgt.length !== 4) {
    return false
  }
  const value = hgt.substring(0, 2)
  return  value>=59 && value<=76;
} else {
  return false
}
}
readData = () => {
  return fs.readFileSync('./04.txt',{encoding: 'utf8'});
} 
const isFragmentDataCorrect = (data, fragment) => {
  switch(fragment) {
    case 'byr':
      return data>=1920 && data<=2002
    case 'iyr':
      return data>=2010 && data<=2020
    case 'eyr':
      return data>=2020 && data<=2030
    case 'hgt':
      return hgtChecker(data)
    case 'hcl':
      return RegExp(/^#[0-9a-fA-F]{6}$/).test(data)
    case 'ecl':
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].find((color) => color === data)
    case 'pid':
      return RegExp(/^[0-9]{9}$/).test(data)
  }
};
const isFragmentInPassport = (passportFragments, fragment) => {
  return passportFragments.find((passportFragment) => {
    return passportFragment.split(':')[0] === fragment && isFragmentDataCorrect(passportFragment.split(':')[1], fragment);
  }) != null;
}

const isPassportValid = (passport) => {
  const passportFragments = passport.split(/ |\n/);
  return fragmentsToWatch.find(fragment => {
    return !isFragmentInPassport(passportFragments, fragment) ;
  }) == null;
};


const main = () => {
  const data = readData();
  const dataTab = data.split('\n\n');
  let numberOfValids = 0;
  dataTab.forEach(passport => {
    isPassportValid(passport) && numberOfValids ++;
  });
  return numberOfValids;  
}

console.log(main());