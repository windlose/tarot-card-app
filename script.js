/* 塔罗牌 - 修复移动到中心动画 */

const tarotCards = [
    { id: 0, name: "愚者", icon: "🌟", upright: "新的开始，冒险精神，天真无邪。", reversed: "鲁莽冲动，缺乏计划。" },
    { id: 1, name: "魔术师", icon: "🎩", upright: "创造力，技能，意志力。", reversed: "操纵，欺骗，缺乏能量。" },
    { id: 2, name: "女祭司", icon: "🌙", upright: "直觉，内在智慧，神秘。", reversed: "隐藏真相，缺乏直觉。" },
    { id: 3, name: "女皇", icon: "👑", upright: "丰饶，母性，创造力。", reversed: "依赖，创意枯竭。" },
    { id: 4, name: "皇帝", icon: "⚔️", upright: "权威，秩序，领导力。", reversed: "专制，控制欲。" },
    { id: 5, name: "教皇", icon: "📿", upright: "传统，精神指引。", reversed: "叛逆，非传统。" },
    { id: 6, name: "恋人", icon: "💕", upright: "爱情，和谐，选择。", reversed: "不和谐，错误选择。" },
    { id: 7, name: "战车", icon: "🏆", upright: "意志力，决心，胜利。", reversed: "失控，缺乏方向。" },
    { id: 8, name: "力量", icon: "🦁", upright: "勇气，耐心，内在力量。", reversed: "怀疑，软弱。" },
    { id: 9, name: "隐士", icon: "🏮", upright: "内省，独处，智慧。", reversed: "孤立，孤独。" },
    { id: 10, name: "命运之轮", icon: "🎡", upright: "转变，命运，周期。", reversed: "厄运，抗拒改变。" },
    { id: 11, name: "正义", icon: "⚖️", upright: "公正，真相，因果。", reversed: "不公，逃避责任。" },
    { id: 12, name: "倒吊人", icon: "🙃", upright: "放手，新视角。", reversed: "延迟，抗拒。" },
    { id: 13, name: "死神", icon: "🌹", upright: "结束，转变，新生。", reversed: "抗拒改变，停滞。" },
    { id: 14, name: "节制", icon: "🍃", upright: "平衡，和谐，耐心。", reversed: "不平衡，过度。" },
    { id: 15, name: "恶魔", icon: "😈", upright: "束缚，诱惑。", reversed: "释放，觉醒。" },
    { id: 16, name: "塔", icon: "⚡", upright: "突变，混乱，启示。", reversed: "逃避灾难。" },
    { id: 17, name: "星星", icon: "⭐", upright: "希望，灵感，宁静。", reversed: "失去信念。" },
    { id: 18, name: "月亮", icon: "🌜", upright: "幻觉，恐惧，直觉。", reversed: "释放恐惧。" },
    { id: 19, name: "太阳", icon: "☀️", upright: "喜悦，成功，活力。", reversed: "暂时低落。" },
    { id: 20, name: "审判", icon: "📯", upright: "重生，觉醒，召唤。", reversed: "自我怀疑。" },
    { id: 21, name: "世界", icon: "🌍", upright: "完成，成就，圆满。", reversed: "未完成。" }
];

const cardsRow = document.getElementById('cardsRow');
const dialogText = document.getElementById('dialogText');
const resultModal = document.getElementById('resultModal');
const flipCard = document.getElementById('flipCard');
const againBtn = document.getElementById('againBtn');
const cardNum = document.getElementById('cardNum');
const cardEmoji = document.getElementById('cardEmoji');
const cardName = document.getElementById('cardName');
const readingName = document.getElementById('readingName');
const positionTag = document.getElementById('positionTag');
const readingText = document.getElementById('readingText');

let selectedCard = null;
let isReversed = false;

// 创建粒子
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(p);
    }
}

// 创建牌阵
function createCards() {
    cardsRow.innerHTML = '';
    for (let i = 0; i < 22; i++) {
        const card = document.createElement('div');
        card.className = 'tarot-card';
        card.innerHTML = `<div class="tarot-card-inner">✦</div>`;
        card.addEventListener('click', () => selectCard(i, card));
        cardsRow.appendChild(card);
    }
}

// 选牌 - 移动到中心再翻牌
function selectCard(index, element) {
    // 随机抽取
    const randIdx = Math.floor(Math.random() * tarotCards.length);
    selectedCard = tarotCards[randIdx];
    isReversed = Math.random() < 0.5;

    // 其他牌淡出
    document.querySelectorAll('.tarot-card').forEach((c, i) => {
        if (i !== index) {
            c.classList.add('faded');
        }
    });

    dialogText.textContent = '「命运正在揭示...」';

    // 获取卡牌当前位置
    const rect = element.getBoundingClientRect();

    // 先把卡牌固定在当前位置
    element.style.position = 'fixed';
    element.style.left = rect.left + 'px';
    element.style.top = rect.top + 'px';
    element.style.margin = '0';
    element.style.zIndex = '100';

    // 计算屏幕中心位置
    const centerX = (window.innerWidth - rect.width) / 2;
    const centerY = (window.innerHeight - rect.height) / 2;

    // 延迟一帧后开始移动动画
    requestAnimationFrame(() => {
        element.style.transition = 'all 1s ease';
        element.style.left = centerX + 'px';
        element.style.top = centerY + 'px';
        element.style.transform = 'scale(2)';
    });

    // 移动完成后显示结果
    setTimeout(() => {
        showResult();
    }, 1200);
}

// 显示结果
function showResult() {
    cardNum.textContent = selectedCard.id;
    cardEmoji.textContent = selectedCard.icon;
    cardName.textContent = selectedCard.name;
    readingName.textContent = selectedCard.name;
    positionTag.textContent = isReversed ? '逆位' : '正位';
    positionTag.className = 'position-tag ' + (isReversed ? 'reversed' : 'upright');
    readingText.textContent = isReversed ? selectedCard.reversed : selectedCard.upright;

    resultModal.classList.remove('hidden');

    // 翻牌
    setTimeout(() => {
        flipCard.classList.add('flipped');
    }, 400);
}

// 重置
function reset() {
    resultModal.classList.add('hidden');
    flipCard.classList.remove('flipped');
    dialogText.textContent = '「旅者，请选择属于你的那张牌」';
    createCards();
}

againBtn.addEventListener('click', reset);

createParticles();
createCards();
