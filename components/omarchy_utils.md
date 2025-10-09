### Component: Omarchy Utilities
- **Description:** Manages Omarchy's custom helper scripts and utilities. This component guides the agent on how to discover, understand, and correctly apply these scripts for various system management, configuration, and common tasks (e.g., theming, system setup).
- **Keywords:** omarchy, helper, script, utility, tool, bin, custom, command, theme, wallpaper, colorscheme, setup, install, update
- **Configuration Files:** (These utilities typically modify other component's config files, rather than having their own direct configuration is usually via command-line arguments.)
- **Key Concepts & Syntax:**
  - **Execution:** Omarchy helper scripts are executable files found in specific `bin` directories (e.g., `~/.local/share/omarchy/bin/`).
  - **Arguments:** Scripts often accept arguments for specific actions or values. The exact arguments must be discovered per script through introspection.
- **Validation (Semantic):**
  - **Script Execution Success:** Check exit code of script (0 for success) and parse stdout/stderr for specific messages.
- **Information Retrieval Hierarchy:**
  - **Priority 1 (Script Introspection & Filename Inference):**
    - **Filename Inference:** Infer the script's primary purpose from its filename (e.g., `omarchy-theme-set` suggests theme setting).
    - **Script Content Analysis:** Read the script file itself (`read_file`) to understand its logic, arguments, and potential side effects.
  - **Priority 2 (Known Paths):** Search common Omarchy helper script paths (e.g., `~/.local/share/omarchy/bin/`, `~/.local/bin/`) for executable files.
  - **Priority 3 (Omarchy Repo):** Analyze the `omarchy` repository for scripts and documentation.
- **Standard Procedures:**
  - **Procedure: Discover Omarchy Helper Scripts**
    1. Search known Omarchy script directories (e.g., `~/.local/share/omarchy/bin/`) using `ls` or `find` for executable files.
    2. For each discovered script, infer its purpose from the filename.
    3. Read the script's content to understand its functionality and arguments.
  - **Procedure: Understand Script Functionality**
    1. **Filename Inference:** Infer the script's primary purpose from its filename.
    2. **Script Content Analysis:** Read the script file content (`read_file`) to analyze its logic, dependencies, and the files it modifies.
  - **Procedure: Execute Omarchy Helper Script**
    1. **Semantic Validation:** Ensure the script exists and is executable using `command -v <script_name>`. If not, report to user and abort.
    2. **Execution:** Execute the script with appropriate arguments (discovered via introspection).
    3. **Verification:** Check the script's exit code and parse its output for success messages or errors. If verification fails, initiate rollback.
