import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePlayer = () => {
    setSelectedGame(null);
    setIsFullScreen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setSelectedGame(null)}
            >
              <div className="p-2 bg-emerald-500 rounded-lg group-hover:rotate-12 transition-transform">
                <Gamepad2 className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase italic">Nexus Games</span>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-500 hidden md:block uppercase tracking-widest">
                {filteredGames.length} Games Available
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={closePlayer}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Library</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <a
                    href={selectedGame.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={closePlayer}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-red-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div 
                className={`relative bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 ${
                  isFullScreen ? 'fixed inset-0 z-[60] rounded-none' : 'aspect-video w-full'
                }`}
              >
                {isFullScreen && (
                  <button
                    onClick={() => setIsFullScreen(false)}
                    className="absolute top-4 right-4 z-[70] p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                  title={selectedGame.title}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{selectedGame.title}</h1>
                  <p className="text-zinc-400 mt-1">{selectedGame.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
                    UNBLOCKED
                  </span>
                  <span className="px-3 py-1 bg-white/5 text-zinc-400 text-xs font-semibold rounded-full border border-white/10">
                    WEBGL
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600/20 to-zinc-900 border border-white/5 p-8 md:p-12">
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none mb-4">
                    Play Without <br />
                    <span className="text-emerald-500">Limits.</span>
                  </h2>
                  <p className="text-zinc-400 text-lg mb-8">
                    The ultimate collection of unblocked web games. High performance, zero ads, pure gameplay.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => handleGameSelect(gamesData[0])}
                      className="px-8 py-3 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all active:scale-95"
                    >
                      Play Featured
                    </button>
                    <div className="flex -space-x-3 items-center">
                      {[1, 2, 3, 4].map((i) => (
                        <img
                          key={i}
                          src={`https://picsum.photos/seed/user${i}/100/100`}
                          alt="User"
                          className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                      <span className="pl-6 text-sm text-zinc-500 font-medium">1.2k+ playing now</span>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 via-transparent to-transparent blur-3xl" />
                </div>
              </div>

              {/* Mobile Search */}
              <div className="sm:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleGameSelect(game)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5 transition-all group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <button className="w-full py-2 bg-emerald-500 text-black font-bold rounded-lg text-sm">
                            PLAY NOW
                          </button>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-[10px] font-bold rounded border border-white/20">
                          HD
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 px-1">
                      <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">{game.title}</h3>
                      <p className="text-sm text-zinc-500 line-clamp-1">{game.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="py-20 text-center">
                  <div className="inline-flex p-4 bg-white/5 rounded-full mb-4">
                    <Search className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-bold">No games found</h3>
                  <p className="text-zinc-500">Try searching for something else</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-emerald-500" />
              <span className="font-bold tracking-tighter uppercase italic">Nexus Games</span>
            </div>
            <div className="flex gap-8 text-sm text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">DMCA</a>
            </div>
            <p className="text-xs text-zinc-600 font-mono">
              &copy; {new Date().getFullYear()} NEXUS_GAMES_V1.0.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
