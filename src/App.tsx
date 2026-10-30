import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, TextField, Button, 
  Card, Dialog, DialogTitle, DialogContent, 
  DialogActions, Chip, IconButton, Box, Grid
} from '@mui/material';

// MUI Icons
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// 1. Direct Image Imports from public or src folder
import spiritedAwayImg from '../public/spirited-away.jpg';
import demonSlayerImg from '../public/demon-slayer.jpg';
import suzumeImg from '../public/suzume.jpg';
import howlImg from '../public/howl.jpg';
import silentVoiceImg from '../public/silent-voice.jpg';
import driftingHomeImg from '../public/drifting-home.jpg';
import firefliesImg from '../public/fireflies.jpg';

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  year: number;
  duration: string;
  poster: string;
  synopsis: string;
  trailerUrl: string;
  isWatched: boolean;
}

const initialMovies: Movie[] = [
  {
    id: 1,
    title: "千と千尋の神隠し",
    genre: "ファンタジー",
    rating: 4.9,
    year: 2001,
    duration: "125分",
    poster: spiritedAwayImg,
    synopsis: "10歳の少女・千尋が迷い込んだ八百万の神々の集う不思議な町。両親を豚に変えられた千尋は、湯婆婆のもとで働きながら生き抜く術を学んでいく。",
    trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk",
    isWatched: true,
  },
  {
    id: 2,
    title: "鬼滅の刃 無限城編",
    genre: "アクション",
    rating: 4.8,
    year: 2025,
    duration: "劇場版",
    poster: demonSlayerImg,
    synopsis: "鬼殺隊と鬼の始祖・鬼舞辻無惨との最終決戦が幕を開ける。無限城を舞台に繰り広げられる死闘を描いた劇場版アニメーション。",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isWatched: false,
  },
  {
    id: 3,
    title: "すずめの戸締まり",
    genre: "ドラマ / ファンタジー",
    rating: 4.7,
    year: 2022,
    duration: "121分",
    poster: suzumeImg,
    synopsis: "九州の静かな町で暮らす17歳の少女・すずめ。日本各地の廃墟に存在する『災いの扉』を閉める旅へと出かける新海誠監督作品。",
    trailerUrl: "https://www.youtube.com/embed/FV3bqvOHRQo",
    isWatched: false,
  },
  {
    id: 4,
    title: "ハウルの動く城",
    genre: "ファンタジー / ロマンス",
    rating: 4.8,
    year: 2004,
    duration: "119分",
    poster: howlImg,
    synopsis: "魔女の呪いで90歳の老婆に変えられた少女ソフィーと、魔法使いハウルが奇妙な動く城で繰り広げる愛と冒険の物語。",
    trailerUrl: "https://www.youtube.com/embed/iwROgK94zcM",
    isWatched: true,
  },
  {
    id: 5,
    title: "聲の形",
    genre: "ドラマ",
    rating: 4.9,
    year: 2016,
    duration: "129分",
    poster: silentVoiceImg,
    synopsis: "聴覚障害を持つ少女・硝子と、過去に彼女を傷つけた少年・将也。心を閉ざしていた2人が互いを受け入れ成長していく深い絆の物語。",
    trailerUrl: "https://www.youtube.com/embed/XBNWo2GWiz4",
    isWatched: true,
  },
  {
    id: 6,
    title: "雨を告げる漂流団地",
    genre: "アドベンチャー",
    rating: 4.5,
    year: 2022,
    duration: "120分",
    poster: driftingHomeImg,
    synopsis: "取り壊しの進む団地に忍び込んだ子供たち。気がつくと、あたり一面がどこまでも広がる大海原を漂流していた…。",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isWatched: false,
  },
  {
    id: 7,
    title: "火垂るの墓",
    genre: "ドラマ / 歴史",
    rating: 4.9,
    year: 1988,
    duration: "89分",
    poster: firefliesImg,
    synopsis: "太平洋戦争末期。親を失った兄・清太と妹・節子の2人が絶望の時代の中で身を寄せ合い、懸命に生き抜こうとするジブリの不朽の名作。",
    trailerUrl: "https://www.youtube.com/embed/4vPeTSRd580",
    isWatched: true,
  }
];

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('すべて');
  const [isSpinning, setIsSpinning] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('ファンタジー');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newPoster, setNewPoster] = useState('');
  const [newTrailer, setNewTrailer] = useState('');

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'すべて' || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const handleNext = () => {
    if (filteredMovies.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredMovies.length);
  };

  const handlePrev = () => {
    if (filteredMovies.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredMovies.length) % filteredMovies.length);
  };

  const handleRandomPick = () => {
    if (movies.length === 0) return;
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setCurrentIndex(randomIndex);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        setIsSpinning(false);
        setSelectedMovie(movies[randomIndex]);
      }
    }, 100);
  };

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMovie: Movie = {
      id: Date.now(),
      title: newTitle,
      genre: newGenre,
      rating: 4.5,
      year: 2026,
      duration: "120分",
      poster: newPoster.trim() || spiritedAwayImg,
      synopsis: newSynopsis.trim() || "新しく登録された映画です。",
      trailerUrl: newTrailer.trim() || "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isWatched: false,
    };

    setMovies([newMovie, ...movies]);
    setNewTitle('');
    setNewSynopsis('');
    setNewPoster('');
    setNewTrailer('');
    setOpenAddModal(false);
  };

  const genres = ['すべて', 'ファンタジー', 'アクション', 'ドラマ', 'アドベンチャー'];

  return (
    <div style={{ backgroundColor: '#030308', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <AppBar position="sticky" sx={{ backgroundColor: 'rgba(3, 3, 8, 0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #22223b' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => setCurrentIndex(0)}>
            <Box sx={{ background: 'linear-gradient(45deg, #ff007f, #00f3ff)', p: 1, borderRadius: 2, display: 'flex' }}>
              <MovieIcon sx={{ color: '#000' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(90deg, #00f3ff, #ff007f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 2 }}>
              CYBERFLIX 3D
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', backgroundColor: '#12121f', border: '1px solid #2a2a40', px: 2, py: 0.5, borderRadius: 50, width: 300 }}>
            <SearchIcon sx={{ color: '#888', mr: 1, fontSize: 20 }} />
            <input 
              type="text" 
              placeholder="タイトルやジャンルを検索..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', width: '100%' }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              onClick={handleRandomPick}
              disabled={isSpinning}
              startIcon={<ShuffleIcon />}
              sx={{ background: 'linear-gradient(90deg, #ff007f, #7928ca)', color: '#fff', fontWeight: 'bold', borderRadius: 50, px: 3, textTransform: 'none', boxShadow: '0 0 15px rgba(255,0,127,0.4)' }}
            >
              ガチャ
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setOpenAddModal(true)}
              startIcon={<AddIcon />}
              sx={{ borderColor: '#00f3ff', color: '#00f3ff', fontWeight: 'bold', borderRadius: 50, px: 2, textTransform: 'none', '&:hover': { backgroundColor: '#00f3ff', color: '#000' } }}
            >
              追加
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 } }}>
        
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 2, mb: 4 }}>
          {genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              clickable
              onClick={() => { setSelectedGenre(genre); setCurrentIndex(0); }}
              sx={{
                backgroundColor: selectedGenre === genre ? '#00f3ff' : '#12121f',
                color: selectedGenre === genre ? '#000' : '#888',
                fontWeight: 'bold',
                border: '1px solid #2a2a40',
                '&:hover': { color: '#fff', backgroundColor: '#1a1a2e' }
              }}
            />
          ))}
        </Box>

        {filteredMovies.length === 0 ? (
          <Typography color="gray" sx={{ py: 10, textAlign: 'center' }}>映画が見つかりませんでした。</Typography>
        ) : (
          <>
            {/* Hero Showcase */}
            <Card sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', backgroundColor: '#12121f', border: '1px solid #2a2a40', mb: 6, minHeight: 400, display: 'flex', alignItems: 'flex-end' }}>
              <Box 
                component="img" 
                src={filteredMovies[currentIndex]?.poster} 
                alt={filteredMovies[currentIndex]?.title}
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'blur(10px) brightness(0.6)' }}
              />

              <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 3, md: 6 }, maxWidth: 700 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                  <Chip label={filteredMovies[currentIndex]?.genre} size="small" sx={{ backgroundColor: '#ff007f', color: '#fff', fontWeight: 'bold' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffd700', fontWeight: 'bold', fontSize: 14 }}>
                    <StarIcon sx={{ fontSize: 18, mr: 0.5 }} />
                    {filteredMovies[currentIndex]?.rating}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#aaa' }}>
                    {filteredMovies[currentIndex]?.year} / {filteredMovies[currentIndex]?.duration}
                  </Typography>
                </Box>

                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                  {filteredMovies[currentIndex]?.title}
                </Typography>

                <Typography variant="body2" sx={{ color: '#ccc', mb: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {filteredMovies[currentIndex]?.synopsis}
                </Typography>

                <Button 
                  variant="contained" 
                  startIcon={<PlayArrowIcon />}
                  onClick={() => setSelectedMovie(filteredMovies[currentIndex])}
                  sx={{ backgroundColor: '#00f3ff', color: '#000', fontWeight: 'bold', borderRadius: 50, px: 4, py: 1.5, '&:hover': { backgroundColor: '#fff' } }}
                >
                  詳細・予告編を見る
                </Button>
              </Box>
            </Card>

            {/* Carousel Grid */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff007f' }}>
                  ポスター・コレクション（スライド）
                </Typography>
                <Box>
                  <IconButton onClick={handlePrev} sx={{ color: '#fff', border: '1px solid #2a2a40', mr: 1 }}><ChevronLeftIcon /></IconButton>
                  <IconButton onClick={handleNext} sx={{ color: '#fff', border: '1px solid #2a2a40' }}><ChevronRightIcon /></IconButton>
                </Box>
              </Box>

              <Grid container spacing={2}>
                {filteredMovies.map((movie, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={movie.id}>
                      <Card 
                        onClick={() => setCurrentIndex(index)}
                        sx={{ 
                          cursor: 'pointer', 
                          borderRadius: 3, 
                          overflow: 'hidden', 
                          border: isActive ? '2px solid #00f3ff' : '1px solid #2a2a40',
                          transform: isActive ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.3s ease',
                          boxShadow: isActive ? '0 0 20px rgba(0,243,255,0.4)' : 'none',
                          backgroundColor: '#12121f'
                        }}
                      >
                        <Box component="img" src={movie.poster} alt={movie.title} sx={{ width: '100%', height: 260, objectFit: 'cover' }} />
                        <Box sx={{ p: 1.5 }}>
                          <Typography variant="caption" sx={{ color: '#00f3ff', fontWeight: 'bold' }}>{movie.genre}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {movie.title}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </>
        )}
      </Box>

      {/* Details Modal */}
      <Dialog open={Boolean(selectedMovie)} onClose={() => setSelectedMovie(null)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { backgroundColor: '#12121f', color: '#fff', border: '1px solid #2a2a40', borderRadius: 4 } } }}>
        {selectedMovie && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00f3ff' }}>{selectedMovie.title}</Typography>
              <IconButton onClick={() => setSelectedMovie(null)} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: '#2a2a40' }}>
              <Box sx={{ width: '100%', height: 350, mb: 3 }}>
                <iframe 
                  src={selectedMovie.trailerUrl} 
                  title={selectedMovie.title}
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}
                  allowFullScreen
                />
              </Box>
              <Typography variant="body1" sx={{ mb: 2, color: '#ccc' }}>{selectedMovie.synopsis}</Typography>
              <Box sx={{ display: 'flex', gap: 2, color: '#aaa', fontSize: 14 }}>
                <span>ジャンル: <strong style={{ color: '#fff' }}>{selectedMovie.genre}</strong></span>
                <span>公開: <strong style={{ color: '#fff' }}>{selectedMovie.year}年</strong></span>
                <span>時間: <strong style={{ color: '#fff' }}>{selectedMovie.duration}</strong></span>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
              <Button 
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  setMovies(movies.map(m => m.id === selectedMovie.id ? { ...m, isWatched: !m.isWatched } : m));
                  setSelectedMovie({ ...selectedMovie, isWatched: !selectedMovie.isWatched });
                }}
                sx={{ color: selectedMovie.isWatched ? '#4caf50' : '#00f3ff' }}
              >
                {selectedMovie.isWatched ? '視聴済み' : '未視聴としてマーク'}
              </Button>
              <Button 
                startIcon={<DeleteIcon />} 
                color="error"
                onClick={() => {
                  setMovies(movies.filter(m => m.id !== selectedMovie.id));
                  setSelectedMovie(null);
                }}
              >
                削除
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Movie Dialog */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { backgroundColor: '#12121f', color: '#fff', border: '1px solid #2a2a40', borderRadius: 4 } } }}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>新しい映画を追加</DialogTitle>
        <form onSubmit={handleAddMovie}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="映画タイトル" fullWidth required size="small" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} slotProps={{ inputLabel: { style: { color: '#888' } }, htmlInput: { style: { color: '#fff' } } }} />
            <TextField label="ジャンル" fullWidth size="small" value={newGenre} onChange={(e) => setNewGenre(e.target.value)} slotProps={{ inputLabel: { style: { color: '#888' } }, htmlInput: { style: { color: '#fff' } } }} />
            <TextField label="ポスター画像URL" fullWidth size="small" value={newPoster} onChange={(e) => setNewPoster(e.target.value)} slotProps={{ inputLabel: { style: { color: '#888' } }, htmlInput: { style: { color: '#fff' } } }} />
            <TextField label="あらすじ" fullWidth multiline rows={3} size="small" value={newSynopsis} onChange={(e) => setNewSynopsis(e.target.value)} slotProps={{ inputLabel: { style: { color: '#888' } }, htmlInput: { style: { color: '#fff' } } }} />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenAddModal(false)} sx={{ color: '#aaa' }}>キャンセル</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#ff007f', color: '#fff', fontWeight: 'bold' }}>登録</Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}