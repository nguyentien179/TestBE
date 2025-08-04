export const RolePermissions = {
  GUEST: [
    "view:articles",
    "search:articles",
    "share:articles",
    "subscribe:newsletter",
  ],
  REGISTERED: [
    "view:articles",
    "search:articles",
    "share:articles",
    "subscribe:newsletter",
    "comment:create",
    "comment:delete",
    "feed:personalize",
    "bookmark:create",
    "bookmark:delete",
    "bookmark:view",
  ],
  EDITOR: [
    "view:articles",
    "search:articles",
    "share:articles",
    "subscribe:newsletter",
    "comment:create",
    "comment:delete",
    "feed:personalize",
    "bookmark:create",
    "bookmark:delete",
    "bookmark:view",
    "article:create",
    "article:edit",
    "article:publish",
    "comment:moderate",
  ],
  ADMIN: [
    "*", // Full access
  ],
};
