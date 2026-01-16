const panels = document.querySelectorAll(".panel");
const dockItems = document.querySelectorAll(".dock-item");
const iconButtons = document.querySelectorAll(".icon-card");
const closeButtons = document.querySelectorAll("[data-close]");
const projectButtons = document.querySelectorAll("[data-project]");
const cursor = document.querySelector(".cursor");

const projectData = {
  aurora: {
    title: "Aurora Banking",
    description: "Aplicativo financeiro com camadas sensoriais para decisões seguras.",
    tags: ["Fintech", "iOS", "Design System"],
    context:
      "Uma fintech premium precisava elevar a percepção de confiança e elegância em um app de investimentos.",
    solution:
      "Criei um sistema de UI com luzes suaves, microinterações e hierarquia clara para estimular decisões seguras.",
  },
  luma: {
    title: "Luma Studio",
    description: "Workspace para criadores com foco em fluxos editoriais colaborativos.",
    tags: ["SaaS", "Colaboração", "Dashboard"],
    context:
      "Estúdios criativos precisavam compartilhar assets e rotinas editoriais em tempo real.",
    solution:
      "Desenhei uma interface com painéis moduláveis e microfeedbacks para sensação de estúdio vivo.",
  },
  vanta: {
    title: "Vanta Mobility",
    description: "Central inteligente para operações de mobilidade elétrica.",
    tags: ["Mobilidade", "Data Viz", "Web App"],
    context:
      "Empresas de frota elétrica necessitavam monitorar consumo e manutenção com clareza.",
    solution:
      "Implementei um layout com camadas de profundidade e dashboards focados em ação imediata.",
  },
  atlas: {
    title: "Atlas Culture",
    description: "Ecossistema digital para museus, bibliotecas e centros culturais.",
    tags: ["Cultura", "Plataforma", "Experiência"],
    context:
      "Instituições culturais buscavam aproximar públicos jovens com experiências híbridas.",
    solution:
      "Criei um espaço editorial com narrativas visuais e zonas interativas para visitas guiadas.",
  },
  nimbus: {
    title: "Nimbus OS",
    description: "Interface para residência inteligente e controle ambiental.",
    tags: ["IoT", "Casa", "Motion"],
    context:
      "Usuários queriam sentir controle e aconchego ao interagir com dispositivos domésticos.",
    solution:
      "Desenvolvi cards táteis, ícones abstratos e transições suaves para interação emocional.",
  },
  orion: {
    title: "Orion Health",
    description: "Painel clínico com insights preditivos e fluxos seguros.",
    tags: ["Saúde", "Analytics", "UX"],
    context:
      "Clínicas precisavam reduzir o tempo de análise e manter compliance em dados sensíveis.",
    solution:
      "Organizei o layout em blocos intuitivos, com feedback visual para decisões ágeis.",
  },
};

const state = {
  activePanel: "about",
};

const viewerTitle = document.getElementById("viewer-title");
const viewerDescription = document.getElementById("viewer-description");
const viewerTags = document.getElementById("viewer-tags");
const viewerContext = document.getElementById("viewer-context");
const viewerSolution = document.getElementById("viewer-solution");

const setActivePanel = (panelId) => {
  state.activePanel = panelId;
  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === panelId);
  });
  dockItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.open === panelId);
  });
};

const openProject = (projectId) => {
  const data = projectData[projectId];
  if (!data) return;
  viewerTitle.textContent = data.title;
  viewerDescription.textContent = data.description;
  viewerContext.textContent = data.context;
  viewerSolution.textContent = data.solution;
  viewerTags.innerHTML = "";
  data.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    viewerTags.appendChild(span);
  });
  setActivePanel("project-viewer");
};

const handleOpen = (event) => {
  const panelId = event.currentTarget.dataset.open;
  if (panelId) setActivePanel(panelId);
};

const handleClose = () => {
  setActivePanel("about");
};

iconButtons.forEach((button) => button.addEventListener("click", handleOpen));
dockItems.forEach((button) => button.addEventListener("click", handleOpen));
closeButtons.forEach((button) => button.addEventListener("click", handleClose));
projectButtons.forEach((button) =>
  button.addEventListener("click", (event) => openProject(event.currentTarget.dataset.project))
);

const handlePointerMove = (event) => {
  if (!cursor) return;
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
};

const handlePointerLeave = () => {
  if (!cursor) return;
  cursor.classList.add("is-hidden");
};

const handlePointerEnter = () => {
  if (!cursor) return;
  cursor.classList.remove("is-hidden");
};

window.addEventListener("pointermove", handlePointerMove);
window.addEventListener("pointerleave", handlePointerLeave);
window.addEventListener("pointerenter", handlePointerEnter);

const enableDrag = (panel) => {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  const header = panel.querySelector(".panel-header");
  if (!header) return;

  const onPointerDown = (event) => {
    if (window.innerWidth < 900) return;
    isDragging = true;
    startX = event.clientX - currentX;
    startY = event.clientY - currentY;
    panel.style.transition = "none";
    panel.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!isDragging) return;
    currentX = event.clientX - startX;
    currentY = event.clientY - startY;
    panel.style.transform = `translate(${currentX}px, ${currentY}px)`;
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    panel.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  };

  header.addEventListener("pointerdown", onPointerDown);
  panel.addEventListener("pointermove", onPointerMove);
  panel.addEventListener("pointerup", onPointerUp);
  panel.addEventListener("pointerleave", onPointerUp);
};

panels.forEach((panel) => {
  if (panel.dataset.draggable !== undefined) {
    enableDrag(panel);
  }
});

setActivePanel(state.activePanel);
