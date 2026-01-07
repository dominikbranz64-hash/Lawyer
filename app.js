let money = 5000;
let xp = 0;

const earnings = [
    {xp:10, cash:2500},
    {xp:20, cash:5000},
    {xp:30, cash:12500},
    {xp:40, cash:25000},
    {xp:50, cash:70000},
    {xp:60, cash:100000},
    {xp:70, cash:700000},
    {xp:80, cash:700000},
    {xp:90, cash:1000000},
    {xp:100, cash:3500000}
];

const items = {
    wille:[25000,400000,1000000,5000000,10000000,25000000,50000000,100000000,250000000,500000000],
    auta:[20000,80000,200000,500000,1000000,3000000,7000000,15000000,30000000,70000000],
    bizuteria:[5000,15000,40000,100000,300000,700000,1500000,3000000,7000000,15000000]
};

function updateUI(){
    document.getElementById("money").innerText = money;
    document.getElementById("xp").innerText = xp;
}
updateUI();

function takeCase(){
    let chance = Math.random();
    let reward = earnings.find(e=>xp>=e.xp)?.cash || 1000;
    if(chance < 0.25){
        reward = reward / 2;
        log("❌ Sprawa częściowo przegrana! +" + reward);
    } else {
        log("✅ Sprawa wygrana! +" + reward);
    }
    money += reward;
    updateUI();
}

function xpPrice(){
    return 100 * Math.pow(2, Math.floor(xp / 5));
}

function buyXP(){
    let price = xpPrice();
    if(money < price){
        log("❌ Brak pieniędzy na XP");
        return;
    }
    money -= price;
    xp += 5;
    log("🧠 Kupiono 5 XP za " + price);
    updateUI();
}

function openShop(){
    let shop = document.getElementById("shop");
    shop.innerHTML = "<h2>🏪 Sklep</h2>";
    for(let cat in items){
        shop.innerHTML += "<h3>"+cat+"</h3>";
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
    if(money<price){
        log("❌ Za drogo");
        return;
    }
    money-=price;
    log("🏆 Zakup za "+price+"$");
    updateUI();
}

function openAdmin(){
    let code = prompt("Kod admina:");
    if(code==="7432"){
        let action = prompt("1-dodaj kasę | 2-dodaj XP");
        if(action==="1") money += Number(prompt("Ile?"));
        if(action==="2") xp += Number(prompt("Ile?"));
        updateUI();
        log("🔓 Admin użyty");
    } else {
        log("❌ Zły kod");
    }
}

function log(text){
    document.getElementById("log").innerHTML = text;
}
