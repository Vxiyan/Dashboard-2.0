
import React, { useState, useEffect } from "react";
import { Coordinate, GameNote, GameEntry, QuickLink, User } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
    MapPin, 
    StickyNote, 
    Library, 
    ExternalLink,
    Plus,
    Clock,
    Target,
    Zap,
    TrendingUp,
    Star,
    Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WelcomeScreen from "../components/auth/WelcomeScreen"; // New import

export default function Dashboard() {
  const [authStatus, setAuthStatus] = useState('loading'); // New state
  const [coordinates, setCoordinates] = useState([]);
  const [notes, setNotes] = useState([]);
  const [games, setGames] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        await User.me(); // Attempt to get user info
        setAuthStatus('authenticated');
        loadData(); // Load dashboard data only if authenticated
      } catch (error) {
        // If User.me() fails (e.g., 401 Unauthorized), set status to unauthenticated
        setAuthStatus('unauthenticated');
      }
    };

    checkAuthAndLoadData();
    
    // Set up the time update interval, independent of auth status
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  const loadData = async () => {
    const [coordData, noteData, gameData, linkData] = await Promise.all([
      Coordinate.list("-created_date", 5),
      GameNote.list("-created_date", 5), 
      GameEntry.list("-created_date", 5),
      QuickLink.list("-created_date", 8)
    ]);
    
    setCoordinates(coordData);
    setNotes(noteData);
    setGames(gameData);
    setQuickLinks(linkData);
  };

  const totalHours = games.reduce((sum, game) => sum + (game.hours_played || 0), 0);
  const gamesPlaying = games.filter(g => g.status === 'playing').length;

  // Conditional rendering based on authentication status
  if (authStatus === 'loading') {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mb-4" />
        <p className="text-lg text-slate-400">Loading GameHQ...</p>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return <WelcomeScreen />;
  }

  // Render the full dashboard content if authenticated
  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Gaming Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Your gaming command center</p>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="text-right">
              <div className="text-lg font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-slate-400">
                {currentTime.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Hours</p>
                  <p className="text-2xl font-bold text-white">{totalHours}</p>
                </div>
                <Clock className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Currently Playing</p>
                  <p className="text-2xl font-bold text-white">{gamesPlaying}</p>
                </div>
                <Target className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Saved Coords</p>
                  <p className="text-2xl font-bold text-white">{coordinates.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Game Notes</p>
                  <p className="text-2xl font-bold text-white">{notes.length}</p>
                </div>
                <StickyNote className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-cyan-400" />
              Quick Links
            </CardTitle>
            <Link to={createPageUrl("QuickLinks")}>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-200 group border border-slate-600/30 hover:border-slate-500/50"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <ExternalLink className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{link.name}</p>
                    <p className="text-xs text-slate-400 truncate">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Coordinates */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                Recent Coordinates
              </CardTitle>
              <Link to={createPageUrl("Coordinates")}>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {coordinates.map((coord) => (
                <div key={coord.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white">{coord.location_name}</h4>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                      {coord.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{coord.game}</p>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>X: {coord.x}</span>
                    <span>Y: {coord.y}</span>
                    {coord.z && <span>Z: {coord.z}</span>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Notes */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-yellow-400" />
                Recent Notes
              </CardTitle>
              <Link to={createPageUrl("Notes")}>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white">{note.title}</h4>
                    <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                      {note.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{note.game}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">{note.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Current Games */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Library className="w-5 h-5 text-green-400" />
                Current Games
              </CardTitle>
              <Link to={createPageUrl("GameLibrary")}>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {games.filter(g => g.status === 'playing').map((game) => (
                <div key={game.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white">{game.title}</h4>
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      {game.platform}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {game.hours_played}h
                    </span>
                    {game.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {game.rating}/10
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
