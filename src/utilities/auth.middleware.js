export function isAuthorized(user) {
  if (
    user &&
    user.role &&
    user.role.substring(0, 5).toLowerCase() === "admin"
  ) {
    return true;
  } else return false;
}

export function isMainAdmin(user) {
  return isAuthorized(user)
    ? user.role.substring(6, 7).toLowerCase() === "p"
      ? true
      : false
    : false;
}
