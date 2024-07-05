async function summarizeText() {
    const inputText = document.getElementById('inputText').value;
    const summaryText = document.getElementById('summaryText');

    // Example using TextRazor API
    const apiKey = 'ee5e9350e2b2b3dc62e1e2927a8e2fc659e9ad0e22320aefca7e8e85';
    const apiUrl = 'https://api.textrazor.com/';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-textrazor-key': apiKey,
        },
        body: `extractors=entities,topics&text=${encodeURIComponent(inputText)}`,
    });

    const data = await response.json();

    // Extract and display the summary (modify based on API response structure)
    if (data.response && data.response.sentences) {
        const summary = data.response.sentences.map(sentence => sentence.words.map(word => word.token).join(' ')).join(' ');
        summaryText.innerText = summary;
    } else {
        summaryText.innerText = 'Could not summarize the text. Please try again.';
    }
}

