import AuthService from "../../application/services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.errors ?? err.message });
  }
};

export const login = async (req, res) => {
  try {
    const tokens = await AuthService.login(req.body);
    res.json(tokens);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const tokens = await AuthService.refreshToken(req.body);
    res.json(tokens);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    // req.user.id is populated by the `authenticate` middleware
    await AuthService.logout(req.user.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await AuthService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};