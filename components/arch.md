### Component: Arch Linux
- **Description:** Manages core Arch Linux system functionalities, including package management via Pacman and service management via systemd.
- **Keywords:** arch, pacman, systemd, package, install, remove, update, service, enable, disable, start, stop, status
- **Configuration Files:**
  - **Pacman:** `/etc/pacman.conf`
  - **Systemd Service Units:** `/etc/systemd/system/*.service`
  - **Shell Configuration (Reference):** `~/.bashrc`, `~/.zshrc`
- **Key Concepts & Syntax:**
  - **Pacman:** The primary package manager for Arch Linux. Commands typically start with `pacman -[flag]`. For specific command syntax and options, refer to the `Information Retrieval Hierarchy` (Priority 1: `man` pages, `--help`).
  - **Systemctl:** The primary tool for controlling the systemd init system and services. Commands typically start with `systemctl [action] [unit]`. For specific command syntax and options, refer to the `Information Retrieval Hierarchy` (Priority 1: `man` pages, `--help`).
- **Validation (Semantic):**
  - **Package Installed:** `pacman -Q <package>` (Success if exit code 0).
  - **Service Active:** `systemctl is-active <service>` (Success if output is 'active').
  - **Service Enabled:** `systemctl is-enabled <service>` (Success if output is 'enabled').
- **Information Retrieval Hierarchy:**
  - **Priority 1 (Direct Command Help):** For specific command syntax and options, always consult `man <command>` or `<command> --help`.
  - **Priority 2 (Arch Wiki):** The definitive source for Arch Linux knowledge.
    - **Local Access (Preferred):** The agent should first attempt to search a locally downloaded copy of the Arch Wiki (e.g., via `grep` on `arch-wiki-docs` package content, typically found in `/usr/share/doc/arch-wiki/html/`).
    - **Online Access (Fallback):** If local access is unavailable or yields no results, use `web_fetch` on `https://wiki.archlinux.org/` with the query.
  - **Priority 3 (System Introspection):** Examine relevant configuration files (e.g., `/etc/pacman.conf`, `/etc/systemd/system/`) for existing patterns and comments.
- **Standard Procedures:**
  - **Procedure: Install package**
    1. **Semantic Validation:** Use `pacman -Q <package>` to check if the package is already installed. If so, report to user and abort.
    2. **Execution:** Execute `sudo pacman -S <package> --no-confirm`.
    3. **Verification:** Use `pacman -Q <package>` to confirm successful installation. If verification fails, initiate rollback.
  - **Procedure: Remove package**
    1. **Semantic Validation:** Use `pacman -Q <package>` to check if the package is installed. If not, report to user and abort.
    2. **Execution:** Execute `sudo pacman -Rns <package> --no-confirm`.
    3. **Verification:** Use `pacman -Q <package>` (should return non-zero exit code). If verification fails, initiate rollback.
  - **Procedure: Manage service**
    1. **Semantic Validation:** Use `systemctl status <service>` to check if the service unit exists. If not, report to user and abort.
    2. **Execution:** Execute `sudo systemctl <action> <service>`.
    3. **Verification:** Use `systemctl is-active <service>` or `systemctl is-enabled <service>` to confirm the desired state. If verification fails, initiate rollback.
  - **Procedure: Query Arch Wiki**
    1. **Check for local Arch Wiki:** Look for a local installation (e.g., `/usr/share/doc/arch-wiki/html/`).
    2. **Local Search:** If local wiki found, use `search_file_content` or `grep` within the local files for keywords.
    3. **Online Search (Fallback):** If local search fails or no local wiki is found, use `web_fetch` on `https://wiki.archlinux.org/` with the query.
    4. **Parse Results:** Extract relevant information from the search results.
