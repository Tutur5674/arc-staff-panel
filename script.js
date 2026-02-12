// 1️⃣ Connecte ton site à Supabase
const supabaseUrl = 'TON_URL_SUPABASE';
const supabaseKey = 'TA_CLE_API';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2️⃣ Fonction inscription
async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    // Vérifie si le pseudo existe déjà
    let { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('discord_username', username);

    if (user.length > 0) {
        alert('Pseudo déjà utilisé !');
        return;
    }

    // Crée le compte
    let { data, errorInsert } = await supabase
        .from('users')
        .insert([{ discord_username: username, password: password, role: role }]);

    if (errorInsert) {
        alert('Erreur : ' + errorInsert.message);
    } else {
        alert('Compte créé ! Connecte-toi maintenant.');
    }
}

// 3️⃣ Fonction login
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('discord_username', username)
        .eq('password', password);

    if (user.length === 0) {
        alert('Pseudo ou mot de passe incorrect');
        return;
    }

    // Stocke info dans sessionStorage et redirige
    sessionStorage.setItem('user', JSON.stringify(user[0]));
    window.location.href = 'dashboard.html';
}
