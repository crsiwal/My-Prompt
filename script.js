class PromptTemplateManager {
  constructor() {
    this.prompts = [];
    this.currentTemplate = "";
    this.inputValues = [];
    this.initializeElements();
    this.loadPrompts();
    this.bindEvents();
    this.updateUI();
  }

  initializeElements() {
    this.promptTemplate = document.getElementById("promptTemplate");
    this.addPromptBtn = document.getElementById("addPromptBtn");
    this.clearBtn = document.getElementById("clearBtn");
    this.promptsList = document.getElementById("promptsList");
    this.emptyState = document.getElementById("emptyState");
    this.inputModal = document.getElementById("inputModal");
    this.inputFields = document.getElementById("inputFields");
    this.completeCopyBtn = document.getElementById("completeCopyBtn");
    this.cancelBtn = document.getElementById("cancelBtn");
    this.successToast = document.getElementById("successToast");
    this.toastMessage = document.getElementById("toastMessage");
    this.exportBtn = document.getElementById("exportBtn");
    this.importBtn = document.getElementById("importBtn");
    this.importFile = document.getElementById("importFile");
  }

  bindEvents() {
    this.addPromptBtn.addEventListener("click", () => this.addPrompt());
    this.clearBtn.addEventListener("click", () => this.clearForm());
    this.completeCopyBtn.addEventListener("click", () =>
      this.completeAndCopy()
    );
    this.cancelBtn.addEventListener("click", () => this.closeModal());
    this.exportBtn.addEventListener("click", () => this.exportPrompts());
    this.importBtn.addEventListener("click", () => this.importFile.click());
    this.importFile.addEventListener("change", (e) => this.handleImport(e));

    // Close modal when clicking outside
    this.inputModal.addEventListener("click", (e) => {
      if (e.target === this.inputModal) {
        this.closeModal();
      }
    });

    // Enter key to add prompt
    this.promptTemplate.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        this.addPrompt();
      }
    });
  }

  addPrompt() {
    const template = this.promptTemplate.value.trim();
    if (!template) {
      this.showToast("Please enter a prompt template", "error");
      return;
    }

    const prompt = {
      id: Date.now(),
      template: template,
      createdAt: new Date().toISOString(),
    };

    this.prompts.unshift(prompt);
    this.savePrompts();
    this.updateUI();
    this.clearForm();
    this.showToast("Prompt template added successfully!");
  }

  clearForm() {
    this.promptTemplate.value = "";
    this.promptTemplate.focus();
  }

  copyPrompt(promptId) {
    const prompt = this.prompts.find((p) => p.id === promptId);
    if (!prompt) return;

    this.currentTemplate = prompt.template;
    const inputCount = (prompt.template.match(/\{input\}/g) || []).length;

    if (inputCount === 0) {
      // No input tags, just replace today and copy
      const processedText = this.processTemplate(prompt.template, []);
      this.copyToClipboard(processedText);
    } else {
      // Show input modal
      this.showInputModal(inputCount);
    }
  }

  showInputModal(inputCount) {
    this.inputFields.innerHTML = "";
    this.inputValues = [];

    for (let i = 0; i < inputCount; i++) {
      const inputGroup = document.createElement("div");
      inputGroup.className = "space-y-2";

      const label = document.createElement("label");
      label.className = "block text-sm font-medium text-gray-700";
      label.textContent = `Input ${i + 1}`;

      const input = document.createElement("input");
      input.type = "text";
      input.className =
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
      input.placeholder = `Enter value for input ${i + 1}`;

      input.addEventListener("input", (e) => {
        this.inputValues[i] = e.target.value;
      });

      inputGroup.appendChild(label);
      inputGroup.appendChild(input);
      this.inputFields.appendChild(inputGroup);
    }

    this.inputModal.classList.remove("hidden");
    this.inputModal.classList.add("flex");

    // Focus first input
    const firstInput = this.inputFields.querySelector("input");
    if (firstInput) {
      firstInput.focus();
    }
  }

  completeAndCopy() {
    // Check if all inputs are filled
    const inputs = this.inputFields.querySelectorAll("input");
    let allFilled = true;

    inputs.forEach((input, index) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.classList.add("border-red-500");
      } else {
        input.classList.remove("border-red-500");
      }
    });

    if (!allFilled) {
      this.showToast("Please fill in all input fields", "error");
      return;
    }

    const processedText = this.processTemplate(
      this.currentTemplate,
      this.inputValues
    );
    this.copyToClipboard(processedText);
    this.closeModal();
  }

  processTemplate(template, inputs) {
    let processed = template;

    // Replace {today} with current date
    const today = new Date();
    const dateStr =
      today.getDate() +
      " " +
      today.toLocaleDateString("en-US", { month: "long" }) +
      " " +
      today.getFullYear();
    processed = processed.replace(/\{today\}/g, dateStr);

    // Replace {input} tags with user inputs
    let inputIndex = 0;
    processed = processed.replace(/\{input\}/g, () => {
      return inputs[inputIndex++] || "";
    });

    return processed;
  }

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast("Text copied to clipboard!");
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      this.showToast("Text copied to clipboard!");
    }
  }

  closeModal() {
    this.inputModal.classList.add("hidden");
    this.inputModal.classList.remove("flex");
    this.inputFields.innerHTML = "";
    this.inputValues = [];
    this.currentTemplate = "";
  }

  deletePrompt(promptId) {
    if (confirm("Are you sure you want to delete this prompt template?")) {
      this.prompts = this.prompts.filter((p) => p.id !== promptId);
      this.savePrompts();
      this.updateUI();
      this.showToast("Prompt template deleted");
    }
  }

  exportPrompts() {
    const dataStr = JSON.stringify(this.prompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `prompt-templates-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.showToast("Prompts exported successfully!");
  }

  handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedPrompts = JSON.parse(e.target.result);
        if (Array.isArray(importedPrompts)) {
          this.prompts = [...this.prompts, ...importedPrompts];
          this.savePrompts();
          this.updateUI();
          this.showToast("Prompts imported successfully!");
        } else {
          throw new Error("Invalid format");
        }
      } catch (error) {
        this.showToast("Invalid JSON file", "error");
      }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = "";
  }

  updateUI() {
    if (this.prompts.length === 0) {
      this.promptsList.innerHTML = "";
      this.emptyState.classList.remove("hidden");
    } else {
      this.emptyState.classList.add("hidden");
      this.renderPrompts();
    }
  }

  renderPrompts() {
    this.promptsList.innerHTML = this.prompts
      .map((prompt) => {
        const escapedTemplate = this.escapeHtml(prompt.template);
        const lineCount = (prompt.template.match(/\n/g) || []).length + 1;
        const isLongPrompt = lineCount > 3;

        return `
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div class="flex-1">
                            <div class="text-sm text-gray-500 mb-2">
                                Created: ${new Date(
                                  prompt.createdAt
                                ).toLocaleDateString()}
                            </div>
                            <div class="prompt-text text-gray-800 whitespace-pre-wrap break-words" id="prompt-${
                              prompt.id
                            }">
                                ${escapedTemplate}
                            </div>
                            ${
                              isLongPrompt
                                ? `
                                <div class="mt-2">
                                    <span class="show-more-btn" onclick="promptManager.togglePromptText(${prompt.id})" id="toggle-${prompt.id}">
                                        Show more
                                    </span>
                                </div>
                            `
                                : ""
                            }
                        </div>
                        <div class="flex gap-2 flex-shrink-0">
                            <button 
                                onclick="promptManager.copyPrompt(${prompt.id})"
                                class="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 text-sm"
                            >
                                Copy
                            </button>
                            <button 
                                onclick="promptManager.deletePrompt(${
                                  prompt.id
                                })"
                                class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  togglePromptText(promptId) {
    const promptElement = document.getElementById(`prompt-${promptId}`);
    const toggleButton = document.getElementById(`toggle-${promptId}`);

    if (promptElement.classList.contains("expanded")) {
      // Collapse the text
      promptElement.classList.remove("expanded");
      toggleButton.textContent = "Show more";
    } else {
      // Expand the text
      promptElement.classList.add("expanded");
      toggleButton.textContent = "Show less";
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  showToast(message, type = "success") {
    this.toastMessage.textContent = message;

    if (type === "error") {
      this.successToast.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg transform translate-x-full transition-transform duration-300 z-50";
    } else {
      this.successToast.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transform translate-x-full transition-transform duration-300 z-50";
    }

    this.successToast.classList.remove("translate-x-full");

    setTimeout(() => {
      this.successToast.classList.add("translate-x-full");
    }, 3000);
  }

  savePrompts() {
    localStorage.setItem("promptTemplates", JSON.stringify(this.prompts));
  }

  loadPrompts() {
    const saved = localStorage.getItem("promptTemplates");
    if (saved) {
      try {
        this.prompts = JSON.parse(saved);
      } catch (error) {
        console.error("Error loading prompts:", error);
        this.prompts = [];
      }
    }
  }
}

// Initialize the application
const promptManager = new PromptTemplateManager();
