import { authorizeRoles } from "./authorizeRoles.js";

export const authorizePermission = (permission) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.sendStatus(401);

    const role = user.role;
    const allowed = authorizeRoles(role);

    if (!allowed) return res.sendStatus(403);

    if (allowed.includes("*") || allowed.includes(permission)) {
      return next();
    }

    return res.status(403).json({ error: "Forbidden" });
  };
};
