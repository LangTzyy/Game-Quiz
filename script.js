// Data kuis berdasarkan level
const quizData = {

    pelajar: [
        {
            question: "Apa warna dasar bendera Indonesia?",
            options: ["Merah dan Putih", "Merah dan Kuning", "Hijau dan Putih", "Biru dan Putih"],
            answer: 0
        },
        {
            question: "Hari Kemerdekaan Indonesia diperingati setiap tanggal?",
            options: ["1 Juni", "10 November", "17 Agustus", "28 Oktober"],
            answer: 2
        },
        {
            question: "Suku bangsa asli Papua adalah?",
            options: ["Betawi", "Dayak", "Asmat", "Bugis"],
            answer: 2
        },
        {
            question: "Monas berada di kota?",
            options: ["Bandung", "Jakarta", "Surabaya", "Medan"],
            answer: 1
        },
        {
            question: "Siapakah presiden kedua Indonesia?",
            options: ["B.J. Habibie", "Megawati", "Soeharto", "Gus Dur"],
            answer: 2
        },
        {
            question: "Simbol negara Indonesia adalah?",
            options: ["Harimau", "Garuda Pancasila", "Singa", "Bambu Runcing"],
            answer: 1
        },
        {
            question: "Pulau dengan penduduk terbanyak di Indonesia adalah?",
            options: ["Sumatera", "Bali", "Jawa", "Kalimantan"],
            answer: 2
        },
        {
            question: "Bahasa resmi Indonesia adalah?",
            options: ["Jawa", "Sunda", "Melayu", "Bahasa Indonesia"],
            answer: 3
        },
        {
            question: "Hari Pahlawan diperingati setiap?",
            options: ["17 Agustus", "21 April", "10 November", "2 Mei"],
            answer: 2
        },
        {
            question: "Pahlawan wanita dari Jepara adalah?",
            options: ["Cut Nyak Dhien", "R.A. Kartini", "Dewi Sartika", "Martha Christina Tiahahu"],
            answer: 1
        }
    ],

    mahasiswa: [
        {
            question: "Apa fungsi Mahkamah Konstitusi di Indonesia?",
            options: ["Membuat undang-undang", "Menangani korupsi", "Mengadili sengketa konstitusi", "Mengatur kebijakan fiskal"],
            answer: 2
        },
        {
            question: "UUD 1945 disahkan pertama kali pada?",
            options: ["17 Agustus 1945", "18 Agustus 1945", "1 Juni 1945", "27 Oktober 1945"],
            answer: 1
        },
        {
            question: "Apa nama lambang negara Indonesia?",
            options: ["Pancasila", "Burung Rajawali", "Garuda Pancasila", "Saka Merah Putih"],
            answer: 2
        },
        {
            question: "Jumlah provinsi di Indonesia per 2024 adalah?",
            options: ["34", "35", "36", "38"],
            answer: 3
        },
        {
            question: "Konferensi Asia Afrika 1955 diadakan di kota?",
            options: ["Yogyakarta", "Jakarta", "Bandung", "Surabaya"],
            answer: 2
        },
        {
            question: "Siapakah penulis naskah proklamasi kemerdekaan?",
            options: ["Moh. Hatta", "Sukarno", "Ahmad Subardjo", "Sutan Sjahrir"],
            answer: 2
        },
        {
            question: "Apa nama sidang yang melahirkan Pancasila?",
            options: ["BPUPKI", "PPKI", "KNIP", "MPRS"],
            answer: 0
        },
        {
            question: "Universitas tertua di Indonesia adalah?",
            options: ["UI", "UGM", "ITB", "Universitas Indonesia"],
            answer: 0
        },
        {
            question: "Siapa tokoh reformasi Indonesia tahun 1998?",
            options: ["B.J. Habibie", "Soeharto", "Megawati", "Amien Rais"],
            answer: 3
        },
        {
            question: "Apa nama sistem pemerintahan Indonesia?",
            options: ["Monarki Parlementer", "Demokrasi Liberal", "Republik Presidensial", "Federal"],
            answer: 2
        }
    ]

};

// Variabel game
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timer;
let timeLeft = 30;
let questions = [];
let level = '';
let username = localStorage.getItem('playerName') || 'Player';

// Elemen DOM
const loginScreen = document.getElementById('loginScreen');
const loadingScreen = document.getElementById('loadingScreen');
const levelScreen = document.getElementById('levelScreen');
const quizScreen = document.getElementById('quizScreen');
const winScreen = document.getElementById('winScreen');
const loseScreen = document.getElementById('loseScreen');
const notification = document.getElementById('notification');

// Form Login
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('usernameError');

// Audio Elements
const tingSound = document.getElementById('tingSound');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');

// Loading Screen
const usernameDisplay = document.getElementById('usernameDisplay');
const progressBar = document.getElementById('progressBar');
const loadingText = document.getElementById('loadingText');

// Level Screen
const pelajarLevel = document.getElementById('pelajarLevel');
const mahasiswaLevel = document.getElementById('mahasiswaLevel');
const backToLogin = document.getElementById('backToLogin');

// Quiz Screen
const quizUsername = document.getElementById('quizUsername');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const currentQuestionDisplay = document.getElementById('currentQuestion');
const totalQuestionsDisplay = document.getElementById('totalQuestions');
const scoreDisplay = document.getElementById('scoreDisplay');
const quizProgress = document.getElementById('quizProgress');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const timerDisplay = document.getElementById('timer');
const levelIndicator = document.getElementById('levelIndicator');
const currentLevel = document.getElementById('currentLevel');
const soekarnoImage = document.getElementById('soekarnoImage');

// Win Screen
const winUsername = document.getElementById('winUsername');
const finalScore = document.getElementById('finalScore');
const playAgainWin = document.getElementById('playAgainWin');
const backToLevelWin = document.getElementById('backToLevelWin');
const winLevelBadge = document.getElementById('winLevelBadge');

// Lose Screen
const loseUsername = document.getElementById('loseUsername');
const loseScore = document.getElementById('loseScore');
const tryAgain = document.getElementById('tryAgain');
const backToLevelLose = document.getElementById('backToLevelLose');
const loseLevelBadge = document.getElementById('loseLevelBadge');

// Event Listeners
// loginForm.addEventListener('submit', handleLogin);

window.addEventListener('load', () => {
    levelScreen.classList.remove('hidden');
});


pelajarLevel.addEventListener('click', () => {
    playTingSound();
    Swal.fire({
        title: 'Level Pelajar Dipilih!',
        text: 'Anda akan menjawab pertanyaan untuk tingkat pelajar',
        icon: 'info',
        confirmButtonText: 'Mulai Kuis'
    }).then(() => {
        startGame('pelajar');
    });
});

mahasiswaLevel.addEventListener('click', () => {
    playTingSound();
    Swal.fire({
        title: 'Level Mahasiswa Dipilih!',
        text: 'Anda akan menjawab pertanyaan untuk tingkat mahasiswa',
        icon: 'info',
        confirmButtonText: 'Mulai Kuis'
    }).then(() => {
        startGame('mahasiswa');
    });
});

backToLogin.addEventListener('click', () => {
    window.location.href = 'index.html';
});
prevButton.addEventListener('click', prevQuestion);
nextButton.addEventListener('click', nextQuestion);
playAgainWin.addEventListener('click', () => {
    winScreen.classList.add('hidden');
    levelScreen.classList.remove('hidden');
});
backToLevelWin.addEventListener('click', () => {
    winScreen.classList.add('hidden');
    levelScreen.classList.remove('hidden');
});
tryAgain.addEventListener('click', () => {
    loseScreen.classList.add('hidden');
    startGame(level); // langsung mulai ulang kuis
});
backToLevelLose.addEventListener('click', () => {
    loseScreen.classList.add('hidden');
    levelScreen.classList.remove('hidden');
});

// Fungsi untuk memainkan suara "ting ting"
function playTingSound() {
    tingSound.currentTime = 0;
    tingSound.play();
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Fungsi untuk handle login Google
function handleGoogleLogin() {
    // Simulasi login Google
    Swal.fire({
        title: 'Login dengan Google',
        text: 'Anda akan diarahkan ke halaman login Google',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Lanjutkan',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Set username untuk demo
            username = "Pengguna Google";
            usernameInput.value = username;
            proceedAfterLogin();
        }
    });
}

// Fungsi untuk handle login Facebook
function handleFacebookLogin() {
    // Simulasi login Facebook
    Swal.fire({
        title: 'Login dengan Facebook',
        text: 'Anda akan diarahkan ke halaman login Facebook',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Lanjutkan',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Set username untuk demo
            username = "Pengguna Facebook";
            usernameInput.value = username;
            proceedAfterLogin();
        }
    });
}

// Fungsi untuk handle login
function handleLogin(e) {
    e.preventDefault();

    // Reset error message
    usernameError.style.display = 'none';

    // Ambil nilai username
    const usernameValue = usernameInput.value.trim();

    // Validasi username
    if (usernameValue === '') {
        usernameError.textContent = 'Username harus diisi';
        usernameError.style.display = 'block';
        return;
    } else if (usernameValue.length < 3) {
        usernameError.textContent = 'Username minimal 3 karakter';
        usernameError.style.display = 'block';
        return;
    }

    // Simpan username dan lanjut
    username = usernameValue;
    proceedAfterLogin();
}

// function proceedAfterLogin() {
//     loginScreen.classList.add('hidden');
//     loadingScreen.classList.remove('hidden');
    
//     // Tampilkan nama pengguna di loading screen
//     usernameDisplay.textContent = username;
    
//     // Animasi loading
//     startLoadingAnimation();
// }

// Fungsi untuk animasi loading
function startLoadingAnimation() {
    let progress = 0;
    const loadingMessages = [
        "Memuat peta Indonesia...",
        "Menyiapkan pertanyaan budaya...",
        "Mengumpulkan fakta sejarah...",
        "Mempersiapkan tantangan geografi...",
        "Hampir selesai..."
    ];
    
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        
        // Update loading text
        if (progress < 20) loadingText.textContent = loadingMessages[0];
        else if (progress < 40) loadingText.textContent = loadingMessages[1];
        else if (progress < 60) loadingText.textContent = loadingMessages[2];
        else if (progress < 80) loadingText.textContent = loadingMessages[3];
        else loadingText.textContent = loadingMessages[4];
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                levelScreen.classList.remove('hidden');
            }, 500);
        }
    }, 300);
}

// Fungsi untuk memulai game berdasarkan level
function startGame(selectedLevel) {
    level = selectedLevel;
    levelScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    // Set username di quiz screen
    quizUsername.textContent = username;
    
    // Set level indicator
    currentLevel.textContent = `Level: ${level === 'pelajar' ? 'Pelajar' : 'Mahasiswa'}`;
    levelIndicator.className = `level-indicator ${level}`;
    
    // Inisialisasi kuis
    initializeQuiz();
}

// Inisialisasi kuis

function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    timeLeft = 30;

    const allQuestions = [...quizData[level]];
    questions = allQuestions.sort(() => Math.random() - 0.5); // gunakan semua soal, acak urutan
    userAnswers = Array(questions.length).fill(null); // sesuai jumlah soal

    totalQuestionsDisplay.textContent = questions.length;
    scoreDisplay.textContent = '0';

    loadQuestion();
}


// Muat pertanyaan
function loadQuestion() {
    resetOptions();
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionDisplay.textContent = currentQuestion + 1;
    quizProgress.style.width = `${(currentQuestion / questions.length) * 100}%`;
    
    // Kosongkan container opsi
    optionsContainer.innerHTML = '';
    
    // Tambahkan opsi jawaban
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', selectOption);
        optionsContainer.appendChild(optionElement);
    });
    
    // Update tombol navigasi
    prevButton.disabled = currentQuestion === 0;
    nextButton.textContent = currentQuestion === questions.length - 1 ? "Selesai" : "Selanjutnya";
    
    // Mulai timer
    startTimer();
}

// Pilih opsi jawaban
function selectOption(e) {
    if (document.querySelector('.option.selected')) return;
    
    const selectedIndex = parseInt(e.target.dataset.index);
    selectedOption = selectedIndex;
    
    // Tampilkan opsi yang dipilih
    e.target.classList.add('selected');
    
    // Periksa jawaban
    const isCorrect = selectedIndex === questions[currentQuestion].answer;
    
    // Tampilkan gambar Soekarno sesuai jawaban
    soekarnoImage.src = isCorrect 
        ? 'assets/soekarno_jempol.png' // Soekarno thumbs up
        : 'assets/soekarno_nangis.png'; // Soekarno crying
    soekarnoImage.classList.remove('hidden');
    
    if (isCorrect) {
        e.target.classList.add('correct');
        // Hitung skor berdasarkan level
        score += 10;
        scoreDisplay.textContent = score;
    } else {
        e.target.classList.add('wrong');
        // Tampilkan jawaban yang benar
        document.querySelectorAll('.option')[questions[currentQuestion].answer].classList.add('correct');
    }
    
    // Nonaktifkan semua opsi setelah memilih
    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Hentikan timer
    clearInterval(timer);
}

// Reset opsi jawaban
function resetOptions() {
    optionsContainer.innerHTML = '';
    selectedOption = null;
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    soekarnoImage.classList.add('hidden');
}

// Timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Otomatis lanjut ke pertanyaan berikutnya jika waktu habis
            if (currentQuestion < questions.length - 1) {
                nextQuestion();
            } else {
                finishQuiz();
            }
        }
    }, 1000);
}

// Pertanyaan berikutnya
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// Pertanyaan sebelumnya
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Selesai kuis
function finishQuiz() {
    quizScreen.classList.add('hidden');
    
    // Set level badge
    const levelBadgeText = level === 'pelajar' ? 'Pelajar' : 'Mahasiswa';
    const levelBadgeClass = level === 'pelajar' ? 'pelajar-badge' : 'mahasiswa-badge';
    
        // Tampilkan layar menang
        if (score >= 70) {
        winUsername.textContent = username;
        finalScore.textContent = score;
        winLevelBadge.textContent = `Level: ${levelBadgeText}`;
        winLevelBadge.className = `level-badge ${levelBadgeClass}`;
        winScreen.classList.remove('hidden');
        createConfetti();
        winSound.play();
    } else {
        // Tampilkan layar kalah
        loseUsername.textContent = username;
        loseScore.textContent = score;
        loseLevelBadge.textContent = `Level: ${levelBadgeText}`;
        loseLevelBadge.className = `level-badge ${levelBadgeClass}`;
        loseScreen.classList.remove('hidden');
        loseSound.play();
    }
}

// Buat efek confetti
function createConfetti() {
    const colors = ['#f9d423', '#ff4e50', '#43cea2', '#185a9d', '#ffffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.style.animationDelay = `${delay}s`;
        
        winScreen.appendChild(confetti);
    }
}

// === MODIFIKASI FITUR BARU ===

// Tambahan variabel untuk menyimpan jawaban
let userAnswers = [];

// MODIFIKASI: Di dalam initializeQuiz()

function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    timeLeft = 30;

    const allQuestions = [...quizData[level]];
    questions = allQuestions.sort(() => Math.random() - 0.5); // gunakan semua soal, acak urutan
    userAnswers = Array(questions.length).fill(null); // sesuai jumlah soal

    totalQuestionsDisplay.textContent = questions.length;
    scoreDisplay.textContent = '0';

    loadQuestion();
}


// MODIFIKASI: Di dalam selectOption()
function selectOption(e) {
    if (userAnswers[currentQuestion] !== null) return; // mencegah ganti jawaban

    const selectedIndex = parseInt(e.target.dataset.index);
    selectedOption = selectedIndex;
    userAnswers[currentQuestion] = selectedIndex; // Simpan jawaban

    e.target.classList.add('selected');
    const isCorrect = selectedIndex === questions[currentQuestion].answer;

    soekarnoImage.src = isCorrect 
        ? 'assets/soekarno-senang.png' // Soekarno thumbs up
        : 'assets/soekarno-sedih.png'; // Soekarno crying
    soekarnoImage.classList.remove('hidden');

    if (isCorrect) {
        e.target.classList.add('correct');
        score += 10;
        scoreDisplay.textContent = score;
    } else {
        e.target.classList.add('wrong');
        document.querySelectorAll('.option')[questions[currentQuestion].answer].classList.add('correct');
    }

    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    clearInterval(timer);
    nextButton.disabled = false;
}

// MODIFIKASI: Di dalam loadQuestion()
function loadQuestion() {
    resetOptions();
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionDisplay.textContent = currentQuestion + 1;
    quizProgress.style.width = `${(currentQuestion / questions.length) * 100}%`;

    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', selectOption);
        optionsContainer.appendChild(optionElement);
    });

    // Restore previous selection
    if (userAnswers[currentQuestion] !== null) {
        const selectedIdx = userAnswers[currentQuestion];
        const optionEls = document.querySelectorAll('.option');
        optionEls[selectedIdx].classList.add('selected');
        if (selectedIdx === question.answer) {
            optionEls[selectedIdx].classList.add('correct');
        } else {
            optionEls[selectedIdx].classList.add('wrong');
            optionEls[question.answer].classList.add('correct');
        }
        optionEls.forEach(opt => opt.style.pointerEvents = 'none');
        soekarnoImage.src = selectedIdx === question.answer
        ? 'assets/soekarno-senang.png' // Soekarno thumbs up
        : 'assets/soekarno-sedih.png'; // Soekarno crying
        soekarnoImage.classList.remove('hidden');
    }

    prevButton.disabled = currentQuestion === 0;
    nextButton.textContent = currentQuestion === questions.length - 1 ? "Selesai" : "Selanjutnya";
    nextButton.disabled = userAnswers[currentQuestion] === null; // Blok jika belum jawab
    startTimer();
}
