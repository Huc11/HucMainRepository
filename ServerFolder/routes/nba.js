// routes/nba.js
const express = require('express');
const router = express.Router();
const { getAllTeams, getTodayGames, getTeamGames } = require('../services/nbaService');

// 中间件来获取 token
const getToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

// 获取所有球队
router.get('/teams', async (req, res) => {
  try {
    const token = getToken(req);
    const teams = await getAllTeams(token);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取今天的比赛
router.get('/games/today', async (req, res) => {
  try {
    const token = getToken(req);
    const games = await getTodayGames(token);
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取特定球队的比赛
router.get('/games/team/:teamId', async (req, res) => {
  try {
    const token = getToken(req);
    const games = await getTeamGames(req.params.teamId, token);
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;