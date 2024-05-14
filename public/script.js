const textArea = document.getElementById('text_to_summarize');
const submitButton = document.getElementById('submit-button');
const summarizedTextArea = document.getElementById("summary");
textArea.addEventListener("input", verifyLength);
submitButton.addEventListener("click", submitData);
submitButton.disabled = true;

function verifyLength(e) {
  const textarea = e.target;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  }
  else {
    submitButton.disabled = true;
  }

}

function submitData(e) {
  submitButton.classList.add("submit-button--loading");
  const text_to_summarize = textArea.value
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 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");

  const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");

    })
    .catch(error => {
      console.log(error.message);
    });
}
