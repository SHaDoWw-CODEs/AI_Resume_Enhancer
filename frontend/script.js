const btn = document.getElementById("processBtn");
const output = document.getElementById("output");
const toggleDark = document.getElementById("toggleDark");

/* ------------------------------
   🌙 DARK MODE TOGGLE
--------------------------------*/
toggleDark.onclick = () => {
  document.body.classList.toggle("dark");
  toggleDark.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};

/* ------------------------------
   🔧 FORMATTER — Markdown → HTML
--------------------------------*/
function formatText(text) {
  return text
    .replace(/^### (.*$)/gim, "<h4>$1</h4>")
    .replace(/^## (.*$)/gim, "<h3>$1</h3>")
    .replace(/^# (.*$)/gim, "<h2>$1</h2>")
    .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/gim, "<br><br>")
    .replace(/\n/gim, "<br>");
}

/* ------------------------------
   🧠 ORGANIZER — Split Output
--------------------------------*/
function organizeOutput(text) {
  let rating = "";
  let improvements = "";
  let keywords = "";
  let resume = text;

  /* ⭐ Extract Rating */
  const ratingMatch = text.match(/(score|rating)[:\- ]+(\d{1,3})/i);
  if (ratingMatch) rating = ratingMatch[2];

  /* ✏️ Extract Improvements Section */
  const improveMatch = text.match(
    /(improvements?|what was improved|areas for improvement)[:\- ]+([\s\S]*?)(?=keywords|ats|$)/i
  );
  if (improveMatch) improvements = improveMatch[2].trim();

  /* 🔑 Extract Keywords Section */
  const keywordMatch = text.match(
    /(keywords|ats keywords|added keywords)[:\- ]+([\s\S]*?)(?=improv|score|rating|$)/i
  );
  if (keywordMatch) keywords = keywordMatch[2].trim();

  /* Remove extracted parts from resume */
  resume = resume
    .replace(ratingMatch?.[0] || "", "")
    .replace(improveMatch?.[0] || "", "")
    .replace(keywordMatch?.[0] || "", "")
    .trim();

  /* Return Beautiful HTML Sections */
  return `
    ${rating ? `
      <div class="output-section">
        <h3>⭐ Resume Rating</h3>
        <p><b>${rating}/100</b></p>
      </div>
    ` : ""}

    ${improvements ? `
      <div class="output-section">
        <h3>✏️ Grammar & Improvements</h3>
        <p>${formatText(improvements)}</p>
      </div>
    ` : ""}

    ${keywords ? `
      <div class="output-section">
        <h3>🔑 ATS Keywords Added</h3>
        <p>${formatText(keywords)}</p>
      </div>
    ` : ""}

    <div class="output-section">
      <h3>📄 Enhanced Resume Content</h3>
      <p>${formatText(resume)}</p>
    </div>
  `;
}

/* ------------------------------
   🚀 MAIN ENHANCE FUNCTION
--------------------------------*/
btn.onclick = async () => {
  const file = document.getElementById("resume").files[0];
  if (!file) return alert("Please upload a resume file!");

  const formData = new FormData();
  formData.append("file", file);

  output.innerHTML = "<div class='loading'>⏳ Enhancing your resume...</div>";

  const res = await fetch("http://127.0.0.1:8000/enhance", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  const organized = organizeOutput(data.enhanced);

  output.innerHTML = `
    <h2>✨ AI Enhanced Resume</h2>
    ${organized}
  `;
};



