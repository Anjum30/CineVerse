// Sirf wahi movies jinki video chalti hai (legal, free: Blender CC-BY films + public-domain classics).
// Source fields (kisi ek ka use karo):
//   youtubeId: "VIDEO_ID"     -> YouTube video (link mein v= ke baad wala part)
//   archiveId: "identifier"   -> archive.org/details/<identifier> wali movie
//   videoUrl:  "https://.../movie.mp4"
// Optional: poster: "https://.../poster.jpg" (apna thumbnail)

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const lines = (title) => {
  const out = [""];
  title.split(" ").forEach((w) => { const last = out[out.length - 1]; (last + " " + w).trim().length > 14 ? out.push(w) : (out[out.length - 1] = (last + " " + w).trim()); });
  return out;
};
const svg = (w, h, id, title, size) => {
  const hue = (id * 47) % 360;
  const text = lines(title).map((l, i, a) => `<text x="50%" y="${50 + (i - (a.length - 1) / 2) * 9}%" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="${size}">${esc(l)}</text>`).join("");
  const s = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},70%,35%)"/><stop offset="1" stop-color="hsl(${(hue + 60) % 360},70%,12%)"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>${text}</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(s);
};

export const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller"];

export const movies = [
  { id: 1, title: "Sintel", rating: 7.5, year: 2010, genres: ["Fantasy", "Action"], trending: true, youtubeId: "eRsGyueVLvQ", director: "Colin Levy", cast: ["Halina Reijn", "Thom Hoffman"], runtime: "14m", release: "2010-09-27", language: "English", description: "A lonely girl searches the world for the baby dragon she once befriended." },
  { id: 2, title: "Tears of Steel", rating: 6.9, year: 2012, genres: ["Sci-Fi", "Action"], trending: true, youtubeId: "R6MlUcmOul8", director: "Ian Hubert", cast: ["Derek de Lint", "Sergio Hasselbaink"], runtime: "12m", release: "2012-09-26", language: "English", description: "Warriors and scientists gather in Amsterdam to stop destructive robots." },
  { id: 3, title: "Big Buck Bunny", rating: 7.2, year: 2008, genres: ["Comedy", "Animation"], trending: true, youtubeId: "aqz-KE-bpKQ", director: "Sacha Goedegebure", cast: ["Animated film"], runtime: "10m", release: "2008-04-10", language: "English", description: "A giant rabbit takes revenge on three bullying rodents." },
  { id: 4, title: "Night of the Living Dead", rating: 7.8, year: 1968, genres: ["Horror", "Thriller"], trending: true, archiveId: "night-of-the-living-dead_1968", director: "George A. Romero", cast: ["Duane Jones", "Judith O'Dea", "Karl Hardman"], runtime: "1h 36m", release: "1968-10-01", language: "English", description: "Strangers trapped in a farmhouse fight to survive a night of the walking dead." },
  { id: 5, title: "Nosferatu", rating: 7.9, year: 1922, genres: ["Horror", "Fantasy"], trending: true, archiveId: "nosferatu", director: "F. W. Murnau", cast: ["Max Schreck", "Gustav von Wangenheim", "Greta Schroder"], runtime: "1h 34m", release: "1922-03-04", language: "Silent (German intertitles)", description: "A classic silent vampire film: Count Orlok brings terror to a quiet port town." },
  { id: 6, title: "Cosmos Laundromat", rating: 7.0, year: 2015, genres: ["Fantasy", "Comedy"], trending: false, youtubeId: "Y-rmzh0PI3c", director: "Mathieu Auvray", cast: ["Animated film"], runtime: "12m", release: "2015-08-10", language: "English", description: "A suicidal sheep meets a salesman who offers him a very different life." },
  { id: 7, title: "Elephants Dream", rating: 6.5, year: 2006, genres: ["Sci-Fi", "Drama"], trending: false, youtubeId: "TLkA0RELQ1g", director: "Bassam Kurdali", cast: ["Animated film"], runtime: "11m", release: "2006-03-24", language: "English", description: "Two strange characters explore a surreal mechanical world." },
  { id: 8, title: "Spring", rating: 7.6, year: 2019, genres: ["Fantasy", "Drama"], trending: false, youtubeId: "WhWc3b3KhnY", director: "Andy Goralczyk", cast: ["Animated film"], runtime: "8m", release: "2019-04-04", language: "English", description: "A shepherd girl and her dog face ancient spirits in order to continue the cycle of life." },
].map((m) => {
  const yt = m.youtubeId ? `https://img.youtube.com/vi/${m.youtubeId}/hqdefault.jpg` : null;
  const ar = m.archiveId ? `https://archive.org/services/img/${m.archiveId}` : null;
  return {
    ...m,
    fallbackPoster: svg(400, 600, m.id, m.title, 38),
    // Thumbnail priority: apna poster > YouTube thumbnail > archive.org thumbnail > generated poster
    poster: m.poster || yt || ar || svg(400, 600, m.id, m.title, 38),
    backdrop: m.backdrop || yt || ar || svg(1600, 900, m.id, m.title, 90),
  };
});

// Simulated REST call: loading state (skeleton) dikhane ke liye delay.
export const fetchMovies = () => new Promise((res) => setTimeout(() => res(movies), 900));
export const fetchMovie = (id) => new Promise((res) => setTimeout(() => res(movies.find((m) => m.id === Number(id))), 500));
