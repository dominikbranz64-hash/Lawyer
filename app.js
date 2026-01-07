// ====== SAVE / LOAD ======
let save = JSON.parse(localStorage.getItem("prawnikSave"));

let money = save?.money ?? 5000;
let xp = save?.xp ?? 0;

function saveGame(){
    localStorage.setItem("prawnikSave", JSON.stringify({money, xp}));
}

// ====== ZAROBKI WG XP ======
function getEarning(){
    if(xp >= 100) return 3500000;
    if(xp >= 90) return 1000000;
    if(xp >= 80) return 700000;
    if(xp >= 70) return 700000;
    if(xp >= 60) return 100000;
    if(xp >= 50) return 70000;
    if(xp >= 40) return 25000;
    if(xp >= 30) return 12500;
    if(xp >= 20) return 5000;
    if(xp >= 10) return 2500;
    return 1000;
}

// ====== UI ======
function updateUI(){
    document.getElementById("money").innerText = money;
    document.getElementById("xp").innerText = xp;
    saveGame();
}
updateUI();

// ====== NORMALNA SPRAWA ======
function takeCase(){
    let base = getEarning();
    let fail = Math.random() < 0.25;

    let payout = fail ? base / 2 : base;
    money += payout;

    log(fail
        ? `❌ Przegrana częściowa. Zarobek: ${payout}$`
        : `✅ Wygrana sprawa. Zarobek: ${payout}$`
    );
    updateUI();
}

// ====== VIP SPRAWA ======
function takeVIPCase(){
    if(xp < 50){
        log("❌ Za mało XP na VIP sprawę");
        return;
    }

    let base = getEarning() * 2;
    let fail = Math.random() < 0.45;

    let payout = fail ? base / 2 : base;
    money += payout;

    log(fail
        ? `💀 VIP nieudany. Zarobek: ${payout}$`
        : `💎 VIP WYGRANY! Zarobek: ${payout}$`
    );
    updateUI();
}

// ====== XP SHOP ======
function xpPrice(){
    return 100 * Math.pow(2, Math.floor(xp / 5));
}

function buyXP(){
    let price = xpPrice();
    if(money < price){
        log("❌ Brak pieniędzy");
        return;
    }
    money -= price;
    xp += 5;
    log(`🧠 Kupiono 5 XP za ${price}$`);
    updateUI();
}

// ====== SHOP ======
const items = {
    wille:[25000,400000,1000000,5000000,10000000,25000000,50000000,100000000,250000000,500000000],
    auta:[20000,80000,200000,500000,1000000,3000000,7000000,15000000,30000000,70000000],
    bizuteria:[5000,15000,40000,100000,300000,700000,1500000,3000000,7000000,15000000]
};

function openShop(){
    let shop = document.getElementById("shop");
    shop.innerHTML = "<h2>🏪 Sklep</h2>";
    for(let cat in items){
        shop.innerHTML += `<h3>${cat}</h3>`;
        items[cat].forEach((price,i)=>{
            shop.innerHTML += `
            <div class="shop-item">
                ${cat} #${i+1} – ${price}$ 
                <button onclick="buyItem(${price})">Kup</button>
            </div>`;
        });
    }
    shop.classList.toggle("hidden");
}

function buyItem(price){
    if(money < price){
        log("❌ Za drogo");
        return;
    }
    money -= price;
    log(`🏆 Zakup za ${price}$`);
    updateUI();
}

// ====== ADMIN ======
function openAdmin(){
    let code = prompt("Kod admina:");
    if(code === "7432"){
        let a = prompt("1 = kasa | 2 = XP | 3 = reset");
        if(a === "1") money += Number(prompt("Ile dodać?"));
        if(a === "2") xp += Number(prompt("Ile XP?"));
        if(a === "3") localStorage.clear();
        updateUI();
        log("🔓 Admin OK");
    } else {
        log("❌ Zły kod");
    }
}

// ====== LOG ======
function log(text){
    document.getElementById("log").innerHTML = text;
}
