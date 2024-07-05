async function summarizeText() {
    const inputText = document.getElementById('inputText').value;
    const summaryText = document.getElementById('summaryText');

    // Example using TextRazor API
    const apiKey = 'YOUR_API_KEY';
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

