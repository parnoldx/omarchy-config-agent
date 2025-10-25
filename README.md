# Omarchy AI Tools

Explore some usages of AI for OMARCHY

## `omarchy-config-agent`

The `omarchy-config-agent` is an intelligent assistant that helps you configure your Omarchy system using simple, natural language commands. It understands your requests and safely applies the necessary changes to your system's configuration files. For claude code but should be working for other LLM cli's

**How to Use:**     
    Simply start `omarchy-config-agent` 
1.  **Tell the agent what you want to configure:**

2.  **Review and Confirm:**
    The agent will then propose a plan of action based on your request. It will show you exactly what changes it intends to make. You will have the opportunity to review these changes and confirm whether you want to proceed.

3.  **Agent Executes:**
    Once you confirm, the agent will execute the plan, making the requested configuration changes to your system.

## `omarchy-ask`

The `omarchy-ask` explores some different non interactive ux for asking. But questions can also just be asked to the omarchy-config-agent. Only claude code

**How to Use:**

```bash
omarchy-ask "How do i close windows"
omarchy-ask "How to define keybindings"
omarchy-ask "How do i set a wallpaper" // not the best answer right now, no theming knowledge added yet
omarchy-ask // for interactive question input
```


# User Experience

Possible UX approaches for an AI agent

## Visual Notification System

The agent provides visual feedback to ensure users never miss important interactions. Before asking clarifying questions or requesting confirmation, the system triggers a visual notification.

**Implementation:**
- Command: `omarchy-claude-signal start`
- Triggers: Before user input is required (questions, confirmations)
- Purpose: Alerts users to pay attention to the terminal when agent interaction is needed

**User Benefit:**
Users working in multiple windows or contexts receive a clear signal when the agent needs their attention, preventing missed prompts or timeouts.

## Waybar Icon State Highlighting

Visual feedback is integrated directly into the status bar by changing the color of the Omarchy icon based on the agent's state.

**How it works:**
1. Agent sends signal to update Waybar state (via `omarchy-claude-signal start`)
2. Script sets a state file and sends signal 9 to Waybar
3. Waybar's custom/omarchy module receives signal 9 and executes `omarchy-icon-status`
4. Script checks various states and returns appropriate CSS class:
   - `awaiting-input` - Agent is waiting for user response
   - `dictating` - Voice input active
   - ... possible other states
   - (empty) - Normal state
5. CSS class changes the icon color in Waybar

**Configuration:**
- Waybar config: `config.jsonc` → `custom/omarchy` module with `"signal": 9`
- Status script: `omarchy-icon-status` checks state and returns JSON with CSS class
- CSS styling: Custom colors defined in Waybar's `style.css` for each state class

**User Benefit:**
Immediate visual feedback in the status bar shows when the agent needs attention, without switching windows or checking terminals.

## Special Workspace Integration

The agent runs in a dedicated Hyprland special workspace, allowing quick access from anywhere in the system.

**Concept:**
- Agent runs in a special workspace
- Special workspaces in Hyprland can be toggled with a keybind
- Workspace appears/disappears as an overlay without disrupting current windows
- Agent terminal remains running in the background when hidden

**User Benefit:**
Quick access to the agent from any workspace without window switching or task switching. Press a keybind to bring up the agent, interact, then hide it again - all while keeping your current workflow intact.