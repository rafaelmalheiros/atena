import AchievementTemporary from "../models/achievementTemporary";

export const generateKind = data => {
  let kind = null;

  if (data.channel.toLowerCase() === "rocket") {
    kind = `${data.category.toLowerCase()}.${data.action.toLowerCase()}.${data.type.toLowerCase()}`;
  } else {
    kind = `${data.category.toLowerCase()}.${data.channel.toLowerCase()}.${data.action.toLowerCase()}`;
  }

  return kind;
};

export const convertDataToAchievement = (achievementTemporaryData, user) => {
  let achievementTemporary = {};
  if (achievementTemporaryData) {
    achievementTemporary = generateNewTemporaryAchievement(
      achievementTemporaryData,
      user
    );
    achievementTemporary.ratings = generateNewRatings(achievementTemporaryData);
  }
  return achievementTemporary;
};

const generateNewRatings = achievementTemporaryData => {
  return achievementTemporaryData.ratings.map(rating => {
    return {
      name: rating.name,
      xp: rating.xp,
      total: 0,
      ranges: rating.ranges
    };
  });
};

const generateNewTemporaryAchievement = (achievementTemporaryData, user) => {
  let achievementTemporary = new AchievementTemporary();
  achievementTemporaryData.schema.eachPath(path => {
    if (!["_id", "__v", "rating"].includes(path)) {
      achievementTemporary[path] = achievementTemporaryData[path];
    }
  });
  achievementTemporary.dataId = achievementTemporaryData._id;
  achievementTemporary.userId = user;
  achievementTemporary.ratings = [];
  return achievementTemporary;
};

export const generateRatingsRanges = ratings => {
  return ratings.map(rating => {
    if (rating.ranges && rating.ranges > 0) {
      rating.ranges = generateRanges(rating.ranges);
      return rating;
    }
  });
};

const generateRanges = ranges => {
  let rangesObj = [];
  for (let range = 1; range <= ranges; range++) {
    rangesObj.push({
      name: convertNumberToRoman(range),
      value: range
    });
  }

  return rangesObj;
};

const convertNumberToRoman = num => {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let str = "";
  for (let i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
};
