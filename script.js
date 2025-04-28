document.addEventListener('DOMContentLoaded', () => {
    // Crash Game
    const startButton = document.getElementById('startGame');
    const cashoutButton = document.getElementById('cashout');
    const multiplierDisplay = document.querySelector('.multiplier');
    const balanceDisplay = document.querySelector('.balance');
    
    let balance = 1000;
    let currentMultiplier = 1.00;
    let gameInterval;
    let isGameRunning = false;
    let crashPoint;

    function updateBalance(amount) {
        balance += amount;
        balanceDisplay.textContent = `Saldo: ${balance.toFixed(2)} PLN`;
    }

    function generateCrashPoint() {
        // Random crash point between 1.00 and 10.00
        return (1 + Math.random() * 9).toFixed(2);
    }

    function startGame() {
        if (isGameRunning) return;
        
        isGameRunning = true;
        startButton.disabled = true;
        cashoutButton.disabled = false;
        currentMultiplier = 1.00;
        crashPoint = parseFloat(generateCrashPoint());
        
        gameInterval = setInterval(() => {
            currentMultiplier += 0.01;
            multiplierDisplay.textContent = `${currentMultiplier.toFixed(2)}x`;
            
            if (currentMultiplier >= crashPoint) {
                crashGame();
            }
        }, 100);
    }

    function crashGame() {
        clearInterval(gameInterval);
        isGameRunning = false;
        startButton.disabled = false;
        cashoutButton.disabled = true;
        
        // Simulate Igor's reaction
        const reactions = [
            "Igor zniszczył swoją myszkę!",
            "Igor zniszczył swoją klawiaturę!",
            "Igor zniszczył swój mikrofon!",
            "Igor zniszczył swoje słuchawki!",
            "Igor zniszczył swój iPhone 14!"
        ];
        
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        alert(`CRASH! ${randomReaction}`);
        
        // Update balance (lose money)
        updateBalance(-100);
    }

    function cashout() {
        if (!isGameRunning) return;
        
        clearInterval(gameInterval);
        isGameRunning = false;
        startButton.disabled = false;
        cashoutButton.disabled = true;
        
        // Calculate winnings
        const winnings = 100 * (currentMultiplier - 1);
        updateBalance(winnings);
        
        alert(`Wygrałeś ${winnings.toFixed(2)} PLN!`);
    }

    // Event listeners for Crash Game
    startButton.addEventListener('click', startGame);
    cashoutButton.addEventListener('click', cashout);

    // Cytaty
    const quotes = {
        igor: [
            "Steve Jobs byłby dumny z mojego iPhone'a 14!",
            "Mamo, daj mi jeszcze 1000 zł na Crash!",
            "Apple to najlepsza firma na świecie!",
            "Mój iPhone jest lepszy niż twój!",
            "Steve Jobs to mój idol!"
        ],
        wieslawa: [
            "Igorze, weź jeszcze 500 zł na grę, babcia ma emeryturę!",
            "W Football Rivals kupiłam nowego napastnika za 300 zł!",
            "Mój zespół jest najlepszy w Football Rivals!",
            "Igorze, babcia ma jeszcze trochę pieniędzy na emeryturze!",
            "W Football Rivals wygrałam mecz! Kupiłam nowego bramkarza za 200 zł!"
        ],
        monia: [
            "Kiedyś też byłam uzależniona, ale teraz jestem czysta... prawie.",
            "Igorze, nie graj tyle w te gry... chociaż sama wiem jak to jest.",
            "Sławomirze, przestań pić! Chociaż sama wiem jak to jest.",
            "Mamo, daj mi jeszcze trochę pieniędzy... chociaż sama wiem jak to jest.",
            "Igorze, idź do szkoły zamiast grać... chociaż sama wiem jak to jest."
        ],
        slawomir: [
            "Nie lubię go, idę na komendę go sprzedać!",
            "Igorze, przestań grać w te gry! Chociaż sam wiem jak to jest.",
            "Monia, przestań brać narkotyki! Chociaż sam wiem jak to jest.",
            "Wiesławo, przestań dawać Igorowi pieniądze! Chociaż sam wiem jak to jest.",
            "Igorze, idź do pracy zamiast grać! Chociaż sam wiem jak to jest."
        ]
    };

    const quoteElements = {
        igor: document.querySelector('#igor-quote .quote-text'),
        wieslawa: document.querySelector('#wieslawa-quote .quote-text'),
        monia: document.querySelector('#monia-quote .quote-text'),
        slawomir: document.querySelector('#slawomir-quote .quote-text')
    };

    function getRandomQuote(person) {
        const personQuotes = quotes[person];
        return personQuotes[Math.floor(Math.random() * personQuotes.length)];
    }

    function updateQuotes() {
        for (const person in quoteElements) {
            quoteElements[person].textContent = `"${getRandomQuote(person)}"`;
        }
    }

    document.getElementById('new-quotes').addEventListener('click', updateQuotes);

    // Football Rivals
    const player = document.getElementById('player');
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const startFootballButton = document.getElementById('startFootball');
    const buyPackButton = document.getElementById('buyPack');
    const scoreDisplay = document.getElementById('score');
    const moneySpentDisplay = document.getElementById('money-spent');
    
    let score = 0;
    let moneySpent = 0;
    let isFootballGameRunning = false;
    let footballInterval;
    let playerPosition = 50;
    let ballPosition = 100;
    let ballSpeed = 2;
    let ballDirection = 1;
    let ballHeight = 20;
    let ballVerticalSpeed = 0;
    let gravity = 0.5;
    let isJumping = false;
    let jumpStrength = -10;

    function updateFootballGame() {
        if (!isFootballGameRunning) return;
        
        // Move ball
        ballPosition += ballSpeed * ballDirection;
        ballVerticalSpeed += gravity;
        ballHeight += ballVerticalSpeed;
        
        // Ball hits ground
        if (ballHeight > 20) {
            ballHeight = 20;
            ballVerticalSpeed = -ballVerticalSpeed * 0.7;
        }
        
        // Ball hits walls
        if (ballPosition > 300 || ballPosition < 0) {
            ballDirection *= -1;
        }
        
        // Update ball position
        ball.style.left = `${ballPosition}px`;
        ball.style.bottom = `${ballHeight}px`;
        
        // Check for goal
        const goalRect = goal.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();
        
        if (
            ballRect.right > goalRect.left &&
            ballRect.left < goalRect.right &&
            ballRect.bottom > goalRect.top &&
            ballRect.top < goalRect.bottom
        ) {
            score++;
            scoreDisplay.textContent = score;
            resetBall();
        }
    }

    function resetBall() {
        ballPosition = 100;
        ballHeight = 20;
        ballVerticalSpeed = 0;
        ballDirection = 1;
    }

    function startFootballGame() {
        if (isFootballGameRunning) return;
        
        isFootballGameRunning = true;
        startFootballButton.textContent = 'Stop gry';
        footballInterval = setInterval(updateFootballGame, 20);
    }

    function stopFootballGame() {
        isFootballGameRunning = false;
        startFootballButton.textContent = 'Start gry';
        clearInterval(footballInterval);
    }

    function toggleFootballGame() {
        if (isFootballGameRunning) {
            stopFootballGame();
        } else {
            startFootballGame();
        }
    }

    function buyPack() {
        moneySpent += 50;
        moneySpentDisplay.textContent = moneySpent;
        alert('Babcia kupiła paczkę za 50 PLN!');
    }

    function jump() {
        if (!isJumping && isFootballGameRunning) {
            isJumping = true;
            ballVerticalSpeed = jumpStrength;
            
            setTimeout(() => {
                isJumping = false;
            }, 500);
        }
    }

    // Event listeners for Football Rivals
    startFootballButton.addEventListener('click', toggleFootballGame);
    buyPackButton.addEventListener('click', buyPack);
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && isFootballGameRunning) {
            playerPosition = Math.max(0, playerPosition - 10);
            player.style.left = `${playerPosition}px`;
        } else if (e.key === 'ArrowRight' && isFootballGameRunning) {
            playerPosition = Math.min(300, playerPosition + 10);
            player.style.left = `${playerPosition}px`;
        } else if (e.key === ' ' && isFootballGameRunning) {
            jump();
        }
    });

    // Symulator Donosów
    const slawomir = document.getElementById('slawomir');
    const target = document.getElementById('target');
    const startSnitchingButton = document.getElementById('startSnitching');
    const drinkMoreButton = document.getElementById('drinkMore');
    const snitchCountDisplay = document.getElementById('snitch-count');
    const drunkLevelDisplay = document.getElementById('drunk-level');
    const snitchList = document.getElementById('snitch-list');
    
    let snitchCount = 0;
    let drunkLevel = 0;
    let isSnitching = false;
    let snitchInterval;
    
    const targets = [
        { name: "Igor", reason: "gra w Crash i niszczy sprzęt" },
        { name: "Wiesława", reason: "wydaje emeryturę na Football Rivals" },
        { name: "Monia", reason: "była narkomanka" },
        { name: "Sąsiad", reason: "ma zbyt głośny telewizor" },
        { name: "Kolega z pracy", reason: "nie lubi mojego stylu ubierania" },
        { name: "Kierowca autobusu", reason: "nie powiedział mi dzień dobry" },
        { name: "Sprzedawca w sklepie", reason: "nie ma mojego ulubionego piwa" },
        { name: "Listonosz", reason: "nie przyniósł mi listu" },
        { name: "Ksiądz", reason: "nie pomodlił się za mnie" },
        { name: "Lekarz", reason: "nie dał mi recepty na więcej leków" }
    ];
    
    function getRandomTarget() {
        return targets[Math.floor(Math.random() * targets.length)];
    }
    
    function updateSnitchScene() {
        if (!isSnitching) return;
        
        // Move Sławomir to the police station
        slawomir.style.left = '150px';
        
        // After a delay, move him back
        setTimeout(() => {
            slawomir.style.left = '50px';
            isSnitching = false;
            startSnitchingButton.disabled = false;
        }, 2000);
    }
    
    function startSnitching() {
        if (isSnitching) return;
        
        isSnitching = true;
        startSnitchingButton.disabled = true;
        
        const target = getRandomTarget();
        snitchCount++;
        snitchCountDisplay.textContent = snitchCount;
        
        // Add to log
        const listItem = document.createElement('li');
        listItem.textContent = `Sławomir doniósł na ${target.name}, ponieważ ${target.reason}`;
        snitchList.prepend(listItem);
        
        // Animate scene
        updateSnitchScene();
    }
    
    function drinkMore() {
        drunkLevel = Math.min(10, drunkLevel + 1);
        drunkLevelDisplay.textContent = drunkLevel;
        
        // Change Sławomir's appearance based on drunk level
        slawomir.style.backgroundColor = `rgb(${230 - drunkLevel * 10}, ${76 - drunkLevel * 5}, ${60 - drunkLevel * 5})`;
        
        if (drunkLevel >= 10) {
            alert('Sławomir jest już zbyt pijany, aby donieść na kogoś!');
            drinkMoreButton.disabled = true;
        }
    }
    
    // Event listeners for Snitch Simulator
    startSnitchingButton.addEventListener('click', startSnitching);
    drinkMoreButton.addEventListener('click', drinkMore);

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}); 