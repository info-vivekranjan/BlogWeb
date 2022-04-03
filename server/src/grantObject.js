const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (() => {
  ac.grant("basic")
    .readOwn("profile")
    .updateOwn("profile")
    .createOwn("profile")
    .deleteOwn("profile");

  ac.grant("admin")
    .extend("basic")
    .readAny("profile")
    .createAny("profile")
    .updateAny("profile")
    .deleteAny("profile");

  return ac;
})();
