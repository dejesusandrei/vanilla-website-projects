export function formatDate(dateString) {
    // 1. Kung walang date na pinili ang user, ibalik ang blank
    if (!dateString) return ""; 

    // 2. Diretso gawa agad ng Date Object (kayang-kaya intindihin ng JS ang YYYY-MM-DD)
    const dateObj = new Date(dateString); 

    // 3. I-format gamit ang Intl.DateTimeFormat
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(dateObj);
}