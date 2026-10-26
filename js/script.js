const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-sidebar');
const closeBtn = document.getElementById('close-sidebar');
const overlay = document.getElementById('sidebar-overlay');

// Ouverture et fermeture du menu
function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

toggleBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// --- Gestion des 3 liens les plus utilisés ---
const defaultLinks = [
    { title: "Pronote", url: "https://0450049j.index-education.net/pronote/eleve.html?identifiant=hkqHsFPt8wZmCDrf" },
    { title: "Chorale", url: "chorale.html" },
    { title: "CD Player", url: "cdplayer.html" }
];

// Compteur de clics sur les cartes principales
document.querySelectorAll('.grille-liens .carte').forEach(carte => {
    carte.addEventListener('click', () => {
        const title = carte.querySelector('h3').innerText;
        const url = carte.getAttribute('href');
        let clicks = JSON.parse(localStorage.getItem('site_clicks') || '{}');
        
        clicks[title] = {
            count: (clicks[title]?.count || 0) + 1,
            url: url
        };
        
        localStorage.setItem('site_clicks', JSON.stringify(clicks));
    });
});

// Affichage des 3 liens les plus cliqués
function loadMostUsedLinks() {
    const clicks = JSON.parse(localStorage.getItem('site_clicks') || '{}');
    const frequentContainer = document.getElementById('frequent-links');
    
    let sorted = Object.keys(clicks)
        .map(key => ({ title: key, ...clicks[key] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

    // Si aucun historique, utiliser les liens par défaut
    if (sorted.length === 0) {
        sorted = defaultLinks;
    }

    frequentContainer.innerHTML = sorted.map(item => 
        `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`
    ).join('');
}

loadMostUsedLinks();