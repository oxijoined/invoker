document.body.addEventListener("keydown", function(event) {
    switch(event.code) {
        case 'KeyQ':
            addSphere('Q');
            break;
        case 'KeyW':
            addSphere('W');
            break;
        case 'KeyE':
            addSphere('E');
            break;
        case 'KeyR':
            invokeSkill();
            break;
        case 'Space':
            resetGame();
            break;
    }
});

let startTime = null;
let currentCombo = [];
let skills = [
    {name: "EMP", combo: ["W", "W", "W"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/60/E.M.P._icon.png"},
    {name: "Tornado", combo: ["W", "W", "Q"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e1/Tornado_icon.png"},
    {name: "Alacrity", combo: ["W", "W", "E"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1b/Alacrity_icon.png"},
    {name: "Ghost Walk", combo: ["Q", "Q", "W"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c8/Ghost_Walk_icon.png"},
    {name: "Deafening Blast", combo: ["Q", "W", "E"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/dd/Deafening_Blast_icon.png"},
    {name: "Chaos Meteor", combo: ["E", "E", "W"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/76/Chaos_Meteor_icon.png"},
    {name: "Cold Snap", combo: ["Q", "Q", "Q"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fb/Cold_Snap_icon.png"},
    {name: "Ice Wall", combo: ["Q", "Q", "E"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2d/Ice_Wall_icon.png"},
    {name: "Forge Spirit", combo: ["E", "E", "Q"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/cb/Forge_Spirit_icon.png"},
    {name: "Sun Strike", combo: ["E", "E", "E"], image: "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/83/Sun_Strike_icon.png"}
];
const sphereImages = {
    Q: "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4a/Quas_icon.png",
    W: "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/94/Wex_icon.png",
    E: "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d2/Exort_icon.png"
};

for (let key in sphereImages) {
    const image = new Image();
    image.src = sphereImages[key];
}

skills.forEach(skill => {
    const image = new Image();
    image.src = skill.image;
});

let skillsToInvoke = [...skills].sort(() => Math.random() - 0.5);

function addSphere(sphere) {
    if (startTime === null) {
        startTime = new Date().getTime();
    }

    if (currentCombo.length < 3) {
        currentCombo.push(sphere);
    } else {
        currentCombo.shift(); 
        currentCombo.push(sphere); 
    }

    let comboElement = document.getElementById("currentCombo");
    comboElement.innerHTML = currentCombo.map(s => `<img src="${sphereImages[s]}" alt="${s} Sphere" width="40" height="40" class="mx-1">`).join('');
}


function setCurrentSkillImage() {
    if (skillsToInvoke.length > 0) {
        let skillImage = document.createElement("img");
        skillImage.src = skillsToInvoke[0].image;
        skillImage.alt = skillsToInvoke[0].name;
        let skillsToInvokeElement = document.getElementById("skillsToInvoke");
        skillsToInvokeElement.innerHTML = "";
        skillsToInvokeElement.appendChild(skillImage);
    }
}

function invokeSkill() {
    if (skillsToInvoke.length == 0 || startTime === null) return;

    let currentSkill = skillsToInvoke[0];
    let sortedCombo = [...currentCombo].sort();
    let sortedSkillCombo = [...currentSkill.combo].sort();

    if (JSON.stringify(sortedCombo) == JSON.stringify(sortedSkillCombo)) {
        skillsToInvoke.shift();
        
        if (skillsToInvoke.length == 0) {
            let endTime = new Date().getTime();
            let timeSpent = (endTime - startTime) / 1000;
            document.getElementById("finalTime").innerText = `Time: ${timeSpent}s`;
            document.getElementById("modal").classList.remove('hidden');
        } else {
            setCurrentSkillImage();
        }
    }
}

function resetGame() {
    startTime = null;
    skillsToInvoke = [...skills].sort(() => Math.random() - 0.5);
    currentCombo = [];
    document.getElementById("currentCombo").innerText = "---";
    setCurrentSkillImage();
}

function closeModal() {
    document.getElementById("modal").classList.add('hidden');
    resetGame();
}

setCurrentSkillImage();
