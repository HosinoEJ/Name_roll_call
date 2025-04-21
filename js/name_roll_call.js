let names = [];
let interval = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*
function loadDefaultNames() {
    fetch('./names.txt')
        .then(response => response.text())
        .then(text => {
            names = text.split('\n').map(name => name.trim()).filter(name => name);
            shuffleArray(names);
        })
        .catch(error => console.error('無法加載默認名單', error));
}
*/

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        names = e.target.result.split('\n').map(name => name.trim()).filter(name => name);
        shuffleArray(names);
    };
    reader.readAsText(file);
});

document.getElementById('startButton').addEventListener('click', function() {
    const button = this;
    if (interval) {
        clearInterval(interval);
        interval = null;
        button.innerText = '點名START!';


        const finalName = document.getElementById('nameDisplay').innerText;
        let pinyinKey = finalName;
        if (namePinyinMap[pinyinKey]) {
            const audio = new Audio(`./audio/${namePinyinMap[pinyinKey]}.wav`);
            audio.play().catch(() => {});
        }



        triggerFireworks(); // 觸發烟花效果
    } else {
        if (names.length === 0) {
            alert('名單加載失敗，請檢查文件或默認名單！');
            return;
        }




        
        interval = setInterval(() => {
            const randomName = names[Math.floor(Math.random() * names.length)];
            document.getElementById('nameDisplay').innerText = randomName;
        }, 5); // 控制名稱滾動速度的地方
        

        /*
        interval = setInterval(() => {
            const randomName = names[Math.floor(Math.random() * names.length)];
            document.getElementById('nameDisplay').innerText = randomName;
        
            const firstChar = randomName.charAt(0).toLowerCase();
            const audioPath = `/${firstChar}.wav`;
            const audio = new Audio(audioPath);
            audio.play().catch(err => {
                // 靜音失敗不顯示錯誤，可能是沒有該檔案
            });
        }, 5); // 建議放慢速度避免聲音重疊
        */

        



        button.innerText = 'STOP!';
    }
});

function triggerFireworks() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.id = 'fireworksCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    const ctx = canvas.getContext('2d');
    let fireworks = [];

    class Firework {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 6 + 4;
            this.life = 220;
            this.opacity = 1;
            this.dx = (Math.random() - 0.5) * 20;
            this.dy = (Math.random() - 0.5) * 20;
            this.decay = 0.98;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity})`;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.dx *= this.decay;
            this.dy *= this.decay;
            this.x += this.dx;
            this.y += this.dy;
            this.radius -= 0.02;
            this.opacity -= 0.005;
            this.life--;
        }
    }

    function createFireworks(x, y) {
        const colors = [
            [255, 89, 89],
            [255, 215, 0],
            [51, 136, 187],
            [255, 105, 180],
            [255, 69, 0]
        ];
        for (let i = 0; i < 100; i++) {
            let color = colors[Math.floor(Math.random() * colors.length)];
            fireworks.push(new Firework(x, y, color));
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        fireworks = fireworks.filter(firework => firework.life > 0 && firework.opacity > 0);
        fireworks.forEach(firework => {
            firework.update();
            firework.draw();
        });
        if (fireworks.length > 0) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(canvas);
        }
    }

    createFireworks(canvas.width / 2, canvas.height / 2);
    animate();
}

loadDefaultNames();




//名稱對應的英文簡寫
const namePinyinMap = {
    "郭家和": "HosinoEJ",
    "任峻成": "nin",
    "栾雅琳": "ran",
    "徐源涛": "jyo",
    "崔芷菡": "sai",
    "杨丰宁": "you",
    "郭子贤": "kaku",
    "纪欣奕": "ki"
};



function loadDefaultNames() {
    names = [
        "郭家和",
        "任峻成",
        "栾雅琳",
        "徐源涛",
        "崔芷菡",
        "杨丰宁",
        "郭子贤",
        "纪欣奕"
    ];
    shuffleArray(names);
}
