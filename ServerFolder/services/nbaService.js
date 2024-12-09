// services/nbaService.js
const axios = require('axios');
const Game = require('../models/NBA/game');
const Team = require('../models/NBA/teams');

const API_BASE_URL = 'https://api-nba-v1.p.rapidapi.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
  }
});

async function getTodayGames() {
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    console.log('Fetching games for date:', formattedDate);
    
    const response = await apiClient.get('/games', {
      params: { date: formattedDate }
    });

    console.log('API Response:', JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.response) {
      console.log('No games data found');
      return [];
    }

    const games = response.data.response.map(game => ({
      gameId: game.id,
      date: game.date?.start,
      status: game.status?.long,
      season: game.season,
      homeTeam: {
        id: game.teams?.home?.id,
        name: game.teams?.home?.name,
        score: game.scores?.home?.points || 0
      },
      awayTeam: {
        id: game.teams?.visitors?.id,
        name: game.teams?.visitors?.name,
        score: game.scores?.visitors?.points || 0
      }
    }));

    console.log('Processed games:', games.length);
    return games;
  } catch (error) {
    console.error('Error fetching games:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
}

async function getAllTeams() {
  try {
    const response = await apiClient.get('/teams');
    
    if (!response.data || !response.data.response) {
      return [];
    }

    return response.data.response.map(team => ({
      teamId: team.id,
      name: team.name,
      nickname: team.nickname,
      code: team.code,
      city: team.city,
      logo: team.logo
    }));
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    throw error;
  }
}

async function getTeamGames(teamId) {
  try {
    const season = new Date().getFullYear();
    const response = await apiClient.get('/games', {
      params: {
        team: teamId,
        season: season
      }
    });

    if (!response.data || !response.data.response) {
      return [];
    }

    return response.data.response.map(game => ({
      gameId: game.id,
      date: game.date?.start,
      status: game.status?.long,
      season: game.season,
      homeTeam: {
        id: game.teams?.home?.id,
        name: game.teams?.home?.name,
        score: game.scores?.home?.points || 0
      },
      awayTeam: {
        id: game.teams?.visitors?.id,
        name: game.teams?.visitors?.name,
        score: game.scores?.visitors?.points || 0
      }
    }));
  } catch (error) {
    console.error('Error fetching team games:', error.message);
    throw error;
  }
}

module.exports = {
  getAllTeams,
  getTodayGames,
  getTeamGames
};