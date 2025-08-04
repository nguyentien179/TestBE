import { RolePermissions } from "../../config/rolePermissions.js"; // adjust path as needed

export const authorizePermission = (permission) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.sendStatus(401);

    const role = user.role;
    const allowed = RolePermissions[role];

    if (!allowed) return res.sendStatus(403);

    if (allowed.includes("*") || allowed.includes(permission)) {
      return next();
    }

    return res.status(403).json({ error: "Forbidden" });
  };
};
