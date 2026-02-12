// ================== CONNEXION SUPABASE ==================
const supabaseUrl = 'https://zghxnojpgcduqslmgvwj.supabase.co';
const supabaseKey = 'sb_publishable_gh0N36uVRghFc78Vn9tJUA_VkKPyX6S';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ================== INSCRIPTION ==================
async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    // Vérifie si pseudo existe
    let { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('discord_username', username);

    if (user.length > 0) {
        alert('Pseudo déjà utilisé !');
        return;
    }

    // Crée le compte
    let { error } = await supabase
        .from('users')
        .insert([{ discord_username: username, password: password, role: role }]);

    if (error) alert('Erreur : ' + error.message);
    else alert('Compte créé ! Connecte-toi maintenant.');
}

// ================== LOGIN ==================
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('discord_username', username)
        .eq('password', password);

    if (user.length === 0) {
        alert('Pseudo ou mot de passe incorrect');
        return;
    }

    sessionStorage.setItem('user', JSON.stringify(user[0]));
    window.location.href = 'dashboard.html';
}
