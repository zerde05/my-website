let jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
let resumes = JSON.parse(localStorage.getItem("resumes") || "[]");

function saveData() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
  localStorage.setItem("resumes", JSON.stringify(resumes));
}

function renderJobs() {
  const list = document.getElementById("jobList");
  list.innerHTML = "";
  jobs.forEach(j => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<b>${j.title}</b> - ${j.company} (${j.address})<br>${j.desc}`;
    list.appendChild(div);
  });
}

function renderResumes() {
  const list = document.getElementById("resumeList");
  list.innerHTML = "";
  resumes.forEach(r => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<b>${r.name}</b> - ${r.skill}<br>${r.desc}`;
    list.appendChild(div);
  });
}

document.getElementById("jobForm").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("jobTitle").value.trim();
  const company = document.getElementById("jobCompany").value.trim();
  const address = document.getElementById("jobAddress").value.trim();
  const desc = document.getElementById("jobDesc").value.trim();
  if (!title || !company || !address || !desc) return;
  jobs.unshift({ title, company, address, desc });
  saveData();
  renderJobs();
  e.target.reset();
});

document.getElementById("resumeForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("resumeName").value.trim();
  const skill = document.getElementById("resumeSkill").value.trim();
  const desc = document.getElementById("resumeDesc").value.trim();
  if (!name || !skill || !desc) return;
  resumes.unshift({ name, skill, desc });
  saveData();
  renderResumes();
  e.target.reset();
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const list = document.getElementById("searchResults");
  list.innerHTML = "";

  const jobResults = jobs.filter(j =>
    j.title.toLowerCase().includes(keyword) ||
    j.company.toLowerCase().includes(keyword) ||
    j.address.toLowerCase().includes(keyword) ||
    j.desc.toLowerCase().includes(keyword)
  );
  const resumeResults = resumes.filter(r =>
    r.name.toLowerCase().includes(keyword) ||
    r.skill.toLowerCase().includes(keyword) ||
    r.desc.toLowerCase().includes(keyword)
  );

  jobResults.forEach(j => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `[招聘] <b>${j.title}</b> - ${j.company} (${j.address})<br>${j.desc}`;
    list.appendChild(div);
  });

  resumeResults.forEach(r => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `[求职] <b>${r.name}</b> - ${r.skill}<br>${r.desc}`;
    list.appendChild(div);
  });
});

renderJobs();
renderResumes();