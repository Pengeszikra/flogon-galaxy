function handleImageDrop(event) {
    event.preventDefault();
    const {items} = event.dataTransfer;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'string' && item.type.match('^text/plain')) {
            item.getAsString(function (url) {
                // Check if the dropped text is an image URL
                if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    const imageMarkdown = `![](${url})`;
                    const textarea = event.target;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const text = textarea.value;
                    textarea.value = text.substring(0, start) + imageMarkdown + text.substring(end);
                    
                    // Trigger change event to update preview
                    textarea.dispatchEvent(new Event('input'));
                }
            });
        }
    }
}