class TimeLogMethods {
  static hasClockedIn(usersSet, userId) {
    return Array.from(usersSet).some((user) => user.userId === userId);
  }

  static getCheckInTime(usersSet, userId) {
    const userEntry = Array.from(usersSet).find(
      (user) => user.userId === userId
    );
    if (userEntry) {
      return userEntry.checkIn;
    }
    return null; // User not found in the Set
  }

  static getCheckOutTime(usersSet, userId) {
    const userEntry = Array.from(usersSet).find(
      (user) => user.userId === userId
    );
    if (userEntry) {
      return userEntry.checkOut;
    }
    return null; // User not found in the Set
  }
}

module.exports = TimeLogMethods;
