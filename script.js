// Typing Animation Text
const typingText = "Welcome to the Matrix...";
let textElement = document.getElementById("typing-text");
let charIndex = 0;

function typeText() {
    if (charIndex < typingText.length) {
        textElement.innerHTML += typingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100); // 100ms delay between letters
    }
}
typeText();

// Matrix Rain Effect
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrixRain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px Courier";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrixRain, 50);

// Glitch Effect Filter (SVG)
const glitchEffect = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <filter id="glitch-effect">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="turbulence"/>
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
`;
document.body.insertAdjacentHTML('beforeend', glitchEffect);

// Terminal Logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

terminalInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const command = terminalInput.value.toLowerCase();

        // Append the command to the terminal output
        terminalOutput.innerHTML += `<span>root@kali:~# ${command}</span><br/>`;

        // Process command
        if (command === 'help') {
            terminalOutput.innerHTML += `<span>Available commands: help, clear, whoami, pwd, exit</span><br/>`;
        } else if (command === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (command === 'whoami') {
            terminalOutput.innerHTML += `<span>root</span><br/>`;
        } else if (command === 'pwd') {
            terminalOutput.innerHTML += `<span>/root</span><br/>`;
        } else if (command === 'exit') {
            terminalOutput.innerHTML += `<span>Goodbye!</span><br/>`;
        } else {
            terminalOutput.innerHTML += `<span>bash: ${command}: command not found</span><br/>`;
        }

        // Auto-scroll to the bottom of the terminal
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        // Clear input field after command is processed
        terminalInput.value = '';
    }
});
