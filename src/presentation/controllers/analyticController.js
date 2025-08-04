import AnalyticsService from "../../application/services/analyticsService.js";

export const getAdminAnalytics = async (req, res) => {
  try {
    const stats = await AnalyticsService.getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
