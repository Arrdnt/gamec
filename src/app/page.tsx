'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const funnyWords = [
  { word: 'CIPA', emoji: '🎯', color: 'bg-pink-500' },
  { word: 'MIAW', emoji: '🐱', color: 'bg-orange-500' },
  { word: 'XIYAP', emoji: '⚡', color: 'bg-purple-500' },
]

// Neutral emojis - no romance/heart
const floatingEmojisList = ['⚙️', '🔧', '🔬', '⚡', '🐱', '😺', '🚀', '🧮', '💡', '🔋', '🐈', '📊', '🎯', '🌟', '✨']

// TONS of cat emojis for the giant cat!
const catEmojis = [
  '🐱', '🐈', '😺', '😸', '😹', '😻', '😼', '🙀', '😿', '😾', '🐈‍⬛',
  '🦁', '🐯', '🐅', '🐆', '🐾', '😽', '😿', '🤖', '👾', '🦊', '🐰',
  '🐻', '🐼', '🐨', '🦄', '🐲', '🐉', '🦕', '🦖', '🦋', '🦌',
  '🦒', '🦏', '🦛', '🦘', '🐨', '🐭', '🐹', '🐰', '🐻', '🐼',
  '🦇', '🐺', '🐗', '🐴', '🦄', '🐮', '🐷', '🐽', '🐸', '🐵',
  '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥',
  '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐮', '🐷',
  '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦'
]

// 12 fun messages
const catMessages = [
  "halooww ciip 👋",
  "km capek yh 😮‍💨",
  "mls 🫠",
  "aku cinta sawit 🌴",
  "hidupp sushiii! 🍣😼",
  "akal akalan barat 🧠",
  "ngapain yh klo gd km 🫥",
  "yaudah sih 😐",
  "hmm 🤔",
  "kasian km cuacanya ujan.. 🌧️",
  "iya iya maap 🙇",
  "owkai??!! 😳",
  "ya… begitulah 😶",
]


// 50 Fun Facts about Cats!
const catFunFacts = [
  // === TIDUR & ISTIRAHAT ===
  "Kucing bisa tidur sampai 16 jam sehari! 😴🐱",
  "Kucing menghabiskan 70% waktu untuk tidur! 😴⚡",
  "Kucing dewasa lebih suka tidur sendiri daripada kelompok! 😴🐱",
  "Kucing bisa tidur dengan satu mata terbuka! 😺👁️",
  "Kucing bisa tidur dalam posisi berbagai bentuk! 😴🐱",
  "Kucing suka tidur di tempat tinggi karena merasa aman! 🏠🐱",
  "Kucing bisa tidur sambil duduk! 😴🪑",
  "Kucing tidur lebih banyak saat hujan atau cuaca dingin! 🌧️😴",
  "Anak kucing tidur hampir 90% waktu mereka! 🐱💤",
  "Kucing mengalami fase REM (bermimpi) saat tidur! 💭😺",
  "Kucing bisa tertidur dalam waktu kurang dari 1 menit! ⏱️😴",
  "Kucing sering tidur di atas keyboard karena hangat! ⌨️🐱",
  // === ANATOMI & FISIK ===
  "Kucing punya 230 tulang, lebih banyak dari manusia! 🦴⚡",
  "Kucing punya 5 jari di depan, 4 di belakang! 🐾🔢",
  "Kucing punya 3 kelopak mata! 👁️👁️👁️",
  "Kucing punya 30 gigi! 🦷⚡",
  "Hidung kucing unik seperti fingerprint manusia! 👃🔍",
  "Kucing punya organ tambahan di hidung untuk deteksi bau! 👃⚡",
  "Kucing punya kacamata yang memantulkan cahaya di gelap! 👁️✨",
  "Kucing punya jari yang bisa memanjang untuk memancing! 🐾🎣",
  "Kucing tidak punya tulang selangka, jadi bisa masuk lubang kecil! 🦴🕳️",
  "Jantung kucing berdetak 2x lebih cepat dari manusia! ❤️⚡",
  "Kumis kucing selebar tubuhnya untuk mengukur ruang! 🐱📏",
  "Kucing punya 24 kumis yang tersusun dalam 4 baris! 🐱✨",
  "Telinga kucing bisa berputar 180 derajat! 👂🔄",
  "Kucing punya 32 otot di setiap telinga! 👂💪",
  "Lidah kucing kasar seperti amplas untuk membersihkan bulu! 👅🧹",
  "Kucing tidak bisa menggerakkan rahang ke samping! 🐱🚫",
  "Otak kucing 90% mirip dengan otak manusia! 🧠⚡",
  "Kucing punya tulang punggung yang sangat fleksibel! 🦴🔄",
  "Cakar kucing bisa ditarik masuk untuk melindungi ketajamannya! 🐾⚡",
  "Kucing berjalan dengan jari kaki, bukan telapak! 🐾👣",
  "Bulu kucing tumbuh sekitar 0.5mm per hari! 🐱📈",
  "Kucing punya lapisan reflektif di mata bernama tapetum lucidum! 👁️✨",
  // === KEMAMPUAN & SKILL ===
  "Kucing bisa berputar 180 derajat saat jatuh! 🔄🐱",
  "Kucing bisa melihat di gelap 6x lebih baik dari manusia! 👁️🌙",
  "Kucing bisa melompat sampai 6 kali tinggi tubuhnya! 🦘🐱",
  "Kucing punya pendengaran yang sangat tajam! 👂🔊",
  "Kucing bisa berlari sampai 30 mph (48 km/jam)! 🏃🐱",
  "Kucing bisa melihat gerakan terkecil sekalipun! 👁️🎯",
  "Kucing bisa merasakan gempa bumi sebelum terjadi! 🌍⚡",
  "Kucing punya rasa keseimbangan yang luar biasa! ⚖️🐱",
  "Kucing bisa melompat dari duduk diam tanpa persiapan! 🦘⚡",
  "Kucing punya refleks yang sangat cepat! ⚡🐱",
  "Kucing bisa berjalan diam-diam tanpa suara! 🤫🐱",
  "Kucing bisa melompat dari lantai ke atas meja dengan mudah! 🪑🐱",
  "Kucing bisa berenang! 🏊🐱",
  "Kucing bisa mendengar suara ultrasonic yang tak terdengar manusia! 🔊👂",
  "Kucing bisa mendeteksi perubahan cuaca! 🌤️🐱",
  "Kucing bisa menemukan jalan pulang dari jarak bermil-mil! 🏠🧭",
  "Kucing bisa melompat hingga 2.5 meter tingginya! 📏🦘",
  "Kucing bisa berlari lebih cepat dari Usain Bolt! 🏃⚡",
  "Kucing bisa mendengar suara dari jarak 4x lebih jauh dari manusia! 👂📡",
  "Kucing bisa melihat warna biru dan hijau dengan baik! 👁️🌈",
  "Kucing punya field of view 200 derajat! 👁️🔭",
  // === PERILAKU & KEBIASAAN ===
  "Kucing menghabiskan 30-50% waktu untuk grooming! 🧴🐱",
  "Kucing menandai wilayah dengan menggosok kepala! 🐱📍",
  "Kucing berkomunikasi dengan ekor mereka! 🐱💬",
  "Kucing suka mengubur kotorannya di tempat bersih! 🧹🐱",
  "Kucing menghabiskan waktu untuk berburu meskipun tidak lapar! 🎯🐱",
  "Kucing lebih suka kotak daripada mainan mahal! 📦🐱",
  "Kucing bisa menggoyangkan ekor saat bahagia atau marah! 🐱💬",
  "Kucing suka menguleni dengan cakar mereka saat bahagia! 🐾😺",
  "Kucing menggosok wajah ke benda untuk menandai kepemilikan! 🐱🏷️",
  "Kucing suka membawa 'hadiah' berupa buruan ke pemiliknya! 🎁🐭",
  "Kucing suka memperhatikan burung dari jendela! 🪟🐦",
  "Kucing suka menjatuhkan barang dari meja untuk eksperimen! 📱💥",
  "Kucing sering 'berbicara' saat melihat mangsa di luar jendela! 😺🐦",
  "Kucing suka mengejar laser pointer tanpa lelah! 🔴🐱",
  "Kucing suka bersembunyi di tempat sempit! 🕳️🐱",
  "Kucing senang mengawasi dari tempat tinggi! 🏔️👁️",
  "Kucing suka menggigit tangan saat bermain! 🐾😸",
  "Kucing sering tidur di laptop karena hangat dan dekat pemilik! 💻🐱",
  "Kucing menunjukkan perut sebagai tanda kepercayaan! 🐱❤️",
  "Kucing slow-blink sebagai tanda cinta! 😺💕",
  "Kucing suka mengikuti pemilik ke kamar mandi! 🚽🐱",
  // === KOMUNIKASI & SUARA ===
  "Kucing mengeluarkan suara 'purring' untuk self-soothing! 😺🎵",
  "Kucing dewasa hanya mengeong ke manusia, bukan kucing lain! 😺💬",
  "Kucing bisa mengeong dengan nada berbeda untuk arti berbeda! 🎵😺",
  "Kucing bisa membunyikan 100 suara berbeda! 🎵😺",
  "Kucing bisa mengenali suara namanya! 🔊🐱",
  "Kucing bisa mengenali suara langkah kaki yang familiar! 👣⚡",
  "Kucing lebih suka suara rendah daripada suara tinggi! 🔊⚡",
  "Kucing bisa mengerti lebih dari 20 kata-kata! 💬🐱",
  "Purring kucing bergetar pada frekuensi yang bisa menyembuhkan tulang! 🎵🦴",
  "Kucing mengeong lebih banyak pada manusia daripada sesama kucing! 😺👤",
  "Kucing bisa meniru suara bayi untuk menarik perhatian! 👶🐱",
  "Kucing mendesis untuk meniru suara ular sebagai pertahanan! 🐍😾",
  "Kucing bisa berteriak seperti bayi saat kawin! 😺📢",
  "Kucing purr saat bahagia DAN saat stres! 🎵😺",
  // === INDERA & PERSEPSI ===
  "Kucing tidak bisa merasakan manis! 🚫🍯",
  "Kucing tidak suka bau jeruk! 🍊🚫",
  "Kucing lebih suka air bersih daripada air kotor! 💧🐱",
  "Kucing bisa membaca ekspresi wajah manusia! 😺👤",
  "Kucing bisa merasakan mood manusia! 🧠⚡",
  "Kucing tidak suka bau mint dan eucalyptus! 🌿🚫",
  "Kucing bisa mencium 14x lebih baik dari manusia! 👃⚡",
  "Kucing tidak bisa melihat tepat di bawah hidungnya! 👁️🚫",
  "Kucing lebih suka makan dari piring datar daripada mangkuk dalam! 🍽️🐱",
  "Kucing tidak suka kumis mereka menyentuh tepi mangkuk! 🐱❌",
  "Kucing bisa merasakan perubahan tekanan udara! 🌪️🐱",
  "Kucing sensitif terhadap suara frekuensi tinggi! 🔊👂",
  // === KECERDASAN & MEMORI ===
  "Kucing punya memory yang sangat bagus! 🧠⚡",
  "Kucing bisa mengingat lokasi makanan hingga 16 jam! 🍽️🧠",
  "Kucing bisa belajar membuka pintu! 🚪🐱",
  "Kucing bisa belajar menyalakan keran air! 🚿😺",
  "Kucing bisa mengenali wajah pemiliknya! 👤❤️",
  "Kucing punya memori jangka pendek sekitar 16 jam! 🧠⏰",
  "Kucing bisa dilatih seperti anjing dengan kesabaran! 🎓🐱",
  "Kucing bisa memecahkan puzzle sederhana! 🧩😺",
  "Kucing bisa belajar nama-nama mainan mereka! 🧸🐱",
  "Kucing mengingat pengalaman traumatis selamanya! 🧠⚠️",
  // === FAKTA UNIK & MENARIK ===
  "Kucing jantan kidal lebih sering daripada betina! 🐱⬅️",
  "Kucing tertua yang pernah hidup berusia 38 tahun! 🎂🐱",
  "Kucing pertama ke luar angkasa bernama Félicette dari Prancis! 🚀🐱",
  "Kucing calico hampir selalu betina! 🐱♀️",
  "Kucing oranye kebanyakan jantan (80%)! 🧡🐱",
  "Kucing hitam dianggap pembawa keberuntungan di Jepang! 🐈‍⬛🍀",
  "Kucing punya sidik hidung yang unik seperti manusia! 👃🔍",
  "Grup kucing disebut 'clowder'! 🐱🐱🐱",
  "Kucing bisa alergi terhadap manusia! 🤧🐱",
  "Kucing tidak bisa turun dari pohon karena cakar menghadap satu arah! 🌳🐱",
  "Kucing menghabiskan 2/3 hidupnya untuk tidur! 😴📊",
  "Kucing domestik pertama berasal dari Timur Tengah 10.000 tahun lalu! 🏛️🐱",
  "Seekor kucing pernah jadi walikota di Alaska selama 20 tahun! 🏛️😺",
  "Kucing bisa minum air laut karena ginjalnya bisa menyaring garam! 🌊🐱",
  "Isaac Newton menemukan pintu kucing (cat flap)! 🚪🧑‍🔬",
  "Kucing menghabiskan 10.950 jam untuk grooming seumur hidup! 🧴⏰",
  // === HUBUNGAN DENGAN MANUSIA ===
  "Kucing memilih satu manusia favorit! ❤️🐱",
  "Kucing bisa merasakan saat pemiliknya sakit! 🏥😺",
  "Kucing tidur di dekat kepala pemilik untuk bonding! 😴❤️",
  "Kucing menganggap manusia sebagai kucing besar yang canggung! 🐱👤",
  "Kucing bisa cemburu pada hewan peliharaan lain! 😾💚",
  "Kucing lebih menyukai orang yang tidak terlalu memperhatikan mereka! 😺🤷",
  "Kucing bisa mengenali mobil pemiliknya dari suara mesin! 🚗👂",
  "Kucing membantu menurunkan risiko serangan jantung pada pemiliknya! ❤️🐱",
  "Kucing bisa mengurangi stres dan kecemasan manusia! 😌🐱",
  "Kucing bisa merasakan kehamilan pada manusia! 🤰😺",
  // === KESEHATAN & ADAPTASI ===
  "Kucing bisa bertahan tanpa air lebih lama dari unta! 🐪💧",
  "Kucing bisa memutar telinga secara independen! 👂🔄",
  "Kucing tidak berkeringat seperti manusia! 🐱💦",
  "Kucing berkeringat hanya melalui bantalan kaki! 🐾💧",
  "Kucing bisa pulih dari luka dengan lebih cepat saat purring! 🎵🩹",
  "Kucing bisa melahirkan anak dari ayah berbeda dalam satu litter! 🐱👶",
  "Kucing bisa hamil lagi saat masih menyusui! 🍼🐱",
  "Rata-rata kucing hidup 12-18 tahun! 📅🐱",
  "Kucing indoor hidup lebih lama dari kucing outdoor! 🏠⏰",
  "Kucing bisa tidur 18-20 jam saat sakit untuk pemulihan! 😴🩺",
]

export default function Home() {
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; x: number; y: number; delay: number }>>([])
  const [currentWord, setCurrentWord] = useState(0)
  const [score, setScore] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [catMood, setCatMood] = useState('happy')
  const [catMessage, setCatMessage] = useState(catMessages[0])
  const [generatedCatImage, setGeneratedCatImage] = useState<string | null>(null)
  const [isGeneratingCat, setIsGeneratingCat] = useState(false)
  const [currentCatEmoji, setCurrentCatEmoji] = useState('🐱')
  const [showFunFact, setShowFunFact] = useState(false)
  const [currentFunFact, setCurrentFunFact] = useState('')

  // Generate floating emojis
  useEffect(() => {
    const emojis = floatingEmojisList.map((emoji, index) => ({
      id: index,
      emoji,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setFloatingEmojis(emojis)
  }, [])

  // Auto-change words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % funnyWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Auto-change cat emoji
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)]
      setCurrentCatEmoji(randomCat)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Bounce cat animation
  const handleCatClick = () => {
    setIsAnimating(true)
    setScore((prev) => prev + 10)
    const randomMessage = catMessages[Math.floor(Math.random() * catMessages.length)]
    setCatMessage(randomMessage)

    // Change cat emoji immediately
    const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)]
    setCurrentCatEmoji(randomCat)

    // Spawn celebration emojis
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const newEmoji = {
          id: Date.now() + i,
          emoji: floatingEmojisList[Math.floor(Math.random() * floatingEmojisList.length)],
          x: 50,
          y: 50,
          delay: 0,
        }
        setFloatingEmojis((prev) => [...prev, newEmoji])
      }, i * 100)
    }

    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleWordClick = (index: number) => {
    setScore((prev) => prev + 5)
    setCurrentWord(index)
    setCatMood(['happy', 'excited', 'lovey'][Math.floor(Math.random() * 3)])

    // Change cat emoji when word clicked
    const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)]
    setCurrentCatEmoji(randomCat)
  }

  const handleEmojiClick = (emoji: string) => {
    setScore((prev) => prev + 1)
    const newEmoji = {
      id: Date.now(),
      emoji,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: 0,
    }
    setFloatingEmojis((prev) => [...prev, newEmoji])
  }

  const resetGame = () => {
    setScore(0)
    setCatMood('happy')
    setCatMessage(catMessages[0])
    setCurrentCatEmoji('🐱')
    setShowFunFact(false)
  }

  const handleGenerateCat = async () => {
    setIsGeneratingCat(true)
    try {
      // Random cute cats - engineer cat, bucin cat, cute cat, etc.
      const prompts = [
        "A super cute cat with big sparkly eyes, anime style, pastel colors, digital art, high quality",
        "Adorable fluffy cat playing with toys, cartoon style, vibrant colors, cute expression, high quality",
        "Chubby cat with round face, anime style, cute pose, soft lighting, pastel background, high quality",
        "Tiny cat with giant eyes, chibi art style, adorable expression, colorful background, high quality",
        "Happy cat jumping in the air, cartoon style, motion blur, dynamic pose, high quality",
        "Cute cat as scientist with beaker, anime style, laboratory setting, vibrant colors, high quality",
        "Beautiful cat with flowing fur and sparkles, artistic style, elegant, soft colors, high quality",
        "Playful cat astronaut floating with stars in space, chibi art, dreamy expression, high quality",
        "Cute engineer cat wearing tiny glasses and holding a tiny wrench, chibi art style, adorable, high quality",
        "Happy cat playing with mechanical gears, cartoon style, cute and playful, mechanical theme, high quality",
      ]
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]

      const response = await fetch('/api/generate-cat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: randomPrompt,
          filename: `cat-${Date.now()}.png`,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setGeneratedCatImage(data.imageUrl)
        setScore((prev) => prev + 50)
        setCatMood('excited')
        setCatMessage('CIPA! Gambar kucing baru! 🐱⚡')

        // Change cat emoji
        const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)]
        setCurrentCatEmoji(randomCat)
      }
    } catch (error) {
      console.error('Error generating cat:', error)
      setCatMessage('Error generating cat! 😿')
    } finally {
      setIsGeneratingCat(false)
    }
  }

  const handleFunFact = () => {
    const randomFact = catFunFacts[Math.floor(Math.random() * catFunFacts.length)]
    setCurrentFunFact(randomFact)
    setShowFunFact(true)
    setScore((prev) => prev + 15)

    // Change cat emoji
    const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)]
    setCurrentCatEmoji(randomCat)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-cyan-100 to-purple-100 dark:from-pink-900 dark:via-cyan-900 dark:to-purple-900 overflow-hidden">
      {/* Floating Emojis Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingEmojis.map((item) => (
          <div
            key={item.id}
            className="absolute text-4xl animate-float cursor-pointer pointer-events-auto hover:scale-150 transition-transform duration-300 select-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.delay}s`,
            }}
            onClick={() => handleEmojiClick(item.emoji)}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            🐱 CIPA WORLD ⚡
          </h1>
          <div className="flex items-center gap-4">
            <Card className="px-4 py-2 bg-gradient-to-r from-pink-200 to-cyan-200 dark:from-pink-700 dark:to-cyan-700">
              <span className="text-lg md:text-xl font-bold text-pink-800 dark:text-cyan-200">
                🎮 Score: {score}
              </span>
            </Card>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-8 md:gap-12">
        {/* Giant Cat - TONS of emojis! */}
        <div className="relative">
          <div
            onClick={handleCatClick}
            className={`text-8xl md:text-[12rem] lg:text-[16rem] cursor-pointer select-none transition-all duration-300 ${
              isAnimating ? 'animate-bounce scale-125' : 'hover:scale-110'
            } drop-shadow-2xl`}
          >
            {currentCatEmoji}
          </div>
          <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 animate-ping">
            <span className="text-3xl md:text-5xl">⚡</span>
          </div>
          {isAnimating && (
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
              <span className="text-4xl md:text-6xl">✨</span>
            </div>
          )}
        </div>

        {/* Cat Message Bubble */}
        <Card className="relative max-w-md w-full p-6 md:p-8 bg-gradient-to-br from-white to-pink-50 dark:from-pink-800 dark:to-purple-800 shadow-2xl border-4 border-pink-300 dark:border-cyan-400">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent border-b-pink-300 dark:border-b-cyan-400"></div>
          </div>
          <p className="text-center text-xl md:text-2xl font-bold text-pink-700 dark:text-cyan-200 animate-fade-in">
            {catMessage}
          </p>
        </Card>

        {/* Fun Words Grid - 3 buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 max-w-3xl w-full items-center justify-center">
          {funnyWords.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleWordClick(index)}
              className={`${item.color} hover:scale-110 active:scale-95 transition-all duration-300 text-xl md:text-3xl font-bold text-white shadow-lg hover:shadow-xl px-8 md:px-12 py-6 md:py-8`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <span className="text-4xl md:text-5xl mr-3">{item.emoji}</span>
              {item.word}
            </Button>
          ))}
        </div>

        {/* Mini Games Section */}
        <Card className="max-w-4xl w-full p-6 md:p-8 bg-gradient-to-br from-pink-100 to-cyan-100 dark:from-pink-800 dark:to-cyan-800 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-pink-800 dark:text-cyan-200">
            ⚡ Cute Mini Games! ⚡
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Button
              onClick={() => {
                setScore((prev) => prev + 20)
                setCatMood('excited')
                setCatMessage('XIYAP! Kamu hebat! ⚡✨')

                // Change cat emoji
                const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)]
                setCurrentCatEmoji(randomCat)
              }}
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-lg md:text-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 md:p-8 h-auto"
            >
              <span className="text-4xl md:text-5xl mr-3">🎀</span>
              <div className="text-left">
                <div className="text-xl md:text-2xl">Lucky Spin</div>
                <div className="text-sm opacity-90">+20 Points</div>
              </div>
            </Button>
            <Button
              onClick={() => {
                const bonus = Math.floor(Math.random() * 30) + 10
                setScore((prev) => prev + bonus)
                setCatMood('lovey')
                setCatMessage(`CIPA! Kamu dapat ${bonus} poin! ⚡🎯`)

                // Change cat emoji
                const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)]
                setCurrentCatEmoji(randomCat)
              }}
              className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-lg md:text-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 md:p-8 h-auto"
            >
              <span className="text-4xl md:text-5xl mr-3">🎁</span>
              <div className="text-left">
                <div className="text-xl md:text-2xl">Mystery Box</div>
                <div className="text-sm opacity-90">+10-40 Points</div>
              </div>
            </Button>
            <Button
              onClick={handleFunFact}
              className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-lg md:text-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 md:p-8 h-auto"
            >
              <span className="text-4xl md:text-5xl mr-3">📚</span>
              <div className="text-left">
                <div className="text-xl md:text-2xl">Fun Fact</div>
                <div className="text-sm opacity-90">+15 Points</div>
              </div>
            </Button>
          </div>

          {/* Fun Fact Display */}
          {showFunFact && (
            <Card className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-800 dark:to-orange-800 border-4 border-yellow-300 dark:border-orange-600">
              <p className="text-center text-lg md:text-xl font-bold text-orange-800 dark:text-yellow-200 animate-fade-in">
                📚 {currentFunFact}
              </p>
            </Card>
          )}
        </Card>

        {/* Mood Indicator */}
        <Card className="max-w-md w-full p-4 md:p-6 bg-gradient-to-r from-pink-100 to-cyan-100 dark:from-pink-700 dark:to-cyan-700">
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-pink-800 dark:text-cyan-200 mb-2">
              Kucing Mode: {catMood.toUpperCase()} ⚡
            </div>
            <div className="text-4xl md:text-6xl animate-bounce">
              {catMood === 'happy' && '😺'}
              {catMood === 'excited' && '🥳'}
              {catMood === 'lovey' && '😻'}
            </div>
          </div>
        </Card>

        {/* Generated Cat Image Section */}
        <Card className="max-w-2xl w-full p-6 md:p-8 bg-gradient-to-br from-pink-50 to-cyan-50 dark:from-pink-800 dark:to-cyan-800 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-pink-800 dark:text-cyan-200">
            🎨 Generate Random Cute Cat! 🐱⚡
          </h2>

          {generatedCatImage && (
            <div className="mb-6 relative">
              <img
                src={generatedCatImage}
                alt="Generated Cute Cat"
                className="w-full rounded-2xl shadow-lg animate-fade-in"
              />
              <div className="absolute -top-2 -right-2 animate-bounce">
                <span className="text-4xl">⚡</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleGenerateCat}
            disabled={isGeneratingCat}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-lg md:text-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 md:p-8"
          >
            {isGeneratingCat ? (
              <>
                <span className="text-4xl md:text-5xl mr-3 animate-spin">🐱</span>
                <div className="text-left">
                  <div className="text-xl md:text-2xl">Generating...</div>
                  <div className="text-sm opacity-90">Sabar ya! ⚡✨</div>
                </div>
              </>
            ) : (
              <>
                <span className="text-4xl md:text-5xl mr-3">✨</span>
                <div className="text-left">
                  <div className="text-xl md:text-2xl">Generate Cute Cat</div>
                  <div className="text-sm opacity-90">+50 Points</div>
                </div>
              </>
            )}
          </Button>
        </Card>

        {/* Reset Button */}
        <Button
          onClick={resetGame}
          variant="outline"
          className="px-8 py-4 text-lg font-bold border-4 border-pink-300 hover:border-pink-500 dark:border-pink-600 dark:hover:border-cyan-400"
        >
          🔄 Reset Game
        </Button>
      </main>

      {/* Footer - Sticky to bottom */}
      <footer className="relative z-10 mt-auto bg-gradient-to-r from-pink-200 via-cyan-200 to-purple-200 dark:from-pink-800 dark:via-cyan-800 dark:to-purple-800 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-lg md:text-2xl font-bold text-pink-800 dark:text-cyan-200 mb-2">
            CIPA CEOLANG CAT LOVER 🐱⚡
          </div>
          <p className="text-sm md:text-base text-pink-700 dark:text-cyan-300">
            Built with ⚡ for CIPA! 🚀
          </p>
          <div className="flex justify-center gap-2 mt-3">
            {['😺', '😸', '😹', '😻', '⚡', '✨'].map((emoji, i) => (
              <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-bounce,
          .animate-ping,
          .animate-pulse,
          .animate-fade-in {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
