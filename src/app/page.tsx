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
  // cats & cat vibes
  "🐱","🐈","🐈‍⬛","😺","😸","😹","😻","😼","🙀","😿","😾","😽","🐾",

  // dogs & canines
  "🐶","🐕","🐕‍🦺","🦮","🐺",

  // big cats
  "🦁","🐯","🐅","🐆",

  // small mammals
  "🐭","🐹","🐰","🐇","🐿️","🦔","🦫",

  // bears & friends
  "🐻","🐻‍❄️","🐼","🐨",

  // farm & land animals (NO PIG)
  "🐮","🐂","🐃","🐄","🐑","🐐","🦙","🐴","🦄","🦌","🦒","🦏","🦛","🦘",

  // primates
  "🐵","🙈","🙉","🙊","🐒",

  // birds
  "🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦜","🦢","🦩",

  // ocean animals
  "🐳","🐋","🐬","🦭","🦦","🐟","🐠","🐡","🦈","🐙","🦑","🦐","🦞","🦀",

  // reptiles & amphibians
  "🐢","🐍","🦎","🐊","🐸",

  // insects & small creatures
  "🦋","🐝","🐞","🪲","🐜","🦗","🕷️","🕸️","🦂",

  // fantasy / extinct
  "🐲","🐉","🦕","🦖","🦄",
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
  "km tau ga kucing bisa tidur sampe 16 jam sehari 😴🐱",
  "btw kucing bisa ngabisin 70% waktunya buat tidur 😴⚡",
  "eh serius, kucing dewasa lebih demen tidur sendiri daripada rame rame 😴🐱",
  "kucing tuh bisa tidur sambil satu mata kebuka tauu 😺👁️",
  "random fact, posisi tidur kucing itu bisa aneh aneh banget 😴🐱",
  "ngomong-ngomong, kucing suka tidur di tempat tinggi biar berasa aman 🏠🐱",
  "ga nyangka kan, kucing bisa tidur sambil duduk 😴🪑",
  "btw kalo ujan atau dingin, kucing makin hobi molor 🌧️😴",
  "km tau gasih anak kucing tidur hampir 90% waktunya 🐱💤",
  "eh iya, pas tidur kucing juga bisa REM alias mimpi 💭😺",
  "kucing tuh bisa ketiduran kurang dari 1 menit, auto off ⏱️😴",
  "btw kucing sering tidur di keyboard karena hangat banget ⌨️🐱",

  // === ANATOMI & FISIK ===
  "km tau ga kucing punya 230 tulang, lebih banyak dari manusia 🦴⚡",
  "btw jari kucing itu 5 di depan, 4 di belakang 🐾🔢",
  "eh serius, kucing punya 3 kelopak mata loh 👁️👁️👁️",
  "kucing tuh giginya ada 30, lengkap juga 🦷⚡",
  "random fact, hidung kucing itu unik kayak sidik jari manusia 👃🔍",
  "btw kucing punya organ tambahan di hidung buat deteksi bau 👃⚡",
  "eh iya, mata kucing bisa mantulin cahaya pas gelap 👁️✨",
  "kucing tuh ada jari yang bisa kayak memanjang gitu buat mancing 🐾🎣",
  "ga nyangka, kucing ga punya tulang selangka jadi bisa nyelip ke lubang kecil 🦴🕳️",
  "btw jantung kucing detaknya 2x lebih cepet dari manusia ❤️⚡",
  "km tau ga kumis kucing selebar badannya buat ngukur ruang 🐱📏",
  "eh serius, kumis kucing bisa 24 helai dan rapi 4 baris 🐱✨",
  "btw telinga kucing bisa muter 180 derajat 👂🔄",
  "kucing tuh punya 32 otot di tiap telinga, gila detail 👂💪",
  "random fact, lidah kucing kasar kayak amplas buat bersihin bulu 👅🧹",
  "eh iya, rahang kucing ga bisa digerakin ke samping 🐱🚫",
  "btw otak kucing katanya mirip 90% sama otak manusia 🧠⚡",
  "kucing tuh tulang punggungnya super fleksibel 🦴🔄",
  "eh serius, cakarnya bisa ditarik masuk biar tetep tajem 🐾⚡",
  "btw kucing jalannya pake jari kaki, bukan telapak 🐾👣",
  "random fact, bulu kucing tumbuh sekitar 0.5mm per hari 🐱📈",
  "km tau gasih mata kucing punya lapisan reflektif namanya tapetum lucidum 👁️✨",

  // === KEMAMPUAN & SKILL ===
  "eh serius, kucing bisa muter 180 derajat pas jatuh 🔄🐱",
  "btw penglihatan kucing di gelap itu 6x lebih bagus dari manusia 👁️🌙",
  "km tau ga kucing bisa lompat sampe 6x tinggi badannya 🦘🐱",
  "kucing tuh pendengarannya tajem banget 👂🔊",
  "random fact, kucing bisa lari 30 mph alias 48 km/jam 🏃🐱",
  "eh iya, kucing bisa ngeh gerakan kecil sekecil kecilnya 👁️🎯",
  "btw kucing kadang bisa ngerasain gempa sebelum kejadian 🌍⚡",
  "kucing tuh balance nya gila, anti oleng ⚖️🐱",
  "ga nyangka, dari posisi diem duduk pun bisa langsung lompat 🦘⚡",
  "eh serius, refleks kucing itu cepet banget ⚡🐱",
  "btw kucing bisa jalan super senyap, ninja mode 🤫🐱",
  "km tau ga dari lantai ke meja tuh gampang banget buat mereka 🪑🐱",
  "random fact, beberapa kucing sebenernya bisa berenang 🏊🐱",
  "eh iya, kucing bisa denger suara ultrasonic yang manusia ga denger 🔊👂",
  "btw kucing bisa nyium perubahan cuaca juga katanya 🌤️🐱",
  "kucing tuh bisa nemuin jalan pulang dari jarak jauh 🏠🧭",
  "km tau ga kucing bisa lompat sampe 2.5 meter 📏🦘",
  "eh serius, larinya bisa lebih cepet dari Usain Bolt 🏃⚡",
  "btw kucing bisa denger dari jarak 4x lebih jauh dari manusia 👂📡",
  "random fact, kucing lebih jelas lihat warna biru sama hijau 👁️🌈",
  "kucing tuh field of view nya sekitar 200 derajat 👁️🔭",

  // === PERILAKU & KEBIASAAN ===
  "btw kucing tuh grooming bisa 30-50% waktunya, sibuk banget 🧴🐱",
  "eh iya, kucing nandain wilayah dengan nggosok kepala 🐱📍",
  "km tau ga ekor kucing itu bahasa juga, buat komunikasi 🐱💬",
  "kucing tuh suka ngubur kotorannya di tempat bersih 🧹🐱",
  "random fact, kucing tetep berburu walau ga lapar 🎯🐱",
  "btw kucing lebih suka kardus daripada mainan mahal, real 📦🐱",
  "eh serius, ekor goyang bisa artinya seneng atau kesel 🐱💬",
  "kucing tuh suka nguleni pake cakar pas lagi hepi 🐾😺",
  "btw kucing nggosok wajah ke benda itu tandain kepemilikan 🐱🏷️",
  "km tau ga kucing suka bawa hadiah hasil buruan ke kamu 🎁🐭",
  "eh iya, kucing seneng mantengin burung dari jendela 🪟🐦",
  "random fact, kucing suka jatoh-jatohin barang buat eksperimen 📱💥",
  "btw kucing kadang ngoceh pas liat mangsa di luar jendela 😺🐦",
  "kucing tuh bisa ngejar laser pointer sampe lupa waktu 🔴🐱",
  "eh serius, kucing suka ngumpet di tempat sempit 🕳️🐱",
  "btw mereka demen ngawasin dari tempat tinggi, berasa boss 🏔️👁️",
  "km tau ga kucing suka gigit tangan pas main, gemes mode 🐾😸",
  "random fact, kucing sering tidur di laptop karena hangat dan deket kamu 💻🐱",
  "eh iya, kucing nunjukin perut itu tanda percaya 🐱❤️",
  "btw slow-blink kucing itu tanda sayang 😺💕",
  "kucing tuh suka ngikutin kamu ke kamar mandi, ngawal 🚽🐱",

  // === KOMUNIKASI & SUARA ===
  "km tau ga purring itu buat nenangin diri sendiri juga 😺🎵",
  "btw kucing dewasa biasanya ngeongnya ke manusia, bukan ke kucing lain 😺💬",
  "eh serius, nada ngeong kucing beda beda artinya 🎵😺",
  "random fact, kucing bisa bikin 100 jenis suara 🎵😺",
  "btw kucing bisa ngenalin suara namanya sendiri 🔊🐱",
  "kucing tuh bisa ngenalin suara langkah kaki yang familiar 👣⚡",
  "eh iya, kucing cenderung lebih suka suara rendah daripada tinggi 🔊⚡",
  "btw kucing bisa ngerti lebih dari 20 kata kata 💬🐱",
  "km tau gasih purring punya frekuensi yang katanya bantu tulang pulih 🎵🦴",
  "eh serius, kucing ngeong lebih sering ke manusia daripada sesama kucing 😺👤",
  "btw ada kucing yang niru suara bayi biar kamu perhatian 👶🐱",
  "kucing tuh bisa mendesis mirip ular buat pertahanan 🐍😾",
  "random fact, pas kawin kucing bisa teriak kayak bayi 😺📢",
  "eh iya, kucing bisa purr pas bahagia dan pas stres juga 🎵😺",

  // === INDERA & PERSEPSI ===
  "btw kucing tuh ga bisa ngerasain manis 🚫🍯",
  "eh serius, kucing biasanya ga suka bau jeruk 🍊🚫",
  "km tau ga kucing lebih milih air bersih daripada air kotor 💧🐱",
  "btw kucing bisa baca ekspresi muka manusia 😺👤",
  "kucing tuh bisa ngerasain mood kamu juga 🧠⚡",
  "eh iya, banyak kucing ga suka bau mint sama eucalyptus 🌿🚫",
  "random fact, penciuman kucing 14x lebih tajem dari manusia 👃⚡",
  "btw kucing ga bisa lihat persis di bawah hidungnya 👁️🚫",
  "km tau gasih kucing lebih suka makan di piring datar daripada mangkuk dalem 🍽️🐱",
  "eh serius, kucing ga suka kumisnya nyentuh pinggir mangkuk 🐱❌",
  "btw kucing bisa ngerasain perubahan tekanan udara 🌪️🐱",
  "kucing tuh sensitif banget sama suara frekuensi tinggi 🔊👂",

  // === KECERDASAN & MEMORI ===
  "km tau ga memori kucing itu bagus banget 🧠⚡",
  "btw kucing bisa inget lokasi makanan sampe 16 jam 🍽️🧠",
  "eh iya, kucing bisa belajar buka pintu 🚪🐱",
  "random fact, ada kucing yang bisa belajar nyalain keran 🚿😺",
  "btw kucing bisa ngenalin wajah pemiliknya 👤❤️",
  "kucing tuh memori jangka pendeknya sekitar 16 jam 🧠⏰",
  "eh serius, kucing bisa dilatih kayak anjing asal sabar 🎓🐱",
  "btw kucing bisa mecahin puzzle sederhana 🧩😺",
  "km tau ga kucing bisa belajar nama mainannya 🧸🐱",
  "eh iya, pengalaman traumatis bisa keinget lama banget sama kucing 🧠⚠️",

  // === FAKTA UNIK & MENARIK ===
  "random fact, kucing jantan lebih sering kidal daripada betina 🐱⬅️",
  "btw kucing tertua pernah hidup sampe 38 tahun 🎂🐱",
  "km tau gasih kucing pertama ke luar angkasa namanya Félicette 🚀🐱",
  "eh iya, kucing calico hampir selalu betina 🐱♀️",
  "btw kucing oranye kebanyakan jantan, sekitar 80% 🧡🐱",
  "kucing hitam di Jepang malah dianggap bawa hoki 🐈‍⬛🍀",
  "eh serius, sidik hidung kucing itu unik kayak manusia 👃🔍",
  "btw grup kucing itu disebut clowder 🐱🐱🐱",
  "random fact, ada kucing yang alergi sama manusia 🤧🐱",
  "km tau ga kucing susah turun pohon karena arah cakarnya 🌳🐱",
  "btw kucing ngabisin 2/3 hidupnya buat tidur 😴📊",
  "eh iya, kucing domestik asalnya dari Timur Tengah sekitar 10.000 tahun lalu 🏛️🐱",
  "random fact, pernah ada kucing jadi walikota di Alaska 20 tahun 🏛️😺",
  "btw kucing bisa minum air laut karena ginjalnya bisa nyaring garam 🌊🐱",
  "km tau gasih Isaac Newton yang nemuin pintu kucing cat flap 🚪🧑‍🔬",
  "eh serius, seumur hidup kucing bisa grooming sampe 10.950 jam 🧴⏰",

  // === HUBUNGAN DENGAN MANUSIA ===
  "btw kucing biasanya milih satu manusia favorit ❤️🐱",
  "eh iya, kucing bisa ngerasain pas kamu lagi sakit 🏥😺",
  "km tau ga kucing suka tidur deket kepala buat bonding 😴❤️",
  "random fact, kucing nganggep manusia itu kucing gede tapi canggung 🐱👤",
  "btw kucing bisa cemburu sama hewan lain 😾💚",
  "eh serius, kucing sering lebih suka orang yang ga terlalu ngejar dia 😺🤷",
  "btw kucing bisa ngenalin mobil pemiliknya dari suara mesin 🚗👂",
  "km tau gasih punya kucing katanya bisa nurunin risiko serangan jantung ❤️🐱",
  "eh iya, kucing bisa bikin stres kamu turun 😌🐱",
  "btw ada kucing yang bisa ngerasain kamu hamil 🤰😺",

  // === KESEHATAN & ADAPTASI ===
  "random fact, kucing bisa tahan tanpa air lebih lama dari unta 🐪💧",
  "btw kucing bisa muter telinga kiri kanan sendiri sendiri 👂🔄",
  "eh iya, kucing ga keringetan kayak manusia 🐱💦",
  "btw kucing keringetnya cuma lewat bantalan kaki 🐾💧",
  "km tau ga purring bisa bantu pemulihan luka lebih cepet 🎵🩹",
  "eh serius, satu litter bisa punya ayah beda beda 🐱👶",
  "btw kucing bisa hamil lagi pas masih nyusuin 🍼🐱",
  "random fact, umur rata rata kucing 12-18 tahun 📅🐱",
  "btw kucing indoor biasanya lebih awet daripada outdoor 🏠⏰",
  "eh iya, pas sakit kucing bisa tidur 18-20 jam buat recovery 😴🩺",
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

  const [remainingFacts, setRemainingFacts] = useState(() => [...catFunFacts])

  const handleFunFact = () => {
    setRemainingFacts((prev) => {
      // kalau habis, reset lagi (kalau kamu mau stop total, ganti return prev)
      if (prev.length === 0) return [...catFunFacts]

      const idx = Math.floor(Math.random() * prev.length)
      const chosen = prev[idx]

      setCurrentFunFact(chosen) 
      setShowFunFact(true)
      setScore((s) => s + 15)

      // hapus yang kepilih supaya ga mungkin kepilih lagi
      return prev.filter((_, i) => i !== idx)
    })
  }


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
