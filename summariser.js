async function summarizeText() {
    const inputText = document.getElementById('inputText').value;
    const summaryText = document.getElementById('summaryText');

    const apiKey = 'ee5e9350e2b2b3dc62e1e2927a8e2fc659e9ad0e22320aefca7e8e85';
    const apiUrl = 'https://api.textrazor.com/';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-textrazor-key': apiKey,
            },
            body: `extractors=entities,topics&text=${encodeURIComponent(inputText)}`,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.response && data.response.sentences) {
            const summary = data.response.sentences.map(sentence => sentence.words.map(word => word.token).join(' ')).join(' ');
            summaryText.innerText = summary;
        } else {
            summaryText.innerText = 'Could not summarize the text. Please try again.';
        }
    } catch (error) {
        console.error('Error fetching and summarizing:', error);
        summaryText.innerText = 'Error summarizing text. Please check your input and try again.';
    }
}
