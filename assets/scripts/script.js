document.addEventListener("DOMContentLoaded", () => {
  // Daftar hero yang Anda berikan
  const heroMobileLegends = [
    "Alice",
    "Akai",
    "Alucard",
    "Aldous",
    "Alpha",
    "Angela",
    "Argus",
    "Arlott",
    "Atlas",
    "Aulus",
    "Aurora",
    "Aamon",
    "Baxia",
    "Badang",
    "Bane",
    "Balmond",
    "Barats",
    "Belerick",
    "Benedetta",
    "Beatrix",
    "Brody",
    "Bruno",
    "Carmilla",
    "Cecilion",
    "Chang'e",
    "Chip",
    "Chou",
    "Claude",
    "Clint",
    "Cyclops",
    "Cici",
    "Diggie",
    "Dyrroth",
    "Edith",
    "Esmeralda",
    "Estes",
    "Eudora",
    "Fanny",
    "Faramis",
    "Floryn",
    "Franco",
    "Fredrinn",
    "Freya",
    "Gatotkaca",
    "Gloo",
    "Gord",
    "Granger",
    "Grock",
    "Guinevere",
    "Gusion",
    "Hanabi",
    "Hanzo",
    "Harith",
    "Harley",
    "Hayabusa",
    "Helcurt",
    "Hilda",
    "Hylos",
    "Irithel",
    "Ixia",
    "Jawhead",
    "Johnson",
    "Joy",
    "Julian",
    "Kadita",
    "Kagura",
    "Kaja",
    "Karina",
    "Karrie",
    "Khaleed",
    "Khufra",
    "Kimmy",
    "Lancelot",
    "Lapu-Lapu",
    "Layla",
    "Leomord",
    "Lesley",
    "Ling",
    "Lolita",
    "Luo Yi",
    "Lunox",
    "Lylia",
    "Martis",
    "Masha",
    "Mathilda",
    "Melissa",
    "Minotaur",
    "Minsitthar",
    "Miya",
    "Moskov",
    "Nana",
    "Natalia",
    "Natan",
    "Nolan",
    "Novaria",
    "Odette",
    "Paquito",
    "Pharsa",
    "Phoveus",
    "Popol and Kupa",
    "Rafaela",
    "Roger",
    "Ruby",
    "Saber",
    "Selena",
    "Silvanna",
    "Sun",
    "Terizla",
    "Thamuz",
    "Tigreal",
    "Uranus",
    "Valentina",
    "Vale",
    "Valir",
    "Vexana",
    "Wanwan",
    "X.Borg",
    "Xavier",
    "Yi Sun-shin",
    "Yin",
    "Yu Zhong",
    "Yve",
    "Zhask",
    "Zilong",
    "Zhuxin",
  ];

  const roles = ["JUNGLER", "EXP LANE", "GOLD LANE", "ROAM", "MID LANE"];
  const reelsContainer = document.querySelector(".reels");
  const spinButton = document.getElementById("spin-button");
  const resultDisplay = document.querySelector("#result-display p");

  // Fungsi untuk mengacak urutan hero (penting untuk tampilan visual putaran)
  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  // Mengisi setiap kolom dengan daftar hero yang sudah diacak
  function populateReels() {
    roles.forEach((role) => {
      // Buat wrapper untuk label dan reel
      const reelWrapper = document.createElement("div");
      reelWrapper.classList.add("reel-wrapper");

      // Buat label
      const label = document.createElement("div");
      label.classList.add("reel-label");
      label.textContent = role;

      // Buat reel
      const reel = document.createElement("div");
      reel.classList.add("reel");

      const heroesContainer = document.createElement("div");
      heroesContainer.classList.add("heroes-container");

      // Acak daftar hero untuk visual putaran yang berbeda di tiap kolom
      const shuffledHeroes = shuffleArray(heroMobileLegends);

      // Gandakan daftar hero agar reel terlihat panjang
      for (let i = 0; i < 5; i++) {
        shuffledHeroes.forEach((hero) => {
          const heroElement = document.createElement("div");
          heroElement.classList.add("hero");
          heroElement.textContent = hero;
          heroesContainer.appendChild(heroElement);
        });
      }

      reel.appendChild(heroesContainer);
      reelWrapper.appendChild(label);
      reelWrapper.appendChild(reel);
      reelsContainer.appendChild(reelWrapper);
    });
  }

  // *** FUNGSI UTAMA UNTUK MEMUTAR ***
  function spin() {
    spinButton.disabled = true;
    resultDisplay.textContent = "Memilih tim...";

    // --- LOGIKA BARU: Pilih 5 hero unik SEKARANG ---
    const availableHeroes = [...heroMobileLegends];
    const finalTeam = [];
    for (let i = 0; i < roles.length; i++) {
      const randomIndex = Math.floor(Math.random() * availableHeroes.length);
      const chosenHero = availableHeroes.splice(randomIndex, 1)[0];
      finalTeam.push(chosenHero);
    }
    // Sekarang `finalTeam` berisi 5 hero yang DIJAMIN unik.

    const reels = document.querySelectorAll(".reel");
    reels.forEach((reel, index) => {
      const heroesContainer = reel.querySelector(".heroes-container");
      const heroHeight = 120; // Sesuai dengan CSS
      const heroesInThisReel = Array.from(heroesContainer.children).map(
        (h) => h.textContent
      );

      // Cari posisi hero yang sudah kita tentukan (`finalTeam[index]`) di dalam reel ini.
      // Kita cari di dalam 1 putaran saja (daftar hero asli)
      const targetHero = finalTeam[index];
      const targetIndex = heroesInThisReel
        .slice(0, heroMobileLegends.length)
        .indexOf(targetHero);

      // Hitung total perputaran (ilusi)
      const spinCycles = 5 + index; // Berapa kali 'berputar penuh'
      const randomOffset = targetIndex * heroHeight;
      const totalSpinHeight =
        spinCycles * heroMobileLegends.length * heroHeight + randomOffset;

      // Atur transisi
      const spinDuration = 3 + index * 0.5; // Durasi berbeda tiap reel
      heroesContainer.style.transition = `transform ${spinDuration}s cubic-bezier(0.33, 1, 0.68, 1)`;
      heroesContainer.style.transform = `translateY(-${totalSpinHeight}px)`;

      // Listener untuk saat transisi selesai
      heroesContainer.addEventListener(
        "transitionend",
        () => {
          heroesContainer.style.transition = "none";
          const finalPosition = -(targetIndex * heroHeight);
          heroesContainer.style.transform = `translateY(${finalPosition}px)`;

          // Tampilkan hasil jika ini adalah reel terakhir yang berhenti
          if (index === roles.length - 1) {
            spinButton.disabled = false;
            resultDisplay.textContent = finalTeam.join(" - ");
          }
        },
        { once: true }
      );
    });
  }

  // Jalankan semuanya
  populateReels();
  spinButton.addEventListener("click", spin);
});
